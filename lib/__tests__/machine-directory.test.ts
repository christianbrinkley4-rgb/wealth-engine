import { expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { GET as brief } from "@/app/llms.txt/route";
import { GET as full } from "@/app/llms-full.txt/route";
import { ROTH_DEFINITION } from "@/lib/editorial";
import { articleJsonLd, SITE_URL } from "@/lib/seo";
it("covers every sitemap route in both public AI indexes", async () => {
  for (const get of [brief, full]) {
    const text = await get().text();
    for (const page of sitemap()) expect(text).toContain(page.url);
    expect(text).toContain(ROTH_DEFINITION.text);
    expect(text).toContain(SITE_URL + "/mcp");
  }
});
it("includes guide and editorial discovery in the sitemap without duplicate URLs", () => {
  const urls = sitemap().map((page) => page.url);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toContain(SITE_URL + "/guides");
  expect(urls).toContain(SITE_URL + "/editorial-policy");
});
it("emits cited, self-contained article definitions with explicit speakable selectors", () => {
  const data = articleJsonLd({
    headline: "Roth IRA",
    description: "An educational definition.",
    path: "/wealth/roth-ira-explained",
    datePublished: "2026-10-08",
    dateModified: "2026-10-09",
    abstract: ROTH_DEFINITION.text,
    citations: ROTH_DEFINITION.sources.map((source) => source.href),
    speakableSelectors: ["h1", "#definition"],
  });
  expect(data.abstract).toBe(ROTH_DEFINITION.text);
  expect(data.citation).toEqual(ROTH_DEFINITION.sources.map((source) => source.href));
  expect(data.speakable.cssSelector).toEqual(["h1", "#definition"]);
});
