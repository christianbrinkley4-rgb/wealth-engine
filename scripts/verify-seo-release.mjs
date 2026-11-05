import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

const paths = [
  "/",
  "/guides/medicare-part-b-giveback-plans",
  "/answers/are-medicare-supplement-plans-the-same",
  "/guides/medicare-advantage-plans-leaving-nc-2027",
  "/guides/nc-state-health-plan-medicare",
  "/answers/what-are-medicare-part-b-excess-charges",
  "/guides/extra-help-medicare-savings-programs-nc",
  "/answers/does-medicare-cover-nursing-homes",
  "/answers/index-funds-or-actively-managed-funds-which-is-better",
  "/guides/chronic-condition-special-needs-plans",
  "/guides/medicare-automatic-renewal",
  "/guides/moving-to-north-carolina-medicare",
  "/answers/how-does-medicare-part-d-drug-coverage-work",
  "/answers/how-to-apply-for-medicare",
  "/guides/medicare-part-b-employer-coverage",
  "/guides/401k-early-withdrawal-exceptions",
  "/guides/medicare-travel",
  "/answers/what-is-a-target-date-fund",
  "/answers/what-does-it-mean-to-be-dual-eligible-for-medicare-and-medicaid",
  "/wealth/tax-brackets-explained-plainly",
  "/turning-65-medicare-charlotte-nc",
  "/medicare-consultation-charlotte-nc",
  "/life-insurance-winston-salem-nc",
  "/guides/72t-exceptions",
  "/guides/roth-conversion-ladder-explained",
  "/answers/how-do-roth-conversion-ladders-work",
  "/answers/how-does-disability-insurance-work",
  "/medicare-agent-greensboro-nc",
];
const origin = "https://christianbrinkleync.com";
const live = process.argv.includes("--live");
const build = ".next/server/app";
const rows = [];
for (const route of paths) {
  const issues = [];
  let html, response;
  if (live) {
    response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) issues.push(`HTTP ${response.status}`);
    if (/noindex/i.test(response.headers.get("x-robots-tag") ?? "")) issues.push("HTTP noindex");
    html = await response.text();
  } else {
    html = fs.readFileSync(
      path.join(build, route === "/" ? "index.html" : `${route.slice(1)}.html`),
      "utf8",
    );
  }
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const title = doc.title;
  const description = doc.querySelector('meta[name="description"]')?.content ?? "";
  const canonical = doc.querySelector('link[rel="canonical"]')?.href;
  if (!title || title.length >= 60) issues.push(`title length ${title.length}`);
  if (!description || description.length >= 160)
    issues.push(`description length ${description.length}`);
  if (canonical !== new URL(route, origin).href) issues.push(`canonical ${canonical}`);
  if (doc.querySelectorAll("h1").length !== 1) issues.push("expected one H1");
  if (
    live &&
    [...doc.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].some((meta) =>
      /noindex/i.test(meta.content),
    )
  )
    issues.push("HTML noindex");
  const graphs = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((script) => {
      try {
        const data = JSON.parse(script.textContent);
        return Array.isArray(data) ? data : [data];
      } catch {
        issues.push("invalid JSON-LD");
        return [];
      }
    })
    .flatMap((node) => node["@graph"] ?? [node]);
  for (const node of doc.querySelectorAll("script,style")) node.remove();
  const text = doc.querySelector("main")?.textContent.replace(/\s+/g, " ").trim() ?? "";
  if (text.includes("\u2014")) issues.push("em dash in main content");
  for (const faq of graphs
    .filter((node) => node["@type"] === "FAQPage")
    .flatMap((node) => node.mainEntity ?? [])) {
    if (!text.includes(faq.name) || !text.includes(faq.acceptedAnswer.text.replace(/\s+/g, " ")))
      issues.push(`FAQ not visible: ${faq.name}`);
  }
  if (
    !text.includes("Christian Brinkley") ||
    !text.includes("Greensboro") ||
    !text.includes("(919) 408-6671")
  )
    issues.push("missing author, city, or phone");
  if (
    ![...doc.querySelectorAll("a[href]")].some((a) =>
      a.href.includes("https://calendar.google.com/calendar/"),
    )
  )
    issues.push("missing direct booking link");
  rows.push({
    route,
    title,
    descriptionLength: description.length,
    canonical,
    words: text.split(/\s+/).length,
    issues,
  });
  dom.window.close();
}
const sitemap = live
  ? await (await fetch(`${origin}/sitemap.xml`)).text()
  : fs.readFileSync(path.join(build, "sitemap.xml.body"), "utf8");
const missingFromSitemap = paths.filter(
  (route) => !sitemap.includes(`<loc>${origin}${route === "/" ? "" : route}</loc>`),
);
const result = {
  mode: live ? "production HTTP" : "production build",
  checked: rows.length,
  failures: rows.filter((row) => row.issues.length),
  missingFromSitemap,
  rows,
};
fs.mkdirSync("docs/seo-evidence", { recursive: true });
fs.writeFileSync(
  `docs/seo-evidence/release-${live ? "live" : "build"}-audit.json`,
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify({ ...result, rows: undefined }, null, 2));
if (result.failures.length || missingFromSitemap.length) process.exitCode = 1;
