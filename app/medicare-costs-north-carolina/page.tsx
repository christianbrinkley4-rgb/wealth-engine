import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * What Medicare costs in North Carolina, with 2027 figures.
 *
 * 2027 Part D figures ($700 deductible, $2,400 cap) are finalized CMS amounts.
 * Parts A and B 2027 figures are Medicare Trustees projections, labeled as
 * such. 2026 figures are finalized CMS amounts. This page is the NC-focused
 * overview; the full 2026 table lives at /medicare-costs-2026.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Costs in North Carolina (2027)",
  },
  description:
    "What Medicare costs in North Carolina: Part B premiums, deductibles, Part D caps, and what changes in 2027. From a licensed local agent.",
  alternates: { canonical: "/medicare-costs-north-carolina" },
  openGraph: pageOpenGraph({
    title: "Medicare Costs in North Carolina",
    description:
      "Every major Medicare cost for NC residents, what changes in 2027, and what actually drives your yearly total.",
    path: "/medicare-costs-north-carolina",
  }),
};

const FAQ = [
  {
    q: "How much is the Medicare Part B premium in North Carolina?",
    a: "The standard Part B premium is $202.90 a month in 2026. For 2027, the Medicare Trustees project $209.50, but CMS has not finalized it yet. Higher-income households pay more through IRMAA. The premium is the same in North Carolina as everywhere else; it is set federally.",
  },
  {
    q: "What does Medicare cost per year in North Carolina?",
    a: "It depends on your path. Original Medicare with Medigap Plan G and Part D can run roughly $4,000 to $5,000 a year in premiums alone for a 65-year-old in the Triad, before any care. A $0-premium Medicare Advantage plan costs far less in premiums but more when you need care. Your prescriptions and health are what move the total.",
  },
  {
    q: "What is changing about Medicare costs in 2027?",
    a: "Two Part D amounts are finalized: the maximum deductible rises to $700 and the annual out-of-pocket cap rises to $2,400. The Part B premium and deductible are projected to rise but not yet final. Medicare Advantage premiums are projected to fall nationally, averaging about $12 a month.",
  },
  {
    q: "Does North Carolina have extra Medicare costs?",
    a: "The federal parts cost the same everywhere. What varies by state and county: Medigap premiums, Medicare Advantage plan availability and premiums, and Part D plan premiums. North Carolina does not tax Social Security benefits, which helps the overall retirement budget.",
  },
  {
    q: "What is the Part D out-of-pocket cap in 2027?",
    a: "$2,400 for covered drugs. Once your counted spending reaches that, you pay $0 for covered Part D drugs for the rest of the year. The old donut hole is gone. Premiums and non-covered drugs do not count toward the cap.",
  },
  {
    q: "How can I lower my Medicare costs in North Carolina?",
    a: "Compare plans every fall during the Annual Enrollment Period, October 15 through December 7. Check the Medicare Savings Programs and Extra Help if your income is limited. Use preferred pharmacies. And compare total yearly cost, not just monthly premium.",
  },
] as const;

export default function MedicareCostsNorthCarolinaPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Medicare costs in North Carolina",
                path: "/medicare-costs-north-carolina",
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Costs in North Carolina (2027)",
              description:
                "What Medicare costs NC residents: premiums, deductibles, the Part D cap, and what changes in 2027. Educational, no plan recommendations.",
              path: "/medicare-costs-north-carolina",
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare costs in North Carolina" }]}
        eyebrow="North Carolina · 2027 plan year"
        title="Medicare costs in North Carolina"
        lede="What you actually pay: the federal parts everyone shares, the NC parts that vary, and what changes in 2027."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Estimate my costs →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The parts everyone pays</h2>
          <p className="text-18 mt-4 leading-relaxed">
            These are set by the federal government. They cost the same whether you live in
            Greensboro, Raleigh, or anywhere else in the country.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">
                Medicare Parts A and B costs, 2026 finalized and 2027 projected
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="py-3 pr-4 text-16 font-semibold">
                    Cost
                  </th>
                  <th scope="col" className="py-3 pr-4 text-16 font-semibold">
                    2026
                  </th>
                  <th scope="col" className="py-3 text-16 font-semibold">
                    2027
                  </th>
                </tr>
              </thead>
              <tbody className="text-16">
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Part B monthly premium (standard)</td>
                  <td className="py-3 pr-4">$202.90</td>
                  <td className="py-3">$209.50 (projected)</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Part B yearly deductible</td>
                  <td className="py-3 pr-4">$283</td>
                  <td className="py-3">$292 (projected)</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Part A hospital deductible</td>
                  <td className="py-3 pr-4">$1,736</td>
                  <td className="py-3">$1,788 (projected)</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Part D max deductible</td>
                  <td className="py-3 pr-4">$615</td>
                  <td className="py-3">$700 (final)</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Part D out-of-pocket cap</td>
                  <td className="py-3 pr-4">$2,100</td>
                  <td className="py-3">$2,400 (final)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            2026 figures are finalized CMS amounts. 2027 Part D figures are finalized CMS
            amounts. 2027 Parts A and B figures are Medicare Trustees projections, not yet
            finalized by CMS. About 99% of people pay no Part A premium with 40 quarters of
            Medicare-covered work.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The parts that vary in North Carolina</h2>
          <p className="text-18 mt-4 leading-relaxed">
            The federal numbers above are only the starting point. What you actually pay each
            year depends on the path you choose, and the NC-specific pieces vary.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Medigap premiums.
            </strong>{" "}
            Standardized benefits, but insurers set their own prices. A Plan G for a
            65-year-old in the Greensboro area runs roughly $130 a month, varying by insurer,
            age, and tobacco use. See{" "}
            <Link href="/medigap-plans-greensboro-nc" className="underline underline-offset-2">
              Medigap plans in Greensboro
            </Link>{" "}
            for the full picture.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Medicare Advantage premiums and cost sharing.
            </strong>{" "}
            Guilford County has 55 Advantage plans for 2027, averaging about $4.13 a month in
            premium. Copays, deductibles, and out-of-pocket maximums vary plan by plan. See{" "}
            <Link
              href="/medicare-advantage-plans-greensboro-nc"
              className="underline underline-offset-2"
            >
              Advantage plans in Greensboro
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Part D plan premiums.
            </strong>{" "}
            The national base premium is projected around $36 a month for 2027, but actual
            plan premiums vary. Your drugs matter more than the premium. See{" "}
            <Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">
              Part D in Greensboro
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One piece of good news for NC retirees: North Carolina does not tax Social
            Security benefits. That does not change your Medicare bill, but it helps the
            overall budget these costs come out of.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What actually drives your yearly total</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Two people in Greensboro, both 65, can pay wildly different amounts for Medicare
            in the same year. Here is what moves the number.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Your prescriptions.
            </strong>{" "}
            This is the biggest variable for most people. A person on two generics might
            spend $200 a year on drugs. A person on one specialty drug can hit the $2,400 cap.
            Enter your exact medications on Medicare.gov's plan finder before every Annual
            Enrollment Period.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">Your income.</strong>{" "}
            Higher-income households pay IRMAA surcharges on Part B and Part D, on top of the
            standard amounts. The surcharges are based on your tax return from two years ago.
            If your income dropped since then, you can appeal.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">Your health year.</strong>{" "}
            On a Medigap plan, a bad health year costs little beyond premiums. On an
            Advantage plan, a bad year can reach the out-of-pocket maximum. Compare both a
            routine year and a bad year before you choose a path.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Penalties you can avoid.
            </strong>{" "}
            Late enrollment penalties for Part B and Part D are permanent. Enroll on time, or
            confirm in writing that your current coverage counts as creditable.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Want a personalized estimate? The{" "}
            <Link
              href="/greensboro-medicare-cost-calculator"
              className="underline underline-offset-2"
            >
              Greensboro Medicare cost calculator
            </Link>{" "}
            builds a yearly estimate from your age, zip code, medications, and doctor visits.
            For the full 2026 cost table with IRMAA brackets, see{" "}
            <Link href="/medicare-costs-2026" className="underline underline-offset-2">
              2026 Medicare costs in NC
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about Medicare costs</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Related Greensboro Medicare guides</h2>
          <ul>
            <li><Link href="/greensboro-medicare-cost-calculator" className="underline underline-offset-2">Greensboro Medicare cost calculator</Link> - estimate your yearly costs</li>
            <li><Link href="/medicare-advantage-plans-greensboro-nc" className="underline underline-offset-2">Advantage plans in Greensboro</Link></li>
            <li><Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">Part D drug coverage in Greensboro</Link></li>
            <li><Link href="/medigap-plans-greensboro-nc" className="underline underline-offset-2">Medigap plan letters explained</Link></li>
            <li><Link href="/turning-65" className="underline underline-offset-2">Turning 65 in Greensboro</Link> - the full local guide</li>
          </ul>
        </div>
      </section>

      <KitchenTableClose
        heading="Let's estimate your actual Medicare costs"
        body={`Tell me your situation and I will build a real yearly estimate: premiums, drugs, and what a good year and a bad year look like. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free cost estimate →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-sm text-gray-600">
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated October 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
