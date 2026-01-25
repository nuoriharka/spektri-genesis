# Creation OS – Copilot instructions for automated coding agents

This repo is a pnpm + Turborepo monorepo with a Next.js 14 App Router app, design tokens, and small internal packages. Follow these rules to keep builds green and changes safe.

## Repo shape
- apps/web – proxy Next.js app that re-exports the root `src/app` during migration (experimental.externalDir enabled).
- src/app – primary App Router code today (RSC-first).
- packages/agents – policy-driven multi‑LLM router (`@creationos/agents`).
- packages/jobs – in‑memory jobs/queue (`@creationos/jobs`).
- public – images/logos/photos/videos; `sw.js` for PWA.
- docs – product/design/a11y guidelines.

Aliases and tools
- TS path alias: `@/*` → project root `src/*`.
- CSS tokens/utilities in `src/app/globals.css` (custom `.hy-*` utilities, `bg-app`, `section-halo`).
- Turbo tasks in `turbo.json`; workspace roots in `pnpm-workspace.yaml`.

## Toolchain
- Node: >= 18.17.x
- Package manager: pnpm (repo sets `packageManager: pnpm@10.13.1`)
- Frameworks/libs: Next.js 14 App Router, React 18, Tailwind, shadcn/ui (selective), Playwright, Jest.

## Golden rules
- Keep diffs small and localized. Do not refactor broadly without explicit request.
- Prefer server components by default; add `"use client"` only when needed.
- Build must stay green after every substantive change.
- Never commit secrets. Read runtime config from env/params only.
- Follow brand/a11y/perf guidance below. Do not remove existing routes or content.

## Build, dev, and tasks
- Whole repo: `pnpm repo:dev` (parallel), `pnpm repo:build`, `pnpm repo:lint`.
- Root app (current): `pnpm dev`, `pnpm build`, `pnpm start`.
- apps/web (proxy): `pnpm --filter @creationos/web dev|build|start`.
- Agents demo: `pnpm agents:demo`.

When adding scripts for packages, mirror them via Turbo (build → dist or .next, test → test-results).

## Next.js conventions
- Images: use `next/image` with static imports where possible. Provide `alt`, `sizes`, and consider `priority`/`fetchPriority="high"` for LCP.
- Fonts: use `next/font` (already configured). Do not add custom <link> fonts.
- Dynamic import: use for heavy, below-the-fold components with `ssr: false` only if necessary.
- Caching headers are set in `next.config.js`. Don’t regress them.
- Avoid `fs` or server-only APIs in client components. Mark server code with `export const dynamic = ...` only when you understand the effect.

## Styling and tokens
- Tailwind + custom tokens. Reuse `.hy-card`, `.hy-overlay`, `.hy-img`, `.hy-glass`, `bg-app`, `section-halo` utilities from `globals.css`.
- Prefer semantic HTML and accessible patterns (see docs/ACCESSIBILITY_FI.md). Keep focus-visible rings and keyboard order intact.
- Don’t inline large `@apply` blocks; prefer existing utilities or simple CSS variables.

## Accessibility (must‑do)
- Provide meaningful `alt` for images; avoid redundant “image of…”.
- Use correct heading order; ensure one H1 per page.
- Link state: add `aria-current="page"` for active nav items.
- Motion: respect `prefers-reduced-motion`; ensure essential content isn’t motion-gated.
- Focus: ensure focus trapping in dialogs/menus and visible outlines.

## Performance
- Keep First Load JS low: favor RSC, lazy/dynamic heavy client components.
- LCP: prioritize hero media; compress and use `sizes` appropriately.
- Avoid re-renders from props churn; memoize where sensible.
- Use `prefetch={false}` for non-critical links/components if they cause head-of-line blocking.

## PWA
- Manifest at `src/app/manifest.ts` and SW at `public/sw.js` must stay valid. Don’t remove SW registration.
- If editing, verify route `/manifest.webmanifest` builds and install prompt still appears.

## Agents & jobs
- `@creationos/agents`: call `generate(prompt, opts)`; policy from `.spektri/model-policy.json`. Don’t hardcode provider keys or hostnames.
- `@creationos/jobs`: in-memory queue is for demos only—no long-running work in serverless.

## Monorepo patterns
- New packages go under `packages/*` with tsup or equivalent. Export ESM + types.
- Wire tasks in Turbo. Outputs should be `dist/**` (packages) or `.next/**` (apps).
- Keep `externalDir: true` in `apps/web/next.config.js` if importing from root during migration.

## Testing & quality gates
- E2E: Playwright (`tests/`). Unit tests (Jest) where applicable.
- Before pushing a meaningful change: run `pnpm repo:lint` and `pnpm repo:build`.
- If you add new public behavior, add/adjust tests or a minimal smoke check.

## Content & assets
- Put new assets under `public/{images,photos,logos,videos}`. Prefer SVG for logos.
- For raster images, consider adding to ingestion scripts if part of batches.
- Do not hotlink third-party images unless added to `images.remotePatterns`.

## Safe-change cadence (use this when auto-applying changes)
- PLAN: brief intent + files touched.
- DIFF: minimal edits only; ≤ ~200 changed lines per task.
- APPLY: update files, then run a production build.
- Report: PASS/FAIL of Build/Lint/Test and list follow-ups.

## What not to do
- Don’t replace the router, global CSS, or Tailwind config wholesale.
- Don’t add stateful singletons in RSC; use providers intentionally on the client.
- Don’t introduce breaking changes to `@/*` aliases or remove `apps/web` proxy.

## Quick references
- next.config.js – images, headers, ESLint during builds.
- src/app/layout.tsx – fonts, metadata, SW registration, providers.
- src/app/page.tsx – landing assembly with dynamic imports and LCP image.
- src/app/globals.css – tokens and `.hy-*` utilities.

If unsure, prefer the smallest local fix, keep tests green, and document any trade-offs in the PR description.