"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { StepperField } from "@/components/ui/stepper-field";
import { Slider } from "@/components/ui/slider";
import { AGENT } from "@/lib/agent";
import { getBrackets, type FilingStatus } from "@/lib/irmaa";
import { calculatePlan65 } from "@/lib/plan65";
import { cn } from "@/lib/utils";

/**
 * The two halves of the decision, on one screen.
 *
 * /medicare tells you what your premium will be and /roth-window tells you how
 * much room you have. Neither answers the question underneath both, which is
 * what the timing is worth in dollars — so this puts the inputs and that one
 * number in the same place, and updates it as the sliders move.
 *
 * Every figure comes from the published 2026 CMS schedule via lib/plan65.ts.
 * Nothing here is projected, grown, or inflated, because a number I invented
 * would be indefensible on a licensed agent's site and useless to the reader.
 */

const EMPHASIS = "#0f2241";
const ACCENT = "#7a5c12";
const WARN = "#b94f5c"; // 4.8:1 on white
/*
 * The palette's emerald is #1f8f62, which is 4.07:1 on white — fine for the
 * 28px figures but under AA for the 14px labels beside them. Stepped down
 * until the smallest use passes rather than using two greens.
 */
const GOOD = "#1a7d55"; // 5.1:1 on white, 4.9:1 on the emerald alert tint

function money(value: number, cents = false): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

/** A labelled tile. The dashboard is mostly these. */
function Stat({
  label,
  value,
  detail,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "neutral" | "warn" | "good";
}) {
  const valueColor = tone === "warn" ? WARN : tone === "good" ? GOOD : EMPHASIS;
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-5">
      <p className="text-14 tracking-[0.08em] text-[var(--color-ink-muted)] uppercase">{label}</p>
      <p className="text-28 mt-2 font-bold tabular-nums" style={{ color: valueColor }}>
        {value}
      </p>
      {detail ? (
        <p className="text-15 mt-1 leading-snug text-[var(--color-ink-muted)]">{detail}</p>
      ) : null}
    </div>
  );
}

export function Plan65() {
  const [age, setAge] = useState(60);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("married_jointly");
  const [magi, setMagi] = useState(180_000);
  const [balance, setBalance] = useState(300_000);

  const result = useMemo(
    () => calculatePlan65({ age, filingStatus, magi, traditionalBalance: balance }),
    [age, filingStatus, magi, balance],
  );

  const brackets = getBrackets(filingStatus);
  const ceiling = result.nextBracket?.minIncome ?? null;
  /* Fires the moment the slider carries them over a threshold. */
  const nearCeiling = ceiling !== null && result.headroom <= 10_000;

  const filingButton = (status: FilingStatus, Icon: typeof User, label: string, blurb: string) => (
    <button
      type="button"
      onClick={() => setFilingStatus(status)}
      aria-pressed={filingStatus === status}
      className={cn(
        "relative flex-1 rounded-xl border-2 bg-white p-4 text-left transition-[border-color,background-color] duration-150",
        filingStatus === status
          ? "border-[var(--color-navy)] bg-[rgba(21,46,52,0.05)]"
          : "border-gray-300 hover:border-[var(--color-navy)]/40",
      )}
    >
      {filingStatus === status ? (
        <CheckCircle2
          className="absolute top-3 right-3 size-5 text-[var(--color-navy)]"
          aria-hidden
        />
      ) : null}
      <Icon className="mb-2 size-6 text-[var(--color-navy)]" strokeWidth={1.5} aria-hidden />
      <span className="text-17 block font-bold text-[var(--color-navy)]">{label}</span>
      <span className="text-15 mt-1 block text-[var(--color-ink-muted)]">{blurb}</span>
    </button>
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
      {/* ───────── inputs ───────── */}
      <section aria-label="Your situation" className="card-surface p-6 lg:sticky lg:top-24">
        <h2 className="text-20 font-semibold text-[var(--color-navy)]">Your situation</h2>
        <p className="text-15 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
          Nothing is sent anywhere. Move the sliders and the numbers on the right follow.
        </p>

        <div className="mt-6">
          <span className="text-17 mb-2 block font-medium text-[var(--color-navy)]">
            How you file
          </span>
          <div className="flex gap-3">
            {filingButton("individual", User, "On my own", "Single or widowed")}
            {filingButton("married_jointly", Users, "Jointly", "Combined return")}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="plan-age"
            className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
          >
            Your age
          </label>
          <StepperField
            id="plan-age"
            label="Your age"
            value={age}
            min={50}
            max={75}
            step={1}
            onChange={setAge}
            format={(v) => String(v)}
            inputMaxWidthClass="max-w-28"
          />
          <div className="px-1 pt-3">
            <Slider
              min={50}
              max={75}
              step={1}
              value={[age]}
              onValueChange={(v) => setAge(v[0] ?? 60)}
              aria-label="Your age"
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="plan-magi"
            className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
          >
            Your income this year, before any conversion
          </label>
          <StepperField
            id="plan-magi"
            label="Income before conversion"
            value={magi}
            min={20_000}
            max={750_000}
            step={5_000}
            onChange={setMagi}
            format={(v) => money(v)}
          />
          <div className="px-1 pt-3">
            <Slider
              min={20_000}
              max={750_000}
              step={5_000}
              value={[magi]}
              onValueChange={(v) => setMagi(v[0] ?? 180_000)}
              aria-label="Income before conversion"
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="plan-balance"
            className="text-17 mb-2 block font-medium text-[var(--color-navy)]"
          >
            Traditional IRA or 401(k) you might convert
          </label>
          <StepperField
            id="plan-balance"
            label="Balance you might convert"
            value={balance}
            min={0}
            max={2_000_000}
            step={25_000}
            onChange={setBalance}
            format={(v) => money(v)}
          />
          <div className="px-1 pt-3">
            <Slider
              min={0}
              max={2_000_000}
              step={25_000}
              value={[balance]}
              onValueChange={(v) => setBalance(v[0] ?? 300_000)}
              aria-label="Balance you might convert"
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
            />
          </div>
          <p className="text-15 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Leave this at zero if you are not thinking about a conversion. The rest still works.
          </p>
        </div>
      </section>

      {/* ───────── output ───────── */}
      <div className="flex flex-col gap-6">
        {/* Live alerts. These are the point of the sliders. */}
        <div aria-live="polite" className="flex flex-col gap-3">
          {nearCeiling && !result.atTopBracket ? (
            <p
              className="text-17 flex gap-3 rounded-lg border border-[#ddd8c8] bg-[#f3f0e6] p-4 leading-relaxed text-[var(--color-navy)]"
              style={{ borderLeftColor: ACCENT }}
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden color={ACCENT} />
              <span>
                You are <strong>{money(result.headroom)}</strong> from the next Medicare tier. Any
                extra income this year — a conversion, a capital gain, selling something — crosses
                it.
              </span>
            </p>
          ) : null}

          {result.lookbackHasStarted && age < 65 ? (
            <p
              className="text-17 flex gap-3 rounded-lg border border-[#ddd8c8] bg-[#f3f0e6] p-4 leading-relaxed text-[var(--color-navy)]"
              style={{ borderLeftColor: WARN }}
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden color={WARN} />
              <span>
                At {age}, this year’s income is already being watched. Medicare sets your first
                premium from the return you file two years before you turn 65, so a conversion now
                shows up on your premium then.
              </span>
            </p>
          ) : null}

          {result.medigap === "open" ? (
            <p
              className="text-17 flex gap-3 rounded-lg border border-[#cfdcd2] bg-[#e9eee8] p-4 leading-relaxed text-[var(--color-navy)]"
              style={{ borderLeftColor: GOOD }}
            >
              <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden color={GOOD} />
              <span>
                Your Medigap window is open right now. For six months from the month you turned 65,
                no insurer may turn you down or charge you more for your health history. It does not
                reopen.
              </span>
            </p>
          ) : null}
        </div>

        <section aria-label="Where you stand" className="card-surface p-6">
          <h2 className="text-20 font-semibold text-[var(--color-navy)]">Where you stand today</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat
              label="Medicare tier"
              value={result.currentBracket.bracketName.replace(" IRMAA", "")}
              detail={`${money(result.currentBracket.partBPremium, true)}/mo Part B`}
            />
            <Stat
              label="Room before the next tier"
              value={result.atTopBracket ? "None left" : money(result.headroom)}
              detail={
                ceiling === null
                  ? "You are in the top tier already."
                  : `Next tier starts at ${money(ceiling)}`
              }
              tone={nearCeiling && !result.atTopBracket ? "warn" : "neutral"}
            />
            <Stat
              label="Years before Medicare looks"
              value={
                result.yearsOfClearRunway > 0 ? `${result.yearsOfClearRunway}` : "It already does"
              }
              detail={
                result.yearsOfClearRunway > 0
                  ? "Income after that sets your first premium"
                  : "Two-year lookback has begun"
              }
              tone={result.yearsOfClearRunway > 0 ? "good" : "warn"}
            />
          </div>
        </section>

        {/* The comparison. This is the number worth knowing. */}
        {balance > 0 ? (
          <section aria-label="Timing comparison" className="card-surface p-6">
            <h2 className="text-20 font-semibold text-[var(--color-navy)]">
              What the timing is worth
            </h2>
            <p className="text-16 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
              Converting {money(balance)} — the same money either way, and the same income tax on
              it. The only thing that changes is what Medicare charges you.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                className="rounded-xl border-2 p-5"
                style={{ borderColor: result.avoidableSurcharge > 0 ? WARN : "#d1d5db" }}
              >
                <p
                  className="text-14 font-semibold tracking-[0.08em] uppercase"
                  style={{ color: WARN }}
                >
                  All in one year
                </p>
                <p className="text-32 mt-2 font-bold tabular-nums" style={{ color: WARN }}>
                  {money(result.allAtOnce.annualSurchargeHousehold)}
                </p>
                <p className="text-16 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  extra Medicare cost, for the year that income lands on
                  {filingStatus === "married_jointly" ? ", across both of you" : ""}.
                </p>
                <p className="text-15 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                  Income of {money(result.allAtOnce.magi)} puts you in{" "}
                  {result.allAtOnce.bracket.bracketName}
                  {result.allAtOnce.tiersCrossed > 0
                    ? `, ${result.allAtOnce.tiersCrossed} ${
                        result.allAtOnce.tiersCrossed === 1 ? "tier" : "tiers"
                      } above where you are now`
                    : ""}
                  .
                </p>
              </div>

              <div className="rounded-xl border-2 p-5" style={{ borderColor: GOOD }}>
                <p
                  className="text-14 font-semibold tracking-[0.08em] uppercase"
                  style={{ color: GOOD }}
                >
                  Spread under your ceiling
                </p>
                <p className="text-32 mt-2 font-bold tabular-nums" style={{ color: GOOD }}>
                  {result.spread.impossible ? "No room" : money(0)}
                </p>
                <p className="text-16 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {result.spread.impossible
                    ? "You are already in the top tier, so spreading it changes nothing."
                    : "extra Medicare cost, because you never cross a tier."}
                </p>
                {result.spread.impossible ? null : (
                  <p className="text-15 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                    About {money(result.spread.perYear)} a year for {result.spread.yearsNeeded}{" "}
                    {result.spread.yearsNeeded === 1 ? "year" : "years"}
                    {result.yearsOfClearRunway > 0 &&
                    result.spread.yearsNeeded > result.yearsOfClearRunway
                      ? ` — more years than you have before the lookback starts, which is worth talking about`
                      : ""}
                    .
                  </p>
                )}
              </div>
            </div>

            <p
              className="text-19 mt-5 rounded-lg bg-[#f3f0e6] px-5 py-4 leading-relaxed font-semibold text-[var(--color-navy)]"
              style={{ borderLeftColor: ACCENT }}
            >
              {result.avoidableSurcharge > 0
                ? `Difference: ${money(result.avoidableSurcharge)}, decided entirely by which years you convert in.`
                : "At these numbers the timing costs you nothing extra in Medicare surcharges."}
            </p>
          </section>
        ) : null}

        <section aria-label="The tiers" className="card-surface p-6">
          <h2 className="text-20 font-semibold text-[var(--color-navy)]">
            The 2026 tiers, and where the sliders put you
          </h2>
          <ol className="mt-4 flex flex-col gap-2">
            {brackets.map((bracket) => {
              const isCurrent = bracket.bracketName === result.currentBracket.bracketName;
              const isAfter = bracket.bracketName === result.allAtOnce.bracket.bracketName;
              return (
                <li
                  key={bracket.bracketName}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg px-3 py-2"
                  style={{
                    background: isCurrent
                      ? "rgba(21,46,52,0.08)"
                      : isAfter && balance > 0
                        ? "rgba(185,79,92,0.10)"
                        : "transparent",
                  }}
                >
                  <span className="text-16 text-[var(--color-navy)]">
                    {bracket.minIncome === 0
                      ? `Up to ${money(bracket.maxIncome ?? 0)}`
                      : bracket.maxIncome === null
                        ? `${money(Math.ceil(bracket.minIncome))} and above`
                        : `${money(Math.ceil(bracket.minIncome))} – ${money(bracket.maxIncome)}`}
                    {isCurrent ? (
                      <span className="text-13 ml-2 font-semibold" style={{ color: EMPHASIS }}>
                        YOU ARE HERE
                      </span>
                    ) : null}
                    {isAfter && !isCurrent && balance > 0 ? (
                      <span className="text-13 ml-2 font-semibold" style={{ color: WARN }}>
                        AFTER A LUMP CONVERSION
                      </span>
                    ) : null}
                  </span>
                  <span className="text-16 text-[var(--color-ink-muted)] tabular-nums">
                    {money(bracket.partBPremium, true)}/mo
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-20 font-semibold text-[var(--color-navy)]">
            What this leaves out, and why it matters
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Income tax.</strong> A conversion is
              taxable, and spreading it over years changes which tax brackets it falls in. That can
              outweigh everything above, and it is a question for a CPA.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Growth and inflation.</strong> Every
              figure is in today’s dollars against the published 2026 schedule. The brackets move
              most years.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Your actual plans.</strong> Which doctors
              you keep, what your prescriptions cost, whether a Medigap policy would be issued to
              you at all. None of that is arithmetic.
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={AGENT.phoneHref}
              className="text-18 inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              Talk it through: {AGENT.phone}
            </a>
            <Link
              href="/start?topic=financial_planning"
              className="text-18 inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(21,46,52,0.05)]"
            >
              Send me your numbers
              <ArrowRight className="size-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        <EmailResultsCapture
          variant="roth"
          source="roth_calculator"
          wizardData={{
            zip_code: "",
            filing_status: filingStatus,
            age,
            annual_income: magi,
            calculated_premium: result.currentBracket.partBPremium,
            irmaa_bracket: `Plan 65 — ${result.currentBracket.bracketName}, headroom ${money(
              result.headroom,
            )}, lump conversion of ${money(balance)} would cost ${money(
              result.allAtOnce.annualSurchargeHousehold,
            )}`,
          }}
        />
      </div>
    </div>
  );
}
