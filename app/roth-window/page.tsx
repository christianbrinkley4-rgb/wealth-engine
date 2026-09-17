import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { RothWindowCalculator } from "@/app/roth-window/RothWindowCalculator";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

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
    <main className="pb-12 text-[var(--color-navy)]">
      {/*
        Server-rendered so the page has a body. The calculator below reads the
        query string, which suspends it; when this heading and copy lived
        inside that boundary the built page shipped no HTML at all.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Roth conversion window", path: "/roth-window" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Roth conversion window" }]}
        eyebrow={`${SERVICE_AREA_LABEL} · 2026 IRMAA window`}
        title="How much can you convert without raising your Medicare premium?"
        lede="A Roth conversion may increase the income Medicare uses to calculate future premiums. Explore an estimate using 2026 rates, then discuss the timing with a qualified tax professional or financial advisor. Future Medicare rates may differ."
        secondaryHref="/plan"
        secondaryLabel="Compare lump vs spread →"
        note="I can help explain the Medicare side of the estimate and identify questions for your tax professional or advisor."
        proof={[
          "Licensed in North Carolina",
          "At-home or phone consultations in the Triad",
          "Official 2026 CMS IRMAA brackets",
          "No cost to talk through the number",
        ]}
      />

      <div className="app-shell">
        <RothWindowCalculator />
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>

      <KitchenTableClose
        heading="Would you like to discuss your estimate?"
        body="We can review how retirement income may affect Medicare and discuss which questions need a CPA or financial advisor. Your consultation is no cost."
        href="/start?topic=financial_planning"
        label="Ask a retirement question →"
      />
    </main>
  );
}
