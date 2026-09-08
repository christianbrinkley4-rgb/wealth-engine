import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { MedicareWizard } from "@/app/medicare/MedicareWizard";
import { breadcrumbJsonLd, pageOpenGraph, serviceJsonLd } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

/** Medicare flow: 4 questionnaire steps (?step=1–4) plus results (?step=5); see useWizardStep(5) in MedicareWizard. */

export const metadata: Metadata = {
  title: { absolute: "2026 Medicare Part B & IRMAA Calculator — Greensboro" },
  description:
    "Estimate your 2026 Medicare Part B premium and IRMAA bracket in four questions. Official CMS tiers, no account, no Social Security number, no cost.",
  alternates: { canonical: "/medicare" },
  openGraph: pageOpenGraph({
    title: "2026 Medicare Part B & IRMAA Calculator",
    description:
      "Four questions and you will see your 2026 Part B premium and where you sit on the IRMAA schedule.",
    path: "/medicare",
  }),
};

export default function MedicarePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Part B & IRMAA estimate", path: "/medicare" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "2026 Medicare Part B and IRMAA estimate",
              description:
                "Four questions using the published CMS schedule. Education only — not a quote or a benefit determination.",
              path: "/medicare",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Part B & IRMAA estimate" }]}
        eyebrow={`${SERVICE_AREA_LABEL} · free estimate`}
        title="Estimate your 2026 Part B premium"
        lede="Four questions. The published CMS schedule. No account, no Social Security number, and no call center. When you are done, we can sit down about what the number actually means for your household."
        secondaryHref="/remind-me"
        secondaryLabel="See enrollment dates →"
        note="Nothing you type here is sent anywhere until you choose to email the result to yourself."
        proof={[
          "Licensed in North Carolina",
          "Kitchen table, coffee shop, or the phone",
          "Official 2026 CMS tiers — education only",
          "Your information is never sold",
        ]}
      />

      <MedicareWizard />

      <KitchenTableClose
        heading="Want the number explained at your kitchen table?"
        body="The calculator shows a tier. Sitting down is how we talk about whether a conversion, a withdrawal, or an appeal is the next move — without inventing advice I am not licensed to give."
        href="/start?topic=medicare"
        label="Ask a question →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
    </main>
  );
}
