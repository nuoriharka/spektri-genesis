# Perf AAAA runbook

This repo is tuned for Next.js App Router + Tailwind + shadcn/ui. The perf pass focuses on:

- Fonts via `next/font` with subset + swap + fallbacks.
- LCP hero: static import, priority + fetchPriority, exact sizes.
- Code-splitting: dynamic for below-the-fold sections.
- Client surface: move components to server when possible.
- Prefetch strategy: prefetch={false} for non-critical links.
- Motion: passive listeners, reduced-motion cuts DOM work.
- Caching: strong immutable headers for static and images.
- CI: Lighthouse CI with budgets for LCP/TBT/CLS.

How to validate locally

- pnpm build
- pnpm start
- npx @lhci/cli autorun --config=./lighthouserc.json

Budgets (mobile)

- LCP ≤ 2.5s (target ≤ 2.0s)
- TBT ≤ 150ms (target ≤ 100ms)
- CLS ≤ 0.02
- First Load JS ≤ 180 kB

Notes

- Logo cloud renders all SVGs from `/public/logos` via `src/data/logos.ts`.
- Update the manifest when adding/removing logos.
