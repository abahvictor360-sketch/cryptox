import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { TESTIMONIALS } from '../lib/data'

export default function Testimonials({ limit }: { limit?: number }) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS
  return (
    <section className="px-4 py-20">
      <SectionHeading eyebrow="Testimonials" title="Trusted by teams worldwide" subtitle="Here's what our customers say about trading with Cryptox." />
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (i % 3) * 0.12, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="glass flex flex-col rounded-2xl p-6"
          >
            <div className="mb-4 flex gap-0.5 text-brand">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={14} fill="currentColor" />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-white/85">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-2 to-brand text-xs font-semibold">
                {t.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
