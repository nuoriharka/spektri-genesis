---
name: "feat(runs-api): Mock SSE route + RunStream-integraatio"
about: "Edge SSE route emitting run events and Runs detail page using RunStream"
title: "feat(runs-api): Mock SSE route + RunStream-integraatio"
labels: ["copilot"]
assignees: ""
---

## Summary
Lisää edge-SSE route mockilla ja näytä se RunStream-komponentissa Runs detail -sivulla.

## Paths
- `src/app/api/runs/[id]/stream/route.ts`
- `src/components/RunStream.tsx`
- `src/app/app/runs/[id]/page.tsx`

## Acceptance Criteria
- [ ] SSE palauttaa TASK_UPDATE/LOG/METRIC/DONE -eventit.
- [ ] RunStream renderöi timeline-kortit.

## Copilot prompt
```
Lisää edge-SSE route mockilla ja näytä se RunStream-komponentissa Runs detail -sivulla.
```

## Plan
- [ ] Tee mock-SSE route.
- [ ] Kytke RunStream komponenttiin ja sivuun.
- [ ] Smoke test.
