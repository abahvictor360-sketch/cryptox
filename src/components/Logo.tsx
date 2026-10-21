import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="h-7 w-7" />
      <span className="text-lg">Cryptox</span>
    </Link>
  )
}
