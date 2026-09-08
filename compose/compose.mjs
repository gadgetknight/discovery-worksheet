/**
 * compose.mjs — composes one worksheet from the library.
 * Version 1.0.0 — 2026-09-08
 *
 * compose({ spine, tier, pack, trade, consultant }) → { config, schema, coverage }
 *
 * Pure function, no I/O, no dependencies. Ports to lib/discovery/compose.ts in
 * CRM_platform unchanged when the app is built.
 *
 * CHANGELOG
 * 1.0.0  2026-09-08  First version: vocabulary tokens, tier filtering, list
 *                    expansion, pack overrides, persona examples with trade
 *                    overrides, tier masthead, coverage report.
 */

const TOKEN_KEYS = ["customer", "customers", "job", "jobs", "worker", "workers", "org", "system", "tradeNoun"];

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

/** Replace {token} and {Token} in a string. Consultant/person tokens are left for the engine. */
function makeSub(vocab) {
  const map = {};
  for (const k of TOKEN_KEYS) {
    if (vocab[k] == null) continue;
    map[k] = vocab[k];
    map[cap(k)] = cap(vocab[k]);
  }
  const re = new RegExp("\\{(" + Object.keys(map).join("|") + ")\\}", "g");
  return (s) => (typeof s === "string" ? s.replace(re, (_, k) => map[k]) : s);
}

/** Apply sub() to every string in a JSON-ish value, recursively. */
function deepSub(v, sub) {
  if (typeof v === "string") return sub(v);
  if (Array.isArray(v)) return v.map((x) => deepSub(x, sub));
  if (v && typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v)) o[k] = deepSub(x, sub); return o; }
  return v;
}

function clone(v) { return JSON.parse(JSON.stringify(v)); }

export function compose({ spine, tier, pack, trade, consultant, note }) {
  const tradeDef = pack.trades?.[trade];
  if (!tradeDef) throw new Error(`Pack ${pack.id} has no trade "${trade}"`);
  if (tradeDef.enabled === false) throw new Error(`Trade "${trade}" in pack ${pack.id} is disabled: ${tradeDef.reason || "no examples yet"}`);

  const tierKey = tier.key; // t1 | t2 | t3
  const vocab = { ...pack.vocab, tradeNoun: tradeDef.tradeNoun || tradeDef.label.toLowerCase() };
  const sub = makeSub(vocab);

  const persona = deepSub(clone(pack.personas[tierKey]), sub);
  const tradeEx = pack.tradeExamples?.[trade] || {};

  function exampleFor(qid) {
    const fromTrade = tradeEx[qid]?.[tierKey];
    if (fromTrade !== undefined) return fromTrade;
    return pack.examples?.[qid]?.[tierKey];
  }

  const missing = [], present = [];
  const schema = [];
  for (const pid of tier.parts) {
    const part = spine.parts.find((p) => p.id === pid);
    if (!part) throw new Error(`Tier ${tier.id} lists unknown part ${pid}`);
    if (part.tiers && !part.tiers.includes(tier.id)) continue;
    const questions = [];
    for (const q0 of part.questions) {
      if (!(q0.tiers || [1, 2, 3]).includes(tier.id)) continue;
      let q = clone(q0);
      delete q.tiers;
      // pack overrides
      if (pack.overrides?.[q.id]) q = { ...q, ...clone(pack.overrides[q.id]) };
      // list expansion
      if (q.listKey) {
        const list = pack.lists?.[q.listKey];
        if (!list) throw new Error(`Question ${q.id} wants list "${q.listKey}" which pack ${pack.id} does not define`);
        q.options = clone(list);
        delete q.listKey;
      }
      // examples
      const ex = exampleFor(q.id);
      const NO_EXAMPLE_NEEDED = new Set(["p1.name", "p1.role", "p1.org", "p1.email", "p5.examples_who", "t1.who", "t1.tools", "t1.feedback", "t1.mode"]);
      const wantsExample = !NO_EXAMPLE_NEEDED.has(q.id) && !q.id.startsWith("pf.") && !["checkboxes", "yesno"].includes(q.type) && (q.type !== "radio" || q.id === "p4.where");
      if (ex !== undefined) {
        if (q.type === "table" && Array.isArray(ex)) q.exampleRows = clone(ex);
        else q.example = clone(ex);
        present.push(q.id);
      } else if (wantsExample) {
        missing.push(q.id);
      }
      questions.push(deepSub(q, sub));
    }
    if (!questions.length) continue;
    const out = {
      id: part.id, num: part.num, title: sub(part.title),
      minutes: part.minutes?.[String(tier.id)] ?? part.minutes?.[tier.id] ?? null,
      intro: sub(part.intro || ""),
      questions,
    };
    if (part.rule) out.rule = deepSub(clone(part.rule), sub);
    if (part.aside) out.aside = sub(part.aside);
    if (part.tipsKey && pack.tips?.[part.tipsKey]) out.tips = { eyebrow: "If you get stuck", items: pack.tips[part.tipsKey].map(sub) };
    schema.push(out);
  }

  const c = consultant;
  const meta = {
    pack: pack.id, packName: pack.name, packVersion: pack.version,
    trade, tradeLabel: tradeDef.label,
    tier: tier.id, tierName: tier.name,
    persona: persona.name, spineVersion: spine.version,
    builtAt: new Date().toISOString().slice(0, 10),
  };

  const config = {
    title: "Where the Time Goes",
    consultantFirst: c.first, consultantName: c.name, consultantEmail: c.email,
    minutes: tier.minutesLabel,
    submitUrl: c.submitUrl || "",
    storageKey: `wtg-${pack.id}-${trade}-t${tier.id}`,
    exampleWho: `${persona.name}, ${persona.role}`,
    persona,
    mode: tier.mode,
    sittings: tier.sittings ? clone(tier.sittings) : null,
    masthead: deepSub(clone(tier.masthead), sub),
    finishText: sub(tier.finishText || ""),
    exampleOpenByDefault: !!tier.exampleOpenByDefault,
    note: note || "",
    meta,
  };

  return { config, schema, coverage: { present, missing } };
}

/** Inject a composed worksheet into the engine template. */
export function render(template, { config, schema }, title) {
  const cfg = JSON.stringify(config, null, 0).replace(/<\/script/gi, "<\\/script");
  const sch = JSON.stringify(schema, null, 0).replace(/<\/script/gi, "<\\/script");
  return template
    .replace("__TITLE__", title)
    .replace("/*__CONFIG__*/{}/*__END_CONFIG__*/", cfg)
    .replace("/*__SCHEMA__*/[]/*__END_SCHEMA__*/", sch);
}
