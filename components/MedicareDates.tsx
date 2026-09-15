import Link from "next/link";
import { CalendarDays, Phone, ShieldCheck, Timer } from "lucide-react";

import { AGENT } from "@/lib/agent";

import { formatLongDate, getT65Dates, getT65Window, MONTHS } from "@/lib/reminders";

/**
 * The four dates that decide how well someone's 65th year goes.
 *
 * Every other page on this site explains the seven-month window in prose.
 * Prose is how people end up believing they have until their birthday: a
 * window described in relative months ("three before, three after") has to be
 * converted into real dates by the reader, in their head, usually late at
 * night, and that is where it goes wrong. Given a birth month this does the
 * conversion for them, and shows the two deadlines the prose version buries —
 * the date after which coverage no longer starts on time, and the Medigap
 * window that cannot be reopened.
 *
 * Deliberately given away before the email ask on /remind-me. Someone who
 * takes the dates and leaves has still been helped, which is the argument the
 * rest of the site makes about itself.
 */

const EMPHASIS = "#0f2241";
const ACCENT = "#7a5c12";

function shortMonth(index: number): string {
  return MONTHS[((index % 12) + 12) % 12].slice(0, 3);
}

export function MedicareDates({
  birthMonth,
  birthYear,
  todayMs,
}: {
  birthMonth: number;
  birthYear: number;
  /**
   * Stamped by the caller when the month was picked, not read here. "Now" is
   * not a pure value: reading it during render both trips React's purity rule
   * and risks a server/client mismatch for anyone whose page is built one side
   * of midnight and read on the other.
   */
  todayMs: number | null;
}) {
  const window = getT65Window(birthMonth, birthYear);
  const dates = getT65Dates(birthMonth, birthYear);
  const birthdayMonthIndex = birthMonth - 1;

  /*
   * How long they actually have, in days.
   *
   * A date on its own is a fact; a date with a distance attached is a
   * decision. "Sign up by October 31, 2027" reads as comfortably far off right
   * up until it isn't, and the people who miss the window are rarely the ones
   * who never knew the date — they are the ones who knew it and had no sense
   * of how fast it was arriving.
   */
  const daysUntil = (date: Date) =>
    todayMs === null ? null : Math.ceil((date.getTime() - todayMs) / 86_400_000);
  const daysToDeadline = daysUntil(dates.signUpBy);
  const daysToClose = daysUntil(window.closesOn);

  // The seven months of the Initial Enrollment Period, in order.
  const strip = Array.from({ length: 7 }, (_, offset) => {
    const monthIndex = birthdayMonthIndex - 3 + offset;
    const isBirthdayMonth = offset === 3;
    const isBeforeBirthdayMonth = offset < 3;
    return {
      key: offset,
      label: shortMonth(monthIndex),
      isBirthdayMonth,
      isBeforeBirthdayMonth,
      note: isBirthdayMonth
        ? "the month you turn 65"
        : isBeforeBirthdayMonth
          ? "sign up here and coverage starts on time"
          : "still open, but coverage starts the month after you sign up",
    };
  });

  return (
    <section
      aria-labelledby="medicare-dates-heading"
      className="card-surface border-l-4 p-6 md:p-8"
      style={{ borderLeftColor: ACCENT }}
    >
      <h2
        id="medicare-dates-heading"
        className="text-22 md:text-24 font-semibold text-[var(--color-navy)]"
      >
        Your dates
      </h2>
      <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        Worked out from turning 65 in {MONTHS[birthdayMonthIndex]} {birthYear + 65}. Nothing here
        needs an email address — write them down and close the tab if you like.
      </p>

      {daysToDeadline === null || daysToClose === null ? null : daysToDeadline > 0 ? (
        <p className="text-19 mt-4 leading-relaxed font-semibold text-[var(--color-navy)]">
          You have {daysToDeadline.toLocaleString("en-US")} days until the date that matters.
        </p>
      ) : daysToClose > 0 ? (
        <p className="text-19 mt-4 leading-relaxed font-semibold text-[var(--color-navy)]">
          Your window is open now and closes in {daysToClose.toLocaleString("en-US")} days — and
          coverage no longer starts on time, so this is worth sorting this week.
        </p>
      ) : (
        <p className="text-19 mt-4 leading-relaxed font-semibold text-[var(--color-navy)]">
          That window has closed. There are usually still options, and they are worth a phone call
          rather than a form.
        </p>
      )}

      {/*
        The window, drawn. Seven months is hard to hold in your head as prose.

        The cells are sized in rem and the row scrolls rather than squeezing:
        on a phone at a raised browser font size seven fixed columns leave
        about 31px each, which is not enough for "Aug" and wraps it mid-word.
      */}
      <div
        className="mt-6 overflow-x-auto"
        tabIndex={0}
        role="group"
        aria-label="Your seven-month sign-up window, month by month"
      >
        <ol className="flex gap-1" aria-label="Your seven-month sign-up window">
          {strip.map((month) => (
            <li
              key={month.key}
              className="text-14 flex min-h-12 flex-1 flex-col items-center justify-center rounded-[4px] px-1 py-2 font-semibold whitespace-nowrap"
              style={{
                minWidth: "2.75rem",
                background: month.isBirthdayMonth
                  ? EMPHASIS
                  : month.isBeforeBirthdayMonth
                    ? "rgba(15,34,65,0.12)"
                    : "rgba(15,34,65,0.05)",
                color: month.isBirthdayMonth ? "#f5f0e8" : "var(--color-navy)",
              }}
            >
              <span aria-hidden>{month.label}</span>
              <span className="sr-only">
                {month.label}: {month.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-15 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        Seven months in total. The dark month is the month you turn 65 — the three before it are the
        ones that matter.
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div className="flex gap-4 border-t border-gray-300 pt-5">
          <Timer className="mt-1 size-6 shrink-0" strokeWidth={1.5} aria-hidden color={ACCENT} />
          <div>
            <dt className="text-18 font-semibold text-[var(--color-navy)]">
              Sign up by {formatLongDate(dates.signUpBy)}
            </dt>
            <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
              Do it by then and your coverage starts{" "}
              <strong className="font-semibold text-[var(--color-navy)]">
                {formatLongDate(dates.coverageStarts)}
              </strong>
              , the month you turn 65. Leave it later and you are still inside the window, but
              coverage does not begin until the first of the month after you enroll — so there is a
              gap with nothing behind it.
            </dd>
          </div>
        </div>

        <div className="flex gap-4 border-t border-gray-300 pt-5">
          <ShieldCheck
            className="mt-1 size-6 shrink-0"
            strokeWidth={1.5}
            aria-hidden
            color={ACCENT}
          />
          <div>
            <dt className="text-18 font-semibold text-[var(--color-navy)]">
              Medigap: {formatLongDate(dates.medigapOpens)} to {formatLongDate(dates.medigapCloses)}
            </dt>
            <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
              Six months, and the one stretch when no insurer may turn you down or charge you more
              for your health history. It does not come around again each year. Certain later
              situations carry guaranteed-issue rights, but they are narrower. This is the date
              people find out about afterwards, and it is the expensive one to miss.
            </dd>
          </div>
        </div>

        <div className="flex gap-4 border-t border-gray-300 pt-5">
          <CalendarDays
            className="mt-1 size-6 shrink-0"
            strokeWidth={1.5}
            aria-hidden
            color={ACCENT}
          />
          <div>
            <dt className="text-18 font-semibold text-[var(--color-navy)]">
              The window closes {formatLongDate(window.closesOn)}
            </dt>
            <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
              Miss it without other qualifying coverage and the Part B late penalty is 10% for every
              full 12 months you could have had it — for as long as you have Part B, not once.
            </dd>
          </div>
        </div>
      </dl>

      {/*
        The question underneath all the others. People who are already drawing
        Social Security are enrolled without doing anything and assume everyone
        is; people who are not assume the same thing and miss Part B entirely,
        which is where the permanent penalty comes from. Both need to be said
        in the same breath, because nobody knows which one they are until they
        read it.
      */}
      <div className="mt-6 border-t border-gray-300 pt-5">
        <h3 className="text-18 font-semibold text-[var(--color-navy)]">
          Does any of this happen on its own?
        </h3>
        <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
          It depends on one thing, and it is worth being sure which one you are.
        </p>
        <ul className="mt-3 flex flex-col gap-3">
          <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Already drawing Social Security?
            </strong>{" "}
            Parts A and B start automatically on {formatLongDate(dates.coverageStarts)} and your
            card arrives in the post. You do not have to do anything — though you can turn Part B
            down if you are staying on an employer plan.
          </li>
          <li className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">Not drawing it yet?</strong>{" "}
            Then nothing happens by itself. No letter arrives, no card comes, and the window closes
            on {formatLongDate(window.closesOn)} whether or not anyone reminded you. This is where
            almost every late-enrollment penalty comes from.
          </li>
        </ul>
      </div>

      {/*
        The dates are the useful part and they are given away above. This is
        the one place the page asks for anything, and it asks in the order this
        audience prefers: the phone first.
      */}
      <div className="mt-6 flex flex-col gap-3 border-t border-gray-300 pt-6 sm:flex-row">
        <a
          href={AGENT.phoneHref}
          className="text-18 inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
        >
          <Phone className="size-5 shrink-0" aria-hidden />
          Talk it through: {AGENT.phone}
        </a>
        <Link
          href="/start?topic=medicare&stage=turning_65_soon"
          className="text-18 inline-flex min-h-14 flex-1 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
        >
          Ask me a question instead
        </Link>
      </div>

      <div className="mt-6 rounded-lg bg-[rgba(15,34,65,0.04)] p-4">
        <p className="text-16 leading-relaxed text-[var(--color-navy)]">
          <strong className="font-semibold">Two things these dates assume.</strong> That your
          birthday is not the 1st of the month — if it is, Medicare counts you as turning 65 the
          month before and every date here moves back one. And that you are taking Part B at 65; if
          you are staying on an employer plan, your Medigap window opens whenever Part B eventually
          starts instead. Either way, worth checking rather than assuming.
        </p>
      </div>
    </section>
  );
}
