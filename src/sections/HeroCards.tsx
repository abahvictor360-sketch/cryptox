import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownUp, Bell, ChevronDown, Maximize2, Menu, Pause, Play, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sparkline from '../components/Sparkline'
import { MARKETS } from '../lib/data'

const BALANCE_LINE = [30, 52, 38, 64, 44, 70, 50, 78, 46, 60, 40, 55]
const SPARKS = [
  [5, 8, 6, 9, 7, 11, 9, 12],
  [9, 7, 10, 6, 8, 7, 9, 6],
  [4, 6, 5, 8, 9, 8, 11, 13],
]

function useTickingPrices(paused: boolean) {
  const [prices, setPrices] = useState(MARKETS.map((m) => m.price))
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setPrices((ps) => ps.map((p) => +(p * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)))
    }, 1800)
    return () => clearInterval(id)
  }, [paused])
  return prices
}

const card = {
  hidden: { opacity: 0, y: 60, rotateX: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 1.1 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

function MarketsCard() {
  const reduceMotion = useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  // Live ticking stays off for reduced-motion users; everyone else can pause it
  const paused = userPaused || !!reduceMotion
  const prices = useTickingPrices(paused)
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">Markets</span>
        <div className="flex items-center gap-3">
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Resume live prices' : 'Pause live prices'}
              className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/80 ring-1 ring-line hover:text-white"
            >
              {userPaused ? <Play size={11} /> : <Pause size={11} />}
            </button>
          )}
          <Link to="/features" className="text-xs text-brand">See All</Link>
        </div>
      </div>
      <div className="space-y-2">
        {MARKETS.map((m, i) => (
          <div
            key={m.sym}
            className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${i === 1 ? 'bg-white/8 ring-1 ring-line' : ''}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `${m.color}33` }}>
              <span className="h-3 w-3 rounded-full" style={{ background: m.color }} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium">{m.sym}</div>
              <div className={`text-[10px] ${m.change >= 0 ? 'text-emerald-400' : 'text-brand'}`}>
                {m.change >= 0 ? '+' : ''}
                {m.change}%
              </div>
            </div>
            <Sparkline points={SPARKS[i]} />
            <div className="min-w-[4.75rem] shrink-0 text-right">
              <motion.div
                key={prices[i]}
                initial={{ color: '#ff7a3d' }}
                animate={{ color: '#ffffff' }}
                transition={{ duration: 0.8 }}
                className="text-xs font-medium tabular-nums"
              >
                ${prices[i].toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </motion.div>
              <div className="text-[10px] text-muted">0.244 BTC</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BalanceCard() {
  const tabs = ['Home', 'Leverage', 'Earn', 'NFT']
  const [tab, setTab] = useState('Home')
  const w = 220
  const h = 80
  const step = w / (BALANCE_LINE.length - 1)
  const d = BALANCE_LINE.map((p, i) => `${i ? 'L' : 'M'}${i * step},${h - p}`).join(' ')
  const lastX = (BALANCE_LINE.length - 1) * step
  const lastY = h - BALANCE_LINE[BALANCE_LINE.length - 1]
  return (
    <div className="glass rounded-2xl p-4 md:-mt-6 md:pb-6">
      <div className="mb-4 flex items-center justify-between text-white/80">
        <Menu size={16} />
        <div className="flex gap-3">
          <Wallet size={15} />
          <Bell size={15} />
        </div>
      </div>
      <div className="relative mb-5 flex rounded-full bg-black/40 p-1 text-[11px]">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="relative flex-1 rounded-full py-1.5">
            {tab === t && (
              <motion.span layoutId="balance-tab" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-line" />
            )}
            <span className={`relative ${tab === t ? 'text-white' : 'text-muted'}`}>{t}</span>
          </button>
        ))}
      </div>
      <div className="text-2xl font-semibold">
        $15,432.75 <span className="text-xs font-normal text-muted">USD</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-24 w-full overflow-visible">
        <motion.path
          d={d}
          fill="none"
          stroke="#fff"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.6, duration: 2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={lastX}
          cy={lastY}
          r={4}
          fill="#050505"
          stroke="#fff"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ delay: 3.2, duration: 0.6 }}
        />
      </svg>
      <div className="mt-4 flex items-center justify-between text-[11px]">
        <span className="text-muted">Total Balance</span>
        <span>
          +$432.49 <span className="text-brand">(+12%)</span>
        </span>
      </div>
    </div>
  )
}

function ExchangeCard() {
  const [flipped, setFlipped] = useState(false)
  const rows = [
    { sym: 'BTA', val: '40.679', sub: '67.143', color: '#6b8cff' },
    { sym: 'NBX', val: '1230.365', sub: '90.143', color: '#ff5a1f' },
  ]
  const ordered = flipped ? [...rows].reverse() : rows
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">Crypto Exchange</span>
        <Maximize2 size={13} className="text-muted" />
      </div>
      <div className="mb-3 flex items-center gap-3 text-[11px]">
        <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-line">USDETH</span>
        <span className="text-muted">Dollar $ · 24 Hz</span>
      </div>
      <div className="relative space-y-2">
        {ordered.map((r) => (
          <motion.div
            layout
            key={r.sym}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-3 ring-1 ring-line"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="h-3 w-3 rounded-full" style={{ background: r.color }} />
              {r.sym} <ChevronDown size={12} className="text-muted" />
            </div>
            <span className="text-sm font-semibold tabular-nums">{r.val}</span>
            <div className="text-right text-[10px] leading-tight text-muted">
              Your {r.sym}
              <div className="text-xs font-medium text-white">{r.sub}</div>
            </div>
          </motion.div>
        ))}
        <motion.button
          aria-label="Swap"
          onClick={() => setFlipped((f) => !f)}
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: flipped ? 180 : 0 }}
          className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-panel-2 ring-1 ring-line"
        >
          <ArrowDownUp size={12} />
        </motion.button>
      </div>
    </div>
  )
}

export default function HeroCards() {
  const cards = [<MarketsCard key="m" />, <BalanceCard key="b" />, <ExchangeCard key="e" />]
  return (
    <div className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-5 [perspective:1200px] md:grid-cols-3 md:items-start">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={card}
          initial="hidden"
          animate="show"
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          {c}
        </motion.div>
      ))}
    </div>
  )
}
