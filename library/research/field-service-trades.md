# Field-service trades — research notes

Pack: `library/packs/field-service-trades.json` · Pack version 1.0.0 · Researched 2026-09-08

This is the condensed record behind the pack. Every persona example, tip, list entry, and compliance note in the pack traces to something below. When a customer's answers contradict a finding here, the customer is right and this file gets a dated correction.

**Trades covered:** HVAC, plumbing (one pack — the office side is nearly identical). Electrical is listed but disabled until it has its own examples.

**Geography:** Licensing and permit findings are New Jersey. Everything else is national. Packs for other states will need the licensing rows re-checked.

---

## 1. Who fills this in

Three people, one per tier. Their names are the example voices in the worksheets.

| Tier | Persona | Where the evidence came from |
|---|---|---|
| 1 | **Ray** — owner of a two-truck company. Runs it from his phone, QuickBooks at the kitchen table at night, one tech (Luis) on the second truck. | r/Plumbing threads on two-man operations where invoicing is "a second job" done nightly; r/HVAC solo owner on Square keeping equipment history in his head and double-booking himself. |
| 2 | **Carla** — office manager and dispatcher at a 12-tech HVAC + plumbing company. Housecall Pro, QuickBooks, four spreadsheets of her own. | Job postings for service coordinators / office managers (R&J Plumbing, Homestead Service Partners, Uplifting Air, Blue Sky Plumbing & Heating) — the duties lists are a near-complete inventory of the office pain. |
| 3 | **Denise** — director of operations for a mechanical contractor, three branches, ~70 people, ServiceTitan in three tenants, Sage Intacct, a branch KPI workbook nobody trusts. | ServiceTitan help on rollup reporting (cross-branch rollup only in a higher tier); community threads on warranty claims, callbacks, and purchasing at multi-location shops. |

---

## 2. What eats the office's week

Findings, in roughly the order of how often they showed up.

**Double entry between the field software and QuickBooks.** A CSR/dispatcher posting lists entering the same job into FieldEdge and QuickBooks as a duty. Housecall Pro reviews on Capterra cite QuickBooks sync errors and duplicate entry. Payroll is re-keyed from ServiceTitan into QuickBooks through a bridge spreadsheet (r/servicetitan). → Tips: "What did you re-key…"; Carla's Part 2 example rows; systems list.

**Tickets need cleaning before they can be invoiced.** The R&J posting calls it pre-billing ticket review. Homestead's posting sets an invoice-within-two-days standard and adds AR follow-up and PO reconciliation. Contractor Magazine: time-and-materials disputes come from unlogged drive and wait time. → Part 2 examples, p10.metrics placeholder ("Days from job complete to invoice sent").

**Maintenance agreements and memberships are tracked by hand.** Contractor Magazine describes agreements as an endless loop of notices and entries. Jobber's own HVAC contract guide says to "set a reminder for yourself" — there is no renewal automation. Housecall Pro renewals are a manual button and service plans exist only on the Max plan. ServiceTitan community: auto-renewals drop off the expiring list. → Tip "Which agreement or membership renewal slipped"; Part 3 spreadsheet example "Agreements.xlsx".

**Warranty registration and claims.** Goodman: register within 60 days for the 10-year parts term (5 otherwise). Carrier: 90 days. Rheem water heaters: warranty runs from the install date only with the installer's invoice as proof; Bradford White claims go through the distributor. r/HVAC threads on equipment that was never registered. ServiceTitan community tracks extended-warranty labor claims with tags, statuses, and bins — i.e., outside the workflow. → Carla's 60-day example; plumbing warranty-sheet example; compliance list.

**Callbacks / recalls with no attribution.** ServiceTitan community SOP thread: callbacks reviewed weekly, payroll adjusted after the fact, attribution is manual. → Tip "What callback or warranty return didn't get attributed".

**Counter purchases and truck stock.** ServiceTitan community: purchase orders created after the fact from counter receipts. Heating Help forum on van stock; Service Business Mastery on dispatchers chasing parts, quotes, and callbacks. → Tip "What did a tech buy at the counter"; Ray's supply-house run in his "yesterday" example.

**Permits and inspections.** Blue Sky posting: permits and backflow certifications are the coordinator's job; the next-day board is built with managers each afternoon. NJ minor-work rule (below) makes the permit a five-business-day clock. → Tip "What lives on the whiteboard…"; areas list; Part 2 examples.

**Getting data out.** ServiceTitan exports are PDF/XLS, and API access is restricted; Housecall Pro's API is Max-plan only, CSV export is available on all plans. → Part 8 example rows ("Nightly CSV export; API needs IT approval"), constraints list ("vendor must approve integrations"). Practical consequence for builds: the first version of anything usually reads a scheduled report export, not an API.

**Seasonality.** Samsara (65M service trips): HVAC climbs from a February low, July is the cooling peak, October is the busiest month overall (late cooling calls plus first heating start-ups), September dips. ACHR News: March–April is the shoulder season used for tune-up pushes and agreement sales (one example was a Deptford, NJ contractor — local to Brad). ServiceTitan: the Mondays before and after Thanksgiving are the plumbing spikes. → Part 6 "when is bad timing" examples; p3 "Daily; more in season" placeholder.

---

## 3. Rules the build has to respect (New Jersey unless noted)

- **HVACR licensing (N.J.A.C. 13:32A-5-3):** the master HVACR contractor's license number and the words "HVACR Contractor" go on every truck, invoice, and advertisement.
- **Plumbing licensing (N.J.A.C. 13:32-3.1, 13:32-1.4):** a licensed master plumber with at least 10% ownership; name and license number on every invoice and both sides of every truck. Water heaters and backflow preventers are licensed-only work.
- **Minor work (N.J.A.C. 5:23-2.17A):** like-for-like replacement of water heaters, furnaces, A/C units, and condensers — notify the local construction office before starting, file the permit within five business days, request the inspection.
- **EPA Section 608:** keep a copy of each tech's certification at the place of business for three years after they leave; refrigerant disposal and 50-lb-plus appliance records kept three years.
- **DOT (FMCSA):** a USDOT number is required for vehicles at 10,001 lb and up in interstate commerce — shows up as a constraint at Tier 3 fleets.
- **PCI SSC:** card numbers written on paper tickets or stored after authorization are not permitted — this is why "cards on file, or card numbers written on tickets" is in the sensitive-data list.

Anything the app generates that touches an invoice template must carry the license line. Anything that touches customer records must assume gate codes, alarm codes, and financing applications (SSN, income) are in there.

---

## 4. Software the customer will name

Field: ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Successware, Workiz. Books: QuickBooks Online, QuickBooks Desktop, Sage Intacct (Tier 3). Plus the unofficial system: Excel/Sheets, Google Calendar, a whiteboard, group texts, paper tickets, supplier portals, manufacturer warranty portals, GPS/fleet tracking, the phone system, a financing portal.

Tier 1 gets a shorter, spoken-register list: my phone, paper tickets or a notebook, texts with customers, QuickBooks, Square or another invoicing app, Housecall Pro/Jobber/similar, Google Calendar, a whiteboard, my head.

---

## 5. What's still thin

- No electrical-specific findings. The pack disables that trade on purpose.
- Licensing is NJ only. PA and DE customers will need their rows checked before the pack is sent.
- Tier 3 rests on fewer first-hand accounts than Tiers 1 and 2 (mostly vendor help docs and community threads). The first real Tier 3 respondent should be read as a correction to Denise, not a confirmation.
- Nothing here is from a Brad customer yet. First real answers replace the weakest example in each tier.

---

## Sources

Listed in the pack under `sources[]` with a `used_for` note on each. Retrieved 2026-09-08.

1. R&J Plumbing — Plumbing Service Coordinator / QuickBooks Specialist (job posting) — https://www.plumbingjobs.org/jobs/plumbing-service-coordinator-quickbooks-specialist-r-j-plumbing-3ec1761f
2. Homestead Service Partners — Office Manager, commercial HVAC (job posting) — https://homesteadsp.com/office-manager/
3. Uplifting Air — CSR/Dispatcher (job posting) — https://www.careerbuilder.com/job-details/hvac-experienced-customer-service-representative-dispatcher-san-antonio-fl--0cf4fdd7-654c-4f47-b9b4-b888f3e08e3c
4. Blue Sky Plumbing & Heating — Service Coordinator (job posting) — https://www.careerbuilder.com/job-details/service-coordinator-wheat-ridge-co--507f1992-d7c9-4b79-91ac-20e6e5063402
5. ServiceTitan Community — tracking extended warranty labor claims — https://community.servicetitan.com/t5/General-Office/Tracking-Extended-Warranty-Labor-Claims/m-p/19613/highlight/true
6. ServiceTitan Community — recalls SOP — https://community.servicetitan.com/t5/General/Seeking-Best-Practices-and-SOPs-for-Handling-Recalls-Including/td-p/45542
7. ServiceTitan Community — purchasing / counter receipts — https://community.servicetitan.com/t5/Inventory/Can-someone-explain-service-titans-thinking-on-the-purchsing/m-p/30855
8. ServiceTitan Community — auto-renewal notices — https://community.servicetitan.com/t5/Memberships-or-Service/Notify-Customer-of-Automatic-Membership-Renewal/td-p/21511
9. ServiceTitan help — Rollup Reporting (Enterprise Hub) — https://help.servicetitan.com/how-to/rollup-reporting
10. r/servicetitan — payroll re-keyed into QuickBooks — https://www.reddit.com/r/servicetitan/comments/1bzshpx/servicetitan_payroll/
11. r/servicetitan — exports are PDF/XLS only — https://www.reddit.com/r/servicetitan/comments/1avspok/has_anyone_successfully_pulled_data_from/
12. Housecall Pro — service plan renewals — https://help.housecallpro.com/en/articles/6879916-service-plan-renewals
13. Housecall Pro — API overview (Max plan only) — https://help.housecallpro.com/en/articles/8505035-api-overview
14. Housecall Pro — Capterra reviews — https://www.capterra.com/p/140363/HouseCall-Pro/reviews/
15. Jobber — HVAC service contract guide — https://www.getjobber.com/academy/hvac/hvac-service-contract/
16. r/Plumbing — two-man operation, invoicing as a second job — https://www.reddit.com/r/Plumbing/comments/1rsc332/running_a_twoman_plumbing_operation_how_do_you/
17. r/Plumbing — nightly transfer of invoices into QuickBooks — https://www.reddit.com/r/Plumbing/comments/csmzd3/what_do_you_business_owners_use_to_invoice_i_need/
18. r/HVAC — solo owner on Square, equipment history, double-booking — https://www.reddit.com/r/HVAC/comments/1m1qdhf/advice_needed_for_crm_and_organization_in_hvac/
19. r/HVAC — unregistered equipment warranties — https://www.reddit.com/r/HVAC/comments/1l7l1dw/extended_warranty_registration/
20. Service Business Mastery — dispatcher responsibilities — https://servicebusinessmastery.com/dispatcher-responsibilities-and-tips/
21. Heating Help forum — what should be in a service van — https://forum.heatinghelp.com/discussion/63487/what-should-be-in-a-service-vans-stock
22. Contractor Magazine — what plumbing contractors leave on the table — https://www.contractormag.com/management/best-practices/article/55390232/what-plumbing-contractors-are-leaving-on-the-table-between-service-calls
23. Contractor Magazine — service agreements tracked by hand — https://www.contractormag.com/management/best-practices/article/21214365/solutions-for-successful-service-agreements
24. Samsara — HVAC peak season from 65M service trips — https://www.samsara.com/blog/peak-season-for-hvac
25. ACHR News — shoulder seasons — https://www.achrnews.com/articles/129283-fighting-through-stagnant-shoulder-seasons
26. ServiceTitan — Thanksgiving plumbing data — https://www.servicetitan.com/blog/brown-friday-plumbing-data
27. N.J.A.C. 5:23-2.17A — minor work — https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-5-23-2-17A
28. N.J.A.C. 13:32A-5-3 — HVACR license number on trucks, invoices, ads — https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-32A-5-3
29. N.J.A.C. 13:32-3.1 — master plumber name and license on vehicles and invoices — https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-32-3-1
30. N.J.A.C. 13:32-1.4 — licensed-only plumbing work — https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-32-1-4
31. EPA — Section 608 technician certification and record-keeping — https://www.epa.gov/section608/section-608-technician-certification-requirements
32. EPA — recordkeeping and reporting, stationary refrigeration — https://www.epa.gov/section608/recordkeeping-and-reporting-requirements-stationary-refrigeration
33. Goodman — warranty registration within 60 days — https://www.goodmanmfg.com/resources/hvac-learning-center/warranty/the-air-conditioner-limited-warranty---the-why-when-how
34. Carrier — homeowner warranty (90 days to register) — https://www.carrier.com/residential/en/us/homeowner-resources/warranty/
35. Rheem — water heater warranty runs from install date with proof — https://files.myrheem.com/webpartners/ProductDocuments/5B5E5868-D97B-4418-82FA-A2523B25C6B1.pdf
36. Bradford White — warranty FAQ (claims via distributor) — https://www.bradfordwhite.com/warranty-faqs/
37. PCI SSC — storage of sensitive authentication data — https://www.pcisecuritystandards.org/faq/articles/Frequently_Asked_Question/for-pci-dss-why-is-storage-of-sensitive-authentication-data-sad-after-authorization-not-permitted-even-when-there-are-no-primary-account-numbers-pans-in-an-environment/
38. FMCSA — do I need a USDOT number — https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number

---

## Changelog

- **2026-09-08** — First version, written alongside pack 1.0.0.
