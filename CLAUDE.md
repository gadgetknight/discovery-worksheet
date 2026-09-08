# CLAUDE.md — discovery-worksheet

## What this project is

A customer-facing discovery questionnaire, "Where the Time Goes", for Brad's AI
consulting practice (ClearPath Labs). A customer spends 20–30 minutes describing what is
slow, repetitive or error-prone in their work; Brad reads the answers and decides what to
build. It is deliberately generic — the customer never sees the builder's side (build
levels, golden sets, day plans) that the source class worksheet had.

**Do not assume the domain.** The first customer is Brad's daughter, who runs operations
at Sandy Cove Ministries (a retreat and conference center, North East MD), and the
examples use a fictional retreat-center persona ("Dana") for her benefit. The next
customer will be in a different industry. Change `CONFIG.exampleWho` and the `example`
strings in `SCHEMA` when the worksheet goes to someone else.

## Rules for this folder

- One file (`index.html`), no build step, no framework, no bundler. Keep it that way.
  Reliability beats features here.
- Questions live in `SCHEMA`; names, email and the optional endpoint live in `CONFIG`.
  Edit there, not in the renderer below them.
- The HTML comment at the top of `index.html` carries the version and changelog.
  Increment before every edit; never delete old entries.
- Answers stay in the respondent's browser unless `CONFIG.submitUrl` is set. Do not add
  analytics, tracking, or any call home.
- Respondent answers may contain customer PII. Never commit real answers, exports or
  screenshots of filled-in pages to this repo. `answers/` is gitignored for local copies.
- Deploy target: Vercel team `Clearpath`, project `discovery-worksheet`, production.
  The public URL is https://discovery-worksheet.vercel.app. No custom domain yet.
- The standing rules in `C:\Projects\CLAUDE.md` apply — commit and push from the
  session, PowerShell git blocks that start with `cd`.
