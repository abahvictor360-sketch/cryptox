import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-40 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4 inline-block rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-brand-2"
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="text-gradient relative mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="relative mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base"
      >
        {subtitle}
      </motion.p>
    </section>
  )
}
