import { describe, expect, it } from "vitest";

import { GLOSSARY, glossaryTerms } from "@/lib/glossary";
import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { PART_A_2026, PART_D_2026 } from "@/lib/medicareCosts2026";

const OFFICIAL = /^https:\/\/www\.(medicare|cms|ssa)\.gov\//;

describe("Medicare words glossary", () => {
  const terms = glossaryTerms();

  it("has unique anchors, for terms and for groups", () => {
    const ids = [...terms.map((entry) => entry.id), ...GLOSSARY.map((group) => group.id)];
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it("sources every definition to an official page", () => {
    for (const entry of terms) expect(entry.source.href, entry.term).toMatch(OFFICIAL);
  });

  it("keeps each definition short enough to read in one breath", () => {
    for (const entry of terms) {
      const words = entry.definition.split(/\s+/).length;
      expect(words, entry.term).toBeGreaterThanOrEqual(12);
      expect(words, entry.term).toBeLessThanOrEqual(75);
    }
  });

  it("uses no em or en dashes and names no companies", () => {
    const text = GLOSSARY.flatMap((group) => [
      group.label,
      group.blurb,
      ...group.terms.flatMap((entry) => [entry.term, entry.aka ?? "", entry.definition]),
    ]).join(" ");
    expect(text).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/bankers life|humana|aetna|unitedhealthcare|wellcare|blue cross/i);
  });

  it("reads its dollar figures from the shared 2026 constants", () => {
    const byId = Object.fromEntries(terms.map((entry) => [entry.id, entry.definition]));
    expect(byId["part-b"]).toContain(`$${STANDARD_BASE_PREMIUM_2026.toFixed(2)}`);
    expect(byId["part-a"]).toContain(`$${PART_A_2026.inpatientDeductible.toLocaleString("en-US")}`);
    expect(byId["part-d"]).toContain(`$${PART_D_2026.outOfPocketCap.toLocaleString("en-US")}`);
  });

  it("links only to site paths in the right shape", () => {
    for (const entry of terms) {
      if (entry.more) expect(entry.more.href, entry.term).toMatch(/^\/[a-z0-9/#?=&-]*$/);
    }
  });
});
