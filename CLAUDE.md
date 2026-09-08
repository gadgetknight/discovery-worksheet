# CLAUDE.md — discovery-worksheet

**Version:** 1.3.1 — 2026-09-08

### Changelog
- **1.3.1 (2026-09-08)** — Added "When answers come back" (answers → readback → project seed). Template 1.1.2: tier name removed from the customer's text export.
- **1.3.0 (2026-09-08)** — Phase 1 of the platform plan: the library and composer exist. `vercel.json` builds on Vercel and serves `public/` only; deploy method documented under Rules. `library/` (spine, three tier profiles, first vertical pack, research notes, consultant.json), `compose/` (compose.mjs, build.mjs, template.html), `out/` (six generated worksheets + index). Rules rewritten for a folder with a build step. `index.html` stays the generic 1.0.1 worksheet.
- **1.2.0 (2026-09-08)** — Brad decided: inside CRM_platform; five packs first (field-service trades, accounting practices, small law firms, venues, nonprofits & churches); Resend as sender (already verified on clearpathlabs.dev per the ClearPath site's CHANGELOG 0.8.0); customer never sees a tier; interview mode yes. Plan is 1.1.0.
- **1.1.0 (2026-09-08)** — The project is growing into the Discovery intake platform. Added `DISCOVERY_PLATFORM_PLAN.md` (the proposal: composed worksheets = spine + tier profile + vertical pack; three tiers by business structure; built inside CRM_platform; three packs first) and `prototype/discovery-prototype.html` (14 clickable screens). Both published as artifacts. Five decisions pending Brad — see the plan.
- **1.0.0 (2026-09-08)** — File created with the 1.0.0 worksheet.

## What this project is

Customer-facing discovery worksheets, "Where the Time Goes", for Brad's AI consulting
practice (ClearPath Labs). A customer describes what is slow, repetitive or error-prone
in their work; Brad reads the answers and decides what to build. The customer never sees
the builder's side — no tier labels, no build levels, no scoring.

Two things live here:

1. **The generic worksheet** — `index.html` (1.0.1), live at
   https://discovery-worksheet.vercel.app. Retreat-center persona ("Dana") for the first
   customer, Brad's daughter at Sandy Cove Ministries. Leave it alone unless she reports
   a bug.
2. **The library** — the source of every worksheet from here on. See below.

**Do not assume the domain.** Every pack is a different industry with its own research.
Read the pack and its research file before touching examples.

## The library (Phase 1 of `DISCOVERY_PLATFORM_PLAN.md`)

A worksheet is *composed*, never written by hand:

    spine (question structure)
      + tier profile (which questions, mode, sittings, masthead copy)
      + vertical pack (vocabulary, lists, tips, personas, examples, overrides, sources)
      → compose/compose.mjs → compose/template.html → out/<pack>/<trade>-t<tier>.html

- `library/spine.json` — every part and question. Tokens in braces (`{customer}`,
  `{jobs}`, `{worker}`, `{org}`, `{system}`, `{tradeNoun}`, capitalized variants) are
  filled from the pack's `vocab`. `listKey` pulls checkbox options from `pack.lists`.
  `tiers: [..]` on a part or question says where it appears. Ids starting `t1.` are the
  spoken-register set for owner-operators.
- `library/tiers/tier{1,2,3}.json` — Tier 1 owner-operator (stepper, ~12 min, examples
  open), Tier 2 the office (scroll, 20–30 min), Tier 3 the organization (scroll, two
  sittings, Parts 8–10). The customer sees the masthead copy, never the tier.
- `library/packs/<pack>.json` — one per trade family. `trades{}` with `enabled`;
  `vocab`, `personas` (one per tier — these are the example voices), `lists`, `tips`,
  `overrides` (any field of any spine question), `examples[qid][t1|t2|t3]`,
  `tradeExamples[trade][qid][tier]`, `compliance`, `seasonality`, `sources[]` with
  `used_for`. A trade with no research of its own stays `enabled: false`.
- `library/research/<pack>.md` — the condensed, sourced findings behind the pack. Every
  example and list entry should trace to a line in it. Correct it, dated, when a real
  customer contradicts it.
- `library/consultant.json` — Brad's name, email, optional `submitUrl`.
- `compose/compose.mjs` — pure function `compose({spine,tier,pack,trade,consultant})`
  → `{config, schema, coverage}`. No I/O, no dependencies. It ports unchanged to
  `lib/discovery/compose.ts` in CRM_platform when the app is built.
- `compose/build.mjs` — `node compose/build.mjs [--pack X --trade Y --tier N]`. Writes
  `out/` and prints a coverage line per worksheet (which questions lack an example).
- `compose/template.html` — the renderer (engine 1.1.x). Placeholders `__TITLE__`,
  `/*__CONFIG__*/{}/*__END_CONFIG__*/`, `/*__SCHEMA__*/[]/*__END_SCHEMA__*/`.

Runtime: `?name=First&co=Company` personalizes the masthead and prefills the name
question; `?interview=1` forces scroll mode and shows the interview banner (Brad
filling it in on a call). Answers autosave to localStorage under a key per pack/trade/tier.

## When answers come back

1. The customer's export (the .md from **Review & send**, or the .json) arrives by email.
   Save it as `answers/<date>-<name>-<trade>-t<tier>-answers.md`. `answers/` is gitignored
   and stays that way — never commit it.
2. Within two business days — the worksheet promises this on the masthead — write the
   **readback**: one page, in Brad's voice, to the customer. *What I heard* (their pain,
   in their words, grouped), *what I'd build first* (two or three things, each with what
   it takes), *what I need from you* (the questions that decide price and approach).
   Say plainly which pains aren't software. Save it beside the answers as
   `…-readback.md`. First one: `answers/2026-09-08-ted-testerson-hvac-t1-readback.md`
   (a test Brad filled in himself).
3. The answers and the readback are the first two files of that customer's project
   folder; the project's CLAUDE.md is written from them. Real answers also correct the
   pack — when a customer contradicts a persona example or the research file, fix the
   library, dated.
4. Phase 2 (in CRM_platform) automates 1 and drafts 2: answers land on the lead, Brad is
   notified, the readback is drafted for him to edit.

## Rules for this folder

- **Edit the library or the template, then rebuild. Never hand-edit `out/`.** Generated
  files carry no changelog; the library files and the template do.
- **Every example is a specific person on a specific day with a number.** No "usually",
  no generic filler, no example that would fit any industry. If you can't write it from
  the research file, leave the question without an example and let the coverage line
  show it — a missing example beats a fake one.
- **Nothing in the customer's view says tier, level, or score.** Persona names, times,
  and masthead copy differ by tier; the word "tier" does not.
- Tokens: the composer substitutes vocabulary tokens; the engine substitutes
  `{consultantFirst}`, `{consultantName}`, `{consultantEmail}`, `{name}`, `{company}` at
  runtime. Don't put engine tokens where the composer will choke on them, and vice versa.
- Version and changelog: `compose/template.html` and `compose/*.mjs` carry a header;
  packs and the spine carry `version`; research files carry a dated changelog. Bump
  before editing; never delete old entries. `index.html` keeps its own.
- No framework, no bundler, no npm install. `build.mjs` runs on plain Node (22+).
- Answers stay in the respondent's browser unless `submitUrl` is set. No analytics,
  tracking, or calls home. Never commit real answers, exports, or screenshots of filled
  pages. `answers/` is gitignored.
- Respondent answers may contain customer PII (gate codes, card numbers on tickets,
  financing applications — see each pack's `sensitive` list). Treat exports accordingly.
- Deploy: Vercel team `Clearpath`, project `discovery-worksheet`, production. The
  project is **not** linked to GitHub. `vercel.json` in the repo runs `build.mjs` on
  Vercel and serves only `public/` (`index.html` + `out/`), so the library source is not
  public on the site. Until Brad links the repo in the Vercel dashboard, deploy by
  pushing to master and then sending `deploy_to_vercel` a one-file tree: a `vercel.json`
  whose buildCommand first pulls the master tarball
  (`curl -sSL https://codeload.github.com/gadgetknight/discovery-worksheet/tar.gz/refs/heads/master | tar xz --strip-components=1 && …`).
  Never inline the built HTML into a deploy call again — it's 700 KB.
- The standing rules in `C:\Projects\CLAUDE.md` apply — commit and push from the
  session, PowerShell git blocks that start with `cd`.
