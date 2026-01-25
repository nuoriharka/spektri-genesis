---
name: "feat(a11y): SkipLink + FocusRing + ReduceMotion"
about: "Add SkipLink component, improve focus ring, and honor prefers-reduced-motion"
title: "feat(a11y): SkipLink + FocusRing + ReduceMotion"
labels: ["copilot"]
assignees: ""
---

## Summary
Lisää SkipLink, paranna focus-ring, lisää reduce motion -tuki. Ei rikota ulkoasua.

## Paths
- `src/app/layout.tsx`
- `src/styles/globals.css`
- `src/components/a11y/SkipLink.tsx`

## Acceptance Criteria
- [ ] “Skip to content” linkki toimii näppäimistöllä.
- [ ] Focus ring näkyy ja kontrasti AA.
- [ ] `prefers-reduced-motion` rajoittaa isot animaatiot.

## Copilot prompt
```
Lisää SkipLink, paranna focus-ring, lisää reduce motion -tuki. Ei rikota ulkoasua.
```

## Plan
- [ ] Tee komponentti ja lisää layoutiin.
- [ ] Päivitä CSS tokenit ringille.
- [ ] Lisää reduce-motion media queryt.
