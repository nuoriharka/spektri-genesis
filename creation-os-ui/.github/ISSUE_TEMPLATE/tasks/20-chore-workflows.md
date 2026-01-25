---
name: "chore(workflows): PR-template + labeler + require-plan"
about: "Add PR template with Plan, labeler, and workflow that requires Plan section"
title: "chore(workflows): PR-template + labeler + require-plan"
labels: ["copilot", "frontend/docs/workflows/copilot"]
assignees: ""
---

## Summary
Lisää PR-template (Plan-osio pakollinen), labeler ja require-plan workflow.

## Paths
- `.github/pull_request_template.md`
- `.github/labeler.yml`
- `.github/workflows/require-plan.yml`

## Acceptance Criteria
- [ ] PR-template sisältää kohdan `## Plan` (3–5 vaihetta).
- [ ] Labeler lisää `frontend/docs/workflows/copilot`.
- [ ] Require-plan failaa PR:n jos “## Plan” puuttuu.

## Copilot prompt
```
Lisää PR-template (Plan-osio pakollinen), labeler ja require-plan workflow.
```

## Plan
- [ ] Lisää template + labeler + workflow.
- [ ] Testaa workflow PR:llä.
- [ ] Dokumentoi README:hen lyhyesti.
