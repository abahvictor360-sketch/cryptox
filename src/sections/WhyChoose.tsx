import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { REASONS } from '../lib/data'

const ROADMAP = [
  { q: 'Week 1–2', t: 'Onboarding & KYB', d: 'Verify your business, invite your team and set roles.' },
  { q: 'Week 3–6', t: 'Integrate', d: 'Connect wallets, exchanges and accounting via API.' },
  { q: 'Week 7–10', t: 'Automate', d: 'Enable AI signals, risk limits and approval workflows.' },
  { q: 'Week 11–13', t: 'Scale', d: 'Quarterly review with your account manager and optimise fees.' },
]

export default function WhyChoose() {
  return (
    <section className="px-4 py-20">
      <SectionHeading
        eyebrow="Why choose Cryptox"
        title="Built for businesses that move fast"
        subtitle="Go from sign-up to a fully automated crypto desk in a single quarter."
      />
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="space-y-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="glass flex gap-4 rounded-2xl p-5">
                <span className="btn-brand grid h-7 w-7 shrink-0 place-items-center rounded-full">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="glass relative rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Your first quarter with Cryptox</h3>
            <div className="relative mt-6">
              <motion.div
                className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-brand to-transparent"
                style={{ height: 'calc(100% - 16px)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <ol className="space-y-7">
                {ROADMAP.map((s, i) => (
                  <motion.li
                    key={s.t}
                    className="relative pl-10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.25 }}
                  >
                    <span className="absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-ink ring-2 ring-brand">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                    </span>
                    <div className="text-xs text-brand-2">{s.q}</div>
                    <div className="font-medium">{s.t}</div>
                    <div className="text-sm text-muted">{s.d}</div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
