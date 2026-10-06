import { describe, expect, it } from "vitest";

import { ARTICLES, articleText, getArticle } from "@/lib/articles";
import { PART_B_2026, PART_D_2026 } from "@/lib/medicareCosts2026";

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

describe("figures come from the cost tables, not from the article", () => {
  it("quotes the Part D cap, deductible limit and base premium as lib/medicareCosts2026.ts has them", () => {
    const text = articleText(getArticle("do-i-need-medicare-drug-coverage")!);
    expect(text).toContain(`$${PART_D_2026.outOfPocketCap.toLocaleString("en-US")}`);
    expect(text).toContain(`$${PART_D_2026.maximumDeductible}`);
    expect(text).toContain(`$${PART_D_2026.baseBeneficiaryPremium}`);
    // 12 months late: 12% of the base premium, rounded to the nearest dime.
    expect(text).toContain("$4.70");
  });

  it("quotes the Part B deductible as the cost table has it", () => {
    const text = articleText(getArticle("does-medicare-cover-hearing-aids-and-glasses")!);
    expect(text).toContain(`$${PART_B_2026.annualDeductible}`);
  });
});
