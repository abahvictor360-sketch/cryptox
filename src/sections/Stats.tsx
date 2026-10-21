import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import { STATS } from '../lib/data'

export default function Stats() {
  return (
    <section className="px-4 py-16">
      <div className="glass mx-auto grid max-w-5xl gap-8 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="text-4xl font-semibold tracking-tight text-brand-2">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
