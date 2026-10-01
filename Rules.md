# Rules

## Structure
- Work only inside the project root; keep the folder structure in Architecture.md.
- No backend code in `frontend/`, no frontend code in `backend/`.
- Reusable UI → `components/`, screens → `pages/`, HTTP calls → `services/`.
- Add a new folder only if technically required, and document it in Architecture.md.

## Stack
- Allowed: React, Vite, react-router-dom, Express, Mongoose, jsonwebtoken, bcryptjs, cors, dotenv.
- Avoid: UI kits, CSS frameworks, MongoDB Atlas, extra state libraries (use Context).
- Plain JavaScript only (no TypeScript).

## Security
- Never store plain-text passwords; hash with bcrypt.
- Secrets live in `backend/.env` only; `.env` is git-ignored.
- Cart routes must be protected by the JWT middleware and scoped to `req.user`.

## Errors
- API errors return `{ message }` with a correct status (400/401/404/409/500).
- Controllers use `try/catch` → `next(err)`; frontend shows `err.message` near the form/page.

## UI
- Match the Figma screenshots; use tokens from Design.md; no new design language.
- Every form field needs validation and a visible error message.

## Process
- Finish one phase (Phases.md) before the next; update Memory.md after each phase.
- Do not rewrite working code unless asked.
