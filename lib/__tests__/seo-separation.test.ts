import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { GET as llmsTxt } from "@/app/llms.txt/route";
import { INSURANCE_SERVICES } from "@/lib/insuranceServices";
import { ARTICLES } from "@/lib/articles";
import { TAX_ARTICLES } from "@/lib/taxArticles";
import { localBusinessJsonLd, siteIdentityJsonLd, SITE_URL } from "@/lib/seo";
import { wealthArticleJsonLd, wealthHubJsonLd, webAppJsonLd } from "@/lib/wealth/seo";

describe("search identity and service discovery", () => {
  it("keeps shared authorship without claiming insurance offers on every page", () => {
    const shared = siteIdentityJsonLd();
    const insurance = localBusinessJsonLd();
    expect(shared["@graph"].map((entity) => entity["@type"])).toEqual(["WebSite", "Person"]);
    expect(JSON.stringify(shared)).not.toMatch(/hasOfferCatalog|ProfessionalService|\/#service/);
    const person = shared["@graph"].find((entity) => entity["@type"] === "Person");
    const insurancePerson = insurance["@graph"].find((entity) => entity["@type"] === "Person");
    expect(person?.["@id"]).toBe(insurancePerson?.["@id"]);
    expect(person?.sameAs).toEqual(insurancePerson?.sameAs);
    expect(insurance["@graph"].some((entity) => entity["@type"] === "ProfessionalService")).toBe(true);
  });

  it("connects wealth articles and calculators to education rather than an insurance provider", () => {
    const hub = wealthHubJsonLd();
    const tool = webAppJsonLd({ name: "Budget", description: "Budget estimate", path: "/tools/budget" });
    const article = wealthArticleJsonLd({ headline: "Budget", description: "Budget basics", path: "/wealth/learn/the-50-30-20-rule", datePublished: "2026-10-06", dateModified: "2026-10-07" });
    expect(tool.isPartOf["@id"]).toBe(hub["@id"]);
    expect(article.isPartOf["@id"]).toBe(hub["@id"]);
    expect(article.publisher["@type"]).toBe("Person");
    expect(JSON.stringify([hub, tool, article])).not.toContain(`${SITE_URL}/#service`);
  });

  it("publishes each advertised service through a real, discoverable page", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).toContain("/insurance-services");
    expect(new Set(INSURANCE_SERVICES.map((service) => service.href)).size).toBe(INSURANCE_SERVICES.length);
    for (const service of INSURANCE_SERVICES) {
      expect(paths, service.name).toContain(service.href);
      expect(existsSync(fileURLToPath(new URL(`../../app${service.href}/page.tsx`, import.meta.url))), service.name).toBe(true);
      expect(service.prepare.length).toBeGreaterThan(20);
    }
  });

  it("keeps all published insurance answers and retirement explainers in the assistant index", async () => {
    const text = await llmsTxt().text();
    expect(text).toContain(`${SITE_URL}/insurance-services`);
    for (const article of ARTICLES) expect(text).toContain(`${SITE_URL}/answers/${article.slug}`);
    for (const article of TAX_ARTICLES) expect(text).toContain(`${SITE_URL}/taxes-and-retirement/${article.slug}`);
  });
});
