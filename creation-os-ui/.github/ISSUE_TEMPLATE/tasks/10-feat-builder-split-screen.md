---
name: "feat(builder): Split-screen Builder (resizable)"
about: "Resizable split view for builder: left chat stub, right visual placeholder with Animated Beam demo"
title: "feat(builder): Split-screen Builder (resizable)"
labels: ["copilot"]
assignees: ""
---

## Summary
Rakenna resizable split: left chat stub, right visual placeholder. Lisää Animated Beam demona.

## Paths
- `src/app/app/agents/[id]/builder/page.tsx`
- `src/components/builder/LeftChat.tsx`
- `src/components/builder/RightVisual.tsx`

## Acceptance Criteria
- [ ] Vasemmalla chat-stub (textarea + send).
- [ ] Oikealla visual-stub + Animated Beam demo.

## Copilot prompt
```
Rakenna resizable split: left chat stub, right visual placeholder. Lisää Animated Beam demona.
```

## Plan
- [ ] Lisää resizable split layout.
- [ ] Toteuta chat- ja visual-stubit.
- [ ] Lisää demo-animaatio.
