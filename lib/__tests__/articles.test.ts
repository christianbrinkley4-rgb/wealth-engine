import { describe, expect, it } from "vitest";

import { ARTICLES, articleText } from "@/lib/articles";

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

describe("question-led articles", () => {
  it("has unique slugs", () => {
    const slugs = ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const article of ARTICLES) {
    describe(article.slug, () => {
      const text = articleText(article);

      it("runs 600 to 900 words", () => {
        const words = wordCount(text);
        expect(words).toBeGreaterThanOrEqual(600);
        expect(words).toBeLessThanOrEqual(900);
      });

      it("uses no em dashes, hashtags, or carrier names", () => {
        expect(text).not.toMatch(/[—–]/);
        expect(text).not.toMatch(/#\w/);
        expect(text).not.toMatch(/bankers life|blue cross|bcbs|humana|aetna|united ?healthcare/i);
      });

      it("has 3 to 5 FAQ items and cites a government source", () => {
        expect(article.faq.length).toBeGreaterThanOrEqual(3);
        expect(article.faq.length).toBeLessThanOrEqual(5);
        expect(article.sources.some((s) => /medicare\.gov|cms\.gov/.test(s.href))).toBe(true);
      });

      it("keeps meta description under 160 characters", () => {
        expect(article.description.length).toBeLessThanOrEqual(160);
      });
    });
  }
});
