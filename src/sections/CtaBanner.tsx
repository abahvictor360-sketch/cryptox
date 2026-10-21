import { motion } from 'framer-motion'
import BrandButton from '../components/BrandButton'
import Reveal from '../components/Reveal'

export default function CtaBanner() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-16 text-center">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-full h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <h2 className="text-gradient relative text-3xl font-semibold tracking-tight sm:text-5xl">
            Ready to grow your business
            <br />
            with crypto this quarter?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm text-muted">
            Open a business account in minutes. Our team will get you trading within days.
          </p>
          <div className="relative mt-8">
            <BrandButton>Open Business Account</BrandButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
