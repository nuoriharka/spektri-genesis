---
name: "feat(seo): Default metadata + OG image"
about: "Ensure default Next metadata and OG image generation is wired"
title: "feat(seo): Default metadata + OG image"
labels: ["copilot"]
assignees: ""
---

## Summary
Lisää Next metadata rootiin ja varmista OG-kuva. Vältä inline-tyylejä liikaa.

## Paths
- `src/app/layout.tsx`
- `src/app/opengraph-image.tsx` (jos puuttuu)

## Acceptance Criteria
- [ ] Oletus `metadata` (title, description, openGraph).
- [ ] OG-image generaatio toimii buildissa.

## Copilot prompt
```
Lisää Next metadata rootiin ja varmista OG-kuva. Vältä inline-tyylejä liikaa.
```

## Plan
- [ ] Lisää metadata-konfiguraatio.
- [ ] Lisää/korjaa OG image route.
- [ ] Rakenna ja tarkista.
