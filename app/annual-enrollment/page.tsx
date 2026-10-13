import { speakableJsonLd } from "@/lib/seo";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { PRIORITY_MEDICARE_FAQS } from "@/lib/priorityMedicareFaqs";
import { pageTwitter } from "@/lib/seo";
import { AepCountdown } from "@/components/story/AepCountdown";
import { PullQuote } from "@/components/story/PullQuote";
import { ScrollReveal } from "@/components/story/ScrollReveal";
import { TrafficGuideLinks } from "@/app/components/TrafficGuideLinks";
import { ChecklistPointer, ReadNext } from "@/app/components/ReadNext";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The door that was missing.
 *
 * Everything here aimed at Medicare was written for somebody turning 65, a
 * group that refreshes once a year and is a fraction of the market. The larger
 * group is everybody already enrolled, and between October 15 and December 7
 * they are all asked to make a decision at once. That is the highest-volume
 * Medicare search there is, it repeats every autumn, and the site had no page
 * for it.
 *
 * The position, which almost nobody publishing on this query takes: most
 * people should keep what they have. Saying so is what makes the page worth
 * reading, and it is the only claim on the topic a language model can quote
 * without hedging.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Annual Enrollment Help | Greensboro",
  },
  description:
    "Medicare Annual Enrollment is October 15 to December 7. Review 2027 doctors, prescriptions, and costs with a local Greensboro agent. Free, no-pressure help.",
  alternates: { canonical: "/annual-enrollment" },
  openGraph: pageOpenGraph({
    title: "Medicare annual enrollment help in Greensboro, Winston-Salem & High Point",
    description:
      "A personal review in Greensboro, High Point, or Winston-Salem of next year’s costs, doctors, and prescriptions, including when keeping your plan is the right move.",
    path: "/annual-enrollment",
  }),
  twitter: pageTwitter({
    title: "Medicare annual enrollment help in Greensboro, Winston-Salem & High Point",
    description:
      "A personal review in Greensboro, High Point, or Winston-Salem of next year’s costs, doctors, and prescriptions, including when keeping your plan is the right move.",
    path: "/annual-enrollment",
  }),
};

const STEPS = [
  {
    t: "Start with your Annual Notice of Change",
    b: "Your plan’s Annual Notice of Change explains changes to coverage and costs for the coming year. Keep it with your current plan information so we can review the details together.",
  },
  {
    t: "Check your prescriptions against next year’s list",
    b: "Check each prescription, including its dosage and your preferred pharmacy. Drug coverage and costs can change even if your medicines stay the same.",
  },
  {
    t: "Check your doctors are still in network",
    b: "Networks change in both directions, a practice can leave a plan, and a plan can drop a health system. Around here that usually means Cone Health, Novant or Atrium Health Wake Forest Baptist, and it’s worth confirming rather than assuming.",
  },
  {
    t: "Compare your options with your current coverage",
    b: "Once you’ve reviewed your doctors, prescriptions, and costs, you can decide whether to keep your current plan or consider a change. There’s no need to change simply because you received an advertisement.",
  },
] as const;

const FAQ = PRIORITY_MEDICARE_FAQS.annual;

export default function AnnualEnrollmentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment", path: "/annual-enrollment" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableJsonLd([".sh-title",".sh-lede"], "/annual-enrollment")).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Reviewing your Medicare coverage for next year in Greensboro, Winston-Salem & High Point",
              description:
                "How to review your plan’s changes, prescription coverage, doctors, and costs before the annual enrollment deadline.",
              path: "/annual-enrollment",
              datePublished: "2026-08-31",
              dateModified: "2026-10-12",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to review your Medicare plan during annual enrollment",
              description:
                "Four checks worth making between October 15 and December 7, starting with the Annual Notice of Change.",
              path: "/annual-enrollment",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare Annual Enrollment review",
              description:
                "A fall review of the Annual Notice of Change, prescriptions, and doctors, including when the appropriate answer is to keep the plan you have.",
              path: "/annual-enrollment",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Annual enrollment" }]}
        eyebrow="October 15 to December 7 · Piedmont Triad"
        title="Review your Medicare coverage for next year"
        lede="Medicare Annual Enrollment runs October 15 through December 7, 2026. During this window you can join, switch, or drop Medicare Advantage and Part D plans, with changes taking effect January 1, 2027. Your current plan renews automatically, but premiums, drug lists, and doctor networks change every year, so a review is worth your time."
        secondaryHref="/aep-quiz"
        secondaryLabel="Take the 2-minute quiz"
      />

      <AepCountdown />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What is different this year</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Three regulatory changes are worth knowing before you compare plans for 2027.
          </p>
          <div className="mt-6 flex flex-col gap-5">
            <div className="border-t border-gray-300 pt-5">
              <h3 className="text-19 font-semibold">Star Ratings overhaul from CMS</h3>
              <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                The Centers for Medicare and Medicaid Services finalized a rule in April 2026 that
                removes 11 Star Ratings measures for 2027. Star Ratings score plans from 1 to 5 and
                affect bonus payments to insurers, so this reshuffles which plans look strong on
                paper. A 4-star plan this year might rate differently next year for reasons that have
                nothing to do with your care.{" "}
                <a
                  href="https://www.cms.gov/newsroom/fact-sheets/final-policies-calendar-year-2027-medicare-advantage-and-part-d-and-medicare-medicaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2"
                >
                  CMS final rule fact sheet
                </a>
                .
              </p>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <h3 className="text-19 font-semibold">Looser marketing rules starting October 1</h3>
              <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                CMS relaxed some Medicare marketing rules effective October 1, 2026, which means you
                may get more calls, mail, and TV ads than in past years. You do not have to respond
                to any of them. Start with your current plan and your own needs.
              </p>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <h3 className="text-19 font-semibold">New flexibility if your doctor leaves mid-year</h3>
              <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                If your doctor leaves your plan&apos;s network during the year, you now have more options
                to switch plans outside the fall window. This matters in the Triad, where Cone Health,
                Novant, and Atrium Health Wake Forest Baptist contracting changes can move a lot of
                doctors at once.
              </p>
            </div>
          </div>
          <h2 className="text-28 font-semibold mt-12">Key dates for 2026 to 2027</h2>
          <table className="mt-6 w-full text-left text-17">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 pr-4 font-semibold">Milestone</th>
                <th className="py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Annual Notice of Change mailed</td>
                <td className="py-3">By September 30, 2026</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Annual Enrollment opens</td>
                <td className="py-3">October 15, 2026</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Annual Enrollment closes</td>
                <td className="py-3">December 7, 2026</td>
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
                <td className="py-3 pr-4">2027 Part B premium announced</td>
                <td className="py-3">November 2026 (CMS)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            For 2026, the standard Part B premium is{" "}
            <strong className="font-semibold">$202.90 per month</strong> with a{" "}
            <strong className="font-semibold">$283 annual deductible</strong>, per CMS. The 2027
            figures are announced each fall. See{" "}
            <Link href="/medicare-costs-2026" className="font-medium underline underline-offset-2">
              what Medicare costs in 2026
            </Link>{" "}
            for the full breakdown.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <ScrollReveal>
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The twenty-minute version</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
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
          <PullQuote>
            Your current plan renews automatically, but premiums, drug lists, and doctor networks
            change every year.
          </PullQuote>
        </div>
        </ScrollReveal>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The dates, all of them</h2>
          <dl className="mt-6 flex flex-col gap-5">
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">October 15 to December 7</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Annual enrollment. Join, switch or drop a Medicare Advantage or Part D drug plan.
                Whatever you pick starts January 1.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">January 1 to March 31</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Medicare Advantage open enrollment, if you’re already on an Advantage plan. One
                change: to a different Advantage plan, or back to Original Medicare with a drug
                plan.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Any time, if your life changed</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Moving out of your plan’s county, losing employer coverage, or your plan leaving the
                area each open a special enrollment period of their own. If one of those happened to
                you, the fall window isn’t your only chance.
              </dd>
            </div>
          </dl>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage options can vary by county. Greensboro and most of High Point are in
            Guilford County; Winston-Salem is in Forsyth County. We’ll check the plans available at
            your home address and review the doctors, hospitals, and pharmacies you use.{" "}
            <Link href="/service-area" className="underline underline-offset-2">
              What that means where you live
            </Link>
            . The premiums, deductibles and caps that apply everywhere are set out in{" "}
            <Link href="/medicare-costs-2026" className="underline underline-offset-2">
              what Medicare costs in 2026
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get every October</h2>
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
            current="/annual-enrollment"
            heading="Turning 65, life insurance, or a retirement question instead?"
          />
        </div>
      </section>

      <ReadNext>
        <p>
          Review the <Link href="/medicare-changes-2027">changes for 2027</Link> and how the <Link href="/medicare-part-d-donut-hole-2027">Part D out-of-pocket cap works</Link>. Bring the <Link href="/medicare-annual-enrollment-2026-checklist">fall review checklist</Link> to your conversation.
        </p>
        <ChecklistPointer />
      </ReadNext>

      <KitchenTableClose
        heading="Get a personal coverage review"
        body="Bring your Annual Notice of Change and prescription list. We will review the details that may affect your care and costs."
        href="/start?topic=medicare&stage=already_on_medicare&quick=1"
        label="Review my coverage →"
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
    <TrafficGuideLinks slugs={["medicare-plan-not-renewing-triad", "medicare-dual-eligible-snp-triad", "medicare-part-b-giveback-plans", "medicare-advantage-open-enrollment-period"]} />
      <MedicareByline reviewed="2026-10-12" />
      <RelatedMedicareGuides />
    </main>
  );
}
