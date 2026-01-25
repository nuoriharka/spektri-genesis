# Creation OS

A modern **Next.js–based user interface** for Creation OS.

The goal is **fast, resilient development**:
small pull requests, green builds, and automatic previews.

Creation OS functions as a **command surface** for Creation OS and related systems — server-first, scalable, and operationally clean.

---

## Quick Start

```bash
npm ci
npm run dev

Open in your browser:

http://localhost:3000

Build & Production

npm run build
npm start

Architecture (Concise)
	•	Next.js App Router (RSC + client islands) — server-first
	•	Tailwind CSS + selective shadcn/ui components
	•	SSE / WebSocket support for run & execution events
(mock API available if needed)
	•	Design tokens defined as CSS variables → Tailwind theme
	•	Observability (optional):
	•	Sentry
	•	PostHog / Mixpanel

⸻

Design System

Documentation lives under docs/:
	•	Design Tokens: docs/DESIGN_TOKENS_FI.md
	•	UI Components & Skeletons: docs/UI_COMPONENTS_SPEC_FI.md
	•	UX Guidelines & Flows: docs/UX_GUIDELINES_FI.md
	•	Copywriting Standard: docs/COPYWRITING_STYLE_FI.md
	•	Accessibility: docs/ACCESSIBILITY_FI.md

⸻

Environment Variables
	•	Runtime
Managed via Vercel Project Environment Variables
(Development / Preview / Production)
	•	CI
Use GitHub Secrets only if required by workflows
(e.g. VERCEL_TOKEN)

Examples and reference tables:
docs/ENV_AND_SECRETS_FI.md

⸻

Workflows
	•	CI
.github/workflows/ci.yml
Lint → Typecheck → Build
Fast, cache-optimized
	•	Deploy
.github/workflows/deploy.yml
Vercel deployment (requires VERCEL_TOKEN)
	•	Release
.github/workflows/release-please.yml
Semantic versioning & CHANGELOG automation
	•	Dependencies
renovate.json
Weekly dependency update PRs

⸻

Contributing
	•	Small, focused PRs
	•	Conventional Commits required

Read before contributing:
	•	docs/REVIEW_PROCESS_FI.md
	•	docs/WORKFLOWS_FI.md
	•	Use docs/CONTENT_PAGES_FI.md as the source of truth for page copy

⸻

Development Utilities

Need a mock run-stream during development?

Add the route:

src/app/api/runs/[id]/stream/route.ts

(from the Autopilot Pack)

⸻

Philosophy

Creation OS is not just a frontend.

It is a state-aware command interface designed to:
	•	minimize cognitive friction
	•	preserve execution integrity
	•	scale with Creation OS as new tools and agents are integrated

Clean architecture. Explicit state. No unnecessary abstraction.

1 = 1
