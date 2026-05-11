/**
 * 2025→2026 tax-impact helpers (educational estimates).
 * Social Security inclusion follows IRS Publication 915-style provisional income tiers.
 * Standard deductions are fixed inputs per product audit vectors (not official IRS final numbers).
 */

export type TaxFilingStatus = "individual" | "married_jointly";

export interface CalculateTaxImpactInput {
  filingStatus: TaxFilingStatus;
  /** Income for provisional-income math, excluding Social Security benefits. */
  agiExcludingSocialSecurity: number;
  socialSecurityBenefits: number;
  taxExemptInterest?: number;
  /** Marginal ordinary rate applied to extra taxable income from std. deduction change. */
  marginalRate?: number;
}

export interface TaxImpactResult {
  /** Share of Social Security benefits taxed as gross income (0–0.85). */
  ssTaxablePercent: number;
  /** Extra federal tax from the 2026 vs 2025 standard deduction change (annual, USD). */
  additionalTaxBurden: number;
}

/** Audit vector: 2025 standard deduction by filing status. */
export const STANDARD_DEDUCTION_2025: Record<TaxFilingStatus, number> = {
  individual: 15_000,
  married_jointly: 30_000,
};

/** Audit vector: 2026 standard deduction by filing status. */
export const STANDARD_DEDUCTION_2026: Record<TaxFilingStatus, number> = {
  individual: 8_300,
  married_jointly: 16_600,
};

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function taxableSocialSecuritySlice(
  filingStatus: TaxFilingStatus,
  agiExclSs: number,
  taxExemptInterest: number,
  ss: number,
): { taxableSs: number; ssTaxablePercent: number } {
  if (ss <= 0) {
    return { taxableSs: 0, ssTaxablePercent: 0 };
  }

  const provisionalIncome = agiExclSs + taxExemptInterest + 0.5 * ss;
  const [firstBase, secondBase] =
    filingStatus === "individual" ? [25_000, 34_000] : [32_000, 44_000];
  const tier2AddOff = filingStatus === "individual" ? 4_500 : 6_000;

  let taxableSs = 0;
  if (provisionalIncome <= firstBase) {
    taxableSs = 0;
  } else if (provisionalIncome <= secondBase) {
    taxableSs = Math.min(0.5 * ss, 0.5 * (provisionalIncome - firstBase));
  } else {
    taxableSs = Math.min(0.85 * ss, 0.85 * (provisionalIncome - secondBase) + tier2AddOff);
  }

  taxableSs = round2(taxableSs);
  return { taxableSs, ssTaxablePercent: round2(taxableSs / ss) };
}

function additionalBurdenFromStdDeductionDelta(
  filingStatus: TaxFilingStatus,
  grossIncomeBeforeDeduction: number,
  marginalRate: number,
): number {
  const taxable2025 = Math.max(0, grossIncomeBeforeDeduction - STANDARD_DEDUCTION_2025[filingStatus]);
  const taxable2026 = Math.max(0, grossIncomeBeforeDeduction - STANDARD_DEDUCTION_2026[filingStatus]);
  const extraTaxable = Math.max(0, taxable2026 - taxable2025);
  return round2(extraTaxable * marginalRate);
}

export function calculateTaxImpact(input: CalculateTaxImpactInput): TaxImpactResult {
  const taxExempt = input.taxExemptInterest ?? 0;
  const marginal = input.marginalRate ?? 0.22;

  const { taxableSs, ssTaxablePercent } = taxableSocialSecuritySlice(
    input.filingStatus,
    input.agiExcludingSocialSecurity,
    taxExempt,
    input.socialSecurityBenefits,
  );

  const grossBeforeDeduction = input.agiExcludingSocialSecurity + taxableSs;
  const additionalTaxBurden = additionalBurdenFromStdDeductionDelta(
    input.filingStatus,
    grossBeforeDeduction,
    marginal,
  );

  return { ssTaxablePercent, additionalTaxBurden };
}
