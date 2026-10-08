import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
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

const PROOF = [
  "DIME method, explained",
  "A starting point, not a sales pitch",
  "Everything runs on your device",
  "From a licensed NC agent",
] as const;

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

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Life insurance needs" }]}
        eyebrow="Free tool · your numbers stay on your device"
        title="How much life insurance is enough?"
        lede="Start with DIME: your debts, the income to replace, the mortgage, and education costs. Add them up and you have a starting-point number. Bring that number to a conversation with an agent. It is the beginning of the discussion, not the answer."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <LifeInsuranceNeeds />
        </div>
      </section>

      <MathSection title="The math, in plain English">
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

      <div className="bg-white px-4">
        <div className="app-shell max-w-3xl py-10">
          <ToolsDisclaimer />
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/life-insurance-explained"
        wealthEyebrow="Go deeper"
        wealthTitle="Life insurance, explained"
        wealthBody="Term vs permanent, how underwriting works, and the questions to ask before you buy. Plain English, no pressure."
        ctaHeading="Have your starting number? Let us talk it through"
        ctaBody="I am a licensed insurance agent (NC Life & Health) in Greensboro. A free 20-minute call turns your DIME number into a real plan for your family."
      />
    </main>
  );
}
