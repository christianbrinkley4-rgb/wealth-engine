import { describe, expect, it } from "vitest";
import {
  federalWithholding,
  parsePaycheckMoney,
  paycheckBreakdown,
  WITHHOLDING_SCHEDULES,
  type PaycheckInput,
  type PaycheckFilingStatus,
} from "@/lib/wealth/paycheck";
import { shareCardSvg } from "@/lib/wealth/share-card";

const input: PaycheckInput = {
  gross: 3000,
  net: 2200,
  frequency: "biweekly",
  filingStatus: "single",
};

describe("IRS 2026 Pub. 15-T Worksheet 1A", () => {
  it("calculates single, biweekly using the published row, not a flat tax rate", () => {
    const result = federalWithholding(3000, "biweekly", "single");
    expect(result.annualGross).toBe(78000);
    expect(result.adjustment).toBe(8600);
    expect(result.adjustedAnnualWages).toBe(69400);
    // Published row: $5,800 + 22% of ($69,400 - $57,900).
    expect(result.annualTax).toBe(8330);
    expect(result.perPaycheck).toBe(320.38);
    expect(result.bracketLines.map((line) => line.tax)).toEqual([0, 1240, 4560, 2530]);
  });

  it("calculates married filing jointly, monthly", () => {
    const result = federalWithholding(10000, "monthly", "joint");
    expect(result.adjustedAnnualWages).toBe(107100);
    // Published row: $2,480 + 12% of ($107,100 - $44,100).
    expect(result.annualTax).toBe(10040);
    expect(result.perPaycheck).toBe(836.67);
  });

  it.each(["single", "joint"] as const)(
    "handles every %s table boundary and the top bracket",
    (status) => {
      // Expected values are IRS table columns A and C, independent of the implementation.
      const expected =
        status === "single"
          ? [
              [7500, 0],
              [19900, 1240],
              [57900, 5800],
              [113200, 17966],
              [209275, 41024],
              [263725, 58448],
              [648100, 192979.25],
            ]
          : [
              [19300, 0],
              [44100, 2480],
              [120100, 11600],
              [230700, 35932],
              [422850, 82048],
              [531750, 116896],
              [788000, 206583.5],
            ];
      const adjustment = status === "single" ? 8600 : 12900;
      for (const [wages, tax] of expected) {
        expect(
          federalWithholding((wages + adjustment) / 12, "monthly", status).annualTax,
        ).toBeCloseTo(tax, 7);
        const below = federalWithholding((wages + adjustment - 0.12) / 12, "monthly", status);
        const above = federalWithholding((wages + adjustment + 0.12) / 12, "monthly", status);
        expect(below.annualTax).toBeLessThanOrEqual(tax);
        expect(above.annualTax).toBeGreaterThan(tax);
      }
      const top = federalWithholding((1_000_000 + adjustment) / 12, "monthly", status);
      const expectedTop = status === "single" ? 323182.25 : 285023.5;
      expect(top.annualTax).toBeCloseTo(expectedTop, 6);
      expect(top.bracketLines.reduce((sum, line) => sum + line.tax, 0)).toBeCloseTo(expectedTop, 6);
    },
  );

  it("covers weekly and semimonthly frequencies without rounding annual wages", () => {
    expect(federalWithholding(1500, "weekly", "single").perPaycheck).toBe(160.19);
    expect(federalWithholding(5000, "semimonthly", "joint").perPaycheck).toBe(418.33);
  });

  it("handles the zero withholding allowance edge and rejects invalid inputs", () => {
    expect(federalWithholding(0, "biweekly", "single").perPaycheck).toBe(0);
    expect(federalWithholding(16100 / 12, "monthly", "single").perPaycheck).toBe(0);
    for (const gross of [-1, NaN, Infinity, 1_000_000_001]) {
      expect(() => federalWithholding(gross, "monthly", "single")).toThrow(RangeError);
    }
    expect(() => federalWithholding(100, "other" as "monthly", "single")).toThrow(RangeError);
    expect(() => federalWithholding(100, "monthly", "other" as PaycheckFilingStatus)).toThrow(
      RangeError,
    );
    expect(WITHHOLDING_SCHEDULES.single).toHaveLength(8);
  });
});

describe("PaycheckOS reconciliation and FICA", () => {
  it("explains the exact remainder in cents without inventing benefit categories", () => {
    const result = paycheckBreakdown(input);
    expect(result.socialSecurity).toBe(186);
    expect(result.medicare).toBe(43.5);
    expect(result.additionalMedicare).toBe(0);
    expect(result.remainder).toBe(250.12);
    expect(result.takeHomePercent).toBeCloseTo(73.333333);
    expect(result.net + result.taxes + result.remainder).toBeCloseTo(result.gross, 8);
    expect(result.annual.net).toBe(57200);
    expect(result.annual.federalIncomeTax).toBe(8329.88);
    expect(result.annual.remainder).toBe(6503.12);
  });

  it("caps annual Social Security and labels a high-income paycheck as an average", () => {
    const result = paycheckBreakdown({ ...input, gross: 20000, net: 12000, frequency: "monthly" });
    expect(result.mode).toBe("average");
    expect(result.socialSecurity).toBe(953.25);
    expect(result.annual.socialSecurity).toBe(11439);
    expect(result.annual.additionalMedicare).toBe(360);
    expect(result.additionalMedicare).toBe(30);
  });

  it("taxes only wages crossing the Social Security cap and stops above it", () => {
    expect(paycheckBreakdown({ ...input, yearToDateGross: 183500 }).socialSecurity).toBe(62);
    expect(paycheckBreakdown({ ...input, yearToDateGross: 184500 }).socialSecurity).toBe(0);
    expect(paycheckBreakdown({ ...input, yearToDateGross: 210000 }).socialSecurity).toBe(0);
  });

  it.each(["single", "joint"] as const)(
    "withholds additional Medicare at the employer threshold for %s",
    (filingStatus) => {
      expect(
        paycheckBreakdown({ ...input, filingStatus, yearToDateGross: 197000 }).additionalMedicare,
      ).toBe(0);
      expect(
        paycheckBreakdown({ ...input, filingStatus, yearToDateGross: 199000 }).additionalMedicare,
      ).toBe(18);
      expect(
        paycheckBreakdown({ ...input, filingStatus, yearToDateGross: 200000 }).additionalMedicare,
      ).toBe(27);
    },
  );

  it("separates joint tax-return liability from employer withholding", () => {
    const result = paycheckBreakdown({
      ...input,
      gross: 18750,
      net: 13000,
      frequency: "monthly",
      filingStatus: "joint",
    });
    expect(result.annual.additionalMedicare).toBe(225);
    expect(result.annual.additionalMedicareLiability).toBe(0);
    expect(
      paycheckBreakdown({
        ...input,
        gross: 25000,
        net: 15000,
        frequency: "monthly",
        filingStatus: "joint",
      }).annual.additionalMedicareLiability,
    ).toBe(450);
    expect(
      paycheckBreakdown({ ...input, gross: 25000, net: 15000, frequency: "monthly" }).annual
        .additionalMedicareLiability,
    ).toBe(900);
  });

  it("keeps negative residuals as mismatches instead of fabricated deductions", () => {
    const result = paycheckBreakdown({ ...input, net: input.gross });
    expect(result.reconciles).toBe(false);
    expect(result.remainder).toBe(-549.88);
    expect(result.annual.remainder).toBeLessThan(0);
  });

  it("supports zero pay, zero deposit, cents, and a first paycheck", () => {
    const zero = paycheckBreakdown({ ...input, gross: 0, net: 0 });
    expect(zero.takeHomePercent).toBe(0);
    expect(zero.remainder).toBe(0);
    expect(zero.annual.taxes).toBe(0);
    expect(paycheckBreakdown({ ...input, net: 0 }).remainder).toBe(2450.12);
    expect(paycheckBreakdown({ ...input, gross: 0.01, net: 0.01 }).remainder).toBe(0);
    const first = paycheckBreakdown({
      ...input,
      gross: 20000,
      net: 12000,
      frequency: "monthly",
      yearToDateGross: 0,
    });
    expect(first.socialSecurity).toBe(1240);
    expect(first.additionalMedicare).toBe(0);
    expect(first.annual.socialSecurity).toBe(11439);
  });

  it("rejects impossible deposits and invalid year-to-date wages", () => {
    for (const net of [-1, NaN, Infinity, 3000.01])
      expect(() => paycheckBreakdown({ ...input, net })).toThrow(RangeError);
    for (const yearToDateGross of [-1, NaN, Infinity, 1_000_000_001]) {
      expect(() => paycheckBreakdown({ ...input, yearToDateGross })).toThrow(RangeError);
    }
  });
});

describe("pasted dollars and share image", () => {
  it("accepts dollar signs and comma grouping while rejecting malformed input", () => {
    expect(parsePaycheckMoney(" $3,000.25 ")).toBe(3000.25);
    expect(parsePaycheckMoney("0")).toBe(0);
    for (const value of [
      "",
      "-1",
      "NaN",
      "Infinity",
      "12,34",
      "1e3",
      "1.234",
      "1 000",
      "1000000001",
    ]) {
      expect(parsePaycheckMoney(value)).toBeNull();
    }
  });

  it("creates a branded image with the tool link and escaped content", () => {
    const svg = shareCardSvg({
      title: "<script>&",
      metrics: [{ label: "Gross", value: "$3,000.00", href: "#inputs" }],
      summary: "I kept 73% of my paycheck. Here's where the rest went.",
      url: "https://christianbrinkleync.com/tools/paycheck-breakdown",
    });
    expect(svg).toContain("CHRISTIAN BRINKLEY");
    expect(svg).toContain("christianbrinkleync.com/tools/paycheck-breakdown");
    expect(svg).toContain("&lt;script&gt;&amp;");
    expect(svg).not.toContain("<script>");
    expect(svg).toContain("Christian is not a CPA.");
  });
});
