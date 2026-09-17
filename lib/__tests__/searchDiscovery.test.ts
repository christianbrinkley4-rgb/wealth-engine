import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { CARE_GUIDES } from "@/lib/careGuides";
import { TOPIC_META } from "@/lib/helpQuiz";
import { articleJsonLd, localBusinessJsonLd, SITE_URL } from "@/lib/seo";

describe("search discovery", () => {
  it("lists each care guide once and excludes campaign and conversion utilities", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(new Set(paths).size).toBe(paths.length);
    for (const guide of CARE_GUIDES) expect(paths).toContain(`/${guide.slug}`);
    for (const path of ["/start", "/schedule", "/remind-me", "/llms.txt", "/privacy"])
      expect(paths).not.toContain(path);
    expect(paths.some((path) => /^\/(lp|go|api)\//.test(path))).toBe(false);
  });

  it("care guides enter a valid care consultation situation", () => {
    const firstQuestion = TOPIC_META.care_coverage.questions[0];
    for (const guide of CARE_GUIDES)
      expect(firstQuestion.options.some((option) => option.value === guide.focus)).toBe(true);
  });

  it("attributes articles to the same named person as the site", () => {
    const article = articleJsonLd({
      headline: "Guide",
      description: "Description",
      path: "/care-coverage",
      datePublished: "2026-09-10",
      dateModified: "2026-09-10",
    });
    const person = localBusinessJsonLd()["@graph"].find((entity) => entity["@type"] === "Person");
    expect(article.author["@id"]).toBe(person?.["@id"]);
    expect(article.author.name).toBe(person?.name);
    expect(article.author.url).toBe(`${SITE_URL}/about`);
  });
});
