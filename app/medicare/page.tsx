import type { Metadata } from "next";

import { pageOpenGraph } from "@/lib/seo";
import { MedicareWizard } from "@/app/medicare/MedicareWizard";

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
  return <MedicareWizard />;
}
