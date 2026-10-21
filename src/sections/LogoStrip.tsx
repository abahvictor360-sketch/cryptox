import { Hexagon } from 'lucide-react'
import Reveal from '../components/Reveal'

const LOGOS = ['Logoipsum', 'Northpeak', 'Lumen', 'Paystream', 'Fjord', 'Atlas', 'Bitwave', 'Quanta']

export default function LogoStrip() {
  return (
    <section className="px-4 py-14">
      <Reveal>
        <p className="mb-8 text-center text-xs text-muted">
          Simplifying Blockchain Workflows For <span className="font-semibold text-white">2,500+ Organizations</span>.
        </p>
      </Reveal>
      <div className="relative mx-auto max-w-4xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-14">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-lg font-semibold text-white/50">
              <Hexagon size={20} fill="currentColor" />
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
