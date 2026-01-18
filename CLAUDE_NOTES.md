# SV-App Development Notes

## Project Overview
**Service App** for SoundVision (svavnc.com) - A customer-facing support and service membership app.

**Tech Stack:** React + TypeScript, Vite, Tailwind CSS, deployed on Vercel
**Repo:** https://github.com/MarkTro1969/SV-App

## Brand Colors (defined in index.html)
- `sv-teal`: #3DC2DB (primary cyan)
- `sv-teal-dark`: #2cb0c9
- `sv-dark`: #4E4552 (text)
- `sv-light`: #f0f9fa (light backgrounds)

## App Structure

### Screens (types.ts)
- `DASHBOARD` - Home screen with main navigation
- `SMART_CHAT` - AI troubleshooting assistant
- `CONTACT` - Call/email support options
- `HELP_FAQ` - Expert help guides (Internet, TV, Smoke Detectors)
- `FEEDBACK` - Rate the app / Google review
- `MEMBERSHIP` - Service membership plans

### Key Components
- `Dashboard.tsx` - Home screen with holiday notices, rotating tips, membership promo
- `ServiceMembership.tsx` - Pricing plans display (Limited, Elite Plus, Custom)
- `ContactOptions.tsx` - Phone/email support with after-hours membership upsell
- `ExpertHelpFAQ.tsx` - Step-by-step troubleshooting guides with Smart Assistant links
- `SmartChat.tsx` - AI chat interface with photo upload capability

## Service Membership Plans
1. **Limited (Free)** - 30-day warranty, Mon-Fri 9am-4pm, $75/30min remote, $195/hr in-home
2. **Elite Plus ($190/mo)** - Mon-Fri 9am-9pm, weekend remote, 1hr response, FREE remote, $125/hr in-home, annual tune-up
3. **Custom** - 7 days/week, everything FREE, contact for pricing

## Features Added (January 2025)

### Holiday Notice Banner (Dashboard.tsx)
Shows 3 days before and during holidays:
- 4th of July
- Thanksgiving
- Black Friday Weekend (Fri-Sun)
- Christmas Eve & Christmas Day
- New Year's Eve & New Year's Day

Message: In-home service is **emergency only** at **$500/hr**

To test: Add this line after line 12 in Dashboard.tsx:
```typescript
return { isHolidayPeriod: true, holidayName: 'Test Holiday', daysUntil: 0 };
```

### Rotating Tips/Reminders (Dashboard.tsx)
Cycles daily based on day of month:
- System Updates Required
- Proactive System Review
- Network Health
- Security Check

### Membership Integration Points
- Dashboard: Service Memberships button
- Contact Options: After-hours banner with membership link
- Help & FAQ: "Service members get priority support" links to membership page

### Need More Help Sections (ExpertHelpFAQ.tsx)
Added to Internet and Smoke Detector FAQs - links to Smart Assistant with context about steps already tried.

## File Quick Reference
- `constants.ts` - Company info, phone, email, AI system prompt
- `types.ts` - Screen enum, interfaces
- `App.tsx` - Main app routing
- `index.html` - Tailwind config, brand colors, PWA meta tags

## Support Info
- Phone: 704-696-2792 (Option 2 for Service)
- Email: support@svavnc.com
- Website: www.svavnc.com
- Hours: Mon-Fri 9am-4pm (standard), 9am-9pm (Elite Plus)
