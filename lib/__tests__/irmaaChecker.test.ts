import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { calculatePartBPremium, getBrackets, STANDARD_BASE_PREMIUM_2027 } from "@/lib/irmaa";
import {
  checkIrmaa,
  IRMAA_CHECKER_MAX_INCOME,
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaLeadLabel,
  irmaaTableRows,
  normalizeIncomeInput,
  parseIncome,
} from "@/lib/irmaaChecker";
import { partDIrmaaFor2027 } from "@/lib/medicareCosts2027";

describe("checkIrmaa reuses the existing bracket logic", () => {
  const incomes = [0, 50_000, 112_000, 112_001, 150_000, 212_000, 212_001, 499_999, 500_000, 2e6];

  it("matches lib/irmaa.ts and lib/medicareCosts2027.ts for every sample income", () => {
    for (const status of ["individual", "married_jointly"] as const) {
      for (const income of incomes) {
        const result = checkIrmaa(income, status);
        const bracket = calculatePartBPremium(income, status);
        expect(result.partBPremium, `${status} ${income}`).toBe(bracket.partBPremium);
        expect(result.partBSurcharge, `${status} ${income}`).toBe(bracket.irmaaSurcharge);
        expect(result.partDSurcharge, `${status} ${income}`).toBe(partDIrmaaFor2027(income, status));
        expect(result.bracketName).toBe(bracket.bracketName);
      }
    }
  });

  it("labels the year 2027 and the tax year 2025", () => {
    expect(IRMAA_CHECKER_YEAR).toBe(2027);
    expect(IRMAA_CHECKER_TAX_YEAR).toBe(2025);
    const result = checkIrmaa(80_000, "individual");
    expect(result.year).toBe(2027);
    expect(result.taxYear).toBe(2025);
  });
});

describe("checkIrmaa results", () => {
  it("shows no surcharge at the standard premium", () => {
    const result = checkIrmaa(112_000, "individual");
    expect(result.tier).toBe(0);
    expect(result.partBPremium).toBe(STANDARD_BASE_PREMIUM_2027);
    expect(result.monthlySurcharge).toBe(0);
    expect(result.annualSurcharge).toBe(0);
    expect(result.nextTierLine).toBe(112_000);
    expect(result.nextTierStartsAtLine).toBe(false);
    expect(result.roomBeforeNextTier).toBe(0);
  });

  it("moves to tier 1 one dollar over the first line", () => {
    const result = checkIrmaa(112_001, "individual");
    expect(result.tier).toBe(1);
    expect(result.partBPremium).toBe(293.1);
    expect(result.partBSurcharge).toBe(83.7);
    expect(result.partDSurcharge).toBe(15.4);
    expect(result.monthlySurcharge).toBe(99.1);
    expect(result.annualSurcharge).toBe(1189.2);
    expect(result.nextTierLine).toBe(141_000);
    expect(result.roomBeforeNextTier).toBe(28_999);
  });

  it("gives a different answer for the same income on a joint return", () => {
    // Married filing separately who lived apart all year is routed by choosing
    // the individual ("Single") status. The checker has no separate-return path.
    const livedApart = checkIrmaa(150_000, "individual");
    expect(livedApart.tier).toBe(2);
    expect(livedApart.partBPremium).toBe(418.8);
    expect(livedApart.partDSurcharge).toBe(39.7);
    expect(checkIrmaa(150_000, "married_jointly").tier).toBe(0);
  });

  it("reports the top tier with no next line", () => {
    const single = checkIrmaa(500_000, "individual");
    expect(single.tier).toBe(5);
    expect(single.tierCount).toBe(5);
    expect(single.partBPremium).toBe(711.8);
    expect(single.partDSurcharge).toBe(96.4);
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

describe("normalizeIncomeInput", () => {
  it("keeps a decimal amount as whole dollars with grouping", () => {
    expect(normalizeIncomeInput("150,000.00")).toBe("150,000");
    expect(normalizeIncomeInput("$150,000")).toBe("150,000");
    expect(normalizeIncomeInput("150000")).toBe("150,000");
    expect(normalizeIncomeInput("150,000.60")).toBe("150,001");
  });

  it("returns an empty string when there is nothing to read", () => {
    expect(normalizeIncomeInput("")).toBe("");
    expect(normalizeIncomeInput("abc")).toBe("");
  });
});

describe("IrmaaChecker filing-status hint", () => {
  it("tells lived-apart and head-of-household visitors to choose Single", () => {
    const source = readFileSync(join(__dirname, "..", "..", "app/irmaa-checker/IrmaaChecker.tsx"), "utf8");
    expect(source).toContain(
      "Head of household or qualifying surviving spouse? Choose Single. Married filing separately and lived apart from your spouse all year? Choose Single. Married filing separately and lived with your spouse at any time that year? Different limits apply, and this tool does not cover them.",
    );
    expect(source).not.toContain(
      "Married and filed separately? Different limits apply. This tool does not cover them.",
    );
  });
});

describe("irmaaLeadLabel", () => {
  it("starts with the tool name and the year", () => {
    expect(irmaaLeadLabel(checkIrmaa(150_000, "individual"))).toBe(
      "IRMAA checker 2027: Tier 2 IRMAA, Part D +$39.70/mo",
    );
  });

  it("fits the 100 characters the capture API stores, for every tier", () => {
    for (const status of ["individual", "married_jointly"] as const) {
      for (const bracket of getBrackets(status)) {
        const label = irmaaLeadLabel(checkIrmaa(bracket.minIncome, status));
        expect(label.length).toBeLessThanOrEqual(100);
        expect(label.startsWith("IRMAA checker 2027: ")).toBe(true);
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
    expect(rows[0].individual).toBe("$112,000 or less");
    expect(rows[0].joint).toBe("$224,000 or less");
    expect(rows[1].individual).toBe("More than $112,000, up to $141,000");
    expect(rows[1].joint).toBe("More than $224,000, up to $282,000");
    expect(rows[4].individual).toBe("More than $212,000, less than $500,000");
    expect(rows[4].joint).toBe("More than $424,000, less than $750,000");
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
