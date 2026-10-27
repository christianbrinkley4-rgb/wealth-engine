import type { CountyLandscape } from "./ncLandscapeTypes";

export function formatDollars(value: number | null): string {
  if (value === null) return "n/a";
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function change(a: number, b: number, noun: string): string {
  if (a === b) return `the same number of ${noun} (${b})`;
  return `${b} ${noun}, ${b > a ? "up" : "down"} from ${a}`;
}

/** One plain-English sentence about a county's 2026 to 2027 change. No plan or insurer names. */
export function describeCounty(county: string, data: CountyLandscape): string {
  const a = data.y2026;
  const b = data.y2027;
  const moop =
    a.moopMedian !== null && b.moopMedian !== null && a.moopMedian !== b.moopMedian
      ? ` The typical in-network out-of-pocket max ${b.moopMedian > a.moopMedian ? "goes up" : "goes down"} from ${formatDollars(a.moopMedian)} to ${formatDollars(b.moopMedian)}.`
      : "";
  return `For 2027, ${county} County has ${change(a.plans, b.plans, "Medicare Advantage plans")}, and ${change(a.zeroPremium, b.zeroPremium, "$0-premium plans with drug coverage")}.${moop}`;
}

/** Counties Christian serves most, shown in the server-rendered table. */
export const TRIAD_COUNTIES = [
  "Guilford",
  "Forsyth",
  "Alamance",
  "Davidson",
  "Randolph",
  "Rockingham",
  "Davie",
  "Stokes",
  "Yadkin",
  "Surry",
  "Caswell",
  "Granville",
] as const;
