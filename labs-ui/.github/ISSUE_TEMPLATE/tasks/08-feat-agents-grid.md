---
name: "feat(agents-grid): Card-näkymä + list/grid -vaihto"
about: "Add AgentsGrid with Card components and a view toggle persisted in query param"
title: "feat(agents-grid): Card-näkymä + lista-grid -vaihto"
labels: ["copilot"]
assignees: ""
---

## Summary
Lisää list/grid toggle ja toteuta AgentsGrid Card-komponenteilla. Muista query-parametri `view=list|grid`.

## Paths
- `src/components/agents/AgentsGrid.tsx`
- Toolbar toggle sijoitus agents pageen

## Acceptance Criteria
- [ ] Toggle List/Grid.
- [ ] Tila muistetaan query-parametrissa `view=list|grid`.

## Copilot prompt
```
Lisää list/grid toggle ja toteuta AgentsGrid Card-komponenteilla.
```

## Plan
- [ ] Tee grid-komponentti.
- [ ] Lisää toggle + URL-synkronointi.
- [ ] Smoke test.
