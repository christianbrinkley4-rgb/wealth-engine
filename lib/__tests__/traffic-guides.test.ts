import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Page, { generateMetadata, generateStaticParams } from "@/app/guides/[slug]/page";
import sitemap from "@/app/sitemap";
import { GET as shortIndex } from "@/app/llms.txt/route";
import { GET as fullIndex } from "@/app/llms-full.txt/route";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";

describe("traffic guide publishing contract", () => {
  it("keeps the corrected General Enrollment start rule in the linked older guide", () => {
    const guide = readFileSync(resolve("app/guides/missed-medicare-enrollment/page.tsx"), "utf8");
    expect(guide).not.toContain("July 1");
    expect(guide).toContain("Coverage starts the month after you sign up");
    expect(guide).toContain(
      "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start",
    );
  });
  it("makes every generated guide discoverable once in the sitemap and both text indexes", async () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    const indexes = await Promise.all([shortIndex().text(), fullIndex().text()]);
    expect(generateStaticParams()).toHaveLength(36);
    expect(new Set(TRAFFIC_GUIDES.map((guide) => guide.slug)).size).toBe(36);
    for (const guide of TRAFFIC_GUIDES) {
      const path = `/guides/${guide.slug}`;
      expect(paths.filter((value) => value === path)).toHaveLength(1);
      for (const index of indexes) expect(index).toContain(path);
      for (const link of guide.related) {
        const dynamic = TRAFFIC_GUIDES.some((item) => link.href === `/guides/${item.slug}`);
        expect(dynamic || existsSync(resolve(`app${link.href}/page.tsx`))).toBe(true);
      }
    }
  });

  it.each(TRAFFIC_GUIDES)(
    "renders accurate metadata, visible disclosures and matching FAQ schema: $slug",
    async (guide) => {
      const props = { params: Promise.resolve({ slug: guide.slug }) };
      const meta = await generateMetadata(props);
      expect(guide.title.length).toBeLessThan(60);
      expect(guide.description.length).toBeLessThan(155);
      expect(meta.alternates?.canonical).toBe(`/guides/${guide.slug}`);
      const html = renderToStaticMarkup(await Page(props));
      expect(html).toContain("Educational information only");
      expect(html).toContain("not a CPA or registered investment adviser");
      expect(html).toContain("(919) 408-6671");
      expect(html).toContain('href="/start"');
      expect(html).toContain("<caption");
      expect(html).not.toContain("\u2014");
      const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
      const schemas = JSON.parse(json!);
      expect(schemas.map((schema: { "@type": string }) => schema["@type"])).toEqual([
        "Article",
        "BreadcrumbList",
        "FAQPage",
      ]);
      expect(schemas[2].mainEntity.map((item: { name: string }) => item.name)).toEqual(
        guide.faqs.map((faq) => faq.q),
      );
      for (const source of guide.sources) {
        expect(
          [
            "www.irs.gov",
            "www.medicare.gov",
            "www.cms.gov",
            "www.bls.gov",
            "www.ssa.gov",
            "www.treasurydirect.gov",
            "www.fdic.gov",
            "www.consumerfinance.gov",
          ],
        ).toContain(new URL(source.url).hostname);
        expect(html).toContain(source.url);
      }
    },
  );

  it("rejects unknown article routes", async () => {
    await expect(Page({ params: Promise.resolve({ slug: "not-a-real-guide" }) })).rejects.toThrow();
  });

  it("keeps each new guide linked from at least one existing pillar or article", () => {
    const files = [
      "wealth",
      "tools",
      "wealth/side-hustle-taxes",
      "wealth/first-tax-return-guide",
      "wealth/rmd-explained-73",
      "wealth/401k-explained",
      "wealth/hsa-explained",
      "wealth/broke-money-reset-plan",
      "annual-enrollment",
    ];
    const incoming = files
      .map((file) => readFileSync(resolve(`app/${file}/page.tsx`), "utf8"))
      .join("\n");
    for (const guide of TRAFFIC_GUIDES) expect(incoming).toContain(guide.slug);
  });
});
