import { ToolTracking } from "../_components/tool-tracking";
import type { Metadata } from "next";

import { ToolHeader } from "../_components/tool-header";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { LifeInsuranceNeeds } from "./LifeInsuranceNeeds";

const path = "/tools/life-insurance-needs";
const description =
  "Free life insurance needs calculator. The DIME method (debt, income, mortgage, education) as a starting point for a conversation with an agent.";

export const metadata: Metadata = {
  title: { absolute: "How Much Life Insurance Do I Need? | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Life insurance needs calculator", description, path }),
  twitter: { ...pageTwitter({ title: "Life insurance needs calculator", description }), images: [`${path}/twitter-image`] },
};


export default function LifeInsuranceNeedsPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Life insurance needs", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Life insurance needs calculator (DIME)",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Life insurance needs" }]} title="How much life insurance is enough?" lede="Estimate a starting point for a conversation about coverage." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolTracking toolId="life_insurance_needs"><LifeInsuranceNeeds /></ToolTracking>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Add up debts, not counting the mortgage.",
          "Multiply yearly income by the years your family needs it.",
          "Add the mortgage balance and future education costs.",
          "Read the starting point, then talk to an agent before acting on it.",
        ]}
        formula={{
          label: "The formula",
          expression: "DIME = D + I + M + E\n\nD = debts (no mortgage)\nI = yearly income x years needed\nM = mortgage balance\nE = future education costs",
          note: "A starting point for a conversation with an agent, not a coverage amount to buy.",
        }}
      >
        <p>
          <strong>D is debt:</strong> everything owed except the mortgage. <strong>I is income:</strong>{" "}
          yearly income times the years your family needs it. <strong>M is mortgage:</strong> the
          balance still owed. <strong>E is education:</strong> future school costs you want covered.
        </p>
        <p>
          The four numbers add up to one starting point. It is deliberately simple. The gaps stay
          visible: existing savings, a working spouse, current policies, and final expenses are not
          in the sum.
        </p>
        <p>
          The number also says nothing about the type of coverage. Term covers a set number of years
          for less. Permanent lasts a lifetime for more. Which fits is a conversation, not a
          calculation.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/life-insurance-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Life insurance, explained"
        wealthBody="Term vs permanent, how underwriting works, and the questions to ask before you buy. Plain English, no pressure."
        ctaHeading="Have your starting number? Let us talk it through"
        ctaBody="I am a licensed insurance agent (NC Life & Health) in Greensboro. A free 20-minute call turns your DIME number into a real plan for your family."
        related={[
          { href: "/wealth/disability-insurance-explained", label: "Disability insurance, explained" },
          { href: "/life-insurance", label: "Life insurance help in Greensboro" },
          { href: "/wealth/emergency-fund-guide", label: "The emergency fund guide" },
        ]}
      />
    </main>
  );
}
