import type { Metadata } from "next";
import { MedicareWizard } from "@/app/medicare/MedicareWizard";

/** Medicare flow: 4 questionnaire steps (?step=1–4) plus results (?step=5); see useWizardStep(5) in MedicareWizard. */

export const metadata: Metadata = {
  title: "2026 Medicare Part B & IRMAA Calculator — Greensboro NC",
  description:
    "Find out your 2026 Medicare Part B premium and IRMAA bracket. 4 questions, 4 minutes, no SSN, no account.",
  alternates: { canonical: "/medicare" },
  openGraph: {
    title: "2026 Medicare Part B & IRMAA Calculator",
    description: "Personalized 2026 IRMAA estimate for Greensboro-area retirees. Free.",
    url: "/medicare",
    type: "website",
  },
};

export default function MedicarePage() {
  return <MedicareWizard />;
}
