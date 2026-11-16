// Lead attribution report. LOCAL ONLY.
//
//   npm run report:attribution
//   npm run report:attribution -- --days=30
//   npm run report:attribution -- --all --out=.cache/attribution/all.html
//   npm run report:attribution -- --sample        (fictional data, no database)
//
// What it does: reads the lead rows that /api/capture-lead already stores in
// Supabase and prints counts. Leads by source tool, by UTM source and medium,
// by week, and contact-step starts against completions where that data exists.
//
// Why it is a script and not a page: the site has no login, so a deployed
// report would put lead data on a public URL. This file is never imported by
// the app. It refuses to write its HTML file inside public/ or app/.
//
// Privacy: it selects only the columns it counts (date, source, topic, tool
// label, campaign tags). It never selects a name, an email, a phone number, a
// ZIP code, or any answer text, and it prints counts only.
//
// Credentials: read from the environment (.env.local through @next/env).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. No key is written in this file.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DAY_MS = 86_400_000;
const PAGE_SIZE = 1000;
const MAX_ROWS = 50_000;

/** Short, printable text. Database values are never trusted as markup. */
export function clean(value, limit = 60) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

const WIZARD_TOOLS = [
  ["IRMAA checker", "IRMAA checker (/irmaa-checker)"],
  ["Cost calculator", "Greensboro cost calculator (/greensboro-medicare-cost-calculator)"],
  ["Plan checklist", "Plan checklist (/plan-checklist-tool)"],
];
const ROTH_TOOLS = [
  ["Plan 65", "Plan 65 planner (/plan)"],
  ["Roth window", "Roth window calculator (/roth-window)"],
];

/**
 * Which tool produced a lead.
 *
 * The capture API accepts five source values only, so several tools share
 * "wizard_completion" or "roth_calculator". Each of those tools starts the
 * irmaa_bracket text with its own name, and this reads that prefix.
 */
export function toolFor(row) {
  const source = clean(row?.source, 40);
  const label = clean(row?.irmaa_bracket, 100);
  const match = (table) => table.find(([prefix]) => label.startsWith(prefix))?.[1];

  if (source === "wizard_completion") return match(WIZARD_TOOLS) ?? "Medicare wizard (/medicare)";
  if (source === "roth_calculator") return match(ROTH_TOOLS) ?? "Roth calculator (other)";
  if (source === "help_quiz") return "Help quiz (/start)";
  if (source === "quiz-2026") return "Plan check quiz (/plan-check)";
  if (source === "about_page_cta") return "About page form";
  return source ? `Other source: ${source}` : "No source recorded";
}

function attributionOf(row) {
  const value = row?.attribution;
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

/** "google / cpc", or "(no tag) / (no tag)" when the visit had no UTM tags. */
export function utmFor(row) {
  const attribution = attributionOf(row);
  const source = clean(attribution.utm_source, 40).toLowerCase() || "(no tag)";
  const medium = clean(attribution.utm_medium, 40).toLowerCase() || "(no tag)";
  return `${source} / ${medium}`;
}

/** For leads with no UTM tag: the site that sent the visitor, host only. */
export function referrerFor(row) {
  const attribution = attributionOf(row);
  if (clean(attribution.utm_source, 40)) return null;
  if (clean(attribution.gclid, 300)) return "Google Ads click id, no UTM tag";
  if (clean(attribution.fbclid, 300)) return "Facebook click id, no UTM tag";
  const referrer = clean(attribution.referrer, 300);
  if (!referrer) return "Direct, or referrer not recorded";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "") || "Direct, or referrer not recorded";
  } catch {
    return "Direct, or referrer not recorded";
  }
}

/** The Monday that starts the row's week, in UTC, as YYYY-MM-DD. */
export function weekOf(value) {
  // new Date(null) is 1970, which would invent a week. Text dates only.
  if (typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = date.getUTCDay();
  const monday = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - ((day + 6) % 7)),
  );
  return monday.toISOString().slice(0, 10);
}

function tally(values) {
  const counts = new Map();
  for (const value of values) {
    if (value == null) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * Builds the whole report from plain rows. Pure: no database, no clock except
 * the `now` passed in.
 *
 * leads:    { created_at, source, interest_topic, irmaa_bracket, attribution }
 * partials: { created_at, interest_topic } or null when the table is not there
 */
export function summarize({ leads, partials = null, days = null, now = new Date(), table = "" }) {
  const dated = leads.filter((row) => weekOf(row?.created_at) !== null);

  const weekCounts = new Map();
  for (const row of dated) {
    const week = weekOf(row.created_at);
    weekCounts.set(week, (weekCounts.get(week) ?? 0) + 1);
  }
  const weeks = [...weekCounts.keys()].sort();
  const byWeek = [];
  if (weeks.length > 0) {
    // Fill empty weeks so a quiet week shows as 0, not as a gap.
    const last = new Date(`${weeks[weeks.length - 1]}T00:00:00Z`).getTime();
    for (let at = new Date(`${weeks[0]}T00:00:00Z`).getTime(); at <= last; at += 7 * DAY_MS) {
      const label = new Date(at).toISOString().slice(0, 10);
      byWeek.push({ label, count: weekCounts.get(label) ?? 0 });
    }
  }

  let funnel = null;
  if (partials) {
    const topics = new Set();
    const started = new Map();
    const completed = new Map();
    for (const row of partials) {
      const topic = clean(row?.interest_topic, 40) || "(no topic)";
      topics.add(topic);
      started.set(topic, (started.get(topic) ?? 0) + 1);
    }
    // Only the help quiz records a start, so only its leads are completions.
    for (const row of dated.filter((lead) => clean(lead.source, 40) === "help_quiz")) {
      const topic = clean(row.interest_topic, 40) || "(no topic)";
      topics.add(topic);
      completed.set(topic, (completed.get(topic) ?? 0) + 1);
    }
    funnel = [...topics].sort().map((topic) => {
      const starts = started.get(topic) ?? 0;
      const completions = completed.get(topic) ?? 0;
      return {
        label: topic,
        starts,
        completions,
        rate: starts > 0 ? Math.round((completions / starts) * 100) : null,
      };
    });
  }

  return {
    generatedAt: now.toISOString(),
    window: days ? `Last ${days} days` : "All dates",
    table,
    total: dated.length,
    undated: leads.length - dated.length,
    byTool: tally(dated.map(toolFor)),
    byUtm: tally(dated.map(utmFor)),
    byReferrer: tally(dated.map(referrerFor)),
    byWeek,
    funnel,
  };
}

const FUNNEL_NOTE =
  "Starts are visits that reached the contact step of the help quiz (table lead_events). " +
  "Completions are help quiz leads. Calculator starts and completions (tool_start, " +
  "tool_complete) are in the analytics tool, not in Supabase.";

function textTable(title, rows, emptyNote) {
  const lines = [title, "-".repeat(title.length)];
  if (rows.length === 0) return [...lines, emptyNote, ""].join("\n");
  const width = Math.max(...rows.map((row) => String(row.count).length));
  for (const row of rows) lines.push(`${String(row.count).padStart(width)}  ${row.label}`);
  return [...lines, ""].join("\n");
}

export function renderText(summary) {
  const out = [
    "LEAD ATTRIBUTION REPORT",
    "=======================",
    `Made: ${summary.generatedAt}`,
    `Dates: ${summary.window}`,
    `Table: ${summary.table || "(sample data)"}`,
    `Total leads: ${summary.total}`,
    summary.undated > 0 ? `Rows with no usable date, not counted: ${summary.undated}` : null,
    "Counts only. No names, emails, or phone numbers are read or printed.",
    "",
    textTable("Leads by source tool", summary.byTool, "No leads in these dates."),
    textTable("Leads by UTM source / medium", summary.byUtm, "No leads in these dates."),
    textTable(
      "Leads with no UTM tag, by where the visit came from",
      summary.byReferrer,
      "Every lead had a UTM tag.",
    ),
    textTable("Leads by week (week starts Monday, UTC)", summary.byWeek, "No leads in these dates."),
  ].filter((line) => line !== null);

  const title = "Contact-step starts and completions (help quiz)";
  out.push(title, "-".repeat(title.length));
  if (!summary.funnel) {
    out.push("Not available. The lead_events table could not be read.");
  } else if (summary.funnel.length === 0) {
    out.push("No starts or completions in these dates.");
  } else {
    for (const row of summary.funnel) {
      const rate = row.rate === null ? "no starts recorded" : `${row.rate}% completed`;
      const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;
      out.push(
        `${row.label}: ${plural(row.starts, "start")}, ${plural(row.completions, "completion")}, ${rate}`,
      );
    }
  }
  out.push(FUNNEL_NOTE, "");
  return out.join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlTable(title, rows, emptyNote, head = ["Leads", "Group"]) {
  if (rows.length === 0) return `<h2>${escapeHtml(title)}</h2><p>${escapeHtml(emptyNote)}</p>`;
  const max = Math.max(1, ...rows.map((row) => row.count));
  const body = rows
    .map(
      (row) =>
        `<tr><td class="n">${row.count}</td><td>${escapeHtml(row.label)}<div class="bar" style="width:${Math.round((row.count / max) * 100)}%"></div></td></tr>`,
    )
    .join("");
  return `<h2>${escapeHtml(title)}</h2><table><thead><tr><th class="n">${escapeHtml(head[0])}</th><th>${escapeHtml(head[1])}</th></tr></thead><tbody>${body}</tbody></table>`;
}

export function renderHtml(summary) {
  const funnel = !summary.funnel
    ? "<p>Not available. The lead_events table could not be read.</p>"
    : summary.funnel.length === 0
      ? "<p>No starts or completions in these dates.</p>"
      : `<table><thead><tr><th>Topic</th><th class="n">Starts</th><th class="n">Completions</th><th class="n">Completed</th></tr></thead><tbody>${summary.funnel
          .map(
            (row) =>
              `<tr><td>${escapeHtml(row.label)}</td><td class="n">${row.starts}</td><td class="n">${row.completions}</td><td class="n">${row.rate === null ? "n/a" : `${row.rate}%`}</td></tr>`,
          )
          .join("")}</tbody></table>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lead attribution report</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;color:#152e34;max-width:820px;margin:2rem auto;padding:0 1rem;line-height:1.5}
h1{font-size:1.6rem}h2{font-size:1.15rem;margin-top:2rem;border-bottom:2px solid #152e34;padding-bottom:.25rem}
table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.45rem .6rem;border-bottom:1px solid #d9ded8;vertical-align:top}
.n{text-align:right;white-space:nowrap;width:6rem}.bar{height:6px;background:#152e34;border-radius:3px;margin-top:4px}
.note{background:#f7f3ea;border-left:4px solid #152e34;padding:.75rem 1rem}
</style>
</head>
<body>
<h1>Lead attribution report</h1>
<p>Made ${escapeHtml(summary.generatedAt)}. Dates: ${escapeHtml(summary.window)}. Table: ${escapeHtml(summary.table || "(sample data)")}.</p>
<p><strong>Total leads: ${summary.total}</strong>${summary.undated > 0 ? `. Rows with no usable date, not counted: ${summary.undated}` : ""}</p>
<p class="note">Local file. Counts only. Do not upload this file or put it in the website folder.</p>
${htmlTable("Leads by source tool", summary.byTool, "No leads in these dates.", ["Leads", "Tool"])}
${htmlTable("Leads by UTM source / medium", summary.byUtm, "No leads in these dates.", ["Leads", "Source / medium"])}
${htmlTable("Leads with no UTM tag, by where the visit came from", summary.byReferrer, "Every lead had a UTM tag.", ["Leads", "Came from"])}
${htmlTable("Leads by week (week starts Monday, UTC)", summary.byWeek, "No leads in these dates.", ["Leads", "Week of"])}
<h2>Contact-step starts and completions (help quiz)</h2>
${funnel}
<p>${escapeHtml(FUNNEL_NOTE)}</p>
</body>
</html>
`;
}

/** Fictional rows for --sample and for the tests. No real lead appears here. */
export function sampleData() {
  const lead = (created_at, source, irmaa_bracket, attribution, interest_topic = null) => ({
    created_at,
    source,
    irmaa_bracket,
    attribution,
    interest_topic,
  });
  const google = { utm_source: "google", utm_medium: "organic" };
  const facebook = { utm_source: "facebook", utm_medium: "social", utm_campaign: "sample-post" };
  const nextdoor = { utm_source: "nextdoor", utm_medium: "social" };
  return {
    leads: [
      lead("2026-11-02T14:00:00Z", "wizard_completion", "IRMAA checker 2026: Tier 2 IRMAA, Part D +$37.50/mo", google),
      lead("2026-11-03T15:30:00Z", "wizard_completion", "IRMAA checker 2026: Standard (No Surcharge), Part D +$0.00/mo", google),
      lead("2026-11-04T09:10:00Z", "wizard_completion", "Cost calculator, 2027 projected Part B: Medigap est. $6,104/yr, Advantage est. $3,218/yr", facebook),
      lead("2026-11-05T18:45:00Z", "wizard_completion", "Plan checklist: asked for contact after making a sheet", nextdoor, "medicare"),
      lead("2026-11-06T11:00:00Z", "wizard_completion", "Tier 1 IRMAA", null),
      lead("2026-11-10T13:20:00Z", "help_quiz", null, facebook, "medicare"),
      lead("2026-11-11T16:05:00Z", "help_quiz", null, { referrer: "https://www.bing.com/search" }, "medicare"),
      lead("2026-11-12T10:15:00Z", "help_quiz", null, null, "life_insurance"),
      lead("2026-11-12T19:40:00Z", "roth_calculator", "Plan 65, Standard (No Surcharge), headroom $12,000", google),
      lead("2026-11-13T08:55:00Z", "quiz-2026", null, { gclid: "sample-click-id" }, "medicare"),
    ],
    partials: [
      { created_at: "2026-11-09T12:00:00Z", interest_topic: "medicare" },
      { created_at: "2026-11-10T13:18:00Z", interest_topic: "medicare" },
      { created_at: "2026-11-11T16:01:00Z", interest_topic: "medicare" },
      { created_at: "2026-11-11T17:30:00Z", interest_topic: "medicare" },
      { created_at: "2026-11-12T10:12:00Z", interest_topic: "life_insurance" },
      { created_at: "2026-11-13T09:00:00Z", interest_topic: "life_insurance" },
    ],
  };
}

/** --days=30, --all, --out=file.html, --table=leads, --sample */
export function parseArgs(argv) {
  const options = { days: 90, out: null, table: null, sample: false };
  for (const arg of argv) {
    if (arg === "--all") options.days = null;
    else if (arg === "--sample") options.sample = true;
    else if (arg.startsWith("--days=")) {
      const days = Number.parseInt(arg.slice(7), 10);
      if (!Number.isInteger(days) || days < 1 || days > 3650) {
        throw new Error("--days must be a whole number from 1 to 3650.");
      }
      options.days = days;
    } else if (arg.startsWith("--out=")) options.out = arg.slice(6);
    else if (arg.startsWith("--table=")) {
      const table = arg.slice(8);
      if (table !== "leads" && table !== "website_inquiries") {
        throw new Error("--table must be leads or website_inquiries.");
      }
      options.table = table;
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

/** The HTML file must never land where the website would serve it. */
export function safeOutPath(out, cwd = process.cwd()) {
  const resolved = path.resolve(cwd, out);
  const relative = path.relative(cwd, resolved).split(path.sep).join("/");
  if (/^(public|app|\.next|out|netlify)(\/|$)/i.test(relative)) {
    throw new Error(
      `Refusing to write the report to "${relative}". That folder is part of the website. Choose a folder outside it, for example .cache/attribution/.`,
    );
  }
  if (!/\.html?$/i.test(resolved)) throw new Error("--out must end in .html");
  return resolved;
}

const TABLES = {
  // The Command Center keeps the full website row in `payload`. Only the two
  // fields the report needs are pulled out of it, inside the database.
  website_inquiries: {
    date: "received_at",
    select:
      "created_at:received_at, source, interest_topic, irmaa_bracket:payload->>irmaa_bracket, attribution:payload->attribution",
  },
  leads: {
    date: "created_at",
    select: "created_at, source, interest_topic, irmaa_bracket, attribution",
  },
};

async function readAll(db, table, select, dateColumn, since) {
  const rows = [];
  for (let from = 0; from < MAX_ROWS; from += PAGE_SIZE) {
    let query = db
      .from(table)
      .select(select)
      .order(dateColumn, { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (since) query = query.gte(dateColumn, since);
    const { data, error } = await query;
    if (error) return { rows: null, error };
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return { rows, error: null };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const now = new Date();
  let input;

  if (options.sample) {
    input = { ...sampleData(), table: "" };
    console.log("SAMPLE RUN. Every row below is fictional. No database was read.\n");
  } else {
    const { default: nextEnv } = await import("@next/env");
    nextEnv.loadEnvConfig(process.cwd());
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error(
        [
          "The Supabase service key is missing, so no report was made.",
          `  SUPABASE_URL: ${url ? "set" : "MISSING"}`,
          `  SUPABASE_SERVICE_ROLE_KEY: ${key ? "set" : "MISSING"}`,
          "Put both values in .env.local in this folder, then run the command again.",
          "The key is never printed and is never written to a file by this script.",
          "To see the report layout with fictional data: npm run report:attribution -- --sample",
        ].join("\n"),
      );
      process.exitCode = 1;
      return;
    }

    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (target, init) => fetch(target, { ...init, signal: AbortSignal.timeout(20000) }),
      },
    });
    const since = options.days ? new Date(now.getTime() - options.days * DAY_MS).toISOString() : null;

    // website_inquiries exists only in the Command Center database. When it is
    // there it holds the website leads, and `leads` holds other records too.
    let table = options.table;
    let leads = null;
    for (const candidate of table ? [table] : ["website_inquiries", "leads"]) {
      const spec = TABLES[candidate];
      const result = await readAll(db, candidate, spec.select, spec.date, since);
      if (result.rows) {
        table = candidate;
        leads = result.rows;
        break;
      }
      console.error(`Could not read table "${candidate}" (${result.error?.code ?? "no code"}).`);
    }
    if (!leads) {
      console.error(
        "No lead table could be read with this key. Check that SUPABASE_URL points at the database that /api/capture-lead writes to.",
      );
      process.exitCode = 1;
      return;
    }

    const partial = await readAll(db, "lead_events", "created_at, interest_topic", "created_at", since);
    if (!partial.rows) {
      console.error(
        `Could not read table "lead_events" (${partial.error?.code ?? "no code"}). The starts section will say "Not available".`,
      );
    }
    input = { leads, partials: partial.rows, table };
  }

  const summary = summarize({ ...input, days: options.sample ? null : options.days, now });
  process.stdout.write(renderText(summary));

  const out = safeOutPath(
    options.out ?? `.cache/attribution/attribution-${now.toISOString().slice(0, 10)}${options.sample ? "-sample" : ""}.html`,
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderHtml(summary));
  console.log(`HTML report written to: ${out}`);
  console.log("This file is local. Do not upload it or move it into the website folders.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    // Message only. A stack trace or a response body could hold row data.
    console.error(`The report stopped: ${error instanceof Error ? error.message : "unknown error"}`);
    process.exitCode = 1;
  });
}
