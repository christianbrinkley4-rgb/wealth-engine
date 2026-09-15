"use client";

import Link from "next/link";
import { CheckCircle2, User, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IrmaaLadder } from "@/components/charts/IrmaaLadder";
import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { StepperField } from "@/components/ui/stepper-field";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useWizardStep } from "@/hooks/useWizardStep";
import { AGENT } from "@/lib/agent";
import { cn } from "@/lib/utils";
import { calculatePartBPremium, getPlainEnglishSummary, type FilingStatus } from "@/lib/irmaa";

type MedicareWizardState = {
  zip: string;
  filingStatus: FilingStatus | null;
  age: number;
  income: number;
};

const INITIAL_STATE: MedicareWizardState = {
  zip: "",
  filingStatus: null,
  age: 65,
  income: 80000,
};

function normalizeMedicareWizardState(value: Partial<MedicareWizardState>): MedicareWizardState {
  const merged = { ...INITIAL_STATE, ...value };
  const fs = merged.filingStatus;
  merged.filingStatus = fs === "individual" || fs === "married_jointly" || fs === null ? fs : null;
  return merged;
}

const PROGRESS_LABELS: Record<number, string> = {
  1: "Step 1 of 4 · Where you live",
  2: "Step 2 of 4 · How you file",
  3: "Step 3 of 4 · Your age",
  4: "Step 4 of 4 · Your income",
};

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function filingThresholdCopy(status: FilingStatus): string {
  return status === "individual" ? "$109,000" : "$218,000";
}

function filingThresholdPhrase(status: FilingStatus): string {
  return status === "individual" ? "individual" : "married filing jointly";
}

function filingResultsLabel(status: FilingStatus): string {
  return status === "individual" ? "Individual filer" : "Married filing jointly";
}

export function MedicareWizard() {
  const router = useRouter();
  const [storedFormState, setStoredFormState, clearFormState] =
    useLocalStorage<MedicareWizardState>("medicare_wizard", INITIAL_STATE);
  const formState = useMemo(() => normalizeMedicareWizardState(storedFormState), [storedFormState]);
  const { validateZip, validateAge, validateIncome } = useFormValidation();
  const { step, goToNext, goToPrev, goToStep } = useWizardStep(5);
  const [selectedStatus, setSelectedStatus] = useState<FilingStatus | null>(null);

  const zipError = validateZip(formState.zip);
  const ageError = validateAge(formState.age);
  const incomeError = validateIncome(formState.income);
  const selectedFilingStatus = selectedStatus ?? formState.filingStatus;

  useEffect(() => {
    if ((step === 4 || step === 5) && formState.filingStatus === null) {
      goToStep(2);
    }
  }, [step, formState.filingStatus, goToStep]);

  const bracket = useMemo(() => {
    const fs = formState.filingStatus;
    if (!fs) return null;
    return calculatePartBPremium(formState.income, fs);
  }, [formState.income, formState.filingStatus]);

  const summary = useMemo(() => {
    const fs = formState.filingStatus;
    if (!bracket || !fs) return "";
    return getPlainEnglishSummary(bracket, formState.income, fs);
  }, [bracket, formState.income, formState.filingStatus]);

  const questionnaireProgressPercent = step <= 4 ? (step / 4) * 100 : 100;

  const formattedIncomeCaption = formState.income.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const stepBaseClass =
    "transition-all duration-200 max-w-3xl space-y-6 rounded-[12px] bg-white p-6 md:p-8";

  /**
   * Inactive steps stay mounted so the slide transition works, but opacity and
   * pointer-events only hide them from people who can see. Without `inert` a
   * screen reader still reads all four questions and their inputs on top of
   * whichever step is actually showing, and a Tab press lands in an invisible
   * field.
   */
  const stepProps = (n: number) => ({
    className: `${stepBaseClass} ${
      step === n
        ? "relative translate-x-0 opacity-100"
        : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"
    }`,
    inert: step !== n,
    "aria-hidden": step !== n || undefined,
  });

  const updateState = (next: Partial<MedicareWizardState>) => {
    setStoredFormState((current) => ({ ...normalizeMedicareWizardState(current), ...next }));
  };

  const incomeSubhead =
    formState.filingStatus !== null ? (
      <>
        This helps estimate your 2026 IRMAA bracket for Medicare Part B (CMS official tiers). I’ll
        use your {filingThresholdPhrase(formState.filingStatus)} filing thresholds —{" "}
        {filingThresholdCopy(formState.filingStatus)} is the IRMAA threshold. Medicare usually looks
        at MAGI from two years earlier.
      </>
    ) : (
      <>
        This helps estimate your 2026 IRMAA bracket for Medicare Part B (CMS official tiers).
        Medicare usually looks at MAGI from two years earlier.
      </>
    );

  return (
    <div className="app-shell py-10">
      <header>
        <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
          Free estimate · No account, no SSN
        </p>
        <h2 className="text-24 md:text-28 mt-2 leading-tight font-semibold tracking-tight text-[var(--color-navy)]">
          What will your 2026 Medicare Part B premium be?
        </h2>
        <p className="measure-prose text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          Four questions. The answer depends on your income and how you file, because Medicare adds
          an income-related amount — IRMAA — on top of the standard premium.
        </p>
      </header>

      <section className="card-surface mt-6 p-4 md:p-6">
        {step === 5 ? (
          <p className="text-18 text-center font-bold text-[var(--color-navy)]">
            Your personalized results are ready.
          </p>
        ) : (
          <>
            <div className="mb-2 h-3 w-full rounded-full bg-[#ddd5c8]">
              <div
                className="h-3 rounded-full bg-[var(--color-navy)] transition-all duration-200 ease-in-out"
                style={{ width: `${questionnaireProgressPercent}%` }}
              />
            </div>
            <p className="text-18 text-right text-[var(--color-ink-muted)]">
              {PROGRESS_LABELS[step]}
            </p>
          </>
        )}
      </section>

      <section className="relative mt-6 min-h-[420px]">
        {/* Step 1 - ZIP */}
        <div {...stepProps(1)}>
          <h2 className="text-24 leading-tight font-semibold">What is your ZIP code?</h2>
          <p className="text-18 text-[var(--color-ink-muted)]">
            Your ZIP code helps me check the area I serve and local plan options if you ask for a
            review. It does not change this Part B premium estimate.{" "}
          </p>
          <Input
            value={formState.zip}
            onChange={(event) =>
              updateState({ zip: event.target.value.replace(/\D/g, "").slice(0, 5) })
            }
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="e.g. 27401"
            className="text-24 h-14"
          />
          {zipError && formState.zip.length > 0 ? (
            <p role="alert" className="text-18 text-[var(--color-error)]">
              {zipError}
            </p>
          ) : null}
          <Button
            type="button"
            disabled={!!zipError || formState.zip.length === 0}
            onClick={goToNext}
            className="text-18 h-14 w-full bg-[var(--color-navy)] text-[var(--color-paper)]"
          >
            Continue →
          </Button>
        </div>

        {/* Step 2 - Filing status */}
        <div {...stepProps(2)}>
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-24 leading-tight font-semibold">
              How do you file your federal taxes?
            </h2>
            <p className="text-18 max-w-[520px] text-[var(--color-ink-muted)]">
              This determines which Medicare income thresholds apply to you. Married couples filing
              jointly have higher thresholds than individual filers — it changes the result
              significantly.
            </p>
            <div
              className="text-18 max-w-[520px] rounded-md border-l-4 border-[var(--color-gold-ink)] bg-amber-50/90 px-4 py-3 text-left text-[var(--color-navy)]"
              role="note"
            >
              Why does this matter? A married couple earning $150,000 jointly pays the standard
              $202.90/month premium. An individual earning $150,000 pays $405.80/month. Same income.
              Very different bill.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <button
              type="button"
              onClick={() => setSelectedStatus("individual")}
              className={cn(
                "relative rounded-xl border-2 bg-white p-6 text-left transition-[border-color,background-color] duration-150",
                selectedFilingStatus === "individual"
                  ? "border-[3px] border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                  : "border-gray-300",
              )}
            >
              {selectedFilingStatus === "individual" ? (
                <CheckCircle2
                  className="absolute top-4 right-4 size-5 shrink-0 text-[var(--color-navy)]"
                  aria-hidden
                />
              ) : null}
              <User
                className="mb-3 size-10 text-[var(--color-navy)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="text-22 font-bold text-[var(--color-navy)]">Individual filer</div>
              <p className="text-18 mt-2 text-[var(--color-ink-muted)]">
                I file my own tax return separately, or I’m widowed, divorced, or have never been
                married.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatus("married_jointly")}
              className={cn(
                "relative rounded-xl border-2 bg-white p-6 text-left transition-[border-color,background-color] duration-150",
                selectedFilingStatus === "married_jointly"
                  ? "border-[3px] border-[var(--color-navy)] bg-[rgba(15,34,65,0.05)]"
                  : "border-gray-300",
              )}
            >
              {selectedFilingStatus === "married_jointly" ? (
                <CheckCircle2
                  className="absolute top-4 right-4 size-5 shrink-0 text-[var(--color-navy)]"
                  aria-hidden
                />
              ) : null}
              <Users
                className="mb-3 size-10 text-[var(--color-navy)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="text-22 font-bold text-[var(--color-navy)]">
                Married filing jointly
              </div>
              <p className="text-18 mt-2 text-[var(--color-ink-muted)]">
                My spouse and I file a single combined federal tax return together.
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button type="button" variant="ghost" onClick={goToPrev} className="text-18 h-14">
              Back
            </Button>
            <Button
              type="button"
              disabled={selectedFilingStatus === null}
              onClick={() => {
                if (selectedFilingStatus === null) return;
                updateState({ filingStatus: selectedFilingStatus });
                goToNext();
              }}
              className="text-18 h-14 w-full bg-[var(--color-navy)] text-[var(--color-paper)] disabled:cursor-not-allowed"
            >
              Continue →
            </Button>
          </div>
        </div>

        {/* Step 3 - Age */}
        <div {...stepProps(3)}>
          <h2 className="text-24 leading-tight font-semibold">What is your age?</h2>
          <p className="text-18 text-[var(--color-ink-muted)]">
            Your premium isn’t set by your age — but your enrollment deadlines are, so this tells me
            which windows are in front of you.
          </p>

          <StepperField
            id="medicare-age"
            label="Your age"
            value={formState.age}
            min={55}
            max={85}
            step={1}
            onChange={(age) => updateState({ age })}
            format={(value) => String(value)}
            inputMaxWidthClass="max-w-32"
          />
          <div className="px-2 py-2">
            <Slider
              min={55}
              max={85}
              step={1}
              value={[formState.age]}
              onValueChange={(value) => updateState({ age: value[0] ?? 65 })}
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
              aria-label="Your age"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrev}
              className="text-18 h-14 border-[var(--color-navy)] text-[var(--color-navy)]"
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={!!ageError}
              onClick={goToNext}
              className="text-18 h-14 w-full bg-[var(--color-navy)] text-[var(--color-paper)]"
            >
              Continue →
            </Button>
          </div>
        </div>

        {/* Step 4 - Income */}
        <div {...stepProps(4)}>
          <h2 className="text-24 leading-tight font-semibold">
            What is your estimated annual household income?
          </h2>
          <p className="text-18 text-[var(--color-ink-muted)]">{incomeSubhead}</p>

          <StepperField
            id="medicare-income"
            label="Household income"
            value={formState.income}
            min={20000}
            max={750000}
            step={5000}
            onChange={(income) => updateState({ income })}
            format={(value) =>
              value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })
            }
          />
          <div className="px-2 py-2">
            <Slider
              min={20000}
              max={750000}
              step={5000}
              value={[formState.income]}
              onValueChange={(value) => updateState({ income: value[0] ?? 80000 })}
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
              aria-label="Household income"
            />
          </div>
          <p className="text-16 text-center text-[var(--color-ink-muted)]">
            Type it, use the buttons, or drag the bar — whichever is easiest.
          </p>
          {incomeError ? (
            <p role="alert" className="text-18 text-[var(--color-error)]">
              {incomeError}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrev}
              className="text-18 h-14 border-[var(--color-navy)] text-[var(--color-navy)]"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={goToNext}
              className="text-20 h-16 w-full bg-[var(--color-navy)] font-semibold text-[var(--color-paper)]"
            >
              Calculate my results
            </Button>
          </div>
        </div>

        {/* Step 5 - Results */}
        <div {...stepProps(5)}>
          {step === 5 && bracket && formState.filingStatus ? (
            <>
              <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-20 text-[var(--color-ink-muted)]">
                    Your estimated 2026 Medicare Part B premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-6 pt-2">
                  <p className="text-40 font-bold">{formatMoney(bracket.partBPremium)}/month</p>
                  <p className="text-18 font-medium text-[var(--color-gold-ink)]">
                    {bracket.bracketName}
                  </p>
                  <p className="text-18 text-[var(--color-ink-muted)]">
                    Based on {formattedIncomeCaption} annual income.{" "}
                    {filingResultsLabel(formState.filingStatus)}. ZIP{" "}
                    {formState.zip || "not entered"}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-surface mt-4 border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-20 text-[var(--color-ink-muted)]">
                    Where you sit on the 2026 schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <IrmaaLadder
                    filingStatus={formState.filingStatus}
                    income={formState.income}
                    currentBracketName={bracket.bracketName}
                  />
                </CardContent>
              </Card>

              <Card className="card-surface mt-4 border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-20 text-[var(--color-ink-muted)]">
                    What this means for you
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-2">
                  <p className="text-lg leading-relaxed">{summary}</p>
                  <p className="text-18 text-[var(--color-ink-muted)] italic">
                    Note: IRMAA is calculated from your 2024 tax return MAGI, not your current
                    income. If your income has changed significantly since 2024 — you retired, or
                    lost a pension — your actual premium may differ, and in some cases it can be
                    appealed. Tell me what changed and I’ll tell you whether it qualifies.
                  </p>
                </CardContent>
              </Card>

              {(() => {
                const hasSurcharge = bracket.irmaaSurcharge > 0;
                const rothHref = `/roth-window?magi=${Math.round(formState.income)}&filing=${formState.filingStatus}`;
                return (
                  <Card
                    className={cn(
                      "card-surface mt-4 text-[var(--color-navy)]",
                      hasSurcharge
                        ? "border-l-4 border-[var(--color-gold-ink)] bg-amber-50/60"
                        : "border-gray-300 bg-white",
                    )}
                  >
                    <CardContent className="p-6">
                      <Link
                        href={rothHref}
                        className="group block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]"
                      >
                        <p className="text-18 leading-relaxed">
                          {hasSurcharge ? (
                            <>
                              Want to avoid this surcharge next year? See an estimate of how much
                              you could convert with the{" "}
                              <span className="font-bold text-[var(--color-navy)]">
                                Roth Window Calculator
                              </span>
                              <span
                                className="ml-2 inline-block text-[var(--color-gold-ink)] transition-transform group-hover:translate-x-1"
                                aria-hidden
                              >
                                →
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">Proactive planning:</span> Check your{" "}
                              <span className="font-bold text-[var(--color-navy)]">
                                Roth Conversion Window
                              </span>{" "}
                              to lock in current tax rates.
                              <span
                                className="ml-2 inline-block text-[var(--color-gold-ink)] transition-transform group-hover:translate-x-1"
                                aria-hidden
                              >
                                →
                              </span>
                            </>
                          )}
                        </p>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })()}

              <Card className="card-surface mt-4 border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-20 text-[var(--color-ink-muted)]">
                    Want me to walk you through it?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-18">
                    Pick a time and we’ll go through what this means for you — by phone or video,
                    whichever you prefer. There’s no charge, and no obligation to buy anything
                    afterwards.
                  </p>
                  <Button
                    asChild
                    className="text-18 mt-4 h-14 w-full bg-[var(--color-navy)] text-[var(--color-paper)]"
                  >
                    {/* Same tab, carrying the Medicare topic through. */}
                    <Link href={`${AGENT.schedulingUrl}?topic=medicare`}>
                      Book a time to talk →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <EmailResultsCapture
                source="wizard_completion"
                wizardData={{
                  zip_code: formState.zip,
                  filing_status: formState.filingStatus,
                  age: formState.age,
                  annual_income: formState.income,
                  calculated_premium: bracket.partBPremium,
                  irmaa_bracket: bracket.bracketName,
                }}
              />

              <button
                type="button"
                onClick={() => {
                  clearFormState();
                  setSelectedStatus(null);
                  router.push("/medicare");
                }}
                className="text-18 mt-6 inline-flex items-center font-medium underline decoration-2 underline-offset-4"
              >
                Start over
              </button>
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}
