"use client";

import { toCurrency } from "@/app/lib/financial";

interface MetricsStripProps {
  taxPressure: number;
  fiduciaryAlpha: number;
  irmaaSurcharge: number;
}

export default function MetricsStrip({
  taxPressure,
  fiduciaryAlpha,
  irmaaSurcharge,
}: MetricsStripProps) {
  return (
    <div className="grid grid-cols-1 border border-t-0 border-(--rule) bg-(--ink-2) md:grid-cols-3">
      <Cell
        label="Estimated 2026 Tax Impact"
        value={toCurrency(taxPressure)}
        tone="rose"
        sub="Federal + North Carolina estimate"
      />
      <Cell
        label="Projected Planning Lift"
        value={fiduciaryAlpha > 0 ? toCurrency(fiduciaryAlpha) : "—"}
        tone="gold"
        sub="Guided path compared to baseline path"
      />
      <Cell
        label="Estimated Medicare Surcharge"
        value={toCurrency(irmaaSurcharge)}
        tone="cyan"
        sub="Modeled annual impact from income tiers"
      />
    </div>
  );
}

function Cell({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: string;
  tone: "rose" | "gold" | "cyan";
  sub: string;
}) {
  const toneText =
    tone === "rose"
      ? "text-(--rose)"
      : tone === "gold"
        ? "text-(--gold-light)"
        : "text-(--cyan)";
  return (
    <div className="border-r border-(--rule) px-8 py-7 last:border-r-0 transition-colors hover:bg-(--ink-3)">
      <div className="eyebrow-dim mb-2.5">{label}</div>
      <div
        className={`font-mono text-[28px] font-semibold leading-none tracking-tight tabular-nums ${toneText}`}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[11px] text-(--slate-dim)">{sub}</div>
    </div>
  );
}
