import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { INDEXABLE_MEDICARE_SLUGS, isIndexableTown, TRIAD_CITIES } from "@/lib/triad";
import { GET as shortIndex } from "@/app/llms.txt/route";
import { GET as fullIndex } from "@/app/llms-full.txt/route";
import { GET as markdown } from "@/app/guides/[slug]/markdown/route";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { MEDICARE_GUIDES, MONEY_GUIDES } from "@/lib/guideLanes";
import { learnEntries } from "@/lib/learn";
import { WEALTH_NAV } from "@/lib/wealth/site";
import { generateMetadata, default as MedicareTown } from "@/app/medicare-in/[city]/page";
import { generateMetadata as lifeMetadata } from "@/app/life-insurance-in/[city]/page";
import { generateMetadata as retirementMetadata } from "@/app/retirement-in/[city]/page";

describe("traction discovery policy", () => {
  it("keeps exactly the eight approved Medicare towns, with 52 noindexed siblings", async () => {
    expect([...INDEXABLE_MEDICARE_SLUGS].sort()).toEqual(["greensboro", "winston-salem", "high-point", "kernersville", "burlington", "summerfield", "jamestown", "stokesdale"].sort());
    let noindexed = 0;
    for (const city of TRIAD_CITIES) {
      const props = { params: Promise.resolve({ city: city.slug }) };
      const meta = await generateMetadata(props);
      expect(meta.robots).toEqual({ index: isIndexableTown("medicare", city.slug), follow: true });
      if (!isIndexableTown("medicare", city.slug)) noindexed++;
      for (const get of [lifeMetadata, retirementMetadata]) { expect((await get(props)).robots).toEqual({ index: false, follow: true }); noindexed++; }
    }
    expect(noindexed).toBe(52);
  });
  it("removes duplicates, retired hubs and noindexed towns from sitemap and AI town indexes", async () => {
    const paths = sitemap().map(entry => new URL(entry.url).pathname);
    expect(paths.some(path => path.endsWith("/markdown") || path.startsWith("/life-insurance-in/") || path.startsWith("/retirement-in/"))).toBe(false);
    expect(paths.filter(path => path.startsWith("/medicare-in/")).map(path => path.split("/").at(-1)).sort()).toEqual([...INDEXABLE_MEDICARE_SLUGS].sort());
    expect(paths).not.toContain("/wealth/calculators"); expect(paths).not.toContain("/links"); expect(paths).toContain("/medicare-plan-checklist");
    for (const index of [await shortIndex().text(), await fullIndex().text()]) {
      expect(index).not.toMatch(/\/(retirement|life-insurance)-in\//);
      for (const city of TRIAD_CITIES) if (!isIndexableTown("medicare", city.slug)) expect(index).not.toContain(`/medicare-in/${city.slug})`);
    }
  });
  it("keeps noindexed pages readable with their phone link", async () => {
    const html = renderToStaticMarkup(await MedicareTown({ params: Promise.resolve({ city: "whitsett" }) }));
    expect(html).toContain("<h1"); expect(html).toContain("Whitsett"); expect(html).toContain("tel:+19194086671");
  });
  it("serves guide Markdown with its HTML canonical", async () => {
    const slug = TRAFFIC_GUIDES[0].slug;
    const response = await markdown(new Request("http://localhost"), { params: Promise.resolve({ slug }) });
    expect(response.headers.get("Link")).toMatch(new RegExp(`/guides/${slug}>; rel="canonical"`));
  });
  it("has one money guides label and the approved money navigation", () => {
    expect(WEALTH_NAV.map(item => [item.href, item.label])).toEqual([["/tools", "Tools"], ["/wealth/learn", "Guides"], ["/wealth/quiz", "Quizzes"], ["/wealth/journey", "Journey"], ["/", "Medicare help"]]);
    const footer = readFileSync("app/components/SiteFooter.tsx", "utf8");
    for (const href of ["/ai", "/answers", "/ask", "/taxes-and-retirement"]) expect(footer).toContain(`href: "${href}"`);
  });
  it("lists every Medicare guide once in its lane and keeps the money lane distinct", () => {
    const entries = learnEntries();
    for (const guide of MEDICARE_GUIDES) expect(entries.filter(entry => entry.href === `/guides/${guide.slug}`)).toHaveLength(1);
    for (const guide of MONEY_GUIDES) expect(entries.some(entry => entry.href === `/guides/${guide.slug}`)).toBe(false);
  });
  it("has no retired calculator hrefs in application or library source", () => {
    function walk(path: string): string[] { return readdirSync(path, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${path}/${entry.name}`) : /\.tsx?$/.test(entry.name) ? [`${path}/${entry.name}`] : []); }
    for (const path of [...walk("app"), ...walk("lib")].filter(path => !path.includes("__tests__"))) {
      expect(readFileSync(path, "utf8"), path).not.toMatch(/(?:href[:=]\s*|href:\s*)["']\/wealth\/calculators\/(compound-interest|budget|debt-payoff|roth-vs-traditional)/);
    }
  });
});
