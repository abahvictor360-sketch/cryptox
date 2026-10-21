import { motion, useScroll, useTransform } from 'framer-motion'
import BrandButton from '../components/BrandButton'
import HeroCards from './HeroCards'

const PILLS = [
  { label: 'Bitora', className: 'left-[4%] top-[18%]', delay: 0 },
  { label: 'Chainly', className: 'left-[10%] top-[32%]', delay: 0.6 },
  { label: 'Coinza', className: 'right-[4%] top-[18%]', delay: 0.3 },
  { label: 'Nexbit', className: 'right-[10%] top-[32%]', delay: 0.9 },
]

const words = ['Step', 'Into', 'The', 'Future', 'Of']

export default function Hero() {
  const { scrollY } = useScroll()
  const vortexY = useTransform(scrollY, [0, 600], [0, 160])
  const vortexOpacity = useTransform(scrollY, [0, 600], [1, 0.3])

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:pt-36">
      {/* Animated vortex */}
      <motion.div
        style={{ y: vortexY, opacity: vortexOpacity }}
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[900px] w-[900px] -translate-x-1/2 sm:h-[1100px] sm:w-[1100px]"
      >
        <div className="absolute inset-[20%] rounded-full bg-brand/30 blur-[120px]" />
        <motion.div
          className="vortex absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="vortex-arc absolute rounded-full opacity-70 blur-[2px]"
            style={{ inset: `${8 + i * 7}%` }}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 18 + i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div className="absolute inset-[30%] rounded-full bg-ink blur-[60px]" />
      </motion.div>

      {/* Floating partner pills */}
      {PILLS.map((p) => (
        <motion.div
          key={p.label}
          className={`glass absolute z-10 hidden items-center gap-2 rounded-full py-1.5 pl-3 pr-1.5 text-sm text-white/80 lg:flex ${p.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.8 + p.delay, duration: 0.6 },
            scale: { delay: 0.8 + p.delay, duration: 0.6 },
            y: { delay: p.delay, duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {p.label}
          <span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-white/10">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-white/70" />
          </span>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-[2rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </span>
          <motion.span
            className="block bg-gradient-to-r from-white via-[#ffd2bf] to-white bg-[length:200%_auto] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, backgroundPosition: ['0% center', '200% center'] }}
            transition={{
              opacity: { delay: 0.65, duration: 0.8 },
              y: { delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              backgroundPosition: { duration: 6, repeat: Infinity, ease: 'linear' },
            }}
          >
            Crypto Trading
          </motion.span>
        </h1>
        <motion.p
          className="mx-auto mt-5 max-w-md text-sm text-white/70 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          AI-optimized trading for business teams, with human-grade decision-making.
        </motion.p>
        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <BrandButton>Get Started</BrandButton>
        </motion.div>
      </div>

      <HeroCards />
    </section>
  )
}
