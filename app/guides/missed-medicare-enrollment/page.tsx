import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * What happens if you miss Medicare enrollment.
 *
 * Targets "what happens if you miss medicare open enrollment". Covers both
 * cases: already enrolled (auto-renewal, MA open enrollment second chance)
 * and never enrolled (GEP Jan 1-Mar 31, coverage July 1, penalties).
 */

export const metadata: Metadata = {
  title: {
    absolute: "Missed Medicare Enrollment? What Happens Next",
  },
  description:
    "Missed the December 7 deadline? Your plan renews automatically. Missed your first enrollment at 65? Here are your next windows and the penalties to avoid.",
  alternates: { canonical: "/guides/missed-medicare-enrollment" },
  openGraph: pageOpenGraph({
    title: "Missed Medicare enrollment? What happens next",
    description:
      "The December 7 deadline passed. What changes, what stays the same, your next enrollment windows, and how the late penalties work.",
    path: "/guides/missed-medicare-enrollment",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I lose my Medicare coverage if I do nothing during open enrollment?",
    a: "No. Your current plan renews automatically for the next year. You keep your coverage with no gap. You simply lose the chance to change plans until the next window.",
  },
  {
    q: "Can I still switch plans after December 7?",
    a: "If you have a Medicare Advantage plan, you get a second window from January 1 to March 31. You can switch to a different Advantage plan or return to Original Medicare. Standalone Part D changes generally wait until next fall unless you qualify for a special enrollment period.",
  },
  {
    q: "What is the General Enrollment Period?",
    a: "The General Enrollment Period runs January 1 to March 31 each year. It is for people who missed their first chance to enroll in Part A and Part B at 65. Coverage starts July 1, and late penalties may apply.",
  },
  {
    q: "How is the Part B late enrollment penalty calculated?",
    a: "Your Part B premium rises 10 percent for each full 12-month period you could have enrolled but did not. The penalty is permanent. It lasts as long as you have Part B.",
  },
  {
    q: "How is the Part D late enrollment penalty calculated?",
    a: "Your Part D premium rises 1 percent of the national base premium for each month you went without creditable drug coverage. Like the Part B penalty, it is permanent.",
  },
  {
    q: "What counts as a special enrollment period?",
    a: "Life events like moving out of your plan's service area, losing employer coverage, or your plan ending can open a special enrollment period. Each one has its own rules and time limits.",
  },
];

export default function MissedMedicareEnrollmentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/missed-medicare-enrollment" },
              { name: "Missed Medicare enrollment", path: "/guides/missed-medicare-enrollment" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Missed Medicare Enrollment? What Happens Next",
              description:
                "What happens after the December 7 deadline: automatic renewal, the January second chance for Advantage plans, the General Enrollment Period, and late penalties.",
              path: "/guides/missed-medicare-enrollment",
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
          { name: "Missed Medicare enrollment" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Missed Medicare enrollment? Here is what happens next"
        lede="The deadline passed and the panic set in. Take a breath. In most cases your coverage is fine. Here is exactly where you stand."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get help with your options"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              The Annual Enrollment Period runs October 15 to December 7 each year. Missing it does
              not cancel your coverage. Your current plan renews on its own. What you lose is the
              chance to change plans, unless another enrollment window opens for you.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Case 1: you already have a plan</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you like your current plan, doing nothing was the right move. Your Medicare
            Advantage or Part D plan renews automatically for the next year. Your doctors, your
            drugs, and your coverage continue with no gap. The one thing to check: your plan's
            Annual Notice of Change, which arrives each September. Costs and networks can change
            even when the plan name stays the same.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you wanted to switch and missed the window, Medicare Advantage members get a second
            chance. The Medicare Advantage Open Enrollment Period runs January 1 to March 31. During
            it you can move to a different Advantage plan or go back to Original Medicare. You can
            only use it once per year.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Case 2: you never enrolled at 65</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your first enrollment window is the 7 months around your 65th birthday. If that passed
            without enrolling, your next chance is the General Enrollment Period, January 1 to
            March 31 each year. Coverage starts July 1. That leaves months with no Medicare
            coverage, and late enrollment penalties may apply.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The penalties are permanent. Part B adds 10 percent to your premium for each full
            12-month period you delayed. Part D adds 1 percent of the national base premium for each
            month you lacked creditable drug coverage. Both last as long as you have the coverage.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Your next windows at a glance</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Enrollment windows after missing the December 7 deadline
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Window
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Dates
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    What you can do
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Medicare Advantage Open Enrollment
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">Jan 1 to Mar 31</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Switch Advantage plans, or leave Advantage for Original Medicare
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    General Enrollment Period
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">Jan 1 to Mar 31</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Enroll in Part A and Part B for the first time; coverage starts July 1
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Special Enrollment Period
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">Varies by event</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Change plans after events like a move, loss of coverage, or a plan ending
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Next Annual Enrollment Period
                  </th>
                  <td className="text-16 whitespace-nowrap py-4 pr-4">Oct 15 to Dec 7</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Join, switch, or drop Advantage and Part D plans for the following year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What to do right now</h2>
          <ol className="text-17 mt-4 flex list-decimal flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Confirm your current coverage is active and your premiums are paid.</li>
            <li>Read your Annual Notice of Change so January brings no surprises.</li>
            <li>
              Check whether a special enrollment period applies to you. A move or a lost plan can
              reopen your options.{" "}
              <Link href="/special-enrollment" className="underline underline-offset-2">
                Here is how special enrollment works
              </Link>
              .
            </li>
            <li>Mark the next window on your calendar so this does not happen twice.</li>
          </ol>
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
            Not sure which window applies to you? Call or text Christian Brinkley in Greensboro, NC
            at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="Missed the deadline? Let's find your next move"
        body={`Tell me what coverage you have now and what changed. We will find your next enrollment window and make a plan for it. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Get help with your options"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
