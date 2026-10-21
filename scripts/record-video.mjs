// Records a frame-perfect demo video of the site.
// Uses chrome-headless-shell in deterministic mode: virtual time is advanced
// one frame at a time and each frame is rendered on demand via BeginFrame, so
// animations play at full 30 fps no matter how slow the machine renders.
//
// usage: node scripts/record-video.mjs desktop|mobile <outDir>   (needs `npm run preview` on :4173)
//        then: ffmpeg -framerate 30 -i <outDir>/f%05d.jpg -c:v libx264 -pix_fmt yuv420p out.mp4
import { spawn } from 'child_process'
import fs from 'fs'

const [, , mode, outDir] = process.argv
const mobile = mode === 'mobile'
const FPS = 30, DT = 1000 / FPS
const SHELL = process.env.CHROME_SHELL || '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'
const BASE = 'http://localhost:4173'
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true })

const port = mobile ? 9334 : 9333
const proc = spawn(SHELL, [
  `--remote-debugging-port=${port}`, '--deterministic-mode', '--enable-begin-frame-control',
  '--run-all-compositor-stages-before-draw', '--disable-threaded-animation', '--disable-threaded-scrolling',
  '--disable-checker-imaging', '--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb',
  ...(mobile ? ['--force-device-scale-factor=2', '--window-size=390,844'] : ['--window-size=1920,1080']), 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] })
const wsUrl = await new Promise((res, rej) => {
  let buf = ''
  proc.stderr.on('data', (d) => { buf += d; const m = buf.match(/ws:\/\/\S+/); if (m) res(m[0]) })
  setTimeout(() => rej(new Error('no ws url: ' + buf)), 15000)
})
const ws = new WebSocket(wsUrl)
await new Promise((r) => ws.addEventListener('open', r))
let id = 0
const pending = new Map(), listeners = []
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result) }
  else if (m.method) listeners.forEach((l) => l(m))
})
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params, sessionId }))
})
const { targetId } = await send('Target.createTarget', { url: 'about:blank', enableBeginFrameControl: true })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
const S = (method, params) => send(method, params, sessionId)
const once = (method) => new Promise((r) => { const l = (m) => { if (m.method === method && m.sessionId === sessionId) { listeners.splice(listeners.indexOf(l), 1); r(m.params) } }; listeners.push(l) })

await S('Page.enable'); await S('Runtime.enable')
await S('Emulation.setDeviceMetricsOverride', mobile
  ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
  : { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false })
if (mobile) await S('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })

// frameTimeTicks share Chrome's CLOCK_MONOTONIC origin; hrtime uses the same clock.
const mono = () => Number(process.hrtime.bigint()) / 1e6
let ticks = mono(), n = 0, last = null, realtime = true
const beginFrame = async (shot) => {
  ticks = realtime ? Math.max(ticks + 1, mono()) : ticks + DT
  const r = await S('HeadlessExperimental.beginFrame', { frameTimeTicks: ticks, interval: DT, ...(shot ? { screenshot: { format: 'jpeg', quality: 90 } } : {}) })
  return r.screenshotData
}
const evaluate = async (expression) => {
  const r = await S('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
const fn = (f, ...args) => evaluate(`(${f})(...${JSON.stringify(args)})`)

// Warm up in real time: load the SPA on a blank route so fonts/assets are cached.
const nav = once('Page.loadEventFired')
await S('Page.navigate', { url: BASE + '/' })
for (let t = Date.now(); Date.now() - t < 2500;) await beginFrame(false)
await nav
for (let t = Date.now(); Date.now() - t < 1500;) await beginFrame(false)
await fn(() => document.fonts.ready.then(() => true))

await S('Emulation.setVirtualTimePolicy', { policy: 'pause' })
realtime = false
const advance = async (ms) => {
  const done = once('Emulation.virtualTimeBudgetExpired')
  await S('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: ms })
  await done
}
const frame = async () => {
  await advance(DT)
  const data = await beginFrame(true)
  if (data) last = Buffer.from(data, 'base64')
  if (last) fs.writeFileSync(`${outDir}/f${String(n++).padStart(5, '0')}.jpg`, last)
}
const wait = async (s) => { for (let i = 0; i < Math.round(s * FPS); i++) await frame() }
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const CURSOR = `(() => {
  if (document.getElementById('__cur')) return
  const c = document.createElement('div'); c.id = '__cur'
  c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/></svg>'
  Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 99999, pointerEvents: 'none', transform: 'translate(-100px,-100px)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))' })
  document.body.appendChild(c)
  const r = document.createElement('div'); r.id = '__rip'
  Object.assign(r.style, { position: 'fixed', width: '36px', height: '36px', margin: '-18px 0 0 -18px', borderRadius: '50%', border: '2px solid #ff7a3d', zIndex: 99998, pointerEvents: 'none', opacity: 0 })
  document.body.appendChild(r)
})()`
let mx = mobile ? 195 : 960, my = mobile ? 400 : 700
// Input acks need a rendered frame, so input is fire-and-forget; the next BeginFrame processes it.
const mouse = (type, x, y, extra = {}) => void S('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', ...extra }).catch(() => {})
const setCursor = (x, y) => mobile ? null : fn((x, y) => { const c = document.getElementById('__cur'); if (c) c.style.transform = `translate(${x - 4}px,${y - 2}px)` }, x, y)
const moveTo = async (x, y, s = 0.6) => {
  const x0 = mx, y0 = my, k = Math.max(1, Math.round(s * FPS))
  for (let i = 1; i <= k; i++) {
    const t = ease(i / k); mx = x0 + (x - x0) * t; my = y0 + (y - y0) * t
    mouse('mouseMoved', mx, my); await setCursor(mx, my); await frame()
  }
}
const rectOf = (sel, text) => fn((sel, text) => {
  const els = [...document.querySelectorAll(sel)].filter((e) => (!text || e.textContent.trim().includes(text)) && e.getClientRects().length)
  const e = els.find((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight }) || els[0]
  if (!e) return null
  const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top }
}, sel, text)
const ripple = (x, y) => fn((x, y) => {
  const r = document.getElementById('__rip'); if (!r) return
  r.style.left = x + 'px'; r.style.top = y + 'px'
  r.animate([{ opacity: 1, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 500, easing: 'ease-out' })
}, x, y)
const click = async (sel, text, s = 0.7) => {
  const r = await rectOf(sel, text); if (!r) throw new Error('not found ' + sel + ' ' + text)
  if (!mobile) await moveTo(r.x, r.y, s); else { mx = r.x; my = r.y; await wait(0.25) }
  await ripple(r.x, r.y)
  mouse('mousePressed', r.x, r.y, { clickCount: 1 }); await frame()
  mouse('mouseReleased', r.x, r.y, { clickCount: 1 })
  await wait(0.15)
}
const scrollBy = async (dy, s) => {
  const y0 = await evaluate('scrollY'), k = Math.max(1, Math.round(s * FPS))
  for (let i = 1; i <= k; i++) { await fn((y) => scrollTo(0, y), y0 + dy * ease(i / k)); await frame() }
}
const scrollToEl = async (sel, text, s, offset = 120) => { const r = await rectOf(sel, text); await scrollBy(r.top - offset, s) }

// --- Go ---
// Reload under virtual time so the intro animations are captured from the start.
const loaded = once('Page.loadEventFired')
await S('Page.navigate', { url: BASE + '/' })
let ready = false
loaded.then(() => { ready = true })
while (!ready) { await advance(DT); await beginFrame(false) }
await evaluate(CURSOR)
await setCursor(mx, my)

if (!mobile) {
  await wait(3.6)
  await moveTo(560, 720, 0.9); await wait(0.8)              // hover markets card
  await click('button', 'Leverage'); await wait(0.5)
  await click('button', 'Earn', 0.4); await wait(0.5)
  await click('button[aria-label="Swap"]'); await wait(0.9)
  await click('button[aria-label="Swap"]', null, 0.2); await wait(0.6)
  await moveTo(1750, 400, 0.6)
  await scrollBy(560, 1.6); await wait(0.6)
  await scrollToEl('h2', 'Powerful', 1.6, 90); await wait(0.6)
  for (const r of ['1W', '1Y', 'ALL']) { await click('button', r, 0.45); await wait(0.6) }
  await moveTo(1750, 500, 0.5)
  await scrollBy(640, 1.6); await wait(1.4)
  await scrollToEl('h2', 'Built for businesses', 1.8, 80); await wait(2.0)
  await scrollToEl('h2', 'Trusted by', 1.8, 80); await wait(1.4)
  await scrollToEl('h2', 'Frequently', 1.6, 80); await wait(0.4)
  await click('button', 'Is my money safe'); await wait(1.0)
  await moveTo(1750, 600, 0.5)
  await scrollToEl('h2', 'Ready to grow', 1.6, 160); await wait(1.4)
  await scrollBy(-200000, 1.6); await wait(0.4)
  await click('header nav a', 'Features'); await wait(1.8)
  await moveTo(1750, 600, 0.5)
  await scrollBy(700, 1.6); await wait(1.4)
  await click('header nav a', 'Why choose'); await wait(1.6)
  await scrollBy(620, 1.5); await wait(1.4)
  await click('header nav a', 'Home'); await wait(3.4)
} else {
  await wait(3.8)
  await scrollBy(480, 1.4); await wait(0.6)
  await click('button[aria-label="Swap"]'); await wait(1.0)
  await scrollBy(560, 1.4); await wait(0.6)
  await scrollToEl('h2', 'Powerful', 1.4, 90); await wait(0.5)
  await scrollBy(560, 1.2); await wait(0.3)
  for (const r of ['1W', 'ALL']) { await click('button', r); await wait(0.7) }
  await scrollBy(700, 1.6); await wait(1.0)
  await scrollBy(650, 1.4); await wait(1.0)
  await scrollToEl('h2', 'Built for businesses', 1.6, 90); await wait(0.8)
  await scrollBy(650, 1.5); await wait(0.8)
  await scrollBy(700, 1.5); await wait(1.2)
  await scrollToEl('h2', 'Trusted by', 1.6, 90); await wait(1.0)
  await scrollToEl('h2', 'Frequently', 1.8, 90); await wait(0.3)
  await click('button', 'Is my money safe'); await wait(1.0)
  await scrollToEl('h2', 'Ready to grow', 1.6, 120); await wait(1.2)
  await scrollBy(-200000, 1.4); await wait(0.3)
  await click('button[aria-label="Toggle menu"]'); await wait(0.9)
  await click('header nav a', 'Features'); await wait(1.6)
  await scrollBy(700, 1.6); await wait(1.0)
  await scrollBy(-200000, 0.01)
  await click('button[aria-label="Toggle menu"]'); await wait(0.8)
  await click('header nav a', 'Home'); await wait(3.4)
}
ws.close(); proc.kill()
console.log(mode, n, 'frames', (n / FPS).toFixed(1) + 's')
