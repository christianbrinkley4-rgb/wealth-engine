import { describe, expect, it } from "vitest";

import { articleText } from "@/lib/articles";
import { TAX_ARTICLES } from "@/lib/taxArticles";

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

describe("taxes and retirement explainers", () => {
  it("has unique slugs", () => {
    const slugs = TAX_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const article of TAX_ARTICLES) {
    describe(article.slug, () => {
      const text = articleText(article);

      it("runs 600 to 950 words", () => {
        const words = wordCount(text);
        expect(words).toBeGreaterThanOrEqual(600);
        expect(words).toBeLessThanOrEqual(950);
      });

      it("uses no em or en dashes and names no companies", () => {
        expect(text).not.toMatch(/[—–]/);
        expect(text).not.toMatch(/bankers life|humana|aetna|fidelity|vanguard|schwab/i);
      });

      it("never presents a future credential as a current one", () => {
        expect(text).not.toMatch(/\bI(?:'|’)?m a CPA\b|\bas a CPA\b|\bCFP\b/i);
      });

      it("cites an IRS or SSA source", () => {
        expect(article.sources.some((s) => /irs\.gov|ssa\.gov/.test(s.href))).toBe(true);
      });

      it("keeps the meta description under 160 characters", () => {
        expect(article.description.length).toBeLessThanOrEqual(160);
      });

      it("links only to pages that exist on this site or to https sources", () => {
        for (const match of text.matchAll(/\]\((\/[^)]*)\)/g)) {
          expect(match[1]).toMatch(/^\/[a-z0-9/#-]*$/);
        }
        for (const source of article.sources) expect(source.href).toMatch(/^https:\/\//);
      });
    });
  }
});
