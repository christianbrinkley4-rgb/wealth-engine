import { getBrackets, type FilingStatus, type IrmaaBracket } from "@/lib/irmaa";

/**
 * The IRMAA schedule as a ladder, with the reader's rung called out.
 *
 * The number on its own ("$405.80/month") answers "what do I pay" but not the
 * question people actually have, which is "how close am I to the next step, and
 * what would it cost me?" A tier table answers that; a tier table with the
 * reader's row emphasised answers it at a glance.
 *
 * Form: emphasis, not categorical — one hue for the reader's tier, a neutral
 * for the rest. Categorical colour here would imply the six tiers are six
 * unrelated things rather than one ordered scale, and would bury the only row
 * that matters.
 *
 * It renders as a real <table>: the bars are decoration layered on top of
 * semantic rows, so a screen reader gets tier, income range and premium in
 * order without a separate "view as table" toggle, and nothing is conveyed by
 * colour alone (the reader's row is marked with a text chip as well).
 */

const EMPHASIS = "#0f2241"; // 15.8:1 on white
const CONTEXT = "#7e8c9f"; // 3.4:1 on white — passes the non-text mark floor
const ACCENT = "#7a5c12"; // 6.2:1 on white

function money(value: number, cents = false): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

/** "$109,001 – $137,000", or "Up to $109,000" / "$500,000 and above". */
function rangeLabel(bracket: IrmaaBracket): string {
  const from = Math.ceil(bracket.minIncome);
  if (bracket.minIncome === 0) return `Up to ${money(bracket.maxIncome ?? 0)}`;
  if (bracket.maxIncome === null) return `${money(from)} and above`;
  return `${money(from)} – ${money(bracket.maxIncome)}`;
}

/** $109k. Rounded to the nearest thousand, so 499,999.99 reads as $500k. */
function compactMoney(value: number): string {
  return `$${Math.round(value / 1000)}k`;
}

/**
 * The same range in half the width. Inside the wizard card a phone gives this
 * column about 100px, where the full figures wrap onto three lines and the
 * range stops reading as a range.
 */
function compactRangeLabel(bracket: IrmaaBracket): string {
  if (bracket.minIncome === 0) return `Up to ${compactMoney(bracket.maxIncome ?? 0)}`;
  if (bracket.maxIncome === null) return `${compactMoney(bracket.minIncome)}+`;
  return `${compactMoney(bracket.minIncome)} – ${compactMoney(bracket.maxIncome)}`;
}

export function IrmaaLadder({
  filingStatus,
  income,
  currentBracketName,
}: {
  filingStatus: FilingStatus;
  income: number;
  currentBracketName: string;
}) {
  const brackets = getBrackets(filingStatus);
  const maxPremium = Math.max(...brackets.map((b) => b.partBPremium));
  const currentIndex = brackets.findIndex((b) => b.bracketName === currentBracketName);
  const next = brackets[currentIndex + 1] ?? null;
  const headroom = next ? Math.max(0, next.minIncome - income) : null;

  return (
    <figure className="m-0">
      <figcaption className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
        Every tier of the 2026 Part B schedule, and where this income lands.
      </figcaption>

      <table className="mt-4 w-full border-collapse text-left">
        <caption className="sr-only">
          2026 Medicare Part B premium by income tier,{" "}
          {filingStatus === "individual" ? "individual filer" : "married filing jointly"}. Your tier
          is marked.
        </caption>
        <thead>
          <tr className="text-14 text-[var(--color-ink-muted)] uppercase">
            <th scope="col" className="py-2 pr-3 font-medium tracking-[0.06em]">
              Income (2024 MAGI)
            </th>
            <th scope="col" className="py-2 font-medium tracking-[0.06em]">
              Monthly premium
            </th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((bracket) => {
            const isCurrent = bracket.bracketName === currentBracketName;
            const width = (bracket.partBPremium / maxPremium) * 100;
            return (
              <tr
                key={bracket.bracketName}
                aria-current={isCurrent ? "true" : undefined}
                className="align-middle"
              >
                <th scope="row" className="w-[45%] border-t border-gray-200 py-3 pr-3 font-normal">
                  <span
                    className={
                      isCurrent
                        ? "text-17 block font-semibold text-[var(--color-navy)]"
                        : "text-17 block text-[var(--color-ink-muted)]"
                    }
                  >
                    <span className="sm:hidden">{compactRangeLabel(bracket)}</span>
                    <span className="hidden sm:inline">{rangeLabel(bracket)}</span>
                  </span>
                  {isCurrent ? (
                    <span
                      className="text-13 mt-1 inline-block rounded-full px-2 py-0.5 font-semibold tracking-[0.06em] text-white uppercase"
                      style={{ background: EMPHASIS }}
                    >
                      You are here
                    </span>
                  ) : null}
                </th>
                <td className="border-t border-gray-200 py-3">
                  {/* Decoration only: the row's numbers are already in the cells. */}
                  <div
                    aria-hidden
                    className="h-5 w-full rounded-[2px]"
                    style={{ background: "rgba(15,34,65,0.05)" }}
                  >
                    <div
                      className="h-5 rounded-r-[4px]"
                      style={{
                        width: `${width}%`,
                        background: isCurrent ? EMPHASIS : CONTEXT,
                      }}
                    />
                  </div>
                  <span
                    className={
                      isCurrent
                        ? "text-17 mt-1 block font-semibold text-[var(--color-navy)] tabular-nums"
                        : "text-17 mt-1 block text-[var(--color-ink-muted)] tabular-nums"
                    }
                  >
                    {money(bracket.partBPremium, true)}
                    {bracket.irmaaSurcharge > 0 ? (
                      <span className="text-15 font-normal text-[var(--color-ink-muted)]">
                        {" "}
                        (+{money(bracket.irmaaSurcharge, true)})
                      </span>
                    ) : null}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {next && headroom !== null ? (
        <p
          className="text-17 mt-4 border-l-4 py-2 pl-4 leading-relaxed text-[var(--color-navy)]"
          style={{ borderColor: ACCENT }}
        >
          Another <strong>{money(headroom)}</strong> of income in 2024 would have moved this
          household to the next tier — {money(next.partBPremium, true)}/month, or{" "}
          {money((next.partBPremium - brackets[currentIndex].partBPremium) * 12)} more a year, each.
        </p>
      ) : null}
    </figure>
  );
}
