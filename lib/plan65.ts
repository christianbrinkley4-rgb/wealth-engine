/**
 * The Medicare half of a retirement tax decision.
 *
 * The two calculators on this site each answer half a question. /medicare says
 * what your Part B premium will be; /roth-window says how much you could
 * convert before it changes. Neither says the thing people actually want to
 * know, which is what the difference is worth in dollars if you get the timing
 * wrong — and that is the number that makes somebody pick up the phone.
 *
 * WHAT THIS MODELS
 *
 * One decision, honestly: you have a traditional balance you intend to convert
 * to Roth, and you can either do it in one year or spread it across several.
 * Converting in one year adds the whole balance to your MAGI, which can land
 * you several IRMAA tiers up. IRMAA is redetermined every year, so that lands
 * on one premium year — but the amounts are large and entirely avoidable, and
 * they are published by CMS rather than estimated by me.
 *
 * WHAT THIS DELIBERATELY DOES NOT MODEL
 *
 *   - Income tax. A conversion is taxable, and spreading it changes which
 *     income-tax brackets it falls in. That interacts with everything here and
 *     is genuinely a CPA's job. The UI says so rather than pretending.
 *   - Investment growth, inflation, or future bracket indexation. Every figure
 *     is in 2026 dollars against the 2026 schedule.
 *   - What a Medigap policy would cost, or whether an insurer would issue one.
 *     Underwriting outcomes are not predictable and inventing them would be
 *     both wrong and a compliance problem.
 *
 * Everything below is a pure function of published numbers, so it can be
 * tested — and it is, in lib/__tests__/plan65.test.ts.
 */

import {
  calculatePartBPremium,
  getBrackets,
  STANDARD_BASE_PREMIUM_2026,
  type FilingStatus,
  type IrmaaBracket,
} from "./irmaa";

/** The MAGI year Medicare uses is two years before the premium year. */
export const IRMAA_LOOKBACK_YEARS = 2;

/** Part B late enrollment penalty: 10% of the base premium per full 12 months. */
export const PART_B_PENALTY_RATE = 0.1;

export type MedigapStatus = "before" | "open" | "closed";

export interface Plan65Inputs {
  age: number;
  filingStatus: FilingStatus;
  /** Expected MAGI this year, before any conversion. */
  magi: number;
  /** Traditional IRA / 401(k) balance they are considering converting. */
  traditionalBalance: number;
}

export interface ConversionScenario {
  /** MAGI once the conversion lands. */
  magi: number;
  bracket: IrmaaBracket;
  /** Extra Part B cost for one person, for one premium year. */
  annualSurchargePerPerson: number;
  /** Doubled when both spouses are on Medicare. */
  annualSurchargeHousehold: number;
  /** How many tiers above where they sit today. */
  tiersCrossed: number;
}

export interface Plan65Result {
  currentBracket: IrmaaBracket;
  nextBracket: IrmaaBracket | null;
  /** Room before the next tier, at today's MAGI. */
  headroom: number;
  atTopBracket: boolean;

  /** Convert the whole balance in a single year. */
  allAtOnce: ConversionScenario;
  /** Spread it, staying inside today's tier. */
  spread: {
    perYear: number;
    yearsNeeded: number;
    annualSurchargeHousehold: 0;
    /** True when there is no headroom to spread into. */
    impossible: boolean;
  };
  /** What the timing is worth: the surcharge the spread version avoids. */
  avoidableSurcharge: number;

  /**
   * Years until the MAGI year that sets the first Medicare premium. Income in
   * that year and after is what Medicare looks at, so this is the runway.
   */
  yearsOfClearRunway: number;
  lookbackHasStarted: boolean;

  medigap: MedigapStatus;
}

function householdMultiplier(filingStatus: FilingStatus): number {
  // Married filing jointly is modelled as two enrollees, because IRMAA is
  // charged per person and the surcharge lands on both premiums.
  return filingStatus === "married_jointly" ? 2 : 1;
}

/** The tier a MAGI lands in, and how far above the current tier that is. */
function scenarioFor(
  magi: number,
  filingStatus: FilingStatus,
  currentBracket: IrmaaBracket,
): ConversionScenario {
  const brackets = getBrackets(filingStatus);
  const bracket = calculatePartBPremium(magi, filingStatus);
  const perPerson = Math.max(0, (bracket.partBPremium - currentBracket.partBPremium) * 12);
  const indexOf = (b: IrmaaBracket) => brackets.findIndex((x) => x.bracketName === b.bracketName);

  return {
    magi,
    bracket,
    annualSurchargePerPerson: perPerson,
    annualSurchargeHousehold: perPerson * householdMultiplier(filingStatus),
    tiersCrossed: Math.max(0, indexOf(bracket) - indexOf(currentBracket)),
  };
}

export function calculatePlan65(inputs: Plan65Inputs): Plan65Result {
  const magi = Math.max(0, Math.round(inputs.magi));
  const balance = Math.max(0, Math.round(inputs.traditionalBalance));
  const brackets = getBrackets(inputs.filingStatus);
  const currentBracket = calculatePartBPremium(magi, inputs.filingStatus);
  const currentIndex = brackets.findIndex((b) => b.bracketName === currentBracket.bracketName);
  const nextBracket = brackets[currentIndex + 1] ?? null;

  // A cent under the next tier's floor is still inside this tier.
  const headroom = nextBracket ? Math.max(0, Math.floor(nextBracket.minIncome - magi - 0.01)) : 0;

  const allAtOnce = scenarioFor(magi + balance, inputs.filingStatus, currentBracket);

  const canSpread = headroom > 0 && balance > 0;
  const spread = {
    perYear: canSpread ? Math.min(headroom, balance) : 0,
    yearsNeeded: canSpread ? Math.ceil(balance / headroom) : 0,
    annualSurchargeHousehold: 0 as const,
    impossible: balance > 0 && headroom <= 0,
  };

  // The MAGI year that decides the premium at 65 is the year they turn 63.
  const lookbackStartAge = 65 - IRMAA_LOOKBACK_YEARS;
  const yearsOfClearRunway = Math.max(0, lookbackStartAge - inputs.age);

  const medigap: MedigapStatus = inputs.age < 65 ? "before" : inputs.age < 66 ? "open" : "closed";

  return {
    currentBracket,
    nextBracket,
    headroom,
    atTopBracket: nextBracket === null,
    allAtOnce,
    spread,
    // Spreading only avoids the surcharge when spreading is actually possible.
    avoidableSurcharge: spread.impossible ? 0 : allAtOnce.annualSurchargeHousehold,
    yearsOfClearRunway,
    lookbackHasStarted: inputs.age >= lookbackStartAge,
    medigap,
  };
}

/**
 * The lifetime Part B penalty for delaying enrolment without other qualifying
 * coverage. 10% of the standard premium for every full 12 months, and it is
 * charged for as long as the person holds Part B rather than once.
 */
export function partBLatePenalty(monthsLate: number): {
  monthlyPenalty: number;
  annualPenalty: number;
  fullYearsLate: number;
} {
  const fullYearsLate = Math.max(0, Math.floor(monthsLate / 12));
  const monthlyPenalty = STANDARD_BASE_PREMIUM_2026 * PART_B_PENALTY_RATE * fullYearsLate;

  return {
    fullYearsLate,
    monthlyPenalty,
    annualPenalty: monthlyPenalty * 12,
  };
}
