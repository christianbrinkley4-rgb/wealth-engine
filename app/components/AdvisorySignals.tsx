"use client";

import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { toCurrency } from "@/app/lib/financial";
import { Card } from "@/components/ui/card";

interface AdvisorySignalsProps {
  age: number;
  taxDrag: number;
  irmaaAnnualPenalty: number;
  strategicAlpha: number;
}

export default function AdvisorySignals({
  age,
  taxDrag,
  irmaaAnnualPenalty,
  strategicAlpha,
}: AdvisorySignalsProps) {
  const signals = [
    taxDrag > 4000
      ? {
          icon: AlertTriangle,
          title: "Material 2026 Tax Pressure Detected",
          detail: `Modeled federal + NC pressure of ${toCurrency(taxDrag)} per year. The dossier prioritizes income-timing and Roth conversion sequencing.`,
          tone: "rose",
        }
      : {
          icon: CheckCircle2,
          title: "Tax Pressure Within Manageable Band",
          detail:
            "Your scenario remains within the 2026 Tax Law Changes range without acute drag. Maintain disciplined contributions and revisit annually.",
          tone: "emerald",
        },
    age >= 62 || irmaaAnnualPenalty > 0
      ? {
          icon: ShieldAlert,
          title: "Active IRMAA Monitoring Indicated",
          detail: `Modeled CMS pressure of ${toCurrency(
            irmaaAnnualPenalty,
          )} per year. The dossier tracks AGI realization to guard each surcharge tier.`,
          tone: "rose",
        }
      : {
          icon: CheckCircle2,
          title: "IRMAA Runway Intact",
          detail:
            "Your modeled MAGI clears the first surcharge tier. Use this window to shape pre-Medicare withdrawals.",
          tone: "emerald",
        },
    {
      icon: CheckCircle2,
      title: "Engineered Spread Identified",
      detail: `Modeled long-horizon upside of ${toCurrency(
        strategicAlpha,
      )} between the disciplined fiduciary path and the self-directed baseline.`,
      tone: "cyan",
    },
  ] as const;

  return (
    <Card className="p-6 sm:p-8">
      <p className="display-eyebrow text-cyan-300/80">Strategic Highlights</p>
      <h3 className="mt-2 text-2xl font-light tracking-tight text-slate-50 sm:text-3xl">
        Engine-prioritized findings for your scenario.
      </h3>
      <div className="mt-5 space-y-3">
        {signals.map((signal) => {
          const Icon = signal.icon;
          const toneClass =
            signal.tone === "rose"
              ? "border-rose-400/30 bg-rose-400/8 text-rose-100"
              : signal.tone === "emerald"
                ? "border-emerald-400/30 bg-emerald-400/8 text-emerald-100"
                : "border-cyan-300/30 bg-cyan-300/8 text-cyan-100";
          return (
            <div
              key={signal.title}
              className={`rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 ${toneClass}`}
            >
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
                <Icon className="h-4 w-4" />
                {signal.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed font-light">{signal.detail}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
