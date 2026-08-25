import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { Plan65 } from "@/app/plan/Plan65";
import { AGENT } from "@/lib/agent";
import { pageOpenGraph } from "@/lib/seo";

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
    <main className="app-shell pb-16">
      <header className="mt-6 max-w-3xl">
        <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
          {AGENT.city} · {AGENT.region} · Free, and nothing is sent anywhere
        </p>
        <h1 className="text-32 md:text-40 mt-2 leading-tight font-semibold tracking-tight text-balance text-[var(--color-navy)]">
          What does the timing of a Roth conversion cost you in Medicare?
        </h1>
        <p className="measure-prose text-19 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Most conversion advice stops at the income tax. Medicare charges a second bill on the same
          income two years later, and unlike the tax, this one is decided almost entirely by which
          years you convert in. Move the sliders and the difference shows up on the right.
        </p>
      </header>

      <Plan65 />

      <div className="measure-prose max-w-3xl">
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
    </main>
  );
}
