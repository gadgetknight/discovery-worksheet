# discovery-worksheet — "Where the Time Goes"

**Version:** 1.2.0
**Written:** 2026-09-08
**Live:** https://discovery-worksheet.vercel.app (Vercel team `Clearpath`, project `discovery-worksheet`, production)

Discovery worksheets a customer fills in so Brad can decide what to build for them.
Started as one generic 20–30 minute questionnaire (still here as `index.html`); now a
small library that composes a worksheet per industry and business size.

## Files

- `index.html` — the generic worksheet (1.0.1), retreat-center persona for the first
  customer (Brad's daughter, operations at Sandy Cove Ministries). Unchanged since.
- `library/` — the source of every other worksheet:
  - `spine.json` — the questions, with `{tokens}` for the pack vocabulary.
  - `tiers/tier1.json`, `tier2.json`, `tier3.json` — owner-operator (≈12 min, one
    question per screen), the office (20–30 min), the organization (45–60 min, two
    sittings). The customer never sees a tier name.
  - `packs/field-service-trades.json` — HVAC and plumbing (electrical listed, disabled
    until it has its own research). Vocabulary, lists, tips, three personas, ~40
    worked examples per tier, compliance notes, seasonality, 38 sources.
  - `research/field-service-trades.md` — the condensed findings behind the pack.
  - `consultant.json` — name, email, optional `submitUrl`.
- `compose/` — `compose.mjs` (the pure composer), `build.mjs` (CLI), `template.html`
  (the renderer, engine 1.1.x).
- `out/` — generated worksheets, one per pack × trade × tier, plus `out/index.html`
  listing them. Sendable as-is. **Generated — edit the library, not these.**
- `DISCOVERY_PLATFORM_PLAN.md` — where this is going (the send screen inside the CRM,
  Resend email, answers landing on the lead). `prototype/` — clickable screens of it.
- `CLAUDE.md` — rules for any AI session working in this folder.

## Build

    node compose/build.mjs
    node compose/build.mjs --pack field-service-trades --trade hvac --tier 1

Plain Node 22+, no install. Each build prints a coverage line: how many questions have
a persona example and which don't.

## Sending a worksheet by hand (until the app exists)

Pick the file in `out/`, add the customer's first name and company to the link, send it:

    https://discovery-worksheet.vercel.app/out/field-service-trades/hvac-t2.html?name=Carla&co=Delgado%20Heating

Add `&interview=1` to fill it in with them on a call. Answers save in their browser;
the **Review & send** panel at the end turns them into a text summary they email to
`consultant.json`'s address, or a .md/.json download, or a print-to-PDF.

## What a worksheet does

Parts with time budgets, a plain-language help line and a collapsible worked example on
most questions (a named persona from the pack — Ray, Carla, or Denise for the trades),
autosave, a progress bar with elapsed time, and the Review & send panel. Tier 1 shows one
question per screen with Back/Next; Tier 3 splits into two sittings with a navigator.
The last part asks the respondent to critique the worksheet itself.

Google Fonts (Zilla Slab, Source Sans 3) load from fonts.googleapis.com; if blocked the
page falls back to Georgia and the system sans.

## Deploying

Root `index.html` plus the `out/` folder go to the Vercel project. From a Claude
session the Vercel MCP `deploy_to_vercel` is how it has gone up so far; from a logged-in
CLI: `cd C:\Projects\discovery-worksheet; vercel --prod`.

## Changelog

- **1.2.0 — 2026-09-08** — Library and composer (Phase 1 of the plan): spine, three tier profiles, field-service trades pack with research, template engine 1.1.1, six generated worksheets in `out/`.
- **1.1.0 — 2026-09-08** — Platform plan and clickable prototype added. Worksheet unchanged (1.0.1).
- **1.0.1 — 2026-09-08** — Fix: “Review & send” section was pinned to the left edge; masthead side padding restored so it aligns with the parts below.
- **1.0.0 — 2026-09-08** — First release. Deployed to Vercel the same day.
