export type FilingStatus = "individual" | "joint";

export interface WealthInput {
  currentPortfolio: number;
  annualContribution: number;
  years: number;
}

export interface WealthYear {
  year: number;
  age: number;
  selfManaged: number;
  fiduciaryOptimized: number;
  advisorAlphaValue: number;
}

interface IrmaaTier {
  limitIndividual: number;
  limitJoint: number;
  partBSurcharge: number;
  partDSurcharge: number;
}

interface TaxBracket {
  cap: number;
  rate: number;
}

const TCJA_2025_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  individual: [
    { cap: 11925, rate: 0.1 },
    { cap: 48475, rate: 0.12 },
    { cap: 103350, rate: 0.22 },
    { cap: 197300, rate: 0.24 },
    { cap: 250525, rate: 0.32 },
    { cap: 626350, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  joint: [
    { cap: 23850, rate: 0.1 },
    { cap: 96950, rate: 0.12 },
    { cap: 206700, rate: 0.22 },
    { cap: 394600, rate: 0.24 },
    { cap: 501050, rate: 0.32 },
    { cap: 751600, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
};

const TAX_LAW_2026_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  individual: [
    { cap: 9525, rate: 0.1 },
    { cap: 38700, rate: 0.15 },
    { cap: 93700, rate: 0.25 },
    { cap: 195450, rate: 0.28 },
    { cap: 424950, rate: 0.33 },
    { cap: 426700, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.396 },
  ],
  joint: [
    { cap: 19050, rate: 0.1 },
    { cap: 77400, rate: 0.15 },
    { cap: 156150, rate: 0.25 },
    { cap: 237950, rate: 0.28 },
    { cap: 424950, rate: 0.33 },
    { cap: 480050, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.396 },
  ],
};

const STANDARD_DEDUCTION_2025: Record<FilingStatus, number> = {
  individual: 15000,
  joint: 30000,
};

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  individual: 7500,
  joint: 15000,
};
const NC_FLAT_TAX_RATE = 0.0425;

const IRMAA_TIERS: IrmaaTier[] = [
  { limitIndividual: 103000, limitJoint: 206000, partBSurcharge: 0, partDSurcharge: 0 },
  { limitIndividual: 129000, limitJoint: 258000, partBSurcharge: 74, partDSurcharge: 13.7 },
  { limitIndividual: 161000, limitJoint: 322000, partBSurcharge: 185, partDSurcharge: 35.3 },
  { limitIndividual: 193000, limitJoint: 386000, partBSurcharge: 295.9, partDSurcharge: 57 },
  { limitIndividual: 500000, limitJoint: 750000, partBSurcharge: 406.9, partDSurcharge: 78.6 },
  {
    limitIndividual: Number.POSITIVE_INFINITY,
    limitJoint: Number.POSITIVE_INFINITY,
    partBSurcharge: 443.9,
    partDSurcharge: 85.8,
  },
];

function progressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) {
    return 0;
  }

  let remaining = taxableIncome;
  let previousCap = 0;
  let tax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) {
      break;
    }

    const range = Math.min(remaining, bracket.cap - previousCap);
    tax += range * bracket.rate;
    remaining -= range;
    previousCap = bracket.cap;
  }

  return tax;
}

export function calculateTaxDrag(grossIncome: number, filingStatus: FilingStatus) {
  const taxable2025 = Math.max(0, grossIncome - STANDARD_DEDUCTION_2025[filingStatus]);
  const taxable2026 = Math.max(0, grossIncome - STANDARD_DEDUCTION_2026[filingStatus]);

  const tax2025 = progressiveTax(taxable2025, TCJA_2025_BRACKETS[filingStatus]);
  const tax2026 = progressiveTax(taxable2026, TAX_LAW_2026_BRACKETS[filingStatus]);

  return {
    taxable2025,
    taxable2026,
    tax2025,
    tax2026,
    taxDrag: Math.max(0, tax2026 - tax2025),
  };
}

export function calculateIrmaaAnnualSurcharge(income: number, filingStatus: FilingStatus) {
  const tier = IRMAA_TIERS.find((tierRow) =>
    filingStatus === "joint" ? income <= tierRow.limitJoint : income <= tierRow.limitIndividual,
  )!;
  return (tier.partBSurcharge + tier.partDSurcharge) * 12;
}

export function calculateIrmaaMonthlyBreakdown(income: number, filingStatus: FilingStatus) {
  const tier = IRMAA_TIERS.find((tierRow) =>
    filingStatus === "joint" ? income <= tierRow.limitJoint : income <= tierRow.limitIndividual,
  )!;
  return {
    partBMonthlySurcharge: tier.partBSurcharge,
    partDMonthlySurcharge: tier.partDSurcharge,
  };
}

export function calculateNcTaxDrag(grossIncome: number, filingStatus: FilingStatus) {
  const taxable2025 = Math.max(0, grossIncome - STANDARD_DEDUCTION_2025[filingStatus]);
  const taxable2026 = Math.max(0, grossIncome - STANDARD_DEDUCTION_2026[filingStatus]);
  const tax2025 = taxable2025 * NC_FLAT_TAX_RATE;
  const tax2026 = taxable2026 * NC_FLAT_TAX_RATE;
  return {
    tax2025,
    tax2026,
    taxDrag: Math.max(0, tax2026 - tax2025),
    rate: NC_FLAT_TAX_RATE,
  };
}

export function buildWealthTrajectory(startAge: number, input: WealthInput): WealthYear[] {
  const years = Math.max(1, input.years);
  const output: WealthYear[] = [];
  const selfManagedReturn = 0.06;
  const fiduciaryReturn = 0.078;

  let selfManagedBalance = input.currentPortfolio;
  let fiduciaryBalance = input.currentPortfolio;

  for (let year = 1; year <= years; year += 1) {
    selfManagedBalance = selfManagedBalance * (1 + selfManagedReturn) + input.annualContribution;
    fiduciaryBalance = fiduciaryBalance * (1 + fiduciaryReturn) + input.annualContribution;

    output.push({
      year,
      age: startAge + year,
      selfManaged: Number(selfManagedBalance.toFixed(2)),
      fiduciaryOptimized: Number(fiduciaryBalance.toFixed(2)),
      advisorAlphaValue: Number((fiduciaryBalance - selfManagedBalance).toFixed(2)),
    });
  }

  return output;
}

export function toCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
