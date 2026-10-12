/**
 * Annual Enrollment Period dates for 2027 coverage.
 * October 15 through December 7, 2026, compared in Eastern time.
 */

export type AepPhase = "before" | "open" | "closed";

export type AepWindowState = {
  phase: AepPhase;
  /** Calendar days from today until October 15. Zero once the window has opened. */
  daysUntilOpen: number;
  /** Calendar days from today until December 7. Zero on the deadline. Negative after it. */
  daysUntilDeadline: number;
};

const OPEN = { year: 2026, month: 10, day: 15 };
const DEADLINE = { year: 2026, month: 12, day: 7 };

function etParts(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: value("year"), month: value("month"), day: value("day") };
}

function utcDay(date: { year: number; month: number; day: number }): number {
  return Date.UTC(date.year, date.month - 1, date.day);
}

function daysBetween(
  from: { year: number; month: number; day: number },
  to: { year: number; month: number; day: number },
): number {
  return Math.round((utcDay(to) - utcDay(from)) / 86_400_000);
}

export function aepWindow(now: Date = new Date()): AepWindowState {
  const today = etParts(now);
  const daysUntilOpen = daysBetween(today, OPEN);
  const daysUntilDeadline = daysBetween(today, DEADLINE);
  const phase: AepPhase =
    daysUntilOpen > 0 ? "before" : daysUntilDeadline >= 0 ? "open" : "closed";
  return { phase, daysUntilOpen, daysUntilDeadline };
}

/** One sentence a visitor can act on. Dates only, no invented plan advice. */
export function aepWindowMessage(state: AepWindowState): string {
  if (state.phase === "before") {
    const open =
      state.daysUntilOpen === 1 ? "1 day" : `${state.daysUntilOpen} days`;
    return `Annual Enrollment opens October 15. ${open} until it starts. The deadline is December 7.`;
  }
  if (state.phase === "open") {
    if (state.daysUntilDeadline === 0) return "Annual Enrollment ends today, December 7.";
    const left =
      state.daysUntilDeadline === 1 ? "1 day left" : `${state.daysUntilDeadline} days left`;
    return `${left}. Annual Enrollment ends December 7. Changes start January 1.`;
  }
  return "The fall enrollment window for 2027 coverage has closed. If you already have a Medicare Advantage plan, you may have one more chance from January 1 to March 31.";
}
