import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { FAQS } from '../lib/data'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="px-4 py-20">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`glass rounded-2xl transition-colors ${isOpen ? 'border-brand/40' : ''}`}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={isOpen ? 'text-brand' : 'text-muted'}>
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
