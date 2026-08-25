import type { Metadata } from "next";

import { pageOpenGraph } from "@/lib/seo";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { RothWindowCalculator } from "@/app/roth-window/RothWindowCalculator";

export const metadata: Metadata = {
  title: { absolute: "Roth Conversion Calculator for 2026 IRMAA — Greensboro" },
  description:
    "Estimate how much you can convert to a Roth this year without pushing into a higher Medicare IRMAA surcharge later. Uses official 2026 CMS IRMAA brackets.",
  alternates: { canonical: "/roth-window" },
  openGraph: pageOpenGraph({
    title: "Roth conversion window against 2026 IRMAA",
    description:
      "How much you can convert before it shows up on your Medicare premium two years later.",
    path: "/roth-window",
  }),
};

export default function RothWindowPage() {
  return (
    <main className="app-shell pb-12">
      {/*
        Server-rendered so the page has a body. The calculator below reads the
        query string, which suspends it; when this heading and copy lived
        inside that boundary the built page shipped no HTML at all.
      */}
      <section className="card-surface mt-4 p-6 md:p-8">
        <p className="text-14 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
          2026 Roth Conversion Calculator
        </p>
        <h1 className="text-32 md:text-40 mt-2 leading-tight font-bold text-[var(--color-navy)]">
          How much can you convert without raising your Medicare premium?
        </h1>
        <p className="text-18 mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
          Roth conversions are usually planned against income-tax brackets alone. The part that gets
          missed is IRMAA — the Medicare surcharge set by your MAGI from two years earlier. Convert
          too much in 2026 and you see it on your Medicare premium in 2028.
        </p>
      </section>

      <RothWindowCalculator />

      <ComplianceDisclosure variant="medicare" showEstimateNote />
    </main>
  );
}
