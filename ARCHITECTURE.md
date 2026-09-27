# chronos-scheduler — conventions

- Do NOT add a real database. Stay on the flat-file JSON store in `server/db.js` — this is intentional, not a TODO.
- Do NOT add authentication or user accounts. This is a single-user local tool by design.
- All new server-side validation must return `{ error: string }` with a 4xx status, matching the existing style in `server/index.js`.
