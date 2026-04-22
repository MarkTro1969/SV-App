# SV Service App — "SoundVision Concierge"

Customer-facing PWA at https://service.svavnc.com. Clients describe A/V issues and get AI-guided troubleshooting. Stats feed the Jarvis mission-control dashboard.

**GitHub:** https://github.com/MarkTro1969/SV-App (note: local tree diverged from `main` after 2026-02-21 — reconcile before committing code changes)

## Tech & deploy
- **Stack:** Vite + React 19 + Tailwind, uses `@google/genai`
- **PWA:** `public/manifest.json` + `public/icons/{icon-192,icon-512,apple-touch-icon}.png` — all three icon sizes are required or iOS falls back to a generic tile
- **Deploy:** prebuilt Vercel flow (remote builds are unreliable)
  ```
  npm run build
  vercel build --prod && vercel deploy --prebuilt --prod --yes
  ```

## Backend wiring (lives in `marks-personal-agent`)
- **Chat:** `POST http://100.110.172.47:8000/api/sv-app/chat` → `routes.py:3176`
- **Stats:** `GET  http://100.110.172.47:8000/api/sv-app/stats` → `routes.py:3305`
- **DB:** table `sv_app_inquiries` in `~/Projects/marks-personal-agent/data/emails.db`
  - Columns: `id, session_id, message, response, category, created_at, input_tokens, output_tokens`
  - Session IDs: `sv_<timestamp>_<random>`; stats endpoint truncates to last 6 chars for display

## Known gaps (see SESSION_NOTES below)
- **No user identity captured** — sessions are fully anonymous (no name/email/phone/IP). Would need a form at chat start + a new column.
- **No resolution tracking** — no `resolved` flag. Resolution can only be inferred by reading the full transcript. Options: LLM-classified end-of-session flag, or "did this help?" thumbs in the UI.

## Session notes / activity log
See `CLAUDE_NOTES.md` for project history and the latest 30-day activity snapshot.

## Related
- See memory: `~/.claude/projects/-Users-mark1/memory/sv-service-app.md`
- Slack usergroups (for posting updates about this project): `slack_usergroups.md`
