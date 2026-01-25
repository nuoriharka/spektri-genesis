---
name: "feat(tokens): Design-tokenit + Tailwind-teema"
about: "Add CSS variables as design tokens and mirror them in Tailwind theme.extend.colors"
title: "feat(tokens): Design-tokenit + Tailwind-teema"
labels: ["copilot"]
assignees: ""
---

## Summary
Lisää design-tokenit globals.css:ään ja kytke ne tailwind.config.ts:ään.

## Paths
- `src/styles/globals.css`
- `tailwind.config.ts`

## Acceptance Criteria
- [ ] CSS-varit: `--bg,--panel,--fg,--muted,--brand,--brand-2,--success,--warning,--danger,--ring`.
- [ ] Tailwind `theme.extend.colors` peilaa samoja arvoja.
- [ ] Ei riko olemassa olevia luokkia.

## Copilot prompt
```
Lisää design-tokenit globals.css:ään ja kytke ne tailwind.config.ts:ään. Älä riko olemassa olevia luokkia.
```

## Plan
- [ ] Lisää CSS-variablen deklaroinnit.
- [ ] Päivitä tailwind.config.ts peilaamaan arvot.
- [ ] Rakenteellinen smoke: yksi sivu renderöityy oikein.
