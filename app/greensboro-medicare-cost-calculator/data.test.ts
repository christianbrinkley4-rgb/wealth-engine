import { describe, expect, it } from "vitest";

import {
  calculate,
  DRUG_MONTHLY_PER_MED_ESTIMATE,
  FIGURE_LABELS,
  GUILFORD_ZIPS,
  MA_AVG_COPAY_PER_VISIT,
  MA_LANDSCAPE_2027,
  MA_PART_D_DEDUCTIBLE,
  medigapGMonthly,
  PART_B_DEDUCTIBLE,
  PART_B_MONTHLY,
} from "@/app/greensboro-medicare-cost-calculator/data";

describe("medigapGMonthly", () => {
  it("uses the filed rate for age 65", () => {
    expect(medigapGMonthly(65)).toBe(211);
  });

  it("clamps ages below 65 and above 74", () => {
    expect(medigapGMonthly(60)).toBe(medigapGMonthly(65));
    expect(medigapGMonthly(95)).toBe(medigapGMonthly(74));
  });

  it("rises with age", () => {
    expect(medigapGMonthly(74)).toBeGreaterThan(medigapGMonthly(65));
  });
});

describe("calculate", () => {
  it("includes the Part B premium on both paths", () => {
    const r = calculate({ age: 67, meds: 0, visits: 0 });
    const partBYearly = PART_B_MONTHLY * 12;
    const gPartB = r.medigapLines.find((l) => l.label.includes("Part B premium"));
    const maPartB = r.maLines.find((l) => l.label.includes("Part B premium"));
    expect(gPartB?.amount).toBe(partBYearly);
    expect(maPartB?.amount).toBe(partBYearly);
  });

  it("adds the Part B deductible to the Medigap path only", () => {
    const r = calculate({ age: 67, meds: 0, visits: 0 });
    const gDed = r.medigapLines.find((l) => l.label.includes("Part B deductible"));
    expect(gDed?.amount).toBe(PART_B_DEDUCTIBLE);
    const maDed = r.maLines.find((l) => l.label.includes("Part B deductible"));
    expect(maDed).toBeUndefined();
  });

  it("skips the Part D deductible on MA when no medications", () => {
    const r = calculate({ age: 67, meds: 0, visits: 4 });
    const line = r.maLines.find((l) => l.label.includes("Part D deductible"));
    expect(line?.amount).toBe(0);
  });

  it("applies the Part D deductible on MA when medications exist", () => {
    const r = calculate({ age: 67, meds: 3, visits: 4 });
    const line = r.maLines.find((l) => l.label.includes("Part D deductible"));
    expect(line?.amount).toBe(MA_PART_D_DEDUCTIBLE);
  });

  it("reports the lower path and a non-negative difference", () => {
    const r = calculate({ age: 67, meds: 2, visits: 6 });
    expect(r.difference).toBeGreaterThanOrEqual(0);
    expect(["Medigap Plan G", "Medicare Advantage"]).toContain(r.lowerPath);
    expect(r.medigapYearly).toBeGreaterThan(0);
    expect(r.maYearly).toBeGreaterThan(0);
  });

  it("Medigap gets more expensive with age", () => {
    const young = calculate({ age: 65, meds: 0, visits: 0 });
    const old = calculate({ age: 74, meds: 0, visits: 0 });
    expect(old.medigapYearly).toBeGreaterThan(young.medigapYearly);
  });
});

describe("figure labels (November 15, 2026 review)", () => {
  const byFigure = (text: string) => FIGURE_LABELS.find((row) => row.figure.includes(text));

  it("labels every figure with a year, a status and a source", () => {
    expect(FIGURE_LABELS.length).toBeGreaterThanOrEqual(7);
    for (const row of FIGURE_LABELS) {
      expect(row.year.length, row.figure).toBeGreaterThan(0);
      expect(row.status.length, row.figure).toBeGreaterThan(0);
      expect(row.source.length, row.figure).toBeGreaterThan(0);
    }
  });

  it("keeps the 2027 Part B premium and deductible as projections, not final", () => {
    // CMS had not published final 2027 Part B figures on November 15, 2026.
    // Change these to "Final" only with the CMS fact sheet in hand.
    expect(PART_B_MONTHLY).toBe(209.5);
    expect(PART_B_DEDUCTIBLE).toBe(292);
    expect(byFigure("Part B premium")).toMatchObject({
      value: "$209.50",
      year: "2027",
      status: "Projection",
    });
    expect(byFigure("Part B deductible")).toMatchObject({
      value: "$292",
      year: "2027",
      status: "Projection",
    });
  });

  it("marks the Part D deductible final, with the CMS source", () => {
    expect(MA_PART_D_DEDUCTIBLE).toBe(700);
    const row = byFigure("Part D maximum deductible");
    expect(row).toMatchObject({ value: "$700", year: "2027", status: "Final" });
    expect(row?.sourceUrl).toBe("https://www.cms.gov/files/document/2027-announcement.pdf");
  });

  it("marks the copay and the drug cost as planning estimates with no source claimed", () => {
    for (const text of ["Copay for one doctor visit", "Cost of one prescription"]) {
      const row = byFigure(text);
      expect(row?.status).toBe("Planning estimate");
      expect(row?.source.startsWith("None.")).toBe(true);
      expect(row?.sourceUrl).toBeUndefined();
    }
    expect(byFigure("Copay")?.value).toBe(`$${MA_AVG_COPAY_PER_VISIT}`);
    expect(byFigure("prescription")?.value).toBe(`$${DRUG_MONTHLY_PER_MED_ESTIMATE}`);
  });

  it("gives a link only to an official cms.gov page", () => {
    for (const row of FIGURE_LABELS) {
      if (row.sourceUrl) expect(new URL(row.sourceUrl).hostname).toBe("www.cms.gov");
    }
  });

  it("does not present the third-party county summary as a CMS figure", () => {
    const county = MA_LANDSCAPE_2027.filter((row) =>
      ["55", "$4.13", "$7,055.45"].includes(row.value),
    );
    expect(county).toHaveLength(3);
    for (const row of county) {
      expect(row.source).toContain("third party");
      expect(row.source).toContain("not a CMS announcement");
    }
  });

  it("shows the year and status on every line of the result", () => {
    const result = calculate({ age: 67, meds: 2, visits: 6 });
    const labels = [...result.medigapLines, ...result.maLines].map((line) => line.label);
    for (const label of labels.filter((text) => text.includes("Part B"))) {
      expect(label).toContain("2027 projected");
    }
    for (const label of labels.filter((text) => /Drugs|Doctor visits|Medigap/.test(text))) {
      expect(label).toMatch(/est\./);
    }
  });
});

describe("GUILFORD_ZIPS", () => {
  it("includes Greensboro and High Point ZIPs", () => {
    expect(GUILFORD_ZIPS.has("27401")).toBe(true);
    expect(GUILFORD_ZIPS.has("27282")).toBe(true);
  });

  it("excludes non-Guilford ZIPs", () => {
    expect(GUILFORD_ZIPS.has("27601")).toBe(false);
    expect(GUILFORD_ZIPS.has("10001")).toBe(false);
  });
});
