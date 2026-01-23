---
name: "feat(telemetry): initTelemetry PostHog/Sentry (no-op safe)"
about: "Initialize telemetry in a safe way that doesn't break without envs"
title: "feat(telemetry): initTelemetry PostHog/Sentry (no-op safe)"
labels: ["copilot"]
assignees: ""
---

## Summary
Kytke initTelemetry root-layoutiin. Guardaa envit, ei uusia deps.

## Paths
- `src/lib/telemetry.ts`
- Kutsu `initTelemetry()` rootissa

## Acceptance Criteria
- [ ] Ei kaadu vaikka envit puuttuvat.
- [ ] Jos `NEXT_PUBLIC_POSTHOG_KEY` on, eventit lähtevät.

## Copilot prompt
```
Kytke initTelemetry root-layoutiin. Guardaa envit, ei uusia deps.
```

## Plan
- [ ] Luo telemetry util.
- [ ] Kutsu rootissa guardien kanssa.
- [ ] Smoke test ilman env:ejä.
