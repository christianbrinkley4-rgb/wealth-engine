import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * 2026 standard deduction for seniors: what you actually get.
 *
 * Targets "standard deduction for seniors over 65". Figures from
 * docs/VERIFIED-FIGURES-2026.md (IRS IR-2025-103): base $16,100 / $32,200 /
 * $24,150, plus $2,050 single or HoH 65+/blind, $1,650 per spouse. The
 * $6,000 senior bonus deduction is from IRS Tax Tip 2026-14.
 */

export const metadata: Metadata = {
  title: {
    absolute: "2026 Standard Deduction for Seniors: What You Actually Get",
  },
  description:
    "2026 standard deduction plus the extra amount for 65 and older: $18,150 single, $35,500 joint with both spouses 65+. Plus the new $6,000 senior deduction.",
  alternates: { canonical: "/guides/standard-deduction-seniors-2026" },
  openGraph: pageOpenGraph({
    title: "2026 standard deduction for seniors",
    description:
      "Base amounts, the extra $2,050 and $1,650 for age 65+, worked examples, and the new $6,000 senior bonus deduction.",
    path: "/guides/standard-deduction-seniors-2026",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How much is the standard deduction for seniors over 65 in 2026?",
    a: "A single filer 65 or older gets $16,100 plus $2,050, for $18,150. A married couple filing jointly with both spouses 65 or older gets $32,200 plus $1,650 each, for $35,500.",
  },
  {
    q: "Do I get the extra senior amount if I itemize?",
    a: "No. The extra amount for age 65 or blindness only applies when you take the standard deduction. If you itemize, you claim your itemized expenses instead.",
  },
  {
    q: "What is the $6,000 senior deduction?",
    a: "For tax years 2025 through 2028, people 65 or older can claim an extra $6,000 deduction per person, whether they itemize or take the standard deduction. It phases out above $75,000 of MAGI single or $150,000 joint.",
  },
  {
    q: "Does turning 65 mid-year count for the extra deduction?",
    a: "Yes. You qualify if you are 65 on or before the last day of the tax year. A December birthday counts for that year's return.",
  },
  {
    q: "Can both spouses claim the $6,000 senior deduction?",
    a: "Yes. Married couples filing jointly can claim $6,000 for each spouse who is 65 or older, up to $12,000. Married filing separately does not qualify.",
  },
  {
    q: "Should a retiree itemize or take the standard deduction?",
    a: "Take whichever is larger. Add up mortgage interest, state and local taxes, and charitable gifts. If the total beats your standard deduction amount, itemizing wins. For many retirees without a mortgage, the standard deduction is larger.",
  },
];

export default function StandardDeductionSeniors2026Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/standard-deduction-seniors-2026" },
              { name: "Standard deduction for seniors", path: "/guides/standard-deduction-seniors-2026" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "2026 Standard Deduction for Seniors: What You Actually Get",
              description:
                "The 2026 standard deduction amounts for seniors: base figures, the extra age-65 amounts, worked examples, and the $6,000 senior bonus deduction.",
              path: "/guides/standard-deduction-seniors-2026",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "Standard deduction for seniors" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="2026 standard deduction for seniors"
        lede="Turning 65 comes with a bigger standard deduction. Here are the exact 2026 amounts, the extra senior bonus, and two worked examples."
        secondaryHref="/start?topic=retirement"
        secondaryLabel="Talk through your tax picture"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              The standard deduction is the slice of your income the IRS does not tax. Everyone gets
              a base amount by filing status. At 65, you add an extra amount on top. For 2025
              through 2028, there is also a separate $6,000 senior bonus deduction.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The 2026 amounts</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                2026 standard deduction amounts including the age 65 addition
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Filing status
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Base amount
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Extra at 65 or older
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Total at 65
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Single
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$16,100</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">+$2,050</td>
                  <td className="text-16 whitespace-nowrap py-4 font-semibold">$18,150</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Head of household
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$24,150</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">+$2,050</td>
                  <td className="text-16 whitespace-nowrap py-4 font-semibold">$26,200</td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Married filing jointly
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">$32,200</td>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">+$1,650 per spouse</td>
                  <td className="text-16 whitespace-nowrap py-4 font-semibold">
                    $35,500 if both are 65+
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Blindness adds the same extra amount, and it stacks. A single filer who is both 65 or
            older and blind adds $2,050 twice, for a $20,200 standard deduction.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Two worked examples</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Example 1:</strong> Linda, 68, single,
            with $30,000 of income. Her standard deduction is $18,150. Her taxable income is
            $11,850 before any other adjustments.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Example 2:</strong> James and Carol, 70
            and 67, filing jointly, with $60,000 of income. Their standard deduction is $35,500.
            Their taxable income is $24,500 before any other adjustments.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The $6,000 senior bonus deduction</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Separate from the standard deduction, taxpayers 65 or older can claim an extra $6,000
            per person for tax years 2025 through 2028. It works whether you itemize or take the
            standard deduction. It phases out when modified adjusted gross income passes $75,000
            single or $150,000 joint. Married couples must file jointly, and each qualifying spouse
            gets the $6,000.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Standard deduction or itemize?</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Compare your itemizable expenses against your standard deduction total. Common itemized
            expenses for retirees: mortgage interest, state and local taxes, and charitable gifts.
            Without a mortgage, the standard deduction usually wins.{" "}
            <Link href="/taxes-and-retirement" className="underline underline-offset-2">
              Here is the full picture of taxes in retirement
            </Link>
            , and{" "}
            <Link href="/guides/is-social-security-taxed" className="underline underline-offset-2">
              here is when Social Security gets taxed
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            This page is educational only, not tax advice. Christian Brinkley is a licensed
            insurance agent and accounting student in Greensboro, NC, not a CPA. Call or text{" "}
            {AGENT.phone} to talk through your retirement income picture.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="standard-deduction-seniors-2026" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Get your retirement tax picture straight"
        body={`We will look at your income sources and deductions together and map what 2026 looks like for you. Educational only, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=retirement"
        label="Talk through your tax picture"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
    </main>
  );
}
