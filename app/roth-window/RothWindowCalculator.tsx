"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Info, User, Users } from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { FilingStatus } from "@/lib/irmaa";
import { buildConversionLadder, calculateRothWindow, rothWindowHeadline } from "@/lib/rothWindow";

const MIN_MAGI = 20_000;
const MAX_MAGI = 750_000;
const MAGI_STEP = 1_000;
const DEFAULT_MAGI = 110_000;
const DEFAULT_LADDER_YEARS = 3;

function formatMoney(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatMoneyCents(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseFilingFromParam(value: string | null): FilingStatus | null {
  return value === "individual" || value === "married_jointly" ? value : null;
}

function parseMagiFromParam(value: string | null): number | null {
  if (!value) return null;
  const numeric = Number(value.replace(/[^0-9]/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return Math.min(MAX_MAGI, Math.max(MIN_MAGI, numeric));
}

function RothWindowCalculatorInner() {
  const searchParams = useSearchParams();
  const seededFiling = parseFilingFromParam(searchParams.get("filing"));
  const seededMagi = parseMagiFromParam(searchParams.get("magi"));

  const [filingStatus, setFilingStatus] = useState<FilingStatus>(seededFiling ?? "married_jointly");
  const [magi, setMagi] = useState<number>(seededMagi ?? DEFAULT_MAGI);
  const [magiInput, setMagiInput] = useState<string>(String(seededMagi ?? DEFAULT_MAGI));

  const result = useMemo(() => calculateRothWindow(magi, filingStatus), [magi, filingStatus]);
  const ladder = useMemo(
    () => buildConversionLadder(magi, filingStatus, DEFAULT_LADDER_YEARS),
    [magi, filingStatus],
  );
  const headline = useMemo(() => rothWindowHeadline(result), [result]);

  const isAtTop = result.nextBracket === null;
  const headroom = result.headroomToNextBracket ?? 0;
  const ladderTotal = ladder.reduce((sum, year) => sum + year.maxConversion, 0);

  function handleMagiInputCommit(raw: string) {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return;
    const numeric = Math.min(MAX_MAGI, Math.max(MIN_MAGI, Number(digits)));
    setMagi(numeric);
    setMagiInput(String(numeric));
  }

  return (
    <main className="app-shell pb-12">
      <section className="card-surface mt-4 p-6 md:p-8">
        <p className="text-[14px] font-medium tracking-[0.1em] text-[var(--color-gold)] uppercase">
          2026 Roth Conversion Calculator
        </p>
        <h1 className="mt-2 text-[32px] leading-tight font-bold text-[var(--color-navy)] md:text-[40px]">
          How much can you convert without raising your Medicare premium?
        </h1>
        <p className="mt-3 max-w-2xl text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
          Most CPAs run your Roth conversion against income-tax brackets and miss the IRMAA
          surcharge — which is determined by your MAGI from two years prior. Convert too much in
          2026 and you will see a higher Medicare premium in 2028.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[18px] font-semibold text-[var(--color-navy)]">
              Step 1 — Your tax filing status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setFilingStatus("individual")}
                className={cn(
                  "relative rounded-xl border-2 bg-white p-5 text-left transition-[border-color,background-color] duration-150",
                  filingStatus === "individual"
                    ? "border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                    : "border-gray-300",
                )}
              >
                {filingStatus === "individual" ? (
                  <CheckCircle2
                    className="absolute top-3 right-3 size-5 text-[var(--color-navy)]"
                    aria-hidden
                  />
                ) : null}
                <User
                  className="mb-2 size-7 text-[var(--color-navy)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="text-[18px] font-bold">Individual</div>
                <p className="mt-1 text-[15px] text-[var(--color-ink-muted)]">
                  Single, widowed, or filing separately.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFilingStatus("married_jointly")}
                className={cn(
                  "relative rounded-xl border-2 bg-white p-5 text-left transition-[border-color,background-color] duration-150",
                  filingStatus === "married_jointly"
                    ? "border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                    : "border-gray-300",
                )}
              >
                {filingStatus === "married_jointly" ? (
                  <CheckCircle2
                    className="absolute top-3 right-3 size-5 text-[var(--color-navy)]"
                    aria-hidden
                  />
                ) : null}
                <Users
                  className="mb-2 size-7 text-[var(--color-navy)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="text-[18px] font-bold">Married filing jointly</div>
                <p className="mt-1 text-[15px] text-[var(--color-ink-muted)]">
                  Combined return with your spouse.
                </p>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[18px] font-semibold text-[var(--color-navy)]">
              Step 2 — Your expected 2026 MAGI (before any conversion)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-2">
            <p className="text-center text-[36px] font-bold text-[var(--color-navy)]">
              {formatMoney(magi)}
            </p>
            <Slider
              min={MIN_MAGI}
              max={MAX_MAGI}
              step={MAGI_STEP}
              value={[magi]}
              onValueChange={(value) => {
                const next = value[0] ?? DEFAULT_MAGI;
                setMagi(next);
                setMagiInput(String(next));
              }}
              className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:p-2"
            />
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-[var(--color-ink-muted)]">Or type:</span>
              <Input
                value={magiInput}
                onChange={(event) =>
                  setMagiInput(event.target.value.replace(/[^0-9]/g, "").slice(0, 7))
                }
                onBlur={(event) => handleMagiInputCommit(event.target.value)}
                inputMode="numeric"
                placeholder="110000"
                className="h-11 max-w-[160px] text-[16px]"
              />
            </div>
            <p className="flex gap-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
              <Info className="mt-0.5 size-4 shrink-0 text-[var(--color-gold)]" aria-hidden />
              <span>
                Modified Adjusted Gross Income — your AGI plus tax-exempt interest. Use your most
                recent 1040 if unsure.
              </span>
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[20px] text-[var(--color-ink-muted)]">
              Your Roth conversion window
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-[var(--color-paper)] p-5">
                <p className="text-[14px] tracking-[0.08em] text-[var(--color-ink-muted)] uppercase">
                  Current bracket
                </p>
                <p className="mt-2 text-[22px] font-bold text-[var(--color-navy)]">
                  {result.currentBracket.bracketName}
                </p>
                <p className="text-[14px] text-[var(--color-ink-muted)]">
                  {formatMoneyCents(result.currentBracket.partBPremium)} / mo Part B
                </p>
              </div>

              <div className="rounded-xl bg-[var(--color-paper)] p-5">
                <p className="text-[14px] tracking-[0.08em] text-[var(--color-ink-muted)] uppercase">
                  Max conversion this year
                </p>
                <p className="mt-2 text-[28px] font-bold text-[var(--color-navy)]">
                  {isAtTop ? "No IRMAA ceiling left" : formatMoney(headroom)}
                </p>
                <p className="text-[14px] text-[var(--color-ink-muted)]">
                  {isAtTop
                    ? "You are already in the top bracket."
                    : "Keeps you in the same Medicare bracket."}
                </p>
              </div>

              <div className="rounded-xl bg-[var(--color-paper)] p-5">
                <p className="text-[14px] tracking-[0.08em] text-[var(--color-ink-muted)] uppercase">
                  Cost if you cross
                </p>
                <p className="mt-2 text-[28px] font-bold text-[var(--color-navy)]">
                  {isAtTop
                    ? "—"
                    : formatMoney(
                        filingStatus === "married_jointly"
                          ? result.oneBracketCrossingAnnualCostMarried
                          : result.oneBracketCrossingAnnualCost,
                      )}
                </p>
                <p className="text-[14px] text-[var(--color-ink-muted)]">
                  Annual Medicare surcharge in 2028
                  {filingStatus === "married_jointly" ? " (both spouses)" : ""}.
                </p>
              </div>
            </div>

            <p className="border-l-4 border-[var(--color-gold)] bg-amber-50/80 px-4 py-3 text-[16px] leading-relaxed text-[var(--color-navy)]">
              {headline}
            </p>
          </CardContent>
        </Card>
      </section>

      {result.upperBrackets.length > 0 ? (
        <section className="mt-6">
          <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-[18px] text-[var(--color-ink-muted)]">
                Cost of crossing each higher bracket
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[16px]">
                  <thead className="bg-[var(--color-paper)] text-[14px] text-[var(--color-ink-muted)] uppercase">
                    <tr>
                      <th className="px-6 py-3">Bracket</th>
                      <th className="px-6 py-3">Max conversion to reach</th>
                      <th className="px-6 py-3">Annual Medicare cost (per person)</th>
                      {filingStatus === "married_jointly" ? (
                        <th className="px-6 py-3">Annual cost (couple)</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {result.upperBrackets.map((projection) => (
                      <tr
                        key={projection.bracket.bracketName}
                        className="border-t border-gray-200 align-top"
                      >
                        <td className="px-6 py-4 font-semibold text-[var(--color-navy)]">
                          {projection.bracket.bracketName}
                          <span className="ml-2 text-[14px] font-normal text-[var(--color-ink-muted)]">
                            {formatMoneyCents(projection.bracket.partBPremium)} / mo
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[var(--color-navy)]">
                          {formatMoney(projection.maxConversionToReach)}
                        </td>
                        <td className="px-6 py-4 text-[var(--color-navy)]">
                          +{formatMoney(projection.annualPremiumDelta)}
                        </td>
                        {filingStatus === "married_jointly" ? (
                          <td className="px-6 py-4 text-[var(--color-navy)]">
                            +{formatMoney(projection.annualPremiumDeltaMarried)}
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {!isAtTop && headroom > 0 ? (
        <section className="mt-6">
          <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-[18px] text-[var(--color-ink-muted)]">
                A {DEFAULT_LADDER_YEARS}-year conversion ladder at this MAGI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <p className="text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                If your income stays flat at {formatMoney(magi)}, you could convert this much each
                year without ever leaving your current Medicare bracket:
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {ladder.map((year) => (
                  <div key={year.yearLabel} className="rounded-xl bg-[var(--color-paper)] p-4">
                    <p className="text-[14px] tracking-[0.08em] text-[var(--color-ink-muted)] uppercase">
                      {year.yearLabel}
                    </p>
                    <p className="mt-1 text-[22px] font-bold text-[var(--color-navy)]">
                      {formatMoney(year.maxConversion)}
                    </p>
                    <p className="text-[13px] text-[var(--color-ink-muted)]">
                      Cumulative {formatMoney(year.cumulativeConverted)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-ink-muted)] italic">
                Up to {formatMoney(ladderTotal)} converted over {DEFAULT_LADDER_YEARS} years —
                without changing your IRMAA bracket. Real-world ladders should be re-run yearly
                against actual income; this is a planning starting point, not tax advice.
              </p>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="mt-6">
        <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[20px] text-[var(--color-ink-muted)]">
              Want a free walkthrough?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-2">
            <p className="text-[18px] leading-relaxed">
              Christian is a UNCG Master&apos;s in Accounting student in Greensboro. If you want to
              talk through your conversion window — or Medicare alongside it — leave a short note
              and he aims to reach out within one business day.
            </p>
            <Button
              asChild
              className="h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
            >
              <Link href="/start">Start with what you need help with →</Link>
            </Button>
            <p className="flex items-center gap-2 text-[14px] text-[var(--color-ink-muted)]">
              <ArrowRight className="size-4 text-[var(--color-gold)]" aria-hidden />
              Optional estimate tool:{" "}
              <Link href="/medicare" className="underline underline-offset-2">
                Medicare estimate
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <EmailResultsCapture
        variant="roth"
        source="roth_calculator"
        wizardData={{
          zip_code: "",
          filing_status: filingStatus,
          age: 65,
          annual_income: magi,
          calculated_premium: result.currentBracket.partBPremium,
          irmaa_bracket: `Roth window — current ${result.currentBracket.bracketName}, headroom ${
            isAtTop ? "n/a" : formatMoney(headroom)
          }`,
        }}
      />

      <ComplianceDisclosure variant="medicare" showEstimateNote />
    </main>
  );
}

export function RothWindowCalculator() {
  return (
    <Suspense fallback={null}>
      <RothWindowCalculatorInner />
    </Suspense>
  );
}
