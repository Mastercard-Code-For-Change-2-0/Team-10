# Contributing Guide (Team-10)

This repo is structured so 8 teammates can work in parallel with minimal conflicts.

## Roles and Suggested Areas
- Frontend Devs (2): `client/src/pages`, `client/src/components`, `client/src/contexts`, `client/src/i18n`
- Backend Devs (2): `server/routes`, `server/controllers` (add if needed), `server/middleware`, `server/utils`
- Database Devs (2): `server/models`, `server/scripts` (migrations/seed), `docs/database`
- Business Analysts (2): `docs/ba`, acceptance test cases, review PRs, auth flows and wording in `client/src/pages/Auth/*`

## Branching Strategy
- Default branch: `main` (protected)
- Feature branches: `feat/<area>-<short-desc>`
  - Examples: `feat/frontend-home-hero`, `feat/api-donations-crud`, `feat/db-migrations-v1`, `chore/ba-acceptance-tests`
- Keep PRs small and focused (<= 400 lines changed when possible)

## Code Owners & Reviews
- CODEOWNERS enforces at least 1 review from owners for affected parts.
- Frontend PRs: both FE devs + 1 BA.
- Backend/DB PRs: 1 BE + 1 DB + 1 BA.

## Commit Style
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`

## Local Setup
- Copy `.env.example` to `.env` in both `client/` and `server/`.
- Install deps at root: `npm run install-all`.
- Start dev: `npm run dev`.

## Lint/Format
- Frontend: ESLint + Prettier via react-scripts.
- Backend: ESLint optional; keep code consistent.

## Avoiding Merge Conflicts
- Frontend: Feature folders per dev; avoid editing shared theme/i18n in same PR.
- Backend: Route-per-file and controller-per-domain. Avoid touching app bootstrap in same PR.
- DB: One model per PR; coordinate schema changes.
- Always: `git pull --rebase origin main` before new work.

## PR Checklist
- [ ] Builds locally (`npm run dev`)
- [ ] Lints cleanly
- [ ] Tests or manual notes added
- [ ] Docs updated if needed
- [ ] No secrets committed
