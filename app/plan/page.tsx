import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { Plan65 } from "@/app/plan/Plan65";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

/**
 * Server shell, deliberately.
 *
 * The heading, the explanation and the disclosure are rendered on the server
 * so the page has a body a crawler can read; only the interactive dashboard is
 * a client component. /roth-window taught this lesson the expensive way — its
 * whole page sat inside a client boundary and shipped an empty document.
 */

export const metadata: Metadata = {
  title: { absolute: "Roth Conversion & Medicare Timing Planner — Greensboro" },
  description:
    "See what converting a retirement account all at once costs you in Medicare surcharges, against spreading it under your bracket ceiling. Official 2026 CMS tiers.",
  alternates: { canonical: "/plan" },
  openGraph: pageOpenGraph({
    title: "What the timing of a Roth conversion costs in Medicare",
    description:
      "Move the sliders and see the surcharge a lump conversion triggers, against spreading it under your ceiling.",
    path: "/plan",
  }),
};

export default function PlanPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Conversion timing", path: "/plan" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Conversion timing" }]}
        eyebrow={`${SERVICE_AREA_LABEL} · free, nothing is sent anywhere`}
        title="What does the timing of a Roth conversion cost you in Medicare?"
        lede="Most conversion advice stops at the income tax. Medicare charges a second bill on the same income two years later, and unlike the tax, this one is decided almost entirely by which years you convert in. Move the sliders and the difference shows up on the right."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Ask a retirement question →"
        note="Education only — I am not a registered investment adviser. How to invest the money is an adviser’s question, and I’ll say so."
        proof={[
          "Licensed in North Carolina",
          "Kitchen-table walkthroughs within ~30 minutes of Greensboro",
          "Official 2026 CMS IRMAA schedule",
          "No cost, and I will not invent investment advice",
        ]}
      />

      <div className="app-shell">
        <Plan65 />

        <div className="measure-prose max-w-3xl">
          <ComplianceDisclosure variant="medicare" showEstimateNote />
        </div>
      </div>

      <KitchenTableClose
        heading="Want this walked through at the table?"
        body="I’ll sit down and tell you what a conversion does to a Medicare premium, and which parts belong to a CPA or a registered adviser."
        href="/start?topic=financial_planning"
        label="Ask a retirement question →"
      />
    </main>
  );
}
