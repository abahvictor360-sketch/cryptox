import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV } from '../lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">
            AI-optimized crypto trading for teams and individuals. Trade smarter, manage risk and grow your business.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium">Get in touch</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="mailto:hello@cryptox.app" className="hover:text-white">hello@cryptox.app</a></li>
            <li><Link to="/contact" className="hover:text-white">Contact sales</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Cryptox. All rights reserved. Crypto assets are volatile; trade responsibly.
      </div>
    </footer>
  )
}
