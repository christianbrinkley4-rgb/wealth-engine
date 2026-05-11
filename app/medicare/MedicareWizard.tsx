"use client";

import Link from "next/link";
import { CheckCircle2, User, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useWizardStep } from "@/hooks/useWizardStep";
import { cn } from "@/lib/utils";
import { calculatePartBPremium, getPlainEnglishSummary, type FilingStatus } from "@/lib/irmaa";

type MedicareWizardState = {
  zip: string;
  filingStatus: FilingStatus | null;
  age: number;
  income: number;
  email: string;
};

const INITIAL_STATE: MedicareWizardState = {
  zip: "",
  filingStatus: null,
  age: 65,
  income: 80000,
  email: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_ERROR_COPY = "Double-check that email - we want to make sure it reaches you.";

function normalizeMedicareWizardState(value: Partial<MedicareWizardState>): MedicareWizardState {
  const merged = { ...INITIAL_STATE, ...value };
  const fs = merged.filingStatus;
  merged.filingStatus = fs === "individual" || fs === "married_jointly" || fs === null ? fs : null;
  return merged;
}

const PROGRESS_LABELS: Record<number, string> = {
  1: "Step 1 of 4 - Your Location",
  2: "Step 2 of 4 - Your Tax Filing Status",
  3: "Step 3 of 4 - Your Age",
  4: "Step 4 of 4 - Your Income",
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
  return status === "individual" ? "$103,000" : "$206,000";
}

function filingThresholdPhrase(status: FilingStatus): string {
  return status === "individual" ? "individual" : "married filing jointly";
}

function filingResultsLabel(status: FilingStatus): string {
  return status === "individual" ? "Individual filer" : "Married filing jointly";
}

export function MedicareWizard() {
  const router = useRouter();
  const completionCaptureKeyRef = useRef<string | null>(null);
  const [storedFormState, setStoredFormState, clearFormState] =
    useLocalStorage<MedicareWizardState>("medicare_wizard", INITIAL_STATE);
  const formState = useMemo(() => normalizeMedicareWizardState(storedFormState), [storedFormState]);
  const { validateZip, validateAge, validateIncome } = useFormValidation();
  const { step, goToNext, goToPrev, goToStep } = useWizardStep(5);
  const [selectedStatus, setSelectedStatus] = useState<FilingStatus | null>(null);

  const zipError = validateZip(formState.zip);
  const ageError = validateAge(formState.age);
  const incomeError = validateIncome(formState.income);
  const cleanEmail = formState.email.trim();
  const emailError =
    cleanEmail.length > 0 && !EMAIL_REGEX.test(cleanEmail) ? EMAIL_ERROR_COPY : null;
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

  useEffect(() => {
    if (step !== 5 || !bracket || !formState.filingStatus || !EMAIL_REGEX.test(cleanEmail)) {
      return;
    }

    const captureKey = [
      cleanEmail.toLowerCase(),
      formState.zip,
      formState.filingStatus,
      formState.age,
      formState.income,
      bracket.partBPremium,
      bracket.bracketName,
    ].join("|");

    if (completionCaptureKeyRef.current === captureKey) return;
    completionCaptureKeyRef.current = captureKey;

    void fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        source: "wizard_completion",
        zip_code: formState.zip,
        filing_status: formState.filingStatus,
        age: formState.age,
        annual_income: formState.income,
        calculated_premium: bracket.partBPremium,
        irmaa_bracket: bracket.bracketName,
      }),
    }).catch(() => {
      // Completion capture is helpful, but results should never disappear because email failed.
    });
  }, [
    bracket,
    cleanEmail,
    formState.age,
    formState.filingStatus,
    formState.income,
    formState.zip,
    step,
  ]);

  const questionnaireProgressPercent = step <= 4 ? (step / 4) * 100 : 100;

  const formattedIncomeCaption = formState.income.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const stepBaseClass =
    "transition-all duration-200 max-w-3xl space-y-6 rounded-[12px] bg-white p-6 md:p-8";

  const updateState = (next: Partial<MedicareWizardState>) => {
    setStoredFormState((current) => ({ ...normalizeMedicareWizardState(current), ...next }));
  };

  const incomeSubhead =
    formState.filingStatus !== null ? (
      <>
        This determines your exact 2026 IRMAA bracket for Medicare Part B. We&apos;ll use your{" "}
        {filingThresholdPhrase(formState.filingStatus)} filing thresholds -{" "}
        {filingThresholdCopy(formState.filingStatus)} is your IRMAA threshold.
      </>
    ) : (
      <>This determines your exact 2026 IRMAA bracket for Medicare Part B.</>
    );

  return (
    <main className="app-shell pb-10">
      <section className="card-surface mt-4 p-4 md:p-6">
        {step === 5 ? (
          <p className="text-center text-[18px] font-bold text-[var(--color-navy)]">
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
            <p className="text-right text-[18px] text-[var(--color-muted)]">
              {PROGRESS_LABELS[step]}
            </p>
          </>
        )}
      </section>

      <section className="relative mt-6 min-h-[560px]">
        {/* Step 1 - ZIP */}
        <div
          className={`${stepBaseClass} ${step === 1 ? "relative translate-x-0 opacity-100" : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"}`}
        >
          <h1 className="text-[28px] leading-tight font-semibold">What is your ZIP code?</h1>
          <p className="text-[18px] text-[var(--color-muted)]">
            We use this to find Triad-area cost-of-living data specific to your neighborhood.
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
            className="h-14 text-[24px]"
          />
          {zipError && formState.zip.length > 0 ? (
            <p role="alert" className="text-[18px] text-[var(--color-error)]">
              {zipError}
            </p>
          ) : null}
          <Button
            type="button"
            disabled={!!zipError || formState.zip.length === 0}
            onClick={goToNext}
            className="h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
          >
            Continue →
          </Button>
        </div>

        {/* Step 2 - Filing status */}
        <div
          className={`${stepBaseClass} ${step === 2 ? "relative translate-x-0 opacity-100" : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"}`}
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-[28px] leading-tight font-semibold">
              How do you file your federal taxes?
            </h2>
            <p className="max-w-[520px] text-[18px] text-[var(--color-muted)]">
              This determines which Medicare income thresholds apply to you. Married couples filing
              jointly have higher thresholds than individual filers - it significantly affects your
              result.
            </p>
            <div
              className="max-w-[520px] rounded-md border-l-4 border-[var(--color-gold)] bg-amber-50/90 px-4 py-3 text-left text-[18px] text-[var(--color-navy)]"
              role="note"
            >
              Why does this matter? A married couple earning $150,000 jointly pays the standard
              $185/month premium. An individual earning $150,000 pays $370/month. Same income. Very
              different bill.
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
              <div className="text-[22px] font-bold text-[var(--color-navy)]">Individual Filer</div>
              <p className="mt-2 text-[18px] text-[var(--color-muted)]">
                I file my own tax return separately, or I&apos;m widowed, divorced, or have never
                been married.
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
              <div className="text-[22px] font-bold text-[var(--color-navy)]">
                Married Filing Jointly
              </div>
              <p className="mt-2 text-[18px] text-[var(--color-muted)]">
                My spouse and I file a single combined federal tax return together.
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button type="button" variant="ghost" onClick={goToPrev} className="h-14 text-[18px]">
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
              className="h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)] disabled:cursor-not-allowed"
            >
              Continue →
            </Button>
          </div>
        </div>

        {/* Step 3 - Age + email */}
        <div
          className={`${stepBaseClass} ${step === 3 ? "relative translate-x-0 opacity-100" : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"}`}
        >
          <h2 className="text-[28px] leading-tight font-semibold">What is your age?</h2>
          <p className="text-[18px] text-[var(--color-muted)]">
            Medicare eligibility and premiums vary significantly by age bracket.
          </p>

          <p className="text-center text-[48px] font-bold text-[var(--color-navy)]">
            {formState.age}
          </p>
          <div className="px-2 py-4">
            <Slider
              min={55}
              max={85}
              step={1}
              value={[formState.age]}
              onValueChange={(value) => updateState({ age: value[0] ?? 65 })}
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
            />
          </div>

          <div className="border-t border-gray-300 pt-6">
            <label htmlFor="email" className="text-[18px] font-medium">
              Want your results emailed to you?
            </label>
            <p className="mt-1 text-[18px] text-[var(--color-muted)]">
              We&apos;ll send a plain-English summary. No spam, ever. Completely optional.
            </p>
            <Input
              id="email"
              type="email"
              placeholder="christianbrinkley4@gmail.com"
              value={formState.email}
              onChange={(event) => updateState({ email: event.target.value })}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "wizard-email-error" : undefined}
              className="mt-3 h-14 text-[18px]"
            />
            {emailError ? (
              <p
                id="wizard-email-error"
                role="alert"
                className="mt-2 text-[18px] text-[var(--color-error)]"
              >
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrev}
              className="h-14 border-[var(--color-navy)] text-[18px] text-[var(--color-navy)]"
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={!!ageError || !!emailError}
              onClick={() => {
                if (EMAIL_REGEX.test(cleanEmail) && formState.filingStatus) {
                  void fetch("/api/capture-lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: cleanEmail,
                      source: "wizard_soft_ask",
                      zip_code: formState.zip,
                      filing_status: formState.filingStatus,
                      age: formState.age,
                      annual_income: formState.income,
                      calculated_premium: 0,
                      irmaa_bracket: "Medicare wizard — optional email (step 3)",
                    }),
                  }).catch(() => {});
                }
                goToNext();
              }}
              className="h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
            >
              Continue →
            </Button>
          </div>
        </div>

        {/* Step 4 - Income */}
        <div
          className={`${stepBaseClass} ${step === 4 ? "relative translate-x-0 opacity-100" : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"}`}
        >
          <h2 className="text-[28px] leading-tight font-semibold">
            What is your estimated annual household income?
          </h2>
          <p className="text-[18px] text-[var(--color-muted)]">{incomeSubhead}</p>

          <p className="text-center text-[48px] font-bold text-[var(--color-navy)]">
            {formState.income.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="px-2 py-4">
            <Slider
              min={20000}
              max={750000}
              step={5000}
              value={[formState.income]}
              onValueChange={(value) => updateState({ income: value[0] ?? 80000 })}
              className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:p-2"
            />
          </div>
          {incomeError ? (
            <p role="alert" className="text-[18px] text-[var(--color-error)]">
              {incomeError}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrev}
              className="h-14 border-[var(--color-navy)] text-[18px] text-[var(--color-navy)]"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={goToNext}
              className="h-16 w-full bg-[var(--color-navy)] text-[20px] font-semibold text-[var(--color-gold)]"
            >
              Calculate my results
            </Button>
          </div>
        </div>

        {/* Step 5 - Results */}
        <div
          className={`${stepBaseClass} ${step === 5 ? "relative opacity-100" : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"} transition-opacity duration-200`}
        >
          {step === 5 && bracket && formState.filingStatus ? (
            <>
              <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-[20px] text-[var(--color-muted)]">
                    Your Estimated 2026 Medicare Part B Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-6 pt-2">
                  <p className="text-[40px] font-bold">
                    {formatMoney(bracket.partBPremium)} / month
                  </p>
                  <p className="text-[18px] font-medium text-[var(--color-gold)]">
                    {bracket.bracketName}
                  </p>
                  <p className="text-[18px] text-[var(--color-muted)]">
                    Based on {formattedIncomeCaption} annual income.{" "}
                    {filingResultsLabel(formState.filingStatus)}. ZIP{" "}
                    {formState.zip || "not entered"}
                  </p>
                </CardContent>
              </Card>

              <Card className="card-surface mt-4 border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-[20px] text-[var(--color-muted)]">
                    What This Means For You
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-2">
                  <p className="text-lg leading-relaxed">{summary}</p>
                  <p className="text-[18px] text-[var(--color-muted)] italic">
                    Note: IRMAA is calculated from your 2024 tax return MAGI, not your current
                    income. If your income has changed significantly since 2024, your actual premium
                    may differ. Christian can help you assess this in a free consultation.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-surface mt-4 border-gray-300 bg-white text-[var(--color-navy)]">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-[20px] text-[var(--color-muted)]">
                    Want a Free Personal Walkthrough?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-[18px]">
                    Christian is available for free 20-minute Zoom consultations for Triad-area
                    residents. No sales pitch - this is academic research.
                  </p>
                  <Button
                    asChild
                    className="mt-4 h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
                  >
                    <Link href="https://calendly.com/christianbrinkley4/30min">Book My Free Call →</Link>
                  </Button>
                </CardContent>
              </Card>

              <EmailResultsCapture
                source="pdf_request"
                initialEmail={formState.email}
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
                className="mt-6 inline-flex items-center text-[18px] font-medium underline decoration-2 underline-offset-4"
              >
                Start over
              </button>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
