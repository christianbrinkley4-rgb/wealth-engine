import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
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
 * Does Medicare pay for a nursing home?
 *
 * Targets "does medicare pay for a nursing home". The most-asked family
 * question about long-term care. Clear line between what Medicare covers
 * (skilled, short-term rehab) and what it does not (custodial long-term care),
 * with the official 2026 cost-sharing figures and the CareScout 2025 medians
 * for what a long stay actually costs.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Does Medicare Pay for a Nursing Home?",
  },
  description:
    "Medicare pays for short-term rehab in a nursing home after a hospital stay. It does not pay for living in a nursing home long term. Here is what it covers, what it costs in 2026, and who pays when it stops.",
  alternates: { canonical: "/guides/medicare-nursing-home" },
  openGraph: pageOpenGraph({
    title: "Does Medicare pay for a nursing home?",
    description:
      "Medicare covers up to 100 days of skilled nursing care per benefit period after a hospital stay. It does not cover long-term custodial care. Here is where the line falls.",
    path: "/guides/medicare-nursing-home",
  }),
  twitter: pageTwitter({
    title: "Does Medicare pay for a nursing home?",
    description:
      "Medicare covers up to 100 days of skilled nursing care per benefit period after a hospital stay. It does not cover long-term custodial care. Here is where the line falls.",
    path: "/guides/medicare-nursing-home",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does Medicare pay for a nursing home stay?",
    a: "Medicare Part A pays for up to 100 days of skilled nursing care per benefit period after a qualifying three-day inpatient hospital stay. It does not pay for long-term custodial care.",
  },
  {
    q: "How many days will Medicare pay for in a nursing home?",
    a: "Up to 100 days per benefit period. Days 1 to 20 cost $0, days 21 to 100 cost $217 a day in coinsurance in 2026, and Medicare pays nothing after day 100.",
  },
  {
    q: "Does time under observation in the hospital count toward the three-day rule?",
    a: "No. Only days as a formally admitted inpatient count. Observation days do not, even if you stayed overnight in a hospital bed.",
  },
  {
    q: "What happens when Medicare stops paying for a nursing home?",
    a: "You pay the facility's full daily rate out of pocket, unless Medicaid covers the stay or a long-term care insurance policy pays. The national median is $9,581 a month for a semi-private room (CareScout 2025 survey).",
  },
  {
    q: "Does a Medicare Advantage plan cover nursing home care?",
    a: "Yes, Advantage plans must cover at least what Original Medicare covers for skilled nursing care. Many waive the three-day hospital stay rule, but many require prior authorization. Check your plan's rules before you need care.",
  },
  {
    q: "Does Medicare cover hospice in a nursing home?",
    a: "Medicare Part A covers hospice services for people who are terminally ill. Room and board in a facility is not part of the hospice benefit, so that part is usually paid out of pocket or by Medicaid.",
  },
];

export default function MedicareNursingHomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-nursing-home" },
              { name: "Nursing Home", path: "/guides/medicare-nursing-home" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Does Medicare Pay for a Nursing Home?",
              description:
                "The line between skilled nursing care Medicare covers and custodial care it does not, the official 2026 costs, and how families actually pay for a long stay.",
              path: "/guides/medicare-nursing-home",
              datePublished: "2026-11-05",
              dateModified: "2026-11-05",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Nursing Home" }]}
        eyebrow="Guide · Updated November 5, 2026"
        title="Does Medicare pay for a nursing home?"
        lede="Medicare pays for short-term rehab in a nursing home after a hospital stay. It does not pay for living in a nursing home long term. That one distinction catches almost every family off guard."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Medicare Part A covers up to 100 days in a skilled nursing facility per benefit
              period, and only while you need skilled care. Once you only need help with bathing,
              dressing, eating, or getting around, that is custodial care, and Medicare stops
              paying. That is usually discovered in a hospital hallway with a discharge planner
              waiting for an answer.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The three conditions you have to meet</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            First, you need a qualifying hospital stay: formally admitted as an inpatient for at
            least three days in a row, not counting the day you are discharged. Time under
            observation does not count, even if you slept in a hospital bed for three nights. Ask
            the hospital, in writing, whether you are inpatient or observation. That one word
            decides everything.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Second, you must enter the facility within 30 days of leaving the hospital, for the same
            condition that put you there.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Third, the facility must be Medicare certified, and a doctor must certify that you need
            daily skilled care. Skilled care means daily nursing or therapy from licensed
            professionals, like IV antibiotics, wound care, or physical therapy.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What it costs in 2026</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The numbers below are the official 2026 amounts from the Centers for Medicare and
            Medicaid Services (CMS).
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Days 1 to 20: you pay $0.</strong>{" "}
              Medicare covers the full cost of approved services. The Part A hospital deductible,
              $1,736 per benefit period in 2026, was usually already paid during the hospital stay,
              so you do not pay it again for the nursing facility part.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">
                Days 21 to 100: you pay $217 a day in coinsurance.
              </strong>{" "}
              Use all 80 of those days and that is $17,360 out of pocket.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">
                Day 101 and after: Medicare pays nothing for that benefit period.
              </strong>{" "}
              You pay the facility&rsquo;s full daily rate.
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A benefit period is not a calendar year. It starts the day you are admitted as an
            inpatient and ends after 60 days in a row without inpatient hospital or skilled nursing
            care. More than one 100-day period can apply in a single year if you qualify again each
            time.
          </p>

          <h2 className="text-28 mt-12 font-semibold">
            What Medicare Advantage and Medigap do here
          </h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage plans must cover at least everything Original Medicare covers,
            including skilled nursing care. But they can run the rules differently. Many Advantage
            plans waive the three-day hospital stay requirement, and many require prior
            authorization before the stay. Check the plan&rsquo;s rules before you need them, not
            after.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Several Medicare Supplement plans, also called Medigap, cover the days 21 to 100
            coinsurance in full. Plans C, D, F, G, M, and N pay 100 percent of the skilled nursing
            coinsurance, according to Medicare.gov&rsquo;s Medigap comparison chart. That turns a
            potential $17,360 bill into $0 for the coinsurance part. It does not extend the 100
            days, and it does not pay for custodial care.
          </p>

          <h2 className="text-28 mt-12 font-semibold">So who pays for a long stay?</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            When Medicare stops, the bill lands in one of three places. Medicaid pays for long-term
            nursing home care for people who meet its income and asset limits, and it covers most
            long stays in this country. That usually means spending down savings first, and the
            rules are state specific. Long-term care insurance pays if you bought a policy before
            you needed care. Otherwise, families pay out of pocket.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The national median is $9,581 a month for a semi-private room and $10,798 a month for a
            private room, according to the CareScout Cost of Care Survey 2025, released March 2026.
            That is about $115,000 to $130,000 a year, and the price near you can be higher or
            lower.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What to do before you need it</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            First, if a parent is admitted, ask on day one whether the status is inpatient or
            observation, and ask for it in writing.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Second, know which facilities near you are Medicare certified and whether your plan
            needs prior authorization for a skilled nursing stay.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Third, if a parent is turning 65 soon, the coverage choice they make now shapes this
            later. The Medigap open enrollment window, six months starting when Part B begins, is
            the one time you can buy any Supplement sold in your state without answering health
            questions. The{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              turning 65 page
            </Link>{" "}
            walks through that window.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Fourth, if a long stay ever looks likely, talk to your state&rsquo;s Medicaid office or
            a local elder law attorney early. Planning a year ahead beats crisis planning in a week.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The bottom line</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare is rehab coverage, not a nursing home plan. It pays up to 100 days of skilled
            care per benefit period after a three-day inpatient stay: the first 20 days free, days
            21 to 100 at $217 a day in 2026. After that, or when care turns custodial, the bill is
            yours, Medicaid&rsquo;s, or a long-term care policy&rsquo;s.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you or a parent is facing this decision, call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}, or{" "}
            <Link href="/aep" className="underline underline-offset-2">
              book a free review
            </Link>
            . I will walk through what your coverage actually pays for and what your options are
            before Dec 7.
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
            Caring for a parent and confused about what Medicare covers? Call or text Christian
            Brinkley in Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-nursing-home" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Get clear answers about nursing home coverage"
        body={`Tell me what kind of care your family is facing. I will sort out what Medicare covers and what your options are for the rest. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-11-05" />
    </main>
  );
}
