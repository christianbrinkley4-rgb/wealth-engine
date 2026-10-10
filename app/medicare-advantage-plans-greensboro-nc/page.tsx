import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Advantage plans available in Greensboro / Guilford County.
 *
 * 2027 figures below come from CMS data as published by medicareadvantage.com
 * and medicare.org (crawled October 2026): 55 plans in Guilford County, average
 * monthly premium $4.13, average in-network out-of-pocket maximum $6,697.27.
 * Specific plan examples are from published 2027 plan details. All figures are
 * presented as examples, not quotes; readers are told to verify on Medicare.gov.
 * Educational only; no carrier or plan recommendations.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage Plans in Greensboro NC (2027)",
  },
  description:
    "Medicare Advantage plans in Greensboro, NC for 2027: how many plans Guilford County has, what they cost, and how to compare them. From a licensed local agent.",
  alternates: { canonical: "/medicare-advantage-plans-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage Plans in Greensboro, NC",
    description:
      "55 plans in Guilford County for 2027. What they cost, how they work, and how to compare them without guessing.",
    path: "/medicare-advantage-plans-greensboro-nc",
  }),
};

const HOW_IT_WORKS = [
  {
    t: "One bundled plan replaces the pieces",
    b: "Medicare Advantage (Part C) bundles your hospital, medical, and usually drug coverage into one plan from a private insurer. Instead of Original Medicare plus a Medigap policy plus a separate drug plan, you get one card, one premium, one set of rules. Most plans in Guilford County also include extras Original Medicare does not cover, like dental, vision, and hearing.",
  },
  {
    t: "Your county decides your plan list",
    b: "This is the part people miss. Medicare Advantage plans are approved county by county, so the plans available in Greensboro are not the same as the ones in Raleigh or Charlotte. Guilford County has 55 Medicare Advantage plans for 2027, according to CMS data. Your zip code is the first thing that matters, before anything about premiums or doctors.",
  },
  {
    t: "Networks, not open access",
    b: "Most Advantage plans use networks. HMOs generally require you to use in-network doctors and hospitals except in emergencies, and some require referrals to specialists. PPOs let you go out of network for a higher cost. If your doctors are with Cone Health or an independent practice in the Triad, check each plan's provider directory before you enroll. Original Medicare with Medigap generally lets you see any doctor who accepts Medicare nationwide.",
  },
  {
    t: "Low premium, pay as you go",
    b: "The average monthly premium for Advantage plans in Guilford County is about $4.13 for 2027, and many plans charge $0 beyond your Part B premium. Nationally, the weighted average is projected around $12 a month. The tradeoff is cost sharing when you need care: copays for doctor visits, coinsurance for hospital stays, and an annual out-of-pocket maximum that caps your yearly spending.",
  },
] as const;

const FAQ = [
  {
    q: "How many Medicare Advantage plans are available in Greensboro?",
    a: "Guilford County has 55 Medicare Advantage plans for 2027, according to CMS data. That includes HMOs, PPOs, and special needs plans from carriers like Humana, UnitedHealthcare, Aetna, Anthem Blue Cross Blue Shield, Devoted, Alignment Health, and HealthSpring. The exact list for your zip code is on Medicare.gov.",
  },
  {
    q: "What is the average premium for Medicare Advantage in Greensboro?",
    a: "About $4.13 a month on average for 2027 in Guilford County, per CMS data. Many plans charge $0 beyond your Part B premium. But the premium is only one part of the cost: compare copays, deductibles, the drug formulary, and the out-of-pocket maximum before you decide.",
  },
  {
    q: "Do Medicare Advantage plans cover my Greensboro doctors?",
    a: "It depends on the specific plan, not the type. Advantage plans use provider networks built county by county. Bring a list of your doctors, your preferred hospital, and your pharmacy, and check them against each plan's directory for the year your coverage starts. I can help you check them at no cost.",
  },
  {
    q: "What is the out-of-pocket maximum on Advantage plans here?",
    a: "The average in-network out-of-pocket maximum in Guilford County is about $6,697 for 2027. Individual plans range from around $3,200 to over $9,000. That number is your worst-case year: once your covered spending hits it, the plan pays 100% for covered services the rest of the year.",
  },
  {
    q: "Can I switch Medicare Advantage plans during the year?",
    a: "Generally no. You can change plans during the Annual Enrollment Period, October 15 through December 7 each year, for coverage starting January 1. There are special enrollment periods for certain life events like moving. Outside those windows, you are generally locked in for the year.",
  },
  {
    q: "Should I pick Medicare Advantage or Medigap?",
    a: "Neither is better in general. Advantage tends to suit people who want a low monthly cost and are comfortable with networks. Medigap tends to suit people who want predictable costs and open access to doctors. Here is the full Greensboro comparison of the two paths.",
  },
] as const;

export default function MedicareAdvantagePlansGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "Medicare Advantage plans in Greensboro",
                path: "/medicare-advantage-plans-greensboro-nc",
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
              headline: "Medicare Advantage Plans in Greensboro NC (2027)",
              description:
                "How many Advantage plans Guilford County has for 2027, what they cost, and how to compare them. Educational, no plan recommendations.",
              path: "/medicare-advantage-plans-greensboro-nc",
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare Advantage plans in Greensboro" },
        ]}
        eyebrow="Greensboro, NC · Guilford County"
        title="Medicare Advantage plans in Greensboro"
        lede="55 plans in Guilford County for 2027. Here is how Advantage works, what it tends to cost here, and how to compare plans without guessing."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Compare plans with me →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How Advantage works, in plain terms</h2>
          <p className="text-18 mt-4 leading-relaxed">
            If you are turning 65 in Greensboro, you will hear about Medicare Advantage a lot.
            It is the private-plan alternative to Original Medicare, and more than half of all
            Medicare beneficiaries nationally are in one. Here is what that actually means for
            you.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {HOW_IT_WORKS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What plans look like here in 2027</h2>
          <p className="text-18 mt-4 leading-relaxed">
            These are examples from published 2027 plan details in Guilford County, to show the
            range. They are examples, not recommendations, and benefits change every year.
            Always confirm current details on Medicare.gov before you enroll.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Example 2027 Medicare Advantage plans in Guilford County, North Carolina
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="py-3 pr-4 text-16 font-semibold">
                    Plan example
                  </th>
                  <th scope="col" className="py-3 pr-4 text-16 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="py-3 pr-4 text-16 font-semibold">
                    Premium
                  </th>
                  <th scope="col" className="py-3 text-16 font-semibold">
                    Out-of-pocket max
                  </th>
                </tr>
              </thead>
              <tbody className="text-16">
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">AARP Medicare Advantage from UHC NC-0022</td>
                  <td className="py-3 pr-4">HMO-POS</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3">$5,900</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">AARP Medicare Advantage from UHC NC-0016</td>
                  <td className="py-3 pr-4">PPO</td>
                  <td className="py-3 pr-4">$53</td>
                  <td className="py-3">$4,450</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Alignment Health Platinum</td>
                  <td className="py-3 pr-4">HMO</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3">$3,900</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Devoted Core NC</td>
                  <td className="py-3 pr-4">HMO</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3">$3,600</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 pr-4">Blue Medicare Essential</td>
                  <td className="py-3 pr-4">HMO</td>
                  <td className="py-3 pr-4">$0</td>
                  <td className="py-3">$9,250</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Examples from published 2027 plan data via CMS. Figures change yearly. Of the 16 HMO
            plans in the county, 13 charge a $0 premium, and the average HMO out-of-pocket
            maximum is about $5,206.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Notice the pattern: lower premiums often pair with higher out-of-pocket maximums.
            A $0 premium plan with a $9,250 maximum is not cheaper than a $53 premium plan with
            a $4,450 maximum if you have a bad health year. Compare the whole picture, not just
            the monthly number.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The questions that actually decide it</h2>
          <p className="text-18 mt-4 leading-relaxed">
            With 55 plans, the comparison can feel impossible. It gets simpler when you answer
            these first.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              Which doctors and hospitals must stay?
            </strong>{" "}
            Make a list: your primary care doctor, specialists, preferred hospital, and pharmacy.
            Then check that list against each plan's directory. A plan that does not include
            your cardiologist is not a bargain at any price.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              What do your prescriptions cost under each plan?
            </strong>{" "}
            Drug coverage varies more than anything else between plans. Enter your exact
            medications on Medicare.gov's plan finder and sort by total yearly cost, not
            premium. Two plans with the same $0 premium can differ by thousands on drugs
            alone.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="font-semibold text-[var(--color-navy)]">
              What does your worst year look like?
            </strong>{" "}
            The out-of-pocket maximum is your real protection. Add up premium plus maximum for
            each plan you are considering. That is the most you would pay in a year for
            covered services, and it is the honest way to compare.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you want a side-by-side estimate built for Guilford County, try the{" "}
            <Link
              href="/greensboro-medicare-cost-calculator"
              className="underline underline-offset-2"
            >
              Greensboro Medicare cost calculator
            </Link>
            . And if you are torn between Advantage and the Medigap path, read{" "}
            <Link
              href="/medicare-advantage-vs-medigap-greensboro-nc"
              className="underline underline-offset-2"
            >
              the full Greensboro comparison
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about Advantage plans</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.q === "Should I pick Medicare Advantage or Medigap?" ? (
                    <>
                      Neither is better in general. Advantage tends to suit people who want a
                      low monthly cost and are comfortable with networks. Medigap tends to suit
                      people who want predictable costs and open access to doctors. Here is the{" "}
                      <Link
                        href="/medicare-advantage-vs-medigap-greensboro-nc"
                        className="underline underline-offset-2"
                      >
                        full Greensboro comparison of the two paths
                      </Link>
                      .
                    </>
                  ) : (
                    item.a
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ.map(({ q, a }) => ({ q, a: q === "Should I pick Medicare Advantage or Medigap?" ? "Neither is better in general. Advantage tends to suit people who want a low monthly cost and are comfortable with networks. Medigap tends to suit people who want predictable costs and open access to doctors. See the full Greensboro comparison of the two paths." : a })))) }}
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2>Related Greensboro Medicare guides</h2>
          <ul>
            <li><Link href="/greensboro-medicare-cost-calculator" className="underline underline-offset-2">Greensboro Medicare cost calculator</Link> - estimate your yearly costs</li>
            <li><Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">Part D drug coverage in Greensboro</Link></li>
            <li><Link href="/medigap-plans-greensboro-nc" className="underline underline-offset-2">Medigap plan letters explained</Link></li>
            <li><Link href="/medicare-costs-north-carolina" className="underline underline-offset-2">What Medicare costs in North Carolina</Link></li>
            <li><Link href="/turning-65" className="underline underline-offset-2">Turning 65 in Greensboro</Link> - the full local guide</li>
          </ul>
        </div>
      </section>

      <KitchenTableClose
        heading="Let's compare plans with your doctors and drugs"
        body={`Bring your doctor list and prescriptions. I will check them against the 2027 plans for your zip code and show you real numbers, not brochures. Free, no obligation. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a free plan review →"
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
