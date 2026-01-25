# Visual AAA pass

Summary of visual, a11y, and UX refinements applied to the landing page.

Changes
- Header & navigation
  - Single desktop and mobile nav; fixed header height; soft background to avoid hero flash.
  - Mobile menu focus trap and ESC-to-close; improved ARIA semantics.
- Typography
  - One H1; unified H2/H3 rhythm; consistent kicker badges; balanced headings.
- Grid and rhythm
  - Unified container paddings (px-4 md:px-6) and vertical spacing.
- Card/image standard
  - rounded-2xl, border-zinc-800, bg-black/40, shadow-none, gentle overlays; reduced glow/beam noise.
- Section 2
  - De-duplicated captions; unified chips; motion limited and reduced-motion-safe.
- Section 3
  - Matrix banner priority; tuned overlays; brand wall as single row; collage hover harmonized.
- Buttons & chips
  - Utilities: .btn-primary, .btn-secondary, .focus-ring, .chip; consistent focus/contrast/hit targets.
- Motion & A11y
  - Micro-interactions toned; prefers-reduced-motion respected across hover/scale.
- Design tokens
  - --radius-xl, --card-bg, --card-border, --overlay-start, --overlay-end, --ring in globals.
- Images
  - Static imports + blur + sizes across Hero, Section 2 & 3; Matrix priority for LCP.

Validation
- Production build: green (Next.js 14 App Router).
- Static image pipeline enabled for LCP and above-the-fold assets.

Risks
- Minor layout shifts due to container padding normalization.
- New utilities in globals.css; ensure no conflicts with component library.

Rollback
- Revert the following commits in order (or squash revert):
  - fix(visuaali): unify header nav + sticky height, focus trap + esc
  - refactor(visuaali): unify typographic scale and kickers
  - refactor(visuaali): unify container paddings and vertical rhythm
  - refactor(visuaali): unify card/image radius, borders, overlays; tone down glow and beams
  - feat(visuaali-section2): cohesive tiles + captions
  - feat(visuaali-section3): matrix banner + brand wall polish
  - refactor(ui): unify buttons and chips + focus rings
  - feat(a11y): consistent micro-interactions + reduced-motion
  - fix(a11y): focus outlines, contrast, hit targets
  - chore(design-tokens): centralize visual tokens

Follow-ups
- Add Lighthouse CI to GitHub Actions for mobile runs on each push.
- Optional: Pa11y CI for accessibility regressions.
