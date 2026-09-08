#!/usr/bin/env node
/**
 * build.mjs — builds finished worksheets from the library.
 * Version 1.0.0 — 2026-09-08
 *
 *   node compose/build.mjs                       # every enabled pack × trade × tier
 *   node compose/build.mjs --pack field-service-trades --trade hvac --tier 2
 *
 * Output: out/<pack>/<trade>-t<tier>.html  (+ out/index.html, a plain list)
 * Prints a coverage line per build: how many questions have a persona example.
 *
 * CHANGELOG
 * 1.0.0  2026-09-08  First version.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compose, render } from "./compose.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const lib = join(root, "library");
const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => a.startsWith("--") ? [a.slice(2), (arr[i + 1] && !arr[i + 1].startsWith("--")) ? arr[i + 1] : true] : []).filter(Boolean));

const consultant = JSON.parse(readFileSync(join(lib, "consultant.json"), "utf8"));
const spine = JSON.parse(readFileSync(join(lib, "spine.json"), "utf8"));
const tiers = [1, 2, 3].map((n) => JSON.parse(readFileSync(join(lib, "tiers", `tier${n}.json`), "utf8")));
const template = readFileSync(join(here, "template.html"), "utf8");
const packFiles = readdirSync(join(lib, "packs")).filter((f) => f.endsWith(".json"));
const outDir = join(root, args.out || "out");

const built = [];
for (const f of packFiles) {
  const pack = JSON.parse(readFileSync(join(lib, "packs", f), "utf8"));
  if (args.pack && args.pack !== pack.id) continue;
  for (const [trade, def] of Object.entries(pack.trades)) {
    if (args.trade && args.trade !== trade) continue;
    if (def.enabled === false) { console.log(`skip  ${pack.id}/${trade}: disabled — ${def.reason || "no examples"}`); continue; }
    for (const tier of tiers) {
      if (args.tier && String(args.tier) !== String(tier.id)) continue;
      const composed = compose({ spine, tier, pack, trade, consultant });
      const title = `Where the Time Goes · ${def.label}`;
      const html = render(template, composed, title);
      const dir = join(outDir, pack.id); mkdirSync(dir, { recursive: true });
      const file = `${trade}-t${tier.id}.html`;
      writeFileSync(join(dir, file), html);
      const q = composed.schema.reduce((n, p) => n + p.questions.length, 0);
      const { present, missing } = composed.coverage;
      console.log(`built ${pack.id}/${file}  ${q} questions · examples on ${present.length}${missing.length ? ` · missing: ${missing.join(", ")}` : ""}`);
      built.push({ pack: pack.name, trade: def.label, tier: `${tier.id} · ${tier.name}`, path: `${pack.id}/${file}`, minutes: tier.minutesLabel, questions: q });
    }
  }
}

// a plain index so the out/ folder can be deployed as-is
const rows = built.map((b) => `<tr><td>${b.pack}</td><td>${b.trade}</td><td>${b.tier}</td><td>${b.minutes}</td><td>${b.questions}</td><td><a href="${b.path}">${b.path}</a> · <a href="${b.path}?name=Sample&co=Sample%20Co">personalized</a> · <a href="${b.path}?interview=1">interview</a></td></tr>`).join("\n");
const index = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Discovery worksheets — library builds</title>
<style>body{font-family:system-ui,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;color:#1C2430}table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:8px 10px;border-bottom:1px solid #DCE2E8;font-size:15px}th{font-size:13px;color:#4A5563;text-transform:uppercase;letter-spacing:.04em}a{color:#1D5C86}p{color:#4A5563}</style></head><body>
<h1>Discovery worksheets</h1><p>Built ${new Date().toISOString().slice(0, 10)} from the library. Add <code>?name=First&amp;co=Company</code> to personalize a link; <code>?interview=1</code> for interview mode. Generated files — edit the library, not these.</p>
<table><thead><tr><th>Pack</th><th>Trade</th><th>Tier</th><th>Time</th><th>Questions</th><th>File</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), index);
console.log(`\n${built.length} worksheet(s) → ${outDir}`);
