import { NC_HISTORY } from "@/lib/ncLandscapeHistory";
import { formatDollars, formatPremium } from "@/lib/ncLandscapeCopy";

/** Shared numbers and sentences for /medicare-nc-history, computed from the data, never typed in. */

export const HISTORY_YEARS = NC_HISTORY.years;
export const FIRST_YEAR = HISTORY_YEARS[0];
export const LAST_YEAR = HISTORY_YEARS[HISTORY_YEARS.length - 1];
export const HISTORY_COUNTIES = Object.keys(NC_HISTORY.counties).sort();

export function state(year: number) {
  return NC_HISTORY.statewide[String(year)];
}

export function county(name: string, year: number) {
  return NC_HISTORY.counties[name]?.[String(year)];
}

/** The year with the lowest statewide median out-of-pocket maximum. */
export function lowestMoopYear(): number {
  return HISTORY_YEARS.reduce((best, y) =>
    (state(y).moopMedian ?? Infinity) < (state(best).moopMedian ?? Infinity) ? y : best,
  );
}

export function percentChange(from: number, to: number): number {
  return Math.round(((to - from) / from) * 100);
}

/** One plain-English sentence about a county's six years. No plan or insurer names. */
export function describeCountyHistory(name: string): string {
  const a = county(name, FIRST_YEAR);
  const b = county(name, LAST_YEAR);
  if (!a || !b) return "";
  const plans =
    a.plans === b.plans
      ? `the same number of Medicare Advantage plans (${b.plans})`
      : `${b.plans} Medicare Advantage plans for ${LAST_YEAR}, ${b.plans > a.plans ? "up" : "down"} from ${a.plans} in ${FIRST_YEAR}`;
  const moop =
    a.moopMedian !== null && b.moopMedian !== null && a.moopMedian !== b.moopMedian
      ? ` The typical in-network out-of-pocket max ${b.moopMedian > a.moopMedian ? "went up" : "went down"} from ${formatDollars(a.moopMedian)} to ${formatDollars(b.moopMedian)}.`
      : "";
  return `${name} County has ${plans}.${moop}`;
}

export { formatDollars, formatPremium };
