/** Read-only audit: node scripts/audit-search.mjs http://localhost:3222 [report.json] */
import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

const base = new URL(process.argv[2] || "http://localhost:3000");
if (!["http:", "https:"].includes(base.protocol)) throw new Error("Use an HTTP or HTTPS site URL.");
const reportPath = process.argv[3] || ".cache/search-audit.json";
const get = (url) => fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30_000) });
const sitemapResponse = await get(new URL("/sitemap.xml", base));
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const xml = new JSDOM(await sitemapResponse.text(), { contentType: "text/xml" });
const paths = [...xml.window.document.querySelectorAll("loc")].map((loc) => new URL(loc.textContent).pathname);
xml.window.close();
if (!paths.length) throw new Error("Sitemap contains no pages.");

const pages = [];
for (const pathname of paths) {
  const response = await get(new URL(pathname, base));
  const html = await response.text();
  // Parse only. Do not execute scripts, load subresources, or submit any forms.
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const content = (selector) => document.querySelector(selector)?.getAttribute("content") || null;
  const schemaTypes = [];
  let invalidJsonLd = false;
  for (const element of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const json = JSON.parse(element.textContent);
      const nodes = Array.isArray(json) ? json : json["@graph"] || [json];
      schemaTypes.push(...nodes.map((node) => node["@type"]));
    } catch { invalidJsonLd = true; }
  }
  pages.push({
    path: pathname,
    status: response.status,
    title: document.title,
    description: content('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null,
    openGraphTitle: content('meta[property="og:title"]'),
    twitterTitle: content('meta[name="twitter:title"]'),
    image: content('meta[property="og:image"]'),
    robots: content('meta[name="robots"]'),
    h1Count: document.querySelectorAll("h1").length,
    invalidJsonLd,
    schemaTypes,
    htmlBytes: Buffer.byteLength(html),
  });
  dom.window.close();
}
const duplicates = [...new Set(pages.map((page) => page.title))]
  .map((title) => ({ title, paths: pages.filter((page) => page.title === title).map((page) => page.path) }))
  .filter((group) => group.paths.length > 1);
const failures = pages.filter((page) =>
  page.status !== 200 || !page.title || !page.description || !page.image || !page.canonical ||
  new URL(page.canonical).pathname !== page.path || page.h1Count !== 1 || page.invalidJsonLd,
).map((page) => page.path);
const report = {
  auditedAt: new Date().toISOString(),
  baseUrl: base.origin,
  pageCount: pages.length,
  failures,
  duplicateTitles: duplicates,
  socialTitleDifferences: pages.filter((page) => page.openGraphTitle !== page.twitterTitle).map((page) => page.path),
  noindexPages: pages.filter((page) => /noindex/.test(page.robots || "")).map((page) => page.path),
  insuranceSchemaOnWealthPages: pages.filter((page) =>
    (page.path === "/links" || /^\/wealth(?:\/|$)/.test(page.path)) && page.schemaTypes.includes("ProfessionalService"),
  ).map((page) => page.path),
  pages,
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, pages: undefined, noindexPages: report.noindexPages.length }, null, 2));
if (failures.length || duplicates.length || report.insuranceSchemaOnWealthPages.length) process.exitCode = 1;
