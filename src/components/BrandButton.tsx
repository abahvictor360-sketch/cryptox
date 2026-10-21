import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function BrandButton({ to = '/contact', children }: { to?: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link to={to} className="btn-brand group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium">
        {children}
        <span className="grid h-5 w-5 place-items-center rounded bg-white text-brand transition-transform group-hover:translate-x-0.5">
          <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      </Link>
    </motion.div>
  )
}
