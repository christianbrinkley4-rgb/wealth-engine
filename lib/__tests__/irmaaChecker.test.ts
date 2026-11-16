import { describe, expect, it } from "vitest";

import { calculatePartBPremium, getBrackets, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  checkIrmaa,
  IRMAA_CHECKER_MAX_INCOME,
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaLeadLabel,
  irmaaTableRows,
  parseIncome,
} from "@/lib/irmaaChecker";
import { partDIrmaaFor } from "@/lib/medicareCosts2026";

describe("checkIrmaa reuses the existing bracket logic", () => {
  const incomes = [0, 50_000, 109_000, 109_001, 150_000, 205_000, 205_001, 499_999, 500_000, 2e6];

  it("matches lib/irmaa.ts and lib/medicareCosts2026.ts for every sample income", () => {
    for (const status of ["individual", "married_jointly"] as const) {
      for (const income of incomes) {
        const result = checkIrmaa(income, status);
        const bracket = calculatePartBPremium(income, status);
        expect(result.partBPremium, `${status} ${income}`).toBe(bracket.partBPremium);
        expect(result.partBSurcharge, `${status} ${income}`).toBe(bracket.irmaaSurcharge);
        expect(result.partDSurcharge, `${status} ${income}`).toBe(partDIrmaaFor(income, status));
        expect(result.bracketName).toBe(bracket.bracketName);
      }
    }
  });

  it("labels the year 2026 and the tax year 2024", () => {
    expect(IRMAA_CHECKER_YEAR).toBe(2026);
    expect(IRMAA_CHECKER_TAX_YEAR).toBe(2024);
    const result = checkIrmaa(80_000, "individual");
    expect(result.year).toBe(2026);
    expect(result.taxYear).toBe(2024);
  });
});

describe("checkIrmaa results", () => {
  it("shows no surcharge at the standard premium", () => {
    const result = checkIrmaa(109_000, "individual");
    expect(result.tier).toBe(0);
    expect(result.partBPremium).toBe(STANDARD_BASE_PREMIUM_2026);
    expect(result.monthlySurcharge).toBe(0);
    expect(result.annualSurcharge).toBe(0);
    expect(result.nextTierLine).toBe(109_000);
    expect(result.nextTierStartsAtLine).toBe(false);
    expect(result.roomBeforeNextTier).toBe(0);
  });

  it("moves to tier 1 one dollar over the first line", () => {
    const result = checkIrmaa(109_001, "individual");
    expect(result.tier).toBe(1);
    expect(result.partBPremium).toBe(284.1);
    expect(result.partBSurcharge).toBe(81.2);
    expect(result.partDSurcharge).toBe(14.5);
    expect(result.monthlySurcharge).toBe(95.7);
    expect(result.annualSurcharge).toBe(1148.4);
    expect(result.nextTierLine).toBe(137_000);
    expect(result.roomBeforeNextTier).toBe(27_999);
  });

  it("gives a different answer for the same income on a joint return", () => {
    expect(checkIrmaa(150_000, "individual").tier).toBe(2);
    expect(checkIrmaa(150_000, "married_jointly").tier).toBe(0);
  });

  it("reports the top tier with no next line", () => {
    const single = checkIrmaa(500_000, "individual");
    expect(single.tier).toBe(5);
    expect(single.tierCount).toBe(5);
    expect(single.partBPremium).toBe(689.9);
    expect(single.partDSurcharge).toBe(91);
    expect(single.nextTierLine).toBeNull();
    expect(single.roomBeforeNextTier).toBeNull();

    const joint = checkIrmaa(749_999, "married_jointly");
    expect(joint.tier).toBe(4);
    expect(joint.nextTierLine).toBe(750_000);
    expect(joint.nextTierStartsAtLine).toBe(true);
    expect(joint.roomBeforeNextTier).toBe(1);
  });

  it("counts tiers from the bracket table, not from a second copy", () => {
    expect(checkIrmaa(0, "individual").tierCount).toBe(getBrackets("individual").length - 1);
  });

  it("treats a negative or invalid income as zero", () => {
    expect(checkIrmaa(-5, "individual").income).toBe(0);
    expect(checkIrmaa(Number.NaN, "individual").tier).toBe(0);
    expect(checkIrmaa(1e12, "individual").income).toBe(IRMAA_CHECKER_MAX_INCOME);
  });
});

describe("parseIncome", () => {
  it("reads plain numbers and formatted dollars", () => {
    expect(parseIncome("150000")).toBe(150_000);
    expect(parseIncome("$150,000")).toBe(150_000);
    expect(parseIncome(" 98,500.50 ")).toBe(98_500.5);
  });

  it("returns null when there is nothing to read", () => {
    expect(parseIncome("")).toBeNull();
    expect(parseIncome("abc")).toBeNull();
    expect(parseIncome("$")).toBeNull();
  });

  it("stops at the largest value the capture API accepts", () => {
    expect(parseIncome("99999999999999")).toBe(IRMAA_CHECKER_MAX_INCOME);
  });
});

describe("irmaaLeadLabel", () => {
  it("starts with the tool name and the year", () => {
    expect(irmaaLeadLabel(checkIrmaa(150_000, "individual"))).toBe(
      "IRMAA checker 2026: Tier 2 IRMAA, Part D +$37.50/mo",
    );
  });

  it("fits the 100 characters the capture API stores, for every tier", () => {
    for (const status of ["individual", "married_jointly"] as const) {
      for (const bracket of getBrackets(status)) {
        const label = irmaaLeadLabel(checkIrmaa(bracket.minIncome, status));
        expect(label.length).toBeLessThanOrEqual(100);
        expect(label.startsWith("IRMAA checker 2026: ")).toBe(true);
      }
    }
  });
});

describe("irmaaTableRows", () => {
  const rows = irmaaTableRows();

  it("has the standard row and five tiers", () => {
    expect(rows.map((row) => row.tier)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("writes each income range the way CMS words it", () => {
    expect(rows[0].individual).toBe("$109,000 or less");
    expect(rows[0].joint).toBe("$218,000 or less");
    expect(rows[1].individual).toBe("More than $109,000, up to $137,000");
    expect(rows[1].joint).toBe("More than $218,000, up to $274,000");
    expect(rows[4].individual).toBe("More than $205,000, less than $500,000");
    expect(rows[4].joint).toBe("More than $410,000, less than $750,000");
    expect(rows[5].individual).toBe("$500,000 or more");
    expect(rows[5].joint).toBe("$750,000 or more");
  });

  it("agrees with checkIrmaa inside every tier", () => {
    for (const row of rows) {
      const bracket = getBrackets("individual")[row.tier];
      const result = checkIrmaa(bracket.minIncome + 1, "individual");
      expect(result.partBPremium).toBe(row.partBPremium);
      expect(result.partDSurcharge).toBe(row.partDSurcharge);
    }
  });
});
