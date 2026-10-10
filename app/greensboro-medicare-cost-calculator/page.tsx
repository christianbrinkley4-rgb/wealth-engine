import "../tools/tools.css";

import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ToolHeader } from "@/app/tools/_components/tool-header";
import { ToolsDisclaimer } from "@/app/tools/_components/tool-footer";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { GreensboroCostCalculator } from "./CalculatorClient";
import { FAQS, HOW_TO_STEPS, MA_PLANS_2025, MEDIGAP_G_TABLE, META, PATH } from "./data";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Greensboro Medicare Cost Calculator",
    description: META.description,
    path: PATH,
  }),
};

function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Greensboro Medicare Cost Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: META.description,
    url: `https://christianbrinkleync.com${PATH}`,
  };
}

function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to estimate your yearly Medicare costs in Greensboro, NC",
    description:
      "Use this free calculator to compare estimated yearly costs for Medigap Plan G and Medicare Advantage in Guilford County.",
    step: HOW_TO_STEPS.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export default function GreensboroMedicareCostCalculatorPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare cost calculator", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd()) }}
      />

      <ToolHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare cost calculator" }]}
        title="Greensboro Medicare Cost Calculator"
        lede="Two paths, one year of costs, real 2025 plan figures from Guilford County. Move the sliders and see the math. This estimates. It does not recommend."
      />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolsDisclaimer />
          <div className="t-panel" style={{ marginTop: "1rem" }}>
            <GreensboroCostCalculator />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>2025 Medicare Advantage plans in the Greensboro area</h2>
          <p>
            These are real published 2025 figures for plans sold in North Carolina, from plan
            Summaries of Benefits and the NC Department of Insurance plan landscape. Availability
            varies by county and plan year. Verify anything current on{" "}
            <a href="https://www.medicare.gov">Medicare.gov</a> before deciding.
          </p>
        </div>
        <div className="app-shell max-w-5xl">
          <div className="t-table-wrap">
            <table className="t-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Monthly premium</th>
                  <th>Max out-of-pocket</th>
                  <th>PCP / Specialist</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {MA_PLANS_2025.map((p) => (
                  <tr key={p.plan}>
                    <td>
                      <strong>{p.plan}</strong>
                      <br />
                      <span className="t-hint">{p.carrier}</span>
                    </td>
                    <td>{p.premium}</td>
                    <td>{p.moop}</td>
                    <td>
                      {p.pcp} / {p.specialist}
                    </td>
                    <td className="t-hint">{p.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Medigap Plan G premiums in North Carolina</h2>
          <p>
            Filed non-tobacco monthly rates from Blue Cross and Blue Shield of North Carolina
            (June 2026 to May 2027 rate outline). Your quote depends on the insurer, your exact
            age, and tobacco use. Every Medigap Plan G covers the same benefits by law, only the
            price changes.
          </p>
        </div>
        <div className="app-shell max-w-3xl">
          <div className="t-table-wrap">
            <table className="t-table">
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Female, non-tobacco</th>
                  <th>Male, non-tobacco</th>
                </tr>
              </thead>
              <tbody>
                {MEDIGAP_G_TABLE.map((r) => (
                  <tr key={r.age}>
                    <td>{r.age}</td>
                    <td>{r.female}/mo</td>
                    <td>{r.male}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="t-hint" style={{ marginTop: "0.75rem" }}>
            Source: BCBS NC Blue Medicare Supplement rate outline, nchealthplans.com. Showing
            selected ages; the calculator uses the full 65 to 74 table.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Questions people ask about this calculator</h2>
          {FAQS.map((f) => (
            <div key={f.q} style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.35rem" }}>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <p>
            Want the full picture? Read{" "}
            <Link href="/turning-65">Turning 65 in Greensboro</Link>,{" "}
            <Link href="/medicare-advantage-plans-greensboro-nc">Advantage plans in Greensboro</Link>,{" "}
            <Link href="/medigap-plans-greensboro-nc">Medigap plan letters</Link>,{" "}
            <Link href="/medicare-part-d-greensboro-nc">Part D drug coverage</Link>, or{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc">Advantage vs Medigap</Link>.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="Want help running your real numbers?"
        body="Bring your doctors, your prescriptions, and your pharmacy. We will compare actual plans available in Guilford County, not estimates."
        href="/start"
        label="Start with Christian"
      />
      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <p className="text-sm text-gray-600">
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated October 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>
        </p>
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
    </main>
  );
}
