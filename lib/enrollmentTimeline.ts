import { formatLongDate, getT65Dates, getT65Window, MONTHS } from "@/lib/reminders";

export type TimelineInput = { month: number; year: number; birthdayOnFirst: boolean };

/** Year is the year the visitor turns 65, so no date of birth is collected. */
export function enrollmentTimeline(input: TimelineInput, today: Date) {
  if (
    !Number.isInteger(input.month) ||
    input.month < 1 ||
    input.month > 12 ||
    !Number.isInteger(input.year) ||
    input.year < 2000 ||
    input.year > 2200
  ) {
    throw new Error("Choose a valid month and year.");
  }
  const eligibility = new Date(
    Date.UTC(input.year, input.month - 1 - Number(input.birthdayOnFirst), 1),
  );
  const month = eligibility.getUTCMonth() + 1;
  const birthYear = eligibility.getUTCFullYear() - 65;
  const window = getT65Window(month, birthYear, today);
  const nextMonth = new Date(
    Date.UTC(window.closesOn.getUTCFullYear(), window.closesOn.getUTCMonth() + 1, 1),
  );
  // Compare local calendar dates, avoiding an early cutoff in North Carolina
  // when UTC has already rolled over to tomorrow.
  const calendarToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const status =
    calendarToday < window.opensOn ? "upcoming" : calendarToday >= nextMonth ? "closed" : "open";
  return { ...window, ...getT65Dates(month, birthYear), status };
}

const DAY_MS = 86_400_000;

type Timeline = ReturnType<typeof enrollmentTimeline>;

function localCalendarDay(today: Date) {
  return Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
}

/**
 * Whole calendar days until the window opens, or left in it (today counts), in
 * the visitor's own time zone. A closed window has no countdown.
 */
export function timelineCountdown(
  timeline: Timeline,
  today: Date,
): { kind: "upcoming" | "open"; days: number } | { kind: "closed" } {
  const day = localCalendarDay(today);
  if (timeline.status === "upcoming") {
    return { kind: "upcoming", days: Math.round((timeline.opensOn.getTime() - day) / DAY_MS) };
  }
  if (timeline.status === "open") {
    const endExclusive = timeline.closesOn.getTime() + DAY_MS;
    return { kind: "open", days: Math.round((endExclusive - day) / DAY_MS) };
  }
  return { kind: "closed" };
}

/**
 * Marks an inquiry as "email me my Medicare dates". Only the month and year
 * someone turns 65 travel with it, never a date of birth, and the email
 * recomputes the dates on the server rather than trusting submitted text.
 */
export const TIMELINE_EMAIL_REQUEST = "medicare_dates";

export function timelineAnswers(input: TimelineInput): Record<string, string> {
  return {
    request: TIMELINE_EMAIL_REQUEST,
    timeline_month: String(input.month),
    timeline_year: String(input.year),
    timeline_first: input.birthdayOnFirst ? "yes" : "no",
  };
}

export function timelineFromAnswers(
  answers: Record<string, unknown> | null | undefined,
  today: Date = new Date(),
): TimelineInput | null {
  if (!answers || answers.request !== TIMELINE_EMAIL_REQUEST) return null;
  const month = Number(answers.timeline_month);
  const year = Number(answers.timeline_year);
  const thisYear = today.getUTCFullYear();
  if (!/^\d{1,2}$/.test(String(answers.timeline_month)) || month < 1 || month > 12) return null;
  if (
    !/^\d{4}$/.test(String(answers.timeline_year)) ||
    year < thisYear - 2 ||
    year > thisYear + 10
  ) {
    return null;
  }
  return { month, year, birthdayOnFirst: answers.timeline_first === "yes" };
}

/** The dates as plain lines for an email or an alert. */
export function timelineSummary(input: TimelineInput, today: Date = new Date()) {
  const timeline = enrollmentTimeline(input, today);
  return {
    turns65: `${MONTHS[input.month - 1]} ${input.year}${input.birthdayOnFirst ? " (birthday on the 1st)" : ""}`,
    rows: [
      { label: "Your enrollment window opens", value: formatLongDate(timeline.opensOn) },
      {
        label: `Enroll by this date so Part B can start ${formatLongDate(timeline.coverageStarts)}`,
        value: formatLongDate(timeline.signUpBy),
      },
      { label: "Your initial enrollment window ends", value: formatLongDate(timeline.closesOn) },
      {
        label: "Your Medigap open enrollment window, if Part B starts then",
        value: `${formatLongDate(timeline.medigapOpens)} to ${formatLongDate(timeline.medigapCloses)}`,
      },
    ],
  };
}

function calendarDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

/** All-day calendar entries contain dates only, never a visitor's identity. */
export function timelineCalendar(input: TimelineInput, today: Date): string {
  const timeline = enrollmentTimeline(input, today);
  const events = [
    { date: timeline.opensOn, title: "Medicare initial enrollment window opens" },
    { date: timeline.signUpBy, title: "Review Part B enrollment for earliest coverage start" },
    { date: timeline.closesOn, title: "Medicare initial enrollment window ends" },
  ];
  const stamp = today
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Christian Brinkley//Medicare timeline//EN",
    "CALSCALE:GREGORIAN",
    ...events.flatMap(({ date, title }, i) => [
      "BEGIN:VEVENT",
      `UID:medicare-${calendarDate(date)}-${i}@christian-brinkley`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${calendarDate(date)}`,
      `DTEND;VALUE=DATE:${calendarDate(new Date(date.getTime() + 86400000))}`,
      `SUMMARY:${title}`,
      "DESCRIPTION:Educational estimate. Confirm dates and employer coverage",
      "  with Medicare or Social Security before enrolling.",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
