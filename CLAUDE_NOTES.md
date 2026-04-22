# SV-App Development Notes

## Project Overview
**Service App** for SoundVision (svavnc.com) — a customer-facing support and service-membership PWA.

**Tech Stack:** React + TypeScript, Vite, Tailwind CSS, deployed on Vercel (prebuilt pattern)
**Repo:** https://github.com/MarkTro1969/SV-App
**Production:** https://service.svavnc.com
**Backend:** Chat + stats proxied through `marks-personal-agent` on the Mac Mini (`http://100.110.172.47:8000/api/sv-app/{chat,stats}`). All inquiries logged to `sv_app_inquiries` table in `emails.db`.

## Brand Colors (defined in index.html)
- `sv-teal`: #3DC2DB (primary cyan)
- `sv-teal-dark`: #2cb0c9
- `sv-dark`: #4E4552 (text)
- `sv-light`: #f0f9fa (light backgrounds)

## App Structure

### Screens (types.ts)
- `DASHBOARD` — Home screen with main navigation
- `SMART_CHAT` — AI troubleshooting assistant
- `CONTACT` — Call/email support options
- `HELP_FAQ` / `KNOWLEDGE_BASE` — Expert help guides (Internet, TV, Smoke Detectors)
- `FEEDBACK` — Rate the app / Google review
- `MEMBERSHIP` — Service membership plans

### Key Components
- `Dashboard.tsx` — Home screen with holiday notices, rotating tips, membership promo
- `ServiceMembership.tsx` — Pricing plans display (Limited, Elite Plus, Custom)
- `ContactOptions.tsx` — Phone/email support with after-hours membership upsell
- `ExpertHelpFAQ.tsx` / `KnowledgeBase.tsx` — Step-by-step troubleshooting guides with Smart Assistant links
- `SmartChat.tsx` — AI chat interface with photo upload capability

## Service Membership Plans
1. **Limited (Free)** — 30-day warranty, Mon-Fri 9am-4pm, $75/30min remote, $195/hr in-home
2. **Elite Plus ($190/mo)** — Mon-Fri 9am-9pm, weekend remote, 1hr response, FREE remote, $125/hr in-home, annual tune-up
3. **Custom** — 7 days/week, everything FREE, contact for pricing

## Features Added (January 2025)

### Holiday Notice Banner (Dashboard.tsx)
Shows 3 days before and during holidays (4th of July, Thanksgiving, Black Friday Weekend, Christmas Eve/Day, New Year's Eve/Day). Message: in-home service is **emergency only** at **$500/hr**.

To test: add this line after line 12 in Dashboard.tsx:
```typescript
return { isHolidayPeriod: true, holidayName: 'Test Holiday', daysUntil: 0 };
```

### Rotating Tips/Reminders (Dashboard.tsx)
Cycles daily based on day of month: System Updates Required, Proactive System Review, Network Health, Security Check.

### Membership Integration Points
- Dashboard: Service Memberships button
- Contact Options: After-hours banner with membership link
- Help & FAQ: "Service members get priority support" links to membership page

### Need More Help Sections (ExpertHelpFAQ.tsx)
Added to Internet and Smoke Detector FAQs — links to Smart Assistant with context about steps already tried.

## File Quick Reference
- `constants.ts` — Company info, phone, email, AI system prompt
- `types.ts` — Screen enum, interfaces
- `App.tsx` — Main app routing
- `index.html` — Tailwind config, brand colors, PWA meta tags

## Support Info
- Phone: 704-696-2792 (Option 2 for Service)
- Email: support@svavnc.com
- Website: www.svavnc.com
- Hours: Mon-Fri 9am-4pm (standard), 9am-9pm (Elite Plus)

---

## Activity Snapshot — last 30 days (as of 2026-04-22)

Pulled from `sv_app_inquiries` on the Mac Mini. Usage is **very light** — essentially one real customer interaction in 30 days.

- 🗣️ **3 sessions / 9 total messages**
- 👤 **1 real customer interaction** (Apr 8 — Sony TV / Apple TV no-sound)
- 🧪 **2 internal/test sessions**
- ⏳ **No activity since Apr 9** (12-day gap at time of snapshot)

### Session detail
| # | Date/Time (ET) | Category | Notes |
|---|---|---|---|
| 1 | 2026-03-25 09:00 | Automation / Control4 (miscategorized) | Tester feedback — _"It needs a logo!"_ |
| 2 | 2026-04-08 17:04–17:08 | TV / Display + Audio | Real customer: Sony TV, Apple TV, picture works but no sound. 7 turns, bot narrowed to likely HDMI audio routing on the Sony. **Outcome unknown** (no resolution tracking). |
| 3 | 2026-04-09 09:43 | TV / Display | Mark internal test: _"Samsung TV keeps turning off randomly"_ — 1 message, no follow-up. |

### Known product gaps surfaced by this snapshot
1. **No user identity capture.** Sessions are fully anonymous. Adding a minimal name/email/phone form at session start would let us follow up on unresolved cases.
2. **No resolution tracking.** We can only infer resolution by reading transcripts. Options:
   - Thumbs-up/down at end of session.
   - LLM-classified `resolved` flag stored on the last row of a session.
3. **Category miscategorization** (session 1) — the classifier latched onto "app" as Control4-adjacent. Consider adding a "Not a support issue / feedback" category.
4. **Adoption is the real bottleneck.** Product works; almost no one is using it. Marketing opportunities: email blast, invoice/proposal footer link, service-call follow-ups, social, website CTA.

_Snapshot author: Claude (Opus 4.7). Source: `sqlite3 ~/Projects/marks-personal-agent/data/emails.db` on Mac Mini._
