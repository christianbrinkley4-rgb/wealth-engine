import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { REVIEW_SOURCES } from "@/lib/analytics";
import { GOOGLE_WRITE_REVIEW_URL } from "@/lib/agent";
import { parseReviewSource, REVIEW_ORIGIN, REVIEW_PROMPTS, reviewLink } from "@/lib/review";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/testimonials";

describe("review links", () => {
  it("reads only the link kinds Christian hands out", () => {
    for (const kind of REVIEW_SOURCES) expect(parseReviewSource(kind)).toBe(kind);
    expect(parseReviewSource("linda@example.com")).toBeNull();
    expect(parseReviewSource("")).toBeNull();
    expect(parseReviewSource(undefined)).toBeNull();
    expect(parseReviewSource("__proto__")).toBeNull();
  });

  it("builds the same address every time, on the real domain", () => {
    expect(reviewLink()).toBe("https://christianbrinkleync.com/review");
    expect(reviewLink("meeting")).toBe(`${REVIEW_ORIGIN}/review?from=meeting`);
  });

  it("prints the card's QR code for the card link", () => {
    const script = readFileSync("scripts/make-review-qr.mjs", "utf8");
    expect(script).toContain(reviewLink("card"));
    expect(readFileSync("public/review-qr.svg", "utf8")).toContain("<svg");
  });
});

describe("review prompts", () => {
  it("ask about the visit, never about results, money, plans, or health", () => {
    const banned =
      /sav(e|ed|ing)|cheap|money|price|cost|premium|plan|medicare number|health|claim|best|great|amazing|five|star|recommend/i;
    expect(REVIEW_PROMPTS.length).toBeGreaterThanOrEqual(2);
    for (const prompt of REVIEW_PROMPTS) {
      expect(prompt, prompt).not.toMatch(banned);
      expect(prompt.endsWith("?")).toBe(true);
      expect(prompt).not.toMatch(/[–—]/);
    }
  });
});

describe("the review path never invents proof", () => {
  it("shows a Google rating only with a real count behind it", () => {
    if (GOOGLE_REVIEWS) {
      expect(GOOGLE_REVIEWS.count).toBeGreaterThan(0);
      expect(TESTIMONIALS.length).toBeGreaterThan(0);
    }
  });

  it("sends everyone to the same Google link", () => {
    expect(GOOGLE_WRITE_REVIEW_URL).toMatch(/^https:\/\/g\.page\/r\/[\w-]+\/review$/);
  });
});
