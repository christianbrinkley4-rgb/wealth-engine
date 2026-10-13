import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

const build = process.argv[2] ?? ".next-verify";
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const redirects = JSON.parse(fs.readFileSync(path.join(build, "routes-manifest.json"))).redirects;
const sitemap = fs.readFileSync(path.join(build, "server/app/sitemap.xml.body"), "utf8");
const indexed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const rows = [];
for (const file of walk(path.join(build, "server/app")).filter(
  (f) => f.endsWith(".html") && !f.includes("_not-found"),
)) {
  const route =
    "/" +
    path
      .relative(path.join(build, "server/app"), file)
      .replaceAll("\\", "/")
      .replace(/\.html$/, "")
      .replace(/^index$/, "");
  const dom = new JSDOM(fs.readFileSync(file, "utf8"));
  const doc = dom.window.document;
  const graphs = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
    const data = JSON.parse(s.textContent);
    return Array.isArray(data) ? data : [data];
  });
  const nodes = graphs.flatMap((g) => g["@graph"] ?? [g]);
  for (const node of doc.querySelectorAll("script,style")) node.remove();
  const text = doc.querySelector("main")?.textContent?.replace(/\s+/g, " ") ?? "";
  const faqs = nodes.filter((n) => n["@type"] === "FAQPage").flatMap((n) => n.mainEntity ?? []);
  const mismatchedFaqs = faqs
    .filter(
      (f) => !text.includes(f.name) || !text.includes(f.acceptedAnswer.text.replace(/\s+/g, " ")),
    )
    .map((f) => f.name);
  const speakable = nodes.filter((n) => n.speakable).flatMap((n) => n.speakable.cssSelector ?? []);
  const missingSelectors = speakable.filter((selector) => !doc.querySelector(selector));
  const titles = [...doc.querySelectorAll("h1")].map((h) => h.textContent.trim());
  const links = [...doc.querySelectorAll("a[href]")]
    .map((a) => a.getAttribute("href"))
    .filter((h) => h.startsWith("/"))
    .map((h) => h.split("?")[0]);
  for (const node of doc.querySelectorAll("script,style")) node.remove();
  const bodyWords = doc.querySelector("main")?.textContent?.trim().split(/\s+/).length ?? 0;
  rows.push({
    route,
    indexed: indexed.includes(route),
    redirected: redirects.some((r) => r.source === route),
    title: doc.title,
    titleLength: doc.title.length,
    descriptionLength: doc.querySelector('meta[name="description"]')?.content?.length ?? 0,
    h1: titles,
    canonical: doc.querySelector('link[rel="canonical"]')?.href,
    ogUrl: doc.querySelector('meta[property="og:url"]')?.content,
    twitter: doc.querySelector('meta[name="twitter:card"]')?.content,
    bodyWords,
    mismatchedFaqs,
    missingSelectors,
    links,
  });
  dom.window.close();
}
const duplicateTitles = Object.entries(
  Object.groupBy(
    rows.filter((r) => r.indexed && !r.redirected),
    (r) => r.title,
  ),
)
  .filter(([, items]) => items.length > 1)
  .map(([title, items]) => ({ title, routes: items.map((r) => r.route) }));
const brokenAnchors = [];
for (const row of rows.filter((r) => r.indexed && !r.redirected))
  for (const href of row.links.filter((h) => h.includes("#"))) {
    const [target, fragment] = href.split("#");
    const targetFile = path.join(
      build,
      "server/app",
      (target === "/" ? "index" : target.slice(1)) + ".html",
    );
    if (fs.existsSync(targetFile)) {
      const dom = new JSDOM(fs.readFileSync(targetFile, "utf8"));
      if (!dom.window.document.getElementById(decodeURIComponent(fragment)))
        brokenAnchors.push({ from: row.route, href });
      dom.window.close();
    }
  }
const result = {
  pages: rows.length,
  indexed: rows.filter((r) => r.indexed && !r.redirected).length,
  duplicateTitles,
  headingFailures: rows
    .filter((r) => r.indexed && !r.redirected && r.h1.length !== 1)
    .map((r) => r.route),
  faqFailures: rows.filter((r) => r.indexed && !r.redirected && r.mismatchedFaqs.length),
  speakableFailures: rows.filter((r) => r.indexed && !r.redirected && r.missingSelectors.length),
  brokenAnchors,
  rows,
};
fs.mkdirSync("docs/seo-evidence", { recursive: true });
fs.writeFileSync("docs/seo-evidence/build-audit.json", JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      ...result,
      rows: undefined,
      faqFailures: result.faqFailures.map((r) => ({ route: r.route, questions: r.mismatchedFaqs })),
      speakableFailures: result.speakableFailures.map((r) => ({
        route: r.route,
        selectors: r.missingSelectors,
      })),
    },
    null,
    2,
  ),
);
