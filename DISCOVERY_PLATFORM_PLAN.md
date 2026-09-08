# Discovery — the intake platform for ClearPath Labs

**Version:** 1.0.0
**Written:** 2026-09-08
**Status:** Proposal, for Brad's decision. Nothing here is built yet except the 1.0.1 worksheet.
**Companion:** the clickable prototype (published as an artifact; source in `prototype/`)

---

## Changelog

- **1.0.0 — 2026-09-08** — First plan, written from Brad's description of the product and a read of what already exists in `C:\Projects` (CRM_platform, ClearPath Labs site, the 1.0.1 worksheet).

---

## In one line

> When a customer says yes, they get one link. Twenty minutes later Brad knows what to build first, and two days later the customer gets a one-page "what I heard" back. Discovery is that link, the library behind it, and the screen Brad sends it from.

## What I'd change about the idea

You asked for pushback. Five things, most important first.

**1. Don't write three documents per vertical. Compose them.**
Three tiers × six verticals is eighteen worksheets to write and eighteen to keep in sync when you improve a question. By the time you're at twelve verticals it's thirty-six. Instead: one *spine* (the eight-part structure, which is what makes the answers usable for a build brief), three *tier profiles* (which questions show, how they're worded, how long it takes, what device it's built for), and one *vertical pack* per trade (vocabulary, checkbox lists, the pain-inventory prompts, three personas, and every example). The app composes a worksheet from those three parts at send time. Improving a question improves it everywhere. Writing a new vertical means writing one pack, not three documents. The pack is where the research goes.

**2. Tiers should measure the business, not the person's computer skills.**
"Non-computer user" and "corporate user" are really points on one scale: how much structure the business already has. A one-truck HVAC owner who runs everything from his phone and a three-branch mechanical contractor with an ops director are different tiers regardless of who's typing. So the tier is chosen from three questions about the business (Is there an office? Is there a system of record beyond QuickBooks and texts? Are there departments or branches?), and the app suggests one. You override.

Two consequences. Tier 1 people may never fill out a web form, however short. So Tier 1 needs an *interview mode*: the same worksheet opened on your screen, filled in by you during a twenty-minute phone call. That changes how Tier 1 questions are written — they're things you'd say out loud. And when you're unsure, send Tier 2. Tier 1 can feel condescending to a capable owner; Tier 3 can bounce a busy office manager. The middle is the safe miss.

**3. Never show the tier to the customer.**
"Tier 1" reads as a grade. The customer sees a time estimate and a worksheet that happens to fit them. The tier is your internal knob.

**4. Build it inside the CRM, not as a new app.**
You already decided (Aug 31) that outreach belongs in CRM_platform. Discovery belongs there for the same reasons: the customer record is there, the password gate is there, Supabase is there, and the AI provider module is there for drafting. You also already have fifteen Vercel projects and your own map flags the sprawl. The customer-facing link should still read `clearpathlabs.dev/discovery/…` — that's a one-line rewrite from the ClearPath site to the CRM's public route, not a separate app.

**5. Research three verticals now, the rest as deals close.**
Solo capacity, and the goal is comfort. Three packs cover five of the six trades you named: *field-service trades* (HVAC and plumbing share ~80% of their world — one pack with a trade switch), *accounting practices* (CPAs and bookkeepers), *small law firms*. Contractors is pack four. Every pack after that gets researched the week a deal in that trade closes, not before. A pack nobody has filled out is a guess; a pack written the week it's needed is a guess you'll correct within days.

## The customer's experience

This is the part that has to be right, because it's the first thing they experience after paying you.

1. **The email.** From you, to them by name, four sentences: here's the link, it takes about N minutes, your answers save as you go, here's what happens next and when. One link. No template, no logo block, no "we're excited."
2. **The welcome page.** "Hi Mike — Brad here." Your note from the send screen appears here verbatim — that's the single most human element in the whole system, and the app should show you a good default and let you change it. Below it: what this is, honest time, that they can stop and come back, and *what happens after*: "I'll read this within two business days and send you a one-page summary of what I heard and the two or three things we could build first." Then Start. And for Tier 1: "Would you rather do this on a call? Reply to the email and I'll set it up."
3. **The worksheet.** The 1.0.1 structure, re-voiced for their trade and their tier. Their vocabulary — jobs, not "groups"; matters, not "projects"; engagements, not "cases." An example on nearly every question, from a persona in their world at their size. Progress and elapsed time visible. Autosave to the server, so the link works from their phone in the truck and their laptop at home.
4. **Done.** "Thanks, Tom. You'll hear from Brad by Thursday." And they do.
5. **Two business days later.** They get the "what I heard" one-pager — drafted by the app from their answers, edited and sent by you. This closes the loop. Most consultants collect and go silent; the one-pager is what makes the worksheet feel like a conversation instead of homework.

**The no-slop rules**, written down so they hold when we're tired:

- Every question earns its place: if the answer wouldn't change what gets built, cut it.
- Every example is a plausible day in that trade, in that trade's words, at that persona's size. No invented software names, no invented regulations. If the research doesn't support it, it doesn't go in.
- Nothing asked twice; nothing asked that the CRM already knows.
- Time estimates are honest and measured (the page timer tells us).
- Plain language throughout. No "leverage," "streamline," "solutions," "journey." The reader is a person who is busy and slightly wary.
- The customer is thanked with a specific next step and a date, and the date is kept.
- Works on a phone. Tier 1 is designed for one.

## The three tiers

| | **Tier 1 — Owner-operator** | **Tier 2 — The office** | **Tier 3 — The organization** |
|---|---|---|---|
| Who fills it in | The owner, from a phone, truck, or counter | An office manager, ops lead, or owner with staff | An ops director, practice administrator, or someone whose job includes systems |
| What the business has | QuickBooks, texts, paper, maybe one helper | A system of record (Housecall Pro, Clio, QBO…) plus spreadsheets around it | Departments or branches, more than one system, someone who owns each |
| Time | 10–12 minutes, or a 20-minute call in interview mode | 20–30 minutes | 45–60 minutes, in two sittings |
| Device | Phone first. One question per screen. Speech-to-text friendly. | Laptop or phone | Laptop |
| What changes | ~14 questions. Asks about *yesterday*, not "workflows." Examples are one sentence. No checkbox walls. | The current 1.0.1 worksheet, re-voiced | Adds: systems & data inventory (what, who owns it, read or write, export format); stakeholder map (who decides, who's affected, who'll push back); constraints (IT review, security, procurement, compliance); success metrics with today's baseline and who measures; attachments (exports, samples, process docs); more than one respondent |
| What stays | The pain inventory, always. Corporate users over-specify solutions; the inventory is how you find the real problem underneath the request. | | |

**How the app picks a tier.** Three toggles on the send screen — *office staff? · system of record? · departments or branches?* — none → Tier 1, one or two → Tier 2, all three → Tier 3. You can override. Default when unsure: Tier 2.

## What's in a vertical pack

A pack is one JSON file, reviewed by you line by line before it's used. It contains:

- **Vocabulary map** — the nouns the spine substitutes: customer / client / patient / guest; job / matter / engagement / group; tech / associate / preparer.
- **Checkbox lists** — areas of responsibility, systems commonly used in this trade (real product names), kinds of sensitive data that show up (HIPAA, attorney-client privilege, IRS §7216 for tax preparers, payment cards).
- **Pain-inventory prompts** — the "if you get stuck" list, rewritten for the trade: "What did you re-type from the tech's notes into the invoice?" not "between two systems."
- **Three personas**, one per tier, each with a name, a role, a business size, and a one-line situation. Every example on every question is written from one of them. (Dana at the retreat center is the prototype for this.)
- **Examples** — roughly 40 per persona, tied to question ids. This is most of the work and most of the value.
- **Compliance and seasonality notes** — the things the worksheet must say (for a dental practice: "do not include patient information") and the rhythm that shapes the pain (tax season, cooling season, quarter-end).
- **Sources** — where each fact came from, dated. Packs get re-verified yearly.

**How a pack gets researched** (this is the "no slop" protocol):

1. **Job postings** for the office role in that trade — dispatcher, office manager, practice administrator, firm administrator. They list the real daily tasks and the real software, in the employer's words. Best single source.
2. **The vendors' own workflow pages** — ServiceTitan, Housecall Pro, Jobber, Clio, MyCase, TaxDome, Karbon, Buildertrend and so on — for what the system of record actually does and, by omission, what still lives in spreadsheets.
3. **Practitioner forums** — the trade's subreddit or association board — for the pain in the owner's own words. Quotes are paraphrased, never invented, and never attributed.
4. **Licensing boards and regulators** — for what's actually required (and what's folklore).
5. **Your own customers' completed worksheets** — the best source of all, and the reason the first packs will be rough and the tenth will be good.

Each pack takes about one working session with research. You review it in thirty minutes. Nothing goes to a customer un-reviewed.

## Verticals

**Families** — packs that share most of their content:

| Family | Trades it covers | Notes |
|---|---|---|
| Field-service trades | HVAC, plumbing, electrical, (landscaping is close) | One pack with a trade switch. Dispatch, estimates, maintenance agreements, parts, callbacks, tech notes → invoice. |
| Accounting practices | CPAs, bookkeepers, tax preparers | Client document chasing, engagement letters, busy season, reconciliations, 1099s, portals. |
| Small law firms | Solo and small practices | Intake, conflict checks, matter deadlines, trust accounting, document assembly. Privilege and confidentiality language required. |
| Contractors | General contractors, remodelers | Bids, change orders, subs, draws, punch lists. |
| Venues | Retreat centers, conference and event venues | Your daughter's world; Dana already exists. First real answers come from here. |

**Candidates to research later** — one line each on why, marked as candidates until a deal or a research pass says otherwise:

- *Independent repair shops* (electronics, auto) — you live this one; the pack could be written from experience and Syncro.
- *Property management* — document- and list-heavy, constant chasing; strong fit.
- *Insurance agencies* — renewals, certificates, carrier portals; strong fit.
- *Dental, physical therapy, chiropractic* — heavy scheduling and insurance pain, but HIPAA changes what the worksheet may ask and what you may build. Later, with care.
- *Nonprofits and churches* — donor and volunteer lists in spreadsheets; low budgets. Fit is good, revenue is not.
- *Real estate brokerages* — transaction coordination; crowded with vendors already.
- *Staffing and home-health agencies* — scheduling and compliance; regulation-heavy.

## Your side of it

The send screen is four steps and should take you under two minutes:

1. **Who.** Search the CRM (a lead at Closed won) or type name, company, email, phone. Typing creates the lead.
2. **What.** Pick the trade — packs shown by family, with "ready" or "draft" on each — and the three tier toggles. The app suggests a tier; you can change it.
3. **Your note.** A short personal note that appears on the welcome page, with a good default you can edit. Optional: "Ask especially about…" prompts that get inserted into the pain inventory.
4. **Preview and send.** The email and the welcome page exactly as the customer will see them. Send.

After that: a status line per send (Sent → Opened → Started 40% → Submitted → Brief drafted), resend and reminder buttons, an *Open in interview mode* button for Tier 1, and a response view with the answers by part, your notes alongside, Markdown/JSON export, and two draft buttons — *Draft "what I heard"* (the customer one-pager) and *Draft the build brief* (the internal spec, in the format your class worksheet uses: problem, goal, users, inputs, outputs, data and access, success criteria, why not a rule, out of scope, the one check that proves it works). Both are drafts. Nothing goes to the customer until you send it.

## Architecture

**Verified today** (read from disk and the Vercel API, 2026-09-08):

- CRM_platform: Next.js 16.3.1, React 19, Tailwind 4 (tokens in `app/globals.css`, warm grays and orange, light only), Supabase server-side only, shared-password gate in `middleware.ts` with `/api/*` outside it. `leads` has name, company, email, phone, stage, source, notes. OpenAI called through `lib/ai/provider.ts`. Its PRD is a scope contract — Discovery needs its own PRD, not a smuggled feature.
- ClearPath Labs site: Next.js, `/start/[slug]` is a pre-sale questionnaire that posts leads into the CRM. Discovery is post-sale and separate from it.
- Vercel: `crm-platform` and `clearpath-labs` both under team Clearpath. `discovery-worksheet` (the 1.0.1 static page) is a third.

**Assumed, to confirm:** which mailbox and provider send email. Command Center sends campaigns, so a sending path exists; the CRM has none. Discovery needs a transactional sender from a ClearPath address. Decision below.

**What gets built:**

| Piece | Where | Notes |
|---|---|---|
| Composer | `lib/discovery/compose.ts` — a pure function: spine + tier profile + pack + your note → worksheet schema | Same schema the 1.0.1 page renders today. Keep the vanilla renderer in Phase 1; wrap it in React later if it earns it. |
| Packs, tier profiles, spine | JSON files in the repo, versioned, reviewed in pull requests | Not a database editor. Editing content through Claude with a diff is safer and faster than a form. |
| Tables | `discovery_sends` (lead, pack, tier, note, token, status, timestamps), `discovery_answers` (send, answers JSON, saved_at), `discovery_documents` (send, kind, body, status) | RLS as the CRM does it. Answers are the customer's confidential business information and are treated that way. |
| Public route | `/d/[token]` in the CRM, outside the password gate, plus `/api/discovery/[token]/save` and `/submit` (rate-limited) | Tokens are 128-bit random, unguessable, revocable. |
| Customer URL | `clearpathlabs.dev/discovery/<token>` | A rewrite in the ClearPath site's `next.config` to the CRM route. Feasible in principle; not yet tested. |
| Admin | `/discovery`, `/discovery/new`, `/discovery/[id]` behind the existing gate | Follows the CRM's tokens and conventions. |
| Email | Transactional sender, plain text with one link; reminder button (manual first, automated day-5 nudge later, opt-in) | Provider is a decision. |
| Drafting | Existing `lib/ai/provider.ts` — "what I heard" and build brief from the answers | Drafts only. Never auto-sent. |
| Privacy | One-line data statement on the welcome page; Tier 3 gets NDA wording; answers deletable on request; the worksheet tells respondents not to include their customers' personal information | |

## Phases

| Phase | Ships | You do | Size |
|---|---|---|---|
| **0 — now** | This plan and the prototype | Decide the five questions below | done |
| **1 — the library** | Composer, spine, three tier profiles, packs for field-service trades, accounting practices, small law firms. Output is a static page per (pack, tier) — sendable by hand the day it's done, no app required. | Review each pack (~30 min each). Pick the sender mailbox. | ~4 sessions |
| **2 — the link** | `/d/[token]`, server autosave, submit, notification to you, read-only response view in the CRM, export | Approve the migration; set env vars | ~2 sessions |
| **3 — the send screen** | Who / What / Note / Preview flow from a lead, tier helper, email send, status, resend, reminder, interview mode | Email provider account and key | ~2–3 sessions |
| **4 — the loop** | "What I heard" and build-brief drafts, Tier 3 multi-respondent and attachments, `clearpathlabs.dev/discovery` rewrite, contractors and venues packs | Edit and send the first real one-pager | ~2–3 sessions |
| **ongoing** | One pack per new vertical, researched the week a deal closes | Thirty-minute review per pack | 1 session each |

Phase 1 is deliberately useful on its own: the day the trades pack is reviewed you can send an HVAC worksheet by hand, the way you'll send your daughter's. The app is built around a library that already works, not the other way round.

## Decisions I need from you

1. **Home** — inside CRM_platform (my recommendation) or a separate app?
2. **First three packs** — field-service trades, accounting practices, small law (my recommendation), or reorder to match your pipeline?
3. **Sender** — which mailbox sends discovery emails, and are you fine with a transactional provider (Resend or the one Command Center uses)?
4. **Tier visibility** — confirm the customer never sees a tier label.
5. **Interview mode** — yes or no? It changes how Tier 1 questions are written, so it has to be decided before the packs.

## Risks, honestly

- **Content volume is the real cost.** Roughly 120 examples per pack. The composition model keeps it to one pack per family, and the just-in-time rule keeps you from writing packs nobody uses. But there's no shortcut through the examples; they're the product.
- **Tier 1 completion.** Some owners won't fill out anything. Interview mode is the mitigation; the honest fallback is that for some customers the worksheet is your call script, and that's fine.
- **Tier 3 politics.** The ops director may not be the person with the pain. Multi-respondent (Phase 4) and the stakeholder map exist for this.
- **Confidentiality.** Answers describe a business's insides. Treat them like the CRM treats leads: server-side, RLS, no client-side keys. Say so on the page.
- **Your note.** It's the most human element and the easiest to skip. The default has to be good enough to send unchanged.
- **Over-automation.** The drafts are drafts. Your judgment is what they're paying for.

## The prototype

Fourteen screens in one page, with a switcher on the left. Your side: Discovery home, the four-step send flow, a send's status, a completed response with the draft buttons, and the library. The customer's side: the email, the welcome page, a Tier 1 worksheet on a phone (HVAC owner), a Tier 2 worksheet (CPA office manager), a Tier 3 worksheet (mechanical contractor ops director), and the done page. Every screen has a "Decisions on this screen" note listing what it's asking you to like or not like. The contacts and answers are fictional. Nothing sends.

It uses the CRM's actual palette for your side and the worksheet's palette for the customer's side, on purpose — you're looking at two products that share a database, and they should feel like it.
