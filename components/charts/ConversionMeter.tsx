import type { IrmaaBracket } from "@/lib/irmaa";

/**
 * How much room is left in this Medicare bracket, as a meter.
 *
 * The Roth page's whole question is a single ratio against a limit — income
 * used, against the threshold where the next surcharge starts — which is the
 * textbook case for a meter rather than a chart. The three stat tiles above it
 * state the numbers; this shows the shape of the answer, which is what tells
 * someone whether they have plenty of room or are about to trip over the line.
 *
 * The filled portion is the reader's MAGI; the remainder is what they could
 * convert. The threshold rule is drawn in the gold ink token so the ceiling
 * reads as a limit rather than as more data.
 */

const EMPHASIS = "#0f2241";
const ACCENT = "#7a5c12";
const TRACK = "#dbe2ec";

function money(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function ConversionMeter({
  magi,
  currentBracket,
  nextBracket,
  headroom,
}: {
  magi: number;
  currentBracket: IrmaaBracket;
  nextBracket: IrmaaBracket | null;
  headroom: number;
}) {
  // Nothing to meter once there is no ceiling left to hit.
  if (!nextBracket) return null;

  const floor = Math.max(0, Math.floor(currentBracket.minIncome));
  const ceiling = nextBracket.minIncome;
  const span = Math.max(1, ceiling - floor);
  const usedPct = Math.min(100, Math.max(0, ((magi - floor) / span) * 100));

  return (
    <figure className="m-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <figcaption className="text-17 font-semibold text-[var(--color-navy)]">
          Room left in your current Medicare bracket
        </figcaption>
        <p className="text-15 text-[var(--color-ink-muted)]">
          {currentBracket.bracketName} · ceiling {money(ceiling)}
        </p>
      </div>

      <div
        className="mt-3"
        role="meter"
        aria-valuemin={floor}
        aria-valuemax={ceiling}
        aria-valuenow={Math.round(magi)}
        aria-valuetext={`${money(magi)} of a ${money(ceiling)} ceiling. ${money(
          headroom,
        )} of room left before the next surcharge.`}
        aria-label="Income against the next IRMAA threshold"
      >
        <div
          className="relative h-7 w-full overflow-hidden rounded-[4px]"
          style={{ background: TRACK }}
        >
          <div
            className="h-7 rounded-r-[4px]"
            style={{ width: `${usedPct}%`, background: EMPHASIS }}
          />
          {/* The ceiling itself, drawn as a limit rather than as another series. */}
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[3px]"
            style={{ background: ACCENT }}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-15 text-[var(--color-ink-muted)]">
          <span className="font-semibold text-[var(--color-navy)] tabular-nums">{money(magi)}</span>{" "}
          income now
        </p>
        <p className="text-15 text-right text-[var(--color-ink-muted)]">
          <span className="font-semibold tabular-nums" style={{ color: ACCENT }}>
            {money(headroom)}
          </span>{" "}
          you could convert
        </p>
      </div>
    </figure>
  );
}
