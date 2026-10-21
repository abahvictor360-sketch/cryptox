import { motion } from 'framer-motion'

type Props = { points: number[]; color?: string; width?: number; height?: number }

export function toPath(points: number[], width: number, height: number) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const step = width / (points.length - 1)
  return points
    .map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / (max - min || 1)) * (height - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function Sparkline({ points, color = '#fff', width = 56, height = 18 }: Props) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <motion.path
        d={toPath(points, width, height)}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
    </svg>
  )
}
