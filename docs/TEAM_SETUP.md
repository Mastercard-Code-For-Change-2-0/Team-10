# Team Setup and Working Agreements

## Roles
- Frontend Devs: build UI in `client/`
- Backend Devs: build APIs in `server/`
- DB Devs: design schemas in `server/models`, write seeds/migrations in `server/scripts`
- Business Analysts: define acceptance tests in `docs/ba`, validate flows

## Branching
- `main` is protected. Use branches `feat/*`, `fix/*`, `chore/*`.
- Rebase before pushing: `git pull --rebase origin main`.

## Daily Flow
1. Pull latest `main`.
2. Create/continue your branch.
3. Commit small, focused changes.
4. Open PR early (draft) for visibility.

## Ownership
- Each person owns a feature folder at a time to reduce conflicts.

## Reviews
- Aim for 1-2 reviewers per PR.

## Environments
- `.env.example` files provided. Do not commit real secrets.
