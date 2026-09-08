# discovery-worksheet — "Where the Time Goes"

**Version:** 1.1.0
**Written:** 2026-09-08
**Live:** https://discovery-worksheet.vercel.app (Vercel team `Clearpath`, project `discovery-worksheet`, production)

A 20–30 minute discovery questionnaire a customer fills in so Brad can decide what to
build for them. One static HTML file, no build step, no framework. Adapted from the
Outskill "What Problem to Solve" learner worksheet with the builder-side parts removed.

First customer: Brad's daughter (operations at Sandy Cove Ministries). The examples
inside use a fictional retreat-center persona, "Dana", because she is the first reader.

## Files

- `DISCOVERY_PLATFORM_PLAN.md` — the proposal for the intake platform this grows into (library of vertical packs, three tiers, send screen inside the CRM). Read it first.
- `prototype/discovery-prototype.html` — fourteen clickable screens of that platform, both sides, with the decision each screen asks. Open in a browser; nothing sends.
- `index.html` — the whole thing. Two blocks at the top of the `<script>` are the only
  places you should need to edit:
  - `CONFIG` — consultant name and email, the example persona, and an optional
    `submitUrl` (see "Getting the answers back").
  - `SCHEMA` — every part and question. Types: text, textarea, number, radio,
    checkboxes, scale, table, fill, group, yesno, note.
- `CLAUDE.md` — rules for any AI session working in this folder.

## What the page does

Eight parts (~52 questions) with per-part time budgets, a plain-language help line and a
collapsible example on most questions, autosave to the respondent's browser, a sticky
progress bar with elapsed time, and a **Review & send** panel that turns the answers
into a plain-text summary (copy / .md / .json / print to PDF). Part 8 asks the
respondent to critique the worksheet itself.

## Getting the answers back

1. **Default** — the respondent copies the summary into an email to the address in
   `CONFIG.consultantEmail`, or downloads the .md/.json and attaches it.
2. **Automatic** — set `CONFIG.submitUrl` to a Formspree endpoint or a serverless
   function. A "Send to Brad" button appears and POSTs the answers as JSON.

Answers never leave the respondent's browser unless option 2 is configured.

## Editing and deploying

1. Bump the version and add a changelog line in the HTML comment at the top of
   `index.html`.
2. Deploy the single file to Vercel: from a Claude session, the Vercel MCP
   `deploy_to_vercel` (files: `index.html`, team `Clearpath`, target `production`) is
   how 1.0.0 went up. From a logged-in CLI:
   `cd C:\Projects\discovery-worksheet; vercel --prod`

Google Fonts (Zilla Slab, Source Sans 3) load from fonts.googleapis.com; if blocked the
page falls back to Georgia and the system sans.

## Changelog

- **1.1.0 — 2026-09-08** — Platform plan and clickable prototype added. Worksheet unchanged (1.0.1).
- **1.0.1 — 2026-09-08** — Fix: “Review & send” section was pinned to the left edge; masthead side padding restored so it aligns with the parts below.
- **1.0.0 — 2026-09-08** — First release. Deployed to Vercel the same day.
