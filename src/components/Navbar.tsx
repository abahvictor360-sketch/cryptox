import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { NAV } from '../lib/data'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-ink/70 backdrop-blur-xl' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />

        <nav className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end className="relative rounded-full px-4 py-1.5 text-sm">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="btn-brand absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="glass hidden rounded-full px-4 py-2 text-xs font-medium transition hover:border-brand/60 md:inline-block"
        >
          Open Business Account
        </Link>

        <button aria-label="Toggle menu" className="glass rounded-lg p-2 md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-ink/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {[...NAV, { label: 'Open Business Account', to: '/contact' }].map((item, i) => (
                <motion.div key={item.to} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand/15 text-brand-2' : 'text-white/80'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
