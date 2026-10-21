export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Why choose', to: '/why-choose' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
]

export const MARKETS = [
  { sym: 'STA', name: 'Stellara', price: 28659.35, change: 1.8, color: '#6b8cff' },
  { sym: 'CHY', name: 'Chainy', price: 28659.35, change: -0.6, color: '#ff5a1f' },
  { sym: 'NXB', name: 'Nexbit', price: 28659.35, change: 2.4, color: '#3fb6ff' },
]

export const TRADERS = [
  { name: 'Robert Brian', amount: '$28,659.35', sub: '13.42 BTC', change: '+1.8%' },
  { name: 'Courtney Henry', amount: '$1,856.20', sub: '120.43 ETH', change: '+2.3%' },
  { name: 'Cody Fisher', amount: '$0.51', sub: '250,000 XRP', change: '-0.3%' },
  { name: 'Darlene Robertson', amount: '$100.75', sub: '15.00 LTC', change: '+1.1%' },
]

export const FEATURES = [
  { title: 'AI Market Signals', body: 'Models trained on order-book depth, on-chain flows and sentiment surface entries before the crowd does.', icon: 'sparkles' },
  { title: 'Advanced Charting', body: 'Multi-timeframe charts, 100+ indicators and drawing tools that stay fast with millions of candles.', icon: 'chart' },
  { title: 'Smart Risk Management', body: 'Automatic stop-loss, position sizing and exposure alerts keep every trade inside your risk budget.', icon: 'shield' },
  { title: 'Instant Exchange', body: 'Swap between 300+ assets at the best route across liquidity venues, with fees shown upfront.', icon: 'swap' },
  { title: 'Multi-Wallet Portfolio', body: 'Connect exchanges and wallets to see balances, P&L and allocation in a single live view.', icon: 'wallet' },
  { title: 'Bank-Grade Security', body: 'Cold storage, MPC key management and 2FA on every withdrawal. Audited quarterly by third parties.', icon: 'lock' },
] as const

export const REASONS = [
  { title: 'Built for teams', body: 'Role-based permissions, shared watchlists and approval flows for treasury and trading desks.' },
  { title: 'Compliance ready', body: 'KYC/AML workflows, audit trails and exportable reports for your accountants and regulators.' },
  { title: 'Always on', body: '99.99% uptime, 24/7 human support and a dedicated account manager for business plans.' },
  { title: 'Transparent pricing', body: 'No hidden spreads. Flat maker/taker fees that drop as your monthly volume grows.' },
]

export const STATS = [
  { value: 2500, suffix: '+', label: 'Organizations onboarded' },
  { value: 48, prefix: '$', suffix: 'B', label: 'Quarterly trading volume' },
  { value: 99.99, suffix: '%', label: 'Platform uptime', decimals: 2 },
  { value: 180, suffix: '+', label: 'Countries supported' },
]

export const TESTIMONIALS = [
  { name: 'Amara Okafor', role: 'CFO, Lumen Logistics', quote: 'We moved our corporate treasury to Cryptox in a quarter. Approvals, reporting and custody all in one place — our auditors love it.' },
  { name: 'Daniel Reyes', role: 'Head of Trading, Northpeak', quote: 'The AI signals are genuinely useful. They don’t replace our desk, they make every trader on it sharper.' },
  { name: 'Sofia Lindqvist', role: 'Founder, Fjord Capital', quote: 'Execution is fast and the fees are honest. Switching from three different tools to one saved us hours every week.' },
  { name: 'Kwame Mensah', role: 'Operations Lead, Paystream', quote: 'Onboarding took days, not months. Support answered every question at 3am like it was 3pm.' },
  { name: 'Lina Haddad', role: 'Portfolio Manager, Atlas DAO', quote: 'Risk dashboards are the best I’ve used. I always know my exposure before the market moves.' },
  { name: 'Marcus Chen', role: 'CTO, Bitwave Labs', quote: 'The API is clean and well documented. We integrated payouts in a single sprint.' },
]

export const FAQS = [
  { q: 'What is Cryptox?', a: 'Cryptox is an AI-optimized crypto trading platform for individuals and businesses. It combines market data, execution, portfolio tracking and risk management in one workspace.' },
  { q: 'Is my money safe on Cryptox?', a: 'Over 95% of assets are kept in cold storage secured with MPC. Every withdrawal requires 2FA, and our infrastructure is audited every quarter by independent security firms.' },
  { q: 'Can my business open an account?', a: 'Yes. Business accounts support multiple users, role-based permissions, approval workflows and exportable reports. Onboarding usually completes within 2–3 business days.' },
  { q: 'What fees do you charge?', a: 'We charge flat maker/taker fees starting at 0.10%, decreasing with 30-day volume. Deposits are free and withdrawal fees are shown before you confirm.' },
  { q: 'Which assets are supported?', a: 'More than 300 crypto assets and stablecoins, with new listings reviewed monthly by our listings committee.' },
  { q: 'Do you offer an API?', a: 'Yes — REST and WebSocket APIs for market data, trading and account management, with sandbox keys available on every plan.' },
]
