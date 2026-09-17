/**
 * Roth Conversion Window calculator.
 *
 * Maps backwards through the 2026 IRMAA brackets to answer the question a
 * pre-retiree CPA hears every fall: "how much can I convert to a Roth this
 * year without bumping my Medicare premium in two years?"
 *
 * IRMAA is determined by MAGI from two years prior (lib/irmaa.ts header for
 * detail). So a $50k conversion in 2026 affects the 2028 Medicare premium.
 * This calculator surfaces the headroom and the cost of each subsequent
 * bracket in plain dollars.
 *
 * Pure function. No side effects, no I/O. Easy to test, easy to reuse from
 * server actions, API routes, or a future PDF generator.
 */

import {
  calculatePartBPremium,
  getBrackets,
  STANDARD_BASE_PREMIUM_2026,
  type FilingStatus,
  type IrmaaBracket,
} from "./irmaa";

export interface UpperBracketProjection {
  bracket: IrmaaBracket;
  /** Max conversion that lands MAGI at the *bottom* of this bracket. */
  maxConversionToReach: number;
  /** Annual cost in premium (per person, 12 months) vs. user’s current bracket. */
  annualPremiumDelta: number;
  /** Same delta extended for a typical married couple (2 enrollees). */
  annualPremiumDeltaMarried: number;
}

export interface RothWindowResult {
  currentBracket: IrmaaBracket;
  nextBracket: IrmaaBracket | null;
  /**
   * Dollars of additional MAGI the user can take on (e.g. via Roth conversion)
   * before crossing into the next IRMAA bracket. 0 if already at the top
   * of a bracket; null if the user is already in the top bracket (no ceiling).
   */
  headroomToNextBracket: number | null;
  /** Premium difference (annualized, per enrollee) of crossing one bracket. */
  oneBracketCrossingAnnualCost: number;
  /** Same as above, doubled for a married-filing-jointly household. */
  oneBracketCrossingAnnualCostMarried: number;
  /** All brackets above the current one, with projected cost data. */
  upperBrackets: UpperBracketProjection[];
}

export interface ConversionLadderYear {
  yearLabel: string;
  maxConversion: number;
  /** Cumulative converted at this point in the ladder. */
  cumulativeConverted: number;
}

const DEFAULT_LADDER_YEARS = 3;

/** Clamp MAGI to a sane non-negative range so callers can pass slider values. */
function safeMagi(magi: number): number {
  if (!Number.isFinite(magi)) return 0;
  return Math.max(0, Math.round(magi * 100) / 100);
}

export function calculateRothWindow(magi: number, filingStatus: FilingStatus): RothWindowResult {
  const validMagi = safeMagi(magi);
  const brackets = getBrackets(filingStatus);
  const current = calculatePartBPremium(validMagi, filingStatus);
  const currentIndex = brackets.findIndex((b) => b.bracketName === current.bracketName);
  const next = brackets[currentIndex + 1] ?? null;

  const headroomToNextBracket = next ? Math.max(0, next.minIncome - validMagi - 0.01) : null;

  const oneBracketCrossingAnnualCost = next
    ? Math.max(0, (next.partBPremium - current.partBPremium) * 12)
    : 0;

  const upperBrackets: UpperBracketProjection[] = brackets
    .slice(currentIndex + 1)
    .map((bracket) => {
      const maxConversionToReach = Math.max(0, bracket.minIncome - validMagi - 0.01);
      const annualPremiumDelta = Math.max(0, (bracket.partBPremium - current.partBPremium) * 12);
      return {
        bracket,
        maxConversionToReach,
        annualPremiumDelta,
        annualPremiumDeltaMarried: annualPremiumDelta * 2,
      };
    });

  return {
    currentBracket: current,
    nextBracket: next,
    headroomToNextBracket,
    oneBracketCrossingAnnualCost,
    oneBracketCrossingAnnualCostMarried: oneBracketCrossingAnnualCost * 2,
    upperBrackets,
  };
}

/**
 * Builds a multi-year Roth conversion ladder that keeps the user’s MAGI
 * *within their current bracket* every year. This is the conservative
 * "no extra Medicare premium" strategy that most advisors recommend.
 *
 * Income is assumed flat; real-world ladders should be re-run yearly against
 * actual income. The output is illustrative, not a substitute for a tax
 * advisor — wire it into the PDF magnet with that caveat in mind.
 */
export function buildConversionLadder(
  magi: number,
  filingStatus: FilingStatus,
  years: number = DEFAULT_LADDER_YEARS,
): ConversionLadderYear[] {
  const window = calculateRothWindow(magi, filingStatus);
  const annualHeadroom = window.headroomToNextBracket ?? 0;
  const startYear = new Date().getFullYear();

  const ladder: ConversionLadderYear[] = [];
  let cumulative = 0;
  for (let i = 0; i < years; i += 1) {
    cumulative += annualHeadroom;
    ladder.push({
      yearLabel: String(startYear + i),
      maxConversion: annualHeadroom,
      cumulativeConverted: cumulative,
    });
  }
  return ladder;
}

/** Plain-English headline for the result card. */
export function rothWindowHeadline(result: RothWindowResult): string {
  const { currentBracket, nextBracket, headroomToNextBracket } = result;

  if (!nextBracket || headroomToNextBracket === null) {
    return (
      `You are already in the ${currentBracket.bracketName} bracket — the top of the IRMAA ` +
      `schedule. Additional conversions do not raise your Medicare premium further, but they ` +
      `do raise your overall taxable income. Talk to a CPA about tax-bracket optimization.`
    );
  }

  if (headroomToNextBracket === 0) {
    return (
      `You are at the top of the ${currentBracket.bracketName} bracket. Any conversion this ` +
      `year would push you into the ${nextBracket.bracketName} bracket — an extra ` +
      `${formatCurrency((nextBracket.partBPremium - currentBracket.partBPremium) * 12)} per ` +
      `enrollee in 2028 Medicare premiums.`
    );
  }

  return (
    `You can convert up to ${formatCurrency(headroomToNextBracket)} this year without crossing ` +
    `into the ${nextBracket.bracketName} bracket. Crossing it would cost approximately ` +
    `${formatCurrency((nextBracket.partBPremium - currentBracket.partBPremium) * 12)} per ` +
    `enrollee in additional Medicare premiums for the year IRMAA applies (2028, based on the ` +
    `2-year MAGI lookback).`
  );
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Re-export the standard base for any UI that needs to label the bottom rung
// of the chart without re-importing from lib/irmaa.
export { STANDARD_BASE_PREMIUM_2026 };
