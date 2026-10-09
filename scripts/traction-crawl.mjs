import fs from "node:fs";
import { JSDOM } from "jsdom";

const base = process.argv[2] ?? "http://localhost:3101";
const out = process.argv[3] ?? ".cache/traction/release-crawl.json";
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error("Use a local production build; this crawler never submits forms.");
const sitemapText = await (await fetch(base + "/sitemap.xml")).text();
const sitemap = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const queue = [...new Set(["/", ...sitemap])], seen = new Set(), pages = [], redirects = [], errors = [];
const internalPath = href => {
  try {
    const url = new URL(href, base);
    if (![new URL(base).hostname, "christianbrinkleync.com", "localhost"].includes(url.hostname)) return null;
    return url.pathname;
  } catch { return null; }
};
while (queue.length && seen.size < 1000) {
  const route = queue.shift(); if (seen.has(route)) continue; seen.add(route);
  try {
    const response = await fetch(base + route, { redirect: "manual" });
    if (response.status >= 300 && response.status < 400) { redirects.push({ path: route, status: response.status, location: response.headers.get("location") }); continue; }
    if (response.status !== 200) { errors.push({ path: route, status: response.status }); continue; }
    if (!response.headers.get("content-type")?.includes("text/html")) continue;
    const dom = new JSDOM(await response.text()); const doc = dom.window.document;
    const links = [...new Set([...doc.querySelectorAll("a[href]")].map(a => internalPath(a.getAttribute("href"))).filter(Boolean))];
    const externalLinks = [...new Set([...doc.querySelectorAll('a[href^="https://"]')].map(a => a.href).filter(href => internalPath(href) === null))];
    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
    const main = doc.querySelector("main")?.cloneNode(true);
    main?.querySelectorAll("script,style,nav").forEach(node => node.remove());
    const text = main?.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(script => { try { return JSON.parse(script.textContent); } catch { errors.push({ path: route, problem: "Invalid JSON-LD" }); return null; } });
    pages.push({ path: route, title: doc.title, description: doc.querySelector('meta[name="description"]')?.content, canonical: doc.querySelector('link[rel="canonical"]')?.href, robots, indexable: !robots.includes("noindex"), h1: [...doc.querySelectorAll("h1")].map(h => h.textContent), links, externalLinks, text, schemas });
    for (const link of links) if (!/\.[a-z0-9]{2,6}$/i.test(link) && !link.startsWith("/api/") && !link.startsWith("/_next/")) queue.push(link);
    dom.window.close();
  } catch (error) { errors.push({ path: route, problem: error.message }); }
}
const inbound = Object.fromEntries(pages.map(page => [page.path, pages.filter(other => other.path !== page.path && other.links.includes(page.path)).map(other => other.path)]));
const orphans = pages.filter(page => page.indexable && page.path !== "/" && !inbound[page.path]?.length).map(page => page.path);
const summary = { pages: pages.length, sitemap: sitemap.length, indexable: pages.filter(p => p.indexable).length, noindex: pages.filter(p => !p.indexable).length, errors, redirects, orphans, targetInbound: Object.fromEntries(["/medicare-supplement-plans-greensboro-nc", "/medicare-advantage-vs-medigap-greensboro-nc", "/medicare-changes-2027", "/medicare-part-d-donut-hole-2027", "/turning-65-checklist", "/medicare-annual-enrollment-2026-checklist"].map(path => [path, inbound[path] ?? []])) };
fs.writeFileSync(out, JSON.stringify(pages, null, 2));
fs.writeFileSync(out.replace(/\.json$/, "-summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (errors.length || orphans.length || redirects.length || Object.values(summary.targetInbound).some(incoming => incoming.length < 4)) process.exitCode = 1;
