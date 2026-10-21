import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

type Props = { value: number; prefix?: string; suffix?: string; decimals?: number }

export default function Counter({ value, prefix = '', suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
