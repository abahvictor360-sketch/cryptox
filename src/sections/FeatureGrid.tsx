import { motion } from 'framer-motion'
import { ArrowLeftRight, BarChart3, Lock, ShieldCheck, Sparkles, Wallet } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { FEATURES } from '../lib/data'

const ICONS = { sparkles: Sparkles, chart: BarChart3, shield: ShieldCheck, swap: ArrowLeftRight, wallet: Wallet, lock: Lock }

export default function FeatureGrid() {
  return (
    <section className="px-4 py-20">
      <SectionHeading eyebrow="Everything you need" title="One platform for your entire trading operation" />
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon]
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-colors duration-500 group-hover:bg-brand/30" />
              <span className="btn-brand mb-5 grid h-10 w-10 place-items-center rounded-xl">
                <Icon size={18} />
              </span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
