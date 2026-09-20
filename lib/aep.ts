/**
 * Annual Enrollment phase helpers.
 *
 * AEP runs October 15 – December 7 every year. Marketing copy must never claim
 * the window "is open" outside those dates, so hero headlines are derived from
 * the phase instead of hardcoded. Dates are evaluated in America/New_York,
 * where the site's audience lives.
 */

export type AepPhase = "before" | "open" | "after";

export function aepPhase(today: Date = new Date()): AepPhase {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "numeric",
    day: "numeric",
  }).formatToParts(today);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const month = get("month");
  const day = get("day");

  if (month < 10 || (month === 10 && day < 15)) return "before";
  if (month === 10 || month === 11 || (month === 12 && day <= 7)) return "open";
  // Dec 8–31: the window just closed. From Jan 1 the next AEP is "before".
  return "after";
}

/** Hero H1 per phase — the "open" claim only renders inside the window. */
export const AEP_HERO_TITLES: Record<AepPhase, string> = {
  before:
    "Medicare Annual Enrollment opens October 15 — book your free 2027 plan review",
  open: "Medicare Annual Enrollment is open — let's review your plan for 2027",
  after:
    "Annual Enrollment has ended — here's how I can still help with Medicare",
};
