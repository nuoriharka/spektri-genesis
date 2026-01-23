---
name: "feat(app-shell): AppFrame + Header/Sidebar/Breadcrumb"
about: "App shell with header, sidebar, page header and breadcrumb; responsive with active-route highlight."
title: "feat(app-shell): AppFrame + Header/Sidebar/Breadcrumb"
labels: ["copilot"]
assignees: ""
---

## Summary
- Miksi: Peruskehto kaikelle; yhtenäinen navigaatio ja sisältöalue.
- Shadcn: breadcrumb, navigation-menu, separator, sheet, scroll-area, button, avatar

## Paths
- `src/app/layout.tsx`
- `src/components/app/AppFrame.tsx`
- `src/components/app/Sidebar.tsx`
- `src/components/app/Header.tsx`
- `src/components/app/PageHeader.tsx`

## Acceptance Criteria
- [ ] Sivupalkki ja header toimivat mobiilissa (sheet) ja desktopissa.
- [ ] Breadcrumb näkyy kaikilla sovellussivuilla, ei markkinointisivuilla.
- [ ] Active-route korostus sidebarissa.

## Copilot prompt
```
Toteuta AppFrame header+sidebar+pageheader. Käytä shadcn: breadcrumb, navigation-menu, sheet, scroll-area. Älä lisää uusia riippuvuuksia. Diff ≤ 180 riviä.
```

## Plan
- [ ] Rakenna AppFrame ja kytke se root-layoutiin.
- [ ] Lisää header + sidebar + breadcrumb.
- [ ] Implementoi responsive sheet mobiilille ja active-route highlight.
- [ ] Savusta toimivuus kahdella reitillä.
