import { describe, expect, it } from "vitest";

import { checkRetirement, type CheckerInputs } from "@/lib/retirementChecker";

const TODAY = new Date(2026, 10, 5); // Nov 5, 2026

function base(over: Partial<CheckerInputs> = {}): CheckerInputs {
  return {
    birthMonth: 6,
    birthYear: 1958, // 68
    medicare: "part_a_and_b",
    partBStart: null,
    coverage: "medicare_only",
    employerSize: "unknown",
    contributesToHsa: false,
    collectsSocialSecurity: true,
    filingStatus: "individual",
    incomeThisYear: null,
    rothConversion: null,
    recentLifeChange: false,
    payingIrmaa: false,
    ...over,
  };
}

const ids = (inputs: CheckerInputs) => checkRetirement(inputs, TODAY).map((f) => f.id);

describe("retirement mistake checker", () => {
  it("finds nothing for someone settled on Medicare", () => {
    expect(ids(base())).toEqual([]);
  });

  it("flags an open first sign-up window", () => {
    // Turns 65 in January 2027: window Oct 2026 through Apr 2027.
    const found = checkRetirement(
      base({
        birthMonth: 1,
        birthYear: 1962,
        medicare: "none",
        coverage: "none",
        collectsSocialSecurity: false,
      }),
      TODAY,
    );
    const f = found.find((x) => x.id === "first-window");
    expect(f?.severity).toBe("act_now");
    expect(f?.detail).toContain("October 2026");
    expect(f?.detail).toContain("April 2027");
  });

  it("doesn't nag people who can wait on large-employer coverage", () => {
    expect(
      ids(
        base({
          birthMonth: 1,
          birthYear: 1962,
          medicare: "none",
          coverage: "employer_active",
          employerSize: "20_plus",
          collectsSocialSecurity: false,
        }),
      ),
    ).toEqual([]);
  });

  it("catches the COBRA and retiree traps at 65+", () => {
    expect(ids(base({ medicare: "part_a_only", coverage: "cobra" }))).toContain("cobra-trap");
    expect(ids(base({ medicare: "part_a_only", coverage: "retiree" }))).toContain("cobra-trap");
  });

  it("warns about a missed window with no qualifying coverage", () => {
    expect(ids(base({ medicare: "part_a_only", coverage: "none" }))).toContain("missed-window");
  });

  it("warns small-employer workers at 65+ without Part B", () => {
    expect(
      ids(base({ medicare: "part_a_only", coverage: "employer_active", employerSize: "under_20" })),
    ).toContain("small-employer");
    expect(
      ids(base({ medicare: "part_a_only", coverage: "employer_active", employerSize: "20_plus" })),
    ).not.toContain("small-employer");
  });

  it("flags HSA contributions once Medicare or Social Security has started", () => {
    const found = checkRetirement(base({ contributesToHsa: true }), TODAY);
    expect(found.find((f) => f.id === "hsa")?.severity).toBe("act_now");
  });

  it("flags Marketplace coverage at 65", () => {
    expect(ids(base({ medicare: "part_a_only", coverage: "marketplace" }))).toContain(
      "marketplace",
    );
  });

  it("estimates the IRMAA effect of a Roth conversion with 2026 brackets", () => {
    const found = checkRetirement(base({ incomeThisYear: 90000, rothConversion: 40000 }), TODAY);
    const f = found.find((x) => x.id === "irmaa-roth");
    expect(f).toBeDefined();
    expect(f?.detail).toContain("$202.90");
    expect(f?.detail).toContain("$284.10"); // $130,000 is Tier 1 for a single filer in 2026
    expect(ids(base({ incomeThisYear: 50000, rothConversion: 20000 }))).not.toContain("irmaa-roth");
  });

  it("points surcharge payers with a life change to SSA-44", () => {
    expect(ids(base({ payingIrmaa: true, recentLifeChange: true }))).toContain("irmaa-appeal");
    expect(ids(base({ payingIrmaa: true, recentLifeChange: false }))).not.toContain("irmaa-appeal");
  });

  it("knows when the Medigap window is open", () => {
    expect(ids(base({ partBStart: { month: 8, year: 2026 } }))).toContain("medigap-window");
    expect(ids(base({ partBStart: { month: 1, year: 2026 } }))).not.toContain("medigap-window");
  });

  it("puts urgent findings first and writes without em dashes", () => {
    const found = checkRetirement(
      base({
        medicare: "part_a_only",
        coverage: "cobra",
        payingIrmaa: true,
        recentLifeChange: true,
        contributesToHsa: true,
      }),
      TODAY,
    );
    const firstWatch = found.findIndex((f) => f.severity === "watch");
    expect(found.slice(firstWatch).every((f) => f.severity === "watch")).toBe(true);
    for (const f of found) {
      expect(`${f.title} ${f.detail} ${f.action}`).not.toMatch(/[–—]/);
      expect(f.source.url).toMatch(/^https:\/\/(www\.)?(medicare|healthcare|ssa)\.gov\//);
    }
  });

  it("estimates earnings-test withholding before full retirement age", () => {
    // Born 1964: FRA 67 in 2031, so 2026 uses the lower $24,480 limit, $1 per $2 over.
    const found = checkRetirement(
      base({
        birthMonth: 3,
        birthYear: 1964,
        medicare: "none",
        coverage: "employer_active",
        employerSize: "20_plus",
        wagesThisYear: 40000,
      }),
      TODAY,
    );
    const f = found.find((x) => x.id === "earnings-test");
    expect(f?.detail).toContain("$24,480.00");
    expect(f?.detail).toContain("$7,760.00");
    expect(
      ids(
        base({
          birthMonth: 3,
          birthYear: 1964,
          medicare: "none",
          coverage: "none",
          wagesThisYear: 20000,
        }),
      ),
    ).not.toContain("earnings-test");
  });

  it("uses the higher limit in the year reaching full retirement age", () => {
    // Born June 1960: FRA June 2027. In Feb 2027 the $67,920 limit applies, $1 per $3 over.
    const found = checkRetirement(
      base({ birthMonth: 6, birthYear: 1960, wagesThisYear: 80000 }),
      new Date(2027, 1, 10),
    );
    expect(found.find((x) => x.id === "earnings-test")?.detail).toContain("$4,027.00");
    // After FRA, earnings don't count.
    expect(ids(base({ birthMonth: 6, birthYear: 1958, wagesThisYear: 200000 }))).not.toContain(
      "earnings-test",
    );
  });
});
