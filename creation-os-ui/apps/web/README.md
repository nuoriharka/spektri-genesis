This app proxies the root Next.js app during migration. Files in `apps/web/app` re-export components from `../../src/app` to avoid duplication.

Plan:
- Verify `apps/web` builds referencing the root using `experimental.externalDir`.
- Gradually move files from `src/app` to `apps/web/app` and update imports.
- Update root scripts/CI to point to apps/web when migration completes.
