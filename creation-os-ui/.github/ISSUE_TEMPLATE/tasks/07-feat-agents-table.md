---
name: "feat(agents-list): DataTable (search+filter+pagination)"
about: "AgentsTable with shadcn table and toolbar controls using mock data"
title: "feat(agents-list): Agents DataTable (search+filter+pagination)"
labels: ["copilot"]
assignees: ""
---

## Summary
Rakenna AgentsTable shadcn table + toolbar (input, select). Luo mock-data ja client-side filtteri/sivutus.

## Paths
- `src/app/app/agents/page.tsx`
- `src/components/agents/AgentsTable.tsx`

## Acceptance Criteria
- [ ] Haku (nimi), suodatin (status), sivutus.
- [ ] Mock-data localisti.

## Copilot prompt
```
Rakenna AgentsTable shadcn table + toolbar (input, select). Luo mock-data ja client-side filtteri/sivutus.
```

## Plan
- [ ] Luo mock-data ja tilahallinta.
- [ ] Rakenna taulukko ja toolbar.
- [ ] Lisää sivutuslogiikka.
