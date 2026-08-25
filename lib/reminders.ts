/**
 * Enrollment-window reminders.
 *
 * Most people who land on this site aren’t ready to talk — they turn 65 in
 * seven months, or their annual window is months away. Asking them for a phone
 * call is the wrong ask; asking whether they’d like to be told when their
 * window actually opens is a real service, and it converts a "not yet" into a
 * lead with a date on it.
 *
 * All date maths lives here as pure functions with an injectable `today`, so
 * the boundaries are testable rather than discovered in production.
 *
 * The two windows:
 *
 *   Initial Enrollment Period (turning 65) — seven months: the three months
 *   before the month you turn 65, that month, and the three months after.
 *
 *   Annual Enrollment Period (already enrolled) — October 15 to December 7
 *   every year, for coverage starting January 1.
 */

export type ReminderKind = "t65" | "aep";

export interface T65Window {
  /** First day of the month the Initial Enrollment Period opens. */
  opensOn: Date;
  /** Last day of the month it closes. */
  closesOn: Date;
  /** The month they turn 65. */
  birthdayMonth: Date;
  /** When to email them: two weeks before the window opens. */
  sendOn: Date;
  /** Where they are relative to the window, as of `today`. */
  status: "upcoming" | "open" | "closed";
}

const MS_PER_DAY = 86_400_000;

function startOfMonth(year: number, monthIndex: number): Date {
  return new Date(Date.UTC(year, monthIndex, 1));
}

function endOfMonth(year: number, monthIndex: number): Date {
  // Day 0 of the next month is the last day of this one.
  return new Date(Date.UTC(year, monthIndex + 1, 0));
}

export function isValidBirthMonth(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 12;
}

export function isValidBirthYear(value: unknown, today: Date = new Date()): value is number {
  if (typeof value !== "number" || !Number.isInteger(value)) return false;
  const thisYear = today.getUTCFullYear();
  // Anyone the Initial Enrollment Period could still be ahead of, plus a
  // generous margin behind for people who have just passed it.
  return value >= thisYear - 75 && value <= thisYear - 55;
}

/**
 * Works out the Initial Enrollment Period from a birth month and year.
 * `birthMonth` is 1-12.
 */
export function getT65Window(
  birthMonth: number,
  birthYear: number,
  today: Date = new Date(),
): T65Window {
  const turns65Year = birthYear + 65;
  const monthIndex = birthMonth - 1;

  const birthdayMonth = startOfMonth(turns65Year, monthIndex);
  const opensOn = startOfMonth(turns65Year, monthIndex - 3);
  const closesOn = endOfMonth(turns65Year, monthIndex + 3);
  const sendOn = new Date(opensOn.getTime() - 14 * MS_PER_DAY);

  const now = today.getTime();
  const status: T65Window["status"] =
    now < opensOn.getTime() ? "upcoming" : now > closesOn.getTime() ? "closed" : "open";

  return { opensOn, closesOn, birthdayMonth, sendOn, status };
}

/**
 * The dates a person turning 65 actually has to act on.
 *
 * getT65Window answers "when may I sign up." These answer the three questions
 * that follow it, and they are the ones people get wrong:
 *
 *   signUpBy       The end of the three months *before* the birthday month.
 *                  Sign up by then and coverage starts on time; sign up later
 *                  and it starts the month after you enrol, so there is a gap.
 *
 *   coverageStarts Assuming they sign up by signUpBy. Since the Consolidated
 *                  Appropriations Act took effect in 2023 a late-in-window
 *                  enrolment starts the first of the following month rather
 *                  than being delayed two or three, which is why this is worth
 *                  stating rather than leaving as folklore.
 *
 *   medigapOpens/  The six-month Medigap open enrolment window, beginning the
 *   medigapCloses  first month a person is both 65 and enrolled in Part B.
 *                  Inside it no insurer may refuse them or charge more for
 *                  their health history; outside it, in most states, both are
 *                  allowed. It cannot be reopened, which makes it the single
 *                  most expensive date on this page to miss.
 *
 * ASSUMPTION: that Part B starts in the month they turn 65, which is what
 * happens when someone enrols during the first half of their window. Anyone
 * delaying Part B because they are still working has a different Medigap
 * window, opening whenever Part B eventually starts. The UI says so.
 *
 * NOT MODELLED: the birthday-on-the-first rule. Medicare treats someone born
 * on the 1st as turning 65 in the previous month, which shifts every date here
 * back by one. This function only receives a month and a year, so the UI flags
 * it rather than guessing.
 */
export interface T65Dates {
  signUpBy: Date;
  coverageStarts: Date;
  medigapOpens: Date;
  medigapCloses: Date;
}

export function getT65Dates(birthMonth: number, birthYear: number): T65Dates {
  const turns65Year = birthYear + 65;
  const monthIndex = birthMonth - 1;

  return {
    // Last day of the month before the birthday month.
    signUpBy: endOfMonth(turns65Year, monthIndex - 1),
    coverageStarts: startOfMonth(turns65Year, monthIndex),
    medigapOpens: startOfMonth(turns65Year, monthIndex),
    // Six months inclusive of the month it opens.
    medigapCloses: endOfMonth(turns65Year, monthIndex + 5),
  };
}

/**
 * The next Annual Enrollment Period reminder date — October 1, which is both
 * comfortably ahead of the October 15 opening and the point from which plan
 * details for the coming year may be discussed.
 */
export function getNextAepReminder(today: Date = new Date()): { sendOn: Date; opensOn: Date } {
  const year = today.getUTCFullYear();
  const octoberFirst = new Date(Date.UTC(year, 9, 1));
  const useNextYear = today.getTime() > octoberFirst.getTime();
  const targetYear = useNextYear ? year + 1 : year;

  return {
    sendOn: new Date(Date.UTC(targetYear, 9, 1)),
    opensOn: new Date(Date.UTC(targetYear, 9, 15)),
  };
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Birth years worth offering: anyone whose 65th is ahead or barely behind. */
export function selectableBirthYears(today: Date = new Date()): number[] {
  const thisYear = today.getUTCFullYear();
  const years: number[] = [];
  for (let year = thisYear - 66; year <= thisYear - 60; year += 1) {
    years.push(year);
  }
  return years;
}
