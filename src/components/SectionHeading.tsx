import Reveal from './Reveal'

type Props = { eyebrow?: string; title: React.ReactNode; subtitle?: string }

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-brand-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-gradient text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted">{subtitle}</p>}
    </Reveal>
  )
}
