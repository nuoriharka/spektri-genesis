---
name: "feat(command): Command Palette (⌘K)"
about: "Add shadcn command+dialog and header trigger with ⌘K/Ctrl+K"
title: "feat(command): Command Palette (⌘K)"
labels: ["copilot"]
assignees: ""
---

## Summary
Toteuta shadcn command + dialog yhdistelmä. Lisää kolme commandia ja keyboard-shortcut.

## Paths
- `src/components/app/CommandMenu.tsx` (uusi)
- Trigger headerissa

## Acceptance Criteria
- [ ] Avautuu ⌘K/Ctrl+K.
- [ ] Toiminnot: “Create Agent”, “Open Templates”, “Open Settings”.

## Copilot prompt
```
Toteuta shadcn command + dialog yhdistelmä. Lisää kolme commandia ja keyboard-shortcut.
```

## Plan
- [ ] Luo CommandMenu komponentti.
- [ ] Lisää headeriin trigger + keydown-listener.
- [ ] Testaa kolmen komennon navigaatio.
