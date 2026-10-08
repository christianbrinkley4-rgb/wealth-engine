/**
 * Roth conversion multi-year analyzer: pure math, no I/O.
 *
 * Each year until RMD age, the model grows the pre-tax balance at the
 * assumed rate, then converts as much as fits under the top of the user's
 * current marginal bracket ("filling" the bracket) without crossing into
 * the next one. Lifetime taxes with the plan are compared against doing
 * nothing and paying tax on the whole grown balance at RMD time.
 *
 * This is a simplified educational model, not tax advice. Assumptions are
 * stated on the page: bracket tops and the standard deduction stay where
 * they are, other taxable income is flat every year, conversion taxes are
 * paid from outside funds, and the same growth rate applies either way.
 */

export type FilingStatus = "single" | "joint";

/**
 * 2026 federal brackets, copied verbatim from the verified figures in
 * app/tools/take-home-pay/TakeHomePay.tsx (IRS Rev. Proc. 2025-32).
 * Each row is [top of bracket, rate].
 */
export const FEDERAL_BRACKETS_2026: Record<FilingStatus, Array<[number, number]>> = {
  single: [
    [12400, 0.1],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  joint: [
    [24800, 0.1],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
};

export const CURRENT_YEAR = 2026;

/** SECURE 2.0 RMD ages, as documented on the site's /wealth/rmd-explained-73 page. */
export function rmdAge(birthYear: number): number {
  return birthYear >= 1960 ? 75 : 73;
}

/** Top of the bracket for the given marginal rate and filing status. */
export function bracketTop(status: FilingStatus, rate: number): number {
  for (const [cap, bracketRate] of FEDERAL_BRACKETS_2026[status]) {
    if (bracketRate === rate) return cap;
  }
  // Rate not found (shouldn't happen from the page's select); treat the
  // top bracket as unbounded so conversion defaults to filling nothing.
  return Infinity;
}

export interface LadderInput {
  birthYear: number;
  filingStatus: FilingStatus;
  /** Other taxable income per year, assumed flat every year. */
  baselineIncome: number;
  preTaxBalance: number;
  /** Current marginal federal rate (e.g. 0.22). */
  currentRate: number;
  /** Expected marginal federal rate in retirement (e.g. 0.22). */
  retirementRate: number;
  /** Assumed yearly growth as a decimal (e.g. 0.07). */
  growthRate: number;
}

export interface LadderYear {
  year: number;
  age: number;
  /** Balance after growth, before this year's conversion. */
  balanceBefore: number;
  conversion: number;
  taxOnConversion: number;
  cumulativeConverted: number;
  cumulativeTax: number;
  /** Pre-tax balance left after this year's conversion. */
  balanceAfter: number;
}

export interface LadderResult {
  currentAge: number;
  rmdAgeValue: number;
  rmdYear: number;
  yearsUntilRmd: number;
  /** True when already at/past RMD age: the ladder cannot run. */
  pastRmd: boolean;
  /** True when the retirement rate is not lower than the current one. */
  notBeneficial: boolean;
  years: LadderYear[];
  totalConverted: number;
  /** Year (age) when the balance hit zero, or null if it never did. */
  exhaustedAtAge: number | null;
  remainingAtRmd: number;
  /** Lifetime tax if the user converts per the plan, then pays the retirement rate on what's left. */
  taxWithConversions: number;
  /** Lifetime tax if the user does nothing and pays the retirement rate on the whole grown balance. */
  taxWithoutConversions: number;
  /** taxWithoutConversions - taxWithConversions. Positive means the plan saves tax. */
  lifetimeSavings: number;
  /** Balance at RMD age if nothing is converted (for the chart). */
  noConversionBalanceSeries: number[];
}

export function computeLadder(input: LadderInput): LadderResult {
  const currentAge = CURRENT_YEAR - input.birthYear;
  const rmdAgeValue = rmdAge(input.birthYear);
  const yearsUntilRmd = Math.max(0, rmdAgeValue - currentAge);

  const pastRmd = yearsUntilRmd === 0;

  if (pastRmd) {
    return {
      currentAge,
      rmdAgeValue,
      rmdYear: CURRENT_YEAR,
      yearsUntilRmd: 0,
      pastRmd: true,
      notBeneficial: input.retirementRate >= input.currentRate,
      years: [],
      totalConverted: 0,
      exhaustedAtAge: null,
      remainingAtRmd: Math.max(0, input.preTaxBalance),
      taxWithConversions: 0,
      taxWithoutConversions: 0,
      lifetimeSavings: 0,
      noConversionBalanceSeries: [],
    };
  }

  const top = bracketTop(input.filingStatus, input.currentRate);
  const headroom = Math.max(0, top - Math.max(0, input.baselineIncome));

  const years: LadderYear[] = [];
  const noConversionBalanceSeries: number[] = [];
  let balance = Math.max(0, input.preTaxBalance);
  let noConversionBalance = Math.max(0, input.preTaxBalance);
  let cumulativeConverted = 0;
  let cumulativeTax = 0;
  let exhaustedAtAge: number | null = null;

  for (let i = 0; i < yearsUntilRmd; i++) {
    const age = currentAge + i;
    const grown = balance * (1 + input.growthRate);
    const conversion = Math.min(grown, headroom);
    const taxOnConversion = conversion * input.currentRate;
    const balanceAfter = grown - conversion;
    cumulativeConverted += conversion;
    cumulativeTax += taxOnConversion;
    if (balanceAfter <= 0 && exhaustedAtAge === null && input.preTaxBalance > 0) {
      exhaustedAtAge = age;
    }

    noConversionBalance *= 1 + input.growthRate;
    noConversionBalanceSeries.push(noConversionBalance);

    years.push({
      year: CURRENT_YEAR + i,
      age,
      balanceBefore: grown,
      conversion,
      taxOnConversion,
      cumulativeConverted,
      cumulativeTax,
      balanceAfter,
    });
    balance = balanceAfter;
  }

  const remainingAtRmd = balance;
  const taxWithConversions = cumulativeTax + remainingAtRmd * input.retirementRate;
  const taxWithoutConversions = noConversionBalance * input.retirementRate;
  const lifetimeSavings = taxWithoutConversions - taxWithConversions;

  return {
    currentAge,
    rmdAgeValue,
    rmdYear: CURRENT_YEAR + yearsUntilRmd,
    yearsUntilRmd,
    pastRmd: false,
    notBeneficial: input.retirementRate >= input.currentRate,
    years,
    totalConverted: cumulativeConverted,
    exhaustedAtAge,
    remainingAtRmd,
    taxWithConversions,
    taxWithoutConversions,
    lifetimeSavings,
    noConversionBalanceSeries,
  };
}
