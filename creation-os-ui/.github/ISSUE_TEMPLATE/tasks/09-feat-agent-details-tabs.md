---
name: "feat(agent-details): Reittirakenne & Tabs"
about: "Create agent subroutes and Tabs with breadcrumb updating to agent name"
title: "feat(agent-details): Reittirakenne & Tabs"
labels: ["copilot"]
assignees: ""
---

## Summary
Luo agentin alireitit ja Tabs-komponentti. Lisää breadcrumb ‘Agents / {name}’ (mock). 

## Paths
- `src/app/app/agents/[id]/(overview)/page.tsx`
- `src/app/app/agents/[id]/builder/page.tsx`
- `src/app/app/agents/[id]/runs/page.tsx`
- `src/app/app/agents/[id]/logs/page.tsx`
- `src/app/app/agents/[id]/settings/page.tsx`
- `src/components/agents/AgentTabs.tsx`

## Acceptance Criteria
- [ ] Tabit: Overview | Builder | Runs | Logs | Settings.
- [ ] Breadcrumb päivittyy agentin nimeen (mock).

## Copilot prompt
```
Luo agentin alireitit ja Tabs-komponentti. Lisää breadcrumb ‘Agents / {name}’.
```

## Plan
- [ ] Luo reitit ja tyhjät sivut.
- [ ] Toteuta Tabs-komponentti ja linkit.
- [ ] Päivitä breadcrumb.
