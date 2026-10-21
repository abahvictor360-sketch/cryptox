import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ShieldCheck, Trash2 } from 'lucide-react'
import BrandButton from '../components/BrandButton'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { TRADERS } from '../lib/data'

const RANGES = ['1H', '1D', '1W', '1M', '1Y', 'ALL'] as const
const CURVES: Record<(typeof RANGES)[number], string> = {
  '1H': 'M0,90 C30,40 50,20 70,60 S110,130 140,80 S190,20 220,50 S270,60 300,30 S340,70 360,40 L360,160 L0,160 Z',
  '1D': 'M0,60 C30,20 60,30 80,90 S120,140 150,70 S190,10 220,40 S260,70 290,35 S330,20 360,60 L360,160 L0,160 Z',
  '1W': 'M0,100 C40,90 60,40 90,50 S140,110 170,90 S210,20 240,30 S290,90 320,60 S350,30 360,20 L360,160 L0,160 Z',
  '1M': 'M0,50 C30,60 60,100 90,110 S140,40 170,30 S220,80 250,70 S300,20 330,40 S350,60 360,50 L360,160 L0,160 Z',
  '1Y': 'M0,120 C40,110 70,90 100,80 S150,70 180,60 S230,40 260,45 S310,30 330,20 S350,15 360,10 L360,160 L0,160 Z',
  ALL: 'M0,140 C40,135 80,120 110,110 S160,90 190,80 S240,60 270,50 S320,30 340,20 S355,10 360,5 L360,160 L0,160 Z',
}

function AreaChart() {
  const [range, setRange] = useState<(typeof RANGES)[number]>('1D')
  return (
    <div className="glass rounded-2xl p-5">
      <svg viewBox="0 0 360 160" className="h-44 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ff5a1f" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={CURVES[range]}
          animate={{ d: CURVES[range] }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          fill="url(#area)"
          stroke="#ff7a3d"
          strokeWidth={2}
        />
      </svg>
      <div className="mt-4 flex justify-between text-[11px]">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded px-2 py-0.5 transition ${r === range ? 'bg-brand/15 text-brand' : 'text-muted hover:text-white'}`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-muted">Your balance</span>
        <span className="rounded-full border border-line px-3 py-1.5 tabular-nums">0.000000 ETH</span>
      </div>
    </div>
  )
}

function TradersCard() {
  return (
    <div className="glass h-full rounded-3xl p-6">
      <div className="space-y-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line">
        {TRADERS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className={`flex w-[85%] items-center gap-3 rounded-xl bg-panel-2 px-3 py-2.5 ring-1 ring-line ${i % 2 ? 'ml-auto' : ''}`}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-2 to-brand text-xs font-semibold">
              {t.name.split(' ').map((n) => n[0]).join('')}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium">{t.name}</div>
              <div className={`text-[10px] ${t.change.startsWith('-') ? 'text-brand' : 'text-emerald-400'}`}>{t.change}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold">{t.amount}</div>
              <div className="text-[10px] text-muted">{t.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <h3 className="mt-6 text-lg font-semibold">Advanced Charting &amp; Analytics</h3>
      <p className="mt-1 text-sm text-muted">Follow top traders, mirror their strategies and analyze every move with real-time data.</p>
    </div>
  )
}

function RiskCard() {
  return (
    <div className="glass h-full rounded-3xl p-6">
      <div className="relative h-[260px] overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-line">
        <div className="absolute inset-x-6 top-6 flex justify-between gap-4">
          {[Lock, Trash2].map((Icon, i) => (
            <div key={i} className="flex flex-1 items-center justify-between rounded-xl bg-panel-2 px-3 py-2.5 ring-1 ring-line">
              <div className="space-y-1.5">
                <div className="h-1.5 w-16 rounded bg-white/20" />
                <div className="h-1.5 w-10 rounded bg-white/10" />
              </div>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand">
                <Icon size={12} />
              </span>
            </div>
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 260" fill="none">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${80 + i * 20},80 V${150 - i * 8} H${200 - 30 + i * 0}`}
              stroke="rgba(255,255,255,0.15)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={`r${i}`}
              d={`M${320 - i * 20},80 V${150 - i * 8} H${230}`}
              stroke="rgba(255,255,255,0.15)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/50"
              animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            />
          ))}
          <div className="btn-brand relative grid h-16 w-16 place-items-center rounded-full">
            <ShieldCheck size={28} />
          </div>
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold">Smart Risk Management</h3>
      <p className="mt-1 text-sm text-muted">Automated stop-loss, exposure limits and real-time alerts protect your capital 24/7.</p>
    </div>
  )
}

export default function FeatureShowcase() {
  return (
    <section className="px-4 py-20">
      <SectionHeading
        title={<>Powerful Features<br />For Smarter Crypto Trading</>}
        subtitle="AI-optimized trading for business teams, with human-grade decision-making."
      />
      <div className="mx-auto max-w-5xl space-y-5">
        <Reveal>
          <div className="glass relative grid items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 md:grid-cols-2">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h3 className="text-3xl font-semibold leading-tight tracking-tight">
                Tools For Better
                <br />
                Cryptocurrency Trading
              </h3>
              <p className="mt-3 max-w-xs text-sm text-muted">
                Smart platforms designed to help you analyze markets and make informed decisions.
              </p>
              <div className="mt-6">
                <BrandButton>Get Started</BrandButton>
              </div>
            </div>
            <AreaChart />
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}><TradersCard /></Reveal>
          <Reveal delay={0.15}><RiskCard /></Reveal>
        </div>
      </div>
    </section>
  )
}
