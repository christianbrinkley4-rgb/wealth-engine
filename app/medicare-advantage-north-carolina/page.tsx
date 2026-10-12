import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ReadNext, ChecklistPointer } from "@/app/components/ReadNext";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
} from "@/lib/seo";

/**
 * The NC statewide Medicare Advantage guide. Targets the informational query
 * "best medicare advantage plans north carolina" where the site currently has
 * zero presence and AI Overviews are likely.
 *
 * The outflank strategy: national publishers (NerdWallet etc.) rank carriers
 * nationally with data rigor but zero county-level detail. This page combines
 * that data structure with the local layer they cannot write: which carriers
 * are strongest in which NC counties, and which health systems each carrier
 * contracts with in the Triad. "Best for whom" framework instead of rankings.
 *
 * Compliance: educational comparison only. No plan recommendations, no
 * savings claims, no "best plan" language. Standard disclaimer included.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage in North Carolina: What to Compare (2027)",
  },
  description:
    "Comparing Medicare Advantage plans in North Carolina for 2027? See how carriers score, what to look for by county, and which questions actually decide it. From a licensed NC agent.",
  alternates: { canonical: "/medicare-advantage-north-carolina" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage in North Carolina: what to compare for 2027",
    description:
      "Carrier scores, county-level differences, and the local detail national rankings miss. From a licensed agent in the Piedmont Triad.",
    path: "/medicare-advantage-north-carolina",
  }),
};

const CARRIER_SCORES = [
  {
    carrier: "UnitedHealthcare",
    jdPower: "663",
    note: "Largest Medicare Advantage footprint in NC. Broad network statewide.",
  },
  {
    carrier: "Blue Cross Blue Shield of NC",
    jdPower: "641",
    note: "Strong in-network presence with NC health systems. The familiar local name.",
  },
  {
    carrier: "Humana",
    jdPower: "637",
    note: "Competitive premiums and extra benefits in many NC counties.",
  },
  {
    carrier: "Aetna",
    jdPower: "585",
    note: "Smaller NC footprint. Check your specific county before assuming availability.",
  },
] as const;

const BEST_FOR_WHOM = [
  {
    t: "Lowest monthly premiums",
    b: "Many NC counties have $0-premium Advantage plans beyond your Part B premium. But a $0 premium does not mean $0 cost: compare the copays, deductible, and the out-of-pocket maximum, which is your worst-case year. A plan with a $29 premium and a $3,400 out-of-pocket maximum can cost less overall than a $0 plan with an $8,000 maximum if you need real care.",
  },
  {
    t: "Broadest doctor networks in the Triad",
    b: "This is where county matters. Plans are approved county by county, so the same carrier can have a deep network in Guilford County and a thin one two counties over. If your doctors are with Cone Health, Novant, or Atrium Health Wake Forest Baptist, check each plan's provider directory for your specific zip code. Do not assume a carrier that works well in Charlotte works the same in Greensboro.",
  },
  {
    t: "Drug coverage",
    b: "The formulary, the plan's list of covered drugs, changes every year and differs by plan. If you take expensive prescriptions, the formulary matters more than the premium. Check every drug, every dose, at your preferred pharmacy. The Medicare Plan Finder at medicare.gov lets you enter your exact list.",
  },
  {
    t: "Extra benefits",
    b: "Many Advantage plans include dental, vision, hearing, fitness memberships, and over-the-counter allowances that Original Medicare does not cover. These are real, but they are the least important factor. A plan with great dental and a bad hospital copay is a bad deal if you end up in the hospital.",
  },
] as const;

const FAQ = [
  {
    q: "Can I switch Medicare Advantage plans mid-year in North Carolina?",
    a: "Generally no. The Annual Enrollment Period, October 15 through December 7, is when most people can join, switch, or drop plans for January 1 coverage. If you are already on an Advantage plan, the Medicare Advantage Open Enrollment Period from January 1 to March 31 allows one change. Certain life events like moving to a new county or losing other coverage open a special enrollment period.",
  },
  {
    q: "What if my doctor leaves my plan's network during the year?",
    a: "New CMS rules give you more flexibility to switch plans when your doctor leaves the network mid-year. If this happens, you have options outside the fall window. Check with Medicare.gov or a licensed agent about which special enrollment period applies to your situation.",
  },
  {
    q: "Do I need a referral to see a specialist on a Medicare Advantage plan?",
    a: "It depends on the plan type. HMOs often require referrals from your primary care doctor to see specialists. PPOs usually do not require referrals but charge more when you go out of network. Check the plan's Evidence of Coverage for the specific rules.",
  },
  {
    q: "What is the out-of-pocket maximum on Medicare Advantage plans?",
    a: "Every Medicare Advantage plan has an annual out-of-pocket maximum that caps what you pay for covered services in a year. In Guilford County, the average in-network maximum is about $6,697 for 2027, with individual plans ranging from around $3,200 to over $9,000. Once you hit it, the plan pays 100% for covered services the rest of the year.",
  },
  {
    q: "Are Medicare Advantage plans the same in every NC county?",
    a: "No. Plans are approved and priced county by county, so the lineup in Guilford County differs from Forsyth, Wake, or Mecklenburg. Always check availability at your home zip code, not just your city name.",
  },
  {
    q: "What do star ratings actually measure?",
    a: "CMS Star Ratings score plans from 1 to 5 stars on quality measures like customer service, managing chronic conditions, and member satisfaction. They are useful, but they do not measure whether your specific doctors are in-network or your drugs are covered. A 5-star plan that excludes your cardiologist is the wrong plan for you.",
  },
  {
    q: "Should I pick Medicare Advantage or Original Medicare with Medigap?",
    a: "Neither is better in general. Advantage tends to suit people who want lower monthly costs and are comfortable with networks. Original Medicare with Medigap tends to suit people who want predictable costs and open access to any doctor who accepts Medicare. The right answer depends on your doctors, your prescriptions, your budget, and how much you travel.",
  },
] as const;

export default function MedicareAdvantageNCPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare Advantage in North Carolina", path: "/medicare-advantage-north-carolina" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".sh-title", ".sh-lede"],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Medicare Advantage in North Carolina: what to compare for 2027",
              description:
                "How Medicare Advantage carriers compare in NC, what differs by county, and the local detail national rankings miss.",
              path: "/medicare-advantage-north-carolina",
              datePublished: "2026-10-12",
              dateModified: "2026-10-12",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare Advantage in North Carolina" }]}
        eyebrow="2027 plan year · North Carolina"
        title="Medicare Advantage in North Carolina: what to actually compare"
        lede="The best Medicare Advantage plan in North Carolina depends on your doctors, your prescriptions, and your county, not a national ranking. Here is how the major carriers compare, what changes by county, and the local detail the big comparison sites leave out. Educational only: this is not a recommendation of any plan."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare&quick=1"
        secondaryLabel="Compare plans for my address →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-15 font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
            By {AGENT.name}, {AGENT.licenseLine} · Updated October 2026
          </p>
          <h2 className="text-28 font-semibold mt-6">How the major carriers score in NC</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The J.D. Power 2025 U.S. Medicare Advantage Study scores carriers on a 1,000-point scale
            for member satisfaction. Here is how the major carriers in North Carolina compare.{" "}
            <a
              href="https://www.jdpower.com/business/healthcare/us-medicare-advantage-study"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              J.D. Power Medicare Advantage Study
            </a>
            .
          </p>
          <table className="mt-6 w-full text-left text-17">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 pr-4 font-semibold">Carrier</th>
                <th className="py-3 pr-4 font-semibold">J.D. Power score</th>
                <th className="py-3 font-semibold">NC note</th>
              </tr>
            </thead>
            <tbody>
              {CARRIER_SCORES.map((row) => (
                <tr key={row.carrier} className="border-b border-gray-200">
                  <td className="py-3 pr-4 font-medium">{row.carrier}</td>
                  <td className="py-3 pr-4">{row.jdPower} / 1,000</td>
                  <td className="py-3 text-[var(--color-ink-muted)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            These scores measure member satisfaction, not whether a plan fits you. A carrier can
            score well nationally and still have a thin network in your county. Use scores as a
            starting point, then check the details that matter to your situation.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Best for whom: the framework that actually helps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            No ranking can tell you which plan is best for you, because the answer depends on
            things a ranking cannot know. Here is how to think about it by what matters most to
            you.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            {BEST_FOR_WHOM.map((item) => (
              <div key={item.t} className="border-t border-gray-300 pt-6">
                <h3 className="text-20 font-semibold">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The local layer: what national rankings miss</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage plans are approved county by county, which means the details that
            decide your experience are local.
          </p>
          <h3 className="text-22 font-semibold mt-10">County differences in the Triad</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Greensboro and most of High Point are in Guilford County. Winston-Salem is in Forsyth
            County. The plan lineups differ: Guilford County has 55 Medicare Advantage plans for
            2027, per CMS data, with an average monthly premium around $4.13. Forsyth County has
            its own list. Always check the plans available at your specific address.{" "}
            <Link href="/medicare-advantage-plans-greensboro-nc" className="font-medium underline underline-offset-2">
              See the Guilford County detail
            </Link>
            .
          </p>
          <h3 className="text-22 font-semibold mt-10">Health system contracting</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            In the Triad, your plan needs to work with the doctors you actually see. The major
            systems are Cone Health (headquartered in Greensboro), Novant Health, and Atrium
            Health Wake Forest Baptist. Carrier contracts with these systems change, and a plan
            that included your Cone Health cardiologist last year might not this year. Verify
            your specific doctors in each plan's provider directory for the year your coverage
            starts.
          </p>
          <h3 className="text-22 font-semibold mt-10">What the ratings do not tell you</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Star ratings measure quality across the whole plan. They do not measure whether your
            specific doctors are in-network, whether your drugs are on the formulary, or what
            your actual costs will be with your health conditions. Those three checks, doctors,
            drugs, and costs for your situation, are what decide whether a plan works for you.
            No rating replaces them.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Key dates and numbers</h2>
          <table className="mt-6 w-full text-left text-17">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 pr-4 font-semibold">Milestone</th>
                <th className="py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Annual Enrollment Period</td>
                <td className="py-3">October 15 to December 7, 2026</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">New coverage starts</td>
                <td className="py-3">January 1, 2027</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Medicare Advantage Open Enrollment</td>
                <td className="py-3">January 1 to March 31, 2027</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">2026 Part B premium (standard)</td>
                <td className="py-3">$202.90 / month (CMS)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Sources:{" "}
            <a
              href="https://www.cms.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              CMS.gov
            </a>
            ,{" "}
            <a
              href="https://www.medicare.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Medicare.gov
            </a>
            ,{" "}
            <a
              href="https://www.jdpower.com/business/healthcare/us-medicare-advantage-study"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              J.D. Power
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
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
          <LeadCluster
            current="/medicare-advantage-north-carolina"
            heading="Turning 65, Medigap, or a drug coverage question instead?"
          />
        </div>
      </section>

      <ReadNext>
        <p>
          Compare <Link href="/medicare-advantage-plans-greensboro-nc">Advantage plans in Guilford County</Link> or read <Link href="/medicare-advantage-vs-medigap-greensboro-nc">Advantage vs. Medigap</Link>. During the fall window, see the <Link href="/annual-enrollment">annual enrollment guide</Link>.
        </p>
        <ChecklistPointer />
      </ReadNext>

      <KitchenTableClose
        heading="Want help comparing plans for your address?"
        body="Bring your doctor list and prescriptions. We will check what is actually available at your address and compare the details that matter for you. Free, no pressure."
        href="/start?topic=medicare&stage=already_on_medicare&quick=1"
        label="Compare plans →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-sm text-gray-600">
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated October 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>, <a href="https://www.jdpower.com/business/healthcare/us-medicare-advantage-study" className="underline underline-offset-2" target="_blank" rel="noopener">J.D. Power</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
