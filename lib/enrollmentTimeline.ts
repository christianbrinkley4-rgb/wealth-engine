import { getT65Dates, getT65Window } from "@/lib/reminders";

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
