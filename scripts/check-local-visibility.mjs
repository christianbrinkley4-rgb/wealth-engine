import { readFile, writeFile } from "node:fs/promises";

// Public HTTP verification only. No credentials, client data, or form submissions.
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const base = option("--base", "https://christianbrinkleync.com").replace(/\/$/, "");
const output = option("--output", "local-visibility-check.json");
const gscPath = option("--gsc", "");
const baseline = gscPath ? JSON.parse(await readFile(gscPath, "utf8")) : null;
const source = await readFile(new URL("../lib/localVisibilityCities.ts", import.meta.url), "utf8");
const slugs = [...source.matchAll(/^  (?:"([a-z-]+)"|([a-z-]+)): city\(/gm)].map(m => m[1] || m[2]);
if (slugs.length !== 14) throw new Error("Review the release scope before running this check.");
const sitemapResponse = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const paths = entries.map(url => new URL(url).pathname);
const results = [];
for (const path of [...slugs.map(slug => `/medicare-agent-${slug}-nc`), "/financial-planning-nc"]) {
  const response = await fetch(`${base}${path}`, { redirect: "manual", signal: AbortSignal.timeout(20000) });
  const html = await response.text();
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html) || /noindex/i.test(response.headers.get("x-robots-tag") || "");
  const result = {
    path, status: response.status, canonical, noindex,
    sitemapOccurrences: paths.filter(p => p === path).length,
    h1Count: (html.match(/<h1(?:\s|>)/g) || []).length,
    contactLink: html.includes('/start?topic='),
    phonePresent: html.includes("408-6671"),
    ...(baseline ? { presentInDelayedGscExamples: baseline.indexed_urls.includes(`${base}${path}`) } : {}),
  };
  result.ok = result.status === 200 && canonical === `${base}${path}` && !noindex && result.sitemapOccurrences === 1 && result.h1Count === 1 && result.contactLink && result.phonePresent;
  results.push(result);
}
for (const slug of ["oxford"]) {
  const response = await fetch(`${base}/medicare-${slug}-nc`, { redirect: "manual", signal: AbortSignal.timeout(20000) });
  const location = response.headers.get("location");
  results.push({ path: `/medicare-${slug}-nc`, status: response.status, location, ok: [301,308].includes(response.status) && new URL(location, base).pathname === `/medicare-agent-${slug}-nc` });
}
{
  const path = "/medicare-creedmoor-nc";
  const response = await fetch(`${base}${path}`, { redirect: "manual", signal: AbortSignal.timeout(20000) });
  const html = response.status === 200 ? await response.text() : "";
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html) || /noindex/i.test(response.headers.get("x-robots-tag") || "");
  results.push({
    path,
    status: response.status,
    canonical,
    noindex,
    sitemapOccurrences: paths.filter((p) => p === path).length,
    ok: response.status === 200 && canonical === `${base}${path}` && !noindex && paths.filter((p) => p === path).length === 1,
  });
}
const report = {
  checkedAt: new Date().toISOString(), base,
  ok: results.every(result => result.ok),
  sitemapCount: paths.length, uniqueSitemapCount: new Set(paths).size,
  results,
  ...(baseline ? { gscReportUpdated: baseline.gsc_report_updated, sitemapUrlsAbsentFromDelayedExamples: entries.filter(url => !baseline.indexed_urls.includes(url)) } : {}),
  limits: "HTTP eligibility is not proof of indexing, ranking, AI citations, or conversion uplift. GSC examples are delayed.",
};
await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ok: report.ok, checkedRoutes: results.length, sitemapCount: paths.length, output }));
if (!report.ok || report.sitemapCount !== report.uniqueSitemapCount) process.exitCode = 1;
