import type { Metadata } from "next";
import { RothWindowCalculator } from "@/app/roth-window/RothWindowCalculator";

export const metadata: Metadata = {
  title: "2026 Roth Conversion IRMAA Calculator — Greensboro NC",
  description:
    "Estimate how much you might convert to a Roth this year without pushing into a higher Medicare IRMAA surcharge later. Uses official 2026 CMS IRMAA brackets.",
  alternates: { canonical: "/roth-window" },
  openGraph: {
    title: "Roth Conversion Window Estimate (2026 IRMAA)",
    description:
      "An estimate of a Roth conversion window relative to official 2026 Medicare IRMAA brackets.",
    url: "/roth-window",
    type: "website",
  },
};

export default function RothWindowPage() {
  return <RothWindowCalculator />;
}
