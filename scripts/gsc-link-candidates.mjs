import fs from "node:fs";
import { pathToFileURL } from "node:url";

/** RFC 4180 CSV, including quoted commas, line breaks, escaped quotes and BOM. */
export function parseCsv(input) {
  const rows = []; let row = [], cell = "", quoted = false;
  const text = input.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else if (!quoted && cell) throw new Error("Unexpected quote in CSV cell");
      else quoted = !quoted;
    } else if (ch === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (quoted) throw new Error("Unclosed CSV quote");
  row.push(cell); if (row.some(Boolean)) rows.push(row);
  if (!rows.length) throw new Error("Empty CSV");
  const headers = rows.shift().map(s => s.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) throw new Error("Duplicate CSV headers");
  return rows.map((r, i) => {
    if (r.length !== headers.length) throw new Error(`CSV row ${i + 2} has the wrong number of cells`);
    return Object.fromEntries(headers.map((h, j) => [h, r[j].trim()]));
  });
}

export function candidates(rows, graph = []) {
  const number = (value) => value?.trim() ? Number(value.replaceAll(",", "")) : NaN;
  const tokens = text => new Set(text.toLowerCase().match(/[a-z0-9]+/g)?.filter(s => s.length > 3 && !["https", "christianbrinkleync", "guides", "medicare", "tools", "wealth"].includes(s)) ?? []);
  return rows.flatMap(row => {
    const raw = row.page ?? row["top pages"];
    if (!raw) throw new Error("A page export is required. Separate query and page exports cannot establish query-page pairs.");
    let url; try { url = new URL(raw); } catch { throw new Error(`Invalid page URL: ${raw}`); }
    if (url.origin !== "https://christianbrinkleync.com" || url.search || url.hash) return [];
    const position = number(row.position), impressions = number(row.impressions), clicks = number(row.clicks);
    if (![position, impressions, clicks].every(Number.isFinite) || clicks < 0 || impressions < 30 || position < 5 || position > 15) return [];
    const query = row.query ?? row["top queries"] ?? null;
    const topic = tokens(url.pathname + " " + (query ?? ""));
    const sources = graph.filter(page => page.path !== url.pathname && page.indexable !== false && !page.links?.includes(url.pathname))
      .map(page => ({ path: page.path, score: [...tokens(page.title + " " + page.path)].filter(t => topic.has(t)).length }))
      .filter(page => page.score > 0).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path)).slice(0, 3).map(page => page.path);
    return [{ page: url.pathname, query, clicks, impressions, position, suggestedSources: sources }];
  }).sort((a, b) => b.impressions - a.impressions || a.page.localeCompare(b.page));
}

export function report(items) {
  const clean = value => String(value ?? "Page aggregate; no query-page pairing supplied").replaceAll("|", "\\|").replace(/[\r\n]/g, " ");
  const count = new Set(items.map(item => item.page)).size;
  return `# Search Console linking candidates\n\nImported data only. Suggestions require editorial review; no links are inserted.\n\n${count < 10 ? "Experiment postponed: fewer than 10 qualifying target pages." : "Choose at most 10 target pages and record matched test/control groups before editing."}\n\n| Page | Query or aggregation | Clicks | Impressions | Position | Possible source pages |\n| --- | --- | ---: | ---: | ---: | --- |\n` + items.map(item => `| ${clean(item.page)} | ${clean(item.query)} | ${item.clicks} | ${item.impressions} | ${item.position} | ${item.suggestedSources.map(clean).join(", ") || "Needs crawl graph or editorial research"} |`).join("\n") + "\n";
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [csv, graph, out] = process.argv.slice(2);
  if (!csv) throw new Error("Usage: node scripts/gsc-link-candidates.mjs pages.csv [crawl.json] [report.md]");
  const items = candidates(parseCsv(fs.readFileSync(csv, "utf8")), graph ? JSON.parse(fs.readFileSync(graph, "utf8")) : []);
  const output = report(items);
  if (out) fs.writeFileSync(out, output); else process.stdout.write(output);
}
