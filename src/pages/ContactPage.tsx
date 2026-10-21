import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, MessageSquare, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const field = 'w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand/60 focus:bg-white/[0.07]'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n')
    window.location.href = `mailto:hello@cryptox.app?subject=${encodeURIComponent('Business account enquiry')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Open your business account"
        subtitle="Tell us about your company and we'll have you trading within the quarter — usually within days."
      />
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {[
              { Icon: Mail, t: 'Email', d: 'hello@cryptox.app' },
              { Icon: Phone, t: 'Sales', d: 'Mon–Fri, 9am–6pm' },
              { Icon: MessageSquare, t: 'Live chat', d: '24/7 for all customers' },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="glass flex items-center gap-4 rounded-2xl p-5">
                <span className="btn-brand grid h-10 w-10 place-items-center rounded-xl"><Icon size={18} /></span>
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="text-sm text-muted">{d}</div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <CheckCircle2 className="mx-auto text-brand" size={48} />
                    <h3 className="mt-4 text-xl font-semibold">Thanks! We'll be in touch.</h3>
                    <p className="mt-2 text-sm text-muted">Your email app should have opened with your details.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                    <input required name="name" placeholder="Full name" className={field} />
                    <input required name="email" type="email" placeholder="Work email" className={field} />
                    <input required name="company" placeholder="Company" className={`${field} sm:col-span-2`} />
                    <select name="volume" className={`${field} sm:col-span-2`} defaultValue="">
                      <option value="" disabled>Expected quarterly volume</option>
                      <option>Under $100k</option>
                      <option>$100k – $1M</option>
                      <option>$1M – $10M</option>
                      <option>$10M+</option>
                    </select>
                    <textarea name="message" rows={4} placeholder="How can we help?" className={`${field} sm:col-span-2`} />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-brand rounded-xl py-3 text-sm font-medium sm:col-span-2"
                    >
                      Request access
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
