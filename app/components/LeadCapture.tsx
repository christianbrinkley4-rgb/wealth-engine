"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck, FileText } from "lucide-react";
import { FilingStatus, toCurrency } from "@/app/lib/financial";
import { trackClientEvent } from "@/app/lib/client-telemetry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FunnelType = "WEALTH" | "MEDICARE";

interface LeadCaptureProps {
  funnel: FunnelType;
  age: number;
  zip: string;
  annualIncome: number;
  filingStatus: FilingStatus;
  keyOutcomeValue: number;
  portfolioValue: number;
  annualContribution: number;
  strategicAlpha: number;
  taxDrag: number;
  irmaaAnnualPenalty: number;
  includeNcTax: boolean;
  ncTaxDrag: number;
  wealthTrajectory: Array<{
    year: number;
    selfManaged: number;
    fiduciary: number;
    wealthGap: number;
  }>;
  ctaVariant: "review-a" | "review-b";
  presetId?: string;
}

export default function LeadCapture({
  funnel,
  age,
  zip,
  annualIncome,
  filingStatus,
  keyOutcomeValue,
  portfolioValue,
  annualContribution,
  strategicAlpha,
  taxDrag,
  irmaaAnnualPenalty,
  includeNcTax,
  ncTaxDrag,
  wealthTrajectory,
  ctaVariant,
  presetId,
}: LeadCaptureProps) {
  const userId: string | undefined = undefined;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goals, setGoals] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phone.length === 0 || phoneDigits.length >= 10;

  const dossier = useMemo(
    () => ({
      profile: {
        userId,
        fullName: name,
        email,
        phone,
        age,
        zip,
        filingStatus,
      },
      diagnostic: {
        funnel,
        annualIncome,
        keyOutcomeValue,
        portfolioValue,
        annualContribution,
        strategicAlpha,
        taxDrag,
        irmaaAnnualPenalty,
        includeNcTax,
        ncTaxDrag,
        wealthTrajectory,
        ctaVariant,
        presetId,
        keyOutcomeLabel:
          funnel === "WEALTH" ? "30Y Advisor Alpha Opportunity" : "Annual IRMAA Surcharge Exposure",
      },
      advisoryContext: {
        goals,
        notes,
        createdAt: new Date().toISOString(),
      },
    }),
    [
      age,
      annualContribution,
      annualIncome,
      email,
      filingStatus,
      funnel,
      goals,
      includeNcTax,
      irmaaAnnualPenalty,
      keyOutcomeValue,
      name,
      ncTaxDrag,
      notes,
      phone,
      portfolioValue,
      presetId,
      strategicAlpha,
      taxDrag,
      userId,
      wealthTrajectory,
      zip,
      ctaVariant,
    ],
  );

  const copyDossier = async () => {
    await navigator.clipboard.writeText(JSON.stringify(dossier, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadPdf = async () => {
    try {
      setExporting(true);
      setExportError(null);
      const response = await fetch("/api/strategic-dossier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dossier),
      });
      if (!response.ok) {
        throw new Error("Unable to generate dossier.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `strategic-financial-dossier-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      trackClientEvent({
        type: "pdf_exported",
        ctaVariant,
        presetId,
        funnel,
        zip,
      });
    } finally {
      setExporting(false);
    }
  };

  const handlePdfExport = async () => {
    if (!emailValid) {
      setExportError("Just need a real email before I build your review.");
      return;
    }
    if (!phoneValid) {
      setExportError("Phone needs at least 10 digits, or you can leave it blank.");
      return;
    }
    if (!consentChecked) {
      setExportError("Check the disclosure box and we can keep going.");
      return;
    }
    try {
      await downloadPdf();
    } catch {
      setExportError("The download tripped up on our end. Try again?");
      trackClientEvent({
        type: "pdf_export_failed",
        ctaVariant,
        presetId,
        funnel,
        zip,
      });
    }
  };

  const handleRoadmapSubmit = async () => {
    if (!emailValid) {
      setExportError("Just need a real email so Christian can follow up.");
      return;
    }
    if (!phoneValid) {
      setExportError("Phone needs at least 10 digits, or you can leave it blank.");
      return;
    }
    if (!consentChecked) {
      setExportError("Check the disclosure box and we can keep going.");
      return;
    }
    try {
      setSubmitting(true);
      setExportError(null);
      const response = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dossier),
      });
      if (!response.ok) {
        throw new Error("Unable to submit");
      }
      setSubmissionMessage("Got it. Christian will follow up with next steps.");

      const firstName = (name.trim().split(" ")[0] || "Client").slice(0, 30);
      void fetch("/api/trigger-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          calculatedTaxDrag: taxDrag,
          email,
        }),
      });
    } catch {
      setExportError("Something went wrong on our end. Try again?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-7">
      <div>
        <p className="text-[18px] font-semibold tracking-[0.08em] text-(--gold) uppercase">
          Personalized Review - Piedmont Triad Context
        </p>
        <h3 className="mt-4 font-serif text-[28px] leading-tight text-(--ink)">
          Get Christian&rsquo;s Help with My Plan
        </h3>
        <p className="mt-4 text-[18px] leading-[1.75] text-(--slate)">
          Share your details and Christian will prepare a clear local planning summary based on your
          worksheet inputs, 2026 Tax Law Changes modeling, and Medicare research.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField id="lead-name" label="Your Name">
          <Input
            id="lead-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Margaret L. Harrison"
            className="h-14 text-[18px]"
          />
        </FormField>
        <FormField id="lead-email" label="Best Email">
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="margaret@domain.com"
            className="h-14 text-[18px]"
          />
        </FormField>
        <FormField id="lead-phone" label="Phone (optional)">
          <Input
            id="lead-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(336) 555-0142"
            className="h-14 text-[18px]"
          />
        </FormField>
        <FormField id="lead-goals" label="Main Planning Goal">
          <Input
            id="lead-goals"
            value={goals}
            onChange={(event) => setGoals(event.target.value)}
            placeholder="Lower tax surprise, Medicare planning, retirement confidence"
            className="h-14 text-[18px]"
          />
        </FormField>
        <div className="md:col-span-2">
          <FormField id="lead-notes" label="Anything Christian should know? (optional)">
            <textarea
              id="lead-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any context that would help personalize your plan."
              className="flex min-h-28 w-full rounded-md border border-(--rule-accent) bg-white px-4 py-3 text-[18px] text-(--ink) outline-hidden transition-colors placeholder:text-(--slate-dim) focus-visible:border-(--gold)"
            />
          </FormField>
        </div>
      </div>

      {!emailValid && email.length > 0 ? (
        <p role="alert" className="text-[18px] text-(--rose)">
          Just need a real email address.
        </p>
      ) : null}
      {!phoneValid && phone.length > 0 ? (
        <p role="alert" className="text-[18px] text-(--rose)">
          Phone requires at least 10 digits.
        </p>
      ) : null}

      <label className="flex items-start gap-3 text-[18px] leading-[1.7] text-(--slate)">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(event) => setConsentChecked(event.target.checked)}
          className="mt-1 h-11 w-11 border border-(--rule-accent) bg-white accent-(--gold)"
        />
        I understand this is educational planning support and I consent to receiving my personalized
        review details by email.
      </label>

      <div className="border-t border-(--rule) pt-6">
        <p className="text-[18px] font-semibold tracking-[0.08em] text-(--slate) uppercase">
          Key Result Tracked -{" "}
          <span className="font-mono text-(--ink) tabular-nums">{toCurrency(keyOutcomeValue)}</span>
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleRoadmapSubmit}
            disabled={submitting || !emailValid || !consentChecked || !phoneValid}
            className="min-h-14 text-[18px]"
          >
            <FileText className="h-4 w-4" />
            {submitting ? "One moment…" : "Get Christian's Help with My Plan"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handlePdfExport}
            disabled={exporting || !emailValid || !consentChecked || !phoneValid}
            className="min-h-14 text-[18px]"
          >
            <FileText className="h-4 w-4" />
            {exporting ? "Building..." : "Download My Personalized Medicare Review"}
          </Button>
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-[18px] tracking-[0.08em] text-(--slate-dim) uppercase transition-colors hover:text-(--slate)">
            Advanced - Copy Intake Payload
          </summary>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={copyDossier}
            className="mt-3 min-h-11 text-[18px]"
          >
            <ClipboardCheck className="h-4 w-4" />
            {copied ? "Copied" : "Copy Request Data"}
          </Button>
        </details>
      </div>
      {exportError ? (
        <p
          role="alert"
          className="border border-(--rose) bg-(--rose-dim) px-4 py-3 text-[18px] text-(--rose)"
        >
          {exportError}
        </p>
      ) : null}
      {submissionMessage ? (
        <p
          role="status"
          aria-live="polite"
          className="border border-(--emerald) bg-(--emerald-dim) px-4 py-3 text-[18px] text-(--emerald)"
        >
          {submissionMessage}
        </p>
      ) : null}
    </section>
  );
}

function FormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[18px] font-semibold tracking-[0.08em] text-(--slate) uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
