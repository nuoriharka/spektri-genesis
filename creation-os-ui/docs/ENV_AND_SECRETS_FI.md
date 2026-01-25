# Ympäristöt & Secretit

## Vercel Project Env (Development/Preview/Production)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- LLM (valitse yksi): `OPENAI_API_KEY` | `ANTHROPIC_API_KEY` | `GOOGLE_API_KEY`
- (opt) `SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`

## GitHub Secrets (vain CI/deploy)
- `VERCEL_TOKEN` – env pull + deploy
- (opt) `SENTRY_AUTH_TOKEN` – sourcemapit

## Paikallinen
- `.env.local` (älä commitoi). Perusta: `.env.example`.
