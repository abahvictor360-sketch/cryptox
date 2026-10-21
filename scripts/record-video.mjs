import { chromium } from 'playwright'
import fs from 'fs'
const [,, mode, outDir] = process.argv
const mobile = mode === 'mobile'
const FPS = 30, DT = 1000 / FPS
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true })
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const ctx = await b.newContext(mobile
  ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)

// warm caches (fonts, assets)
await page.goto('http://localhost:4173/'); await page.waitForTimeout(2500)
await page.goto('http://localhost:4173/nothing'); await page.waitForTimeout(500)
await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' })

let n = 0
const advance = (ms) => new Promise(async (r) => {
  cdp.once('Emulation.virtualTimeBudgetExpired', r)
  await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pauseIfNetworkFetchesPending', budget: ms })
})
const frame = async () => {
  await advance(DT)
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90 })
  fs.writeFileSync(`${outDir}/f${String(n++).padStart(5, '0')}.jpg`, Buffer.from(data, 'base64'))
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
const setCursor = (x, y) => mobile ? null : page.evaluate(([x, y]) => { const c = document.getElementById('__cur'); if (c) c.style.transform = `translate(${x - 4}px,${y - 2}px)` }, [x, y])
const moveTo = async (x, y, s = 0.6) => {
  const x0 = mx, y0 = my, k = Math.max(1, Math.round(s * FPS))
  for (let i = 1; i <= k; i++) {
    const t = ease(i / k); mx = x0 + (x - x0) * t; my = y0 + (y - y0) * t
    await page.mouse.move(mx, my); await setCursor(mx, my); await frame()
  }
}
const rectOf = (sel, text) => page.evaluate(([sel, text]) => {
  const els = [...document.querySelectorAll(sel)].filter((e) => (!text || e.textContent.trim().includes(text)) && e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden')
  const e = els.find((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight }) || els[0]
  if (!e) return null
  const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top }
}, [sel, text])
const ripple = (x, y) => page.evaluate(([x, y]) => {
  const r = document.getElementById('__rip'); if (!r) return
  r.style.left = x + 'px'; r.style.top = y + 'px'
  r.animate([{ opacity: 1, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 500, easing: 'ease-out' })
}, [x, y])
const click = async (sel, text, s = 0.7) => {
  const r = await rectOf(sel, text); if (!r) throw new Error('not found ' + sel + ' ' + text)
  if (!mobile) await moveTo(r.x, r.y, s); else { mx = r.x; my = r.y; await wait(0.25) }
  await ripple(r.x, r.y)
  await page.mouse.click(r.x, r.y)
  await wait(0.15)
}
const scrollBy = async (dy, s) => {
  const y0 = await page.evaluate(() => scrollY), k = Math.round(s * FPS)
  for (let i = 1; i <= k; i++) { await page.evaluate((y) => scrollTo(0, y), y0 + dy * ease(i / k)); await frame() }
}
const scrollToEl = async (sel, text, s, offset = 120) => { const r = await rectOf(sel, text); await scrollBy(r.top - offset, s) }
const top = () => page.evaluate(() => scrollTo(0, 0))

// --- Go ---
await page.evaluate(() => history.pushState({}, '', '/'))
await page.evaluate(() => window.dispatchEvent(new PopStateEvent('popstate')))
await page.goto('http://localhost:4173/').catch(() => {})
await page.evaluate(CURSOR)
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
await b.close()
console.log(mode, n, 'frames', (n / FPS).toFixed(1) + 's')
