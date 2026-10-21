# Cryptox

Marketing site for **Cryptox**, an AI-optimized crypto trading platform for businesses.
Built with React, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero with animated vortex & live cards, logo marquee, features, stats, why-choose, testimonials, FAQ, CTA |
| `/features` | Feature grid + interactive chart showcase |
| `/why-choose` | Stats counters, reasons, first-quarter onboarding roadmap |
| `/testimonials` | Customer stories |
| `/faq` | Accordion FAQ |
| `/contact` | Business account request form |

## Motion

Word-by-word hero reveal, rotating vortex with scroll parallax, floating partner pills, 3D card entrance,
ticking market prices, morphing area chart (click 1H…ALL), swap animation, pulsing risk shield,
scroll reveals, animated counters, sliding nav pill and page transitions. Respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev
npm run build
```

## Deploy

`vercel.json` configures the Vite build and SPA rewrites. Import the repo in Vercel (or run `npx vercel --prod`).
