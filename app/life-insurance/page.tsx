import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";
import { FeaturedPlaceCards, ServiceAreaTownList } from "@/app/components/ServiceAreaTownList";
import { LeadCluster } from "@/app/components/LeadCluster";
import { SERVICE_AREA_LEDE } from "@/lib/triad";

/**
 * Life insurance, organised around the only question that decides it.
 *
 * The market is saturated with pages comparing term against whole life as
 * though it were a matter of preference. It is not: it is a question of how
 * many more years the money is needed for, and once that is answered the
 * product mostly picks itself. Leading with that is both more useful and more
 * quotable than another comparison table.
 */

export const metadata: Metadata = {
  title: {
    // Most of this page's impressions are "life insurance winston salem" and
    // Kernersville searches, so the title names the towns people type.
    absolute: "Life Insurance Agent in Greensboro & Winston-Salem, NC",
  },
  description:
    "A local life insurance agent for Greensboro, Winston-Salem, High Point and Kernersville. Christian Brinkley reviews your coverage, beneficiaries, and what changes at retirement.",
  alternates: { canonical: "/life-insurance" },
  openGraph: pageOpenGraph({
    title: "Life insurance help in Greensboro, Winston-Salem & High Point",
    description:
      "Personal help reviewing your life insurance, beneficiaries, and coverage needs as you approach retirement, with a local licensed agent across the Triad.",
    path: "/life-insurance",
  }),
  twitter: pageTwitter({
    title: "Life insurance help in Greensboro, Winston-Salem & High Point",
    description:
      "Personal help reviewing your life insurance, beneficiaries, and coverage needs as you approach retirement, with a local licensed agent across the Triad.",
    path: "/life-insurance",
  }),
};

const FAQ = [
  {
    q: "Term or whole life?",
    a: "Term insurance covers a set period. Permanent insurance is designed to last longer when the policy’s requirements are met. I can discuss how long you need coverage, what you want it to help pay for, and what fits your budget.",
  },
  {
    q: "I have coverage through work. Is that enough?",
    a: "Your coverage may change or end when you retire. Ask your employer what you can keep and what it would cost. Bring that information so I can review it alongside any personal policies.",
  },
  {
    q: "How much do I need?",
    a: "Think about the expenses your family would need help with, such as a mortgage, everyday bills, or final expenses. I can look at those needs alongside your savings, other income, and existing coverage.",
  },
  {
    q: "I am in my sixties. Is it too late?",
    a: "You may still have options. Eligibility and cost depend on the policy, your age, health, and other factors. A conversation can help you understand what is available and whether additional coverage makes sense for you.",
  },
  {
    q: "What should I check on the policy I already have?",
    a: "Check the coverage amount, premiums, beneficiary information, and how long the policy lasts. I can review any future changes to the cost or benefits and discuss questions to ask your insurer.",
  },
  {
    q: "Do you charge for a review?",
    a: "No. Your consultation is no cost, with no obligation to buy anything. If your current coverage still meets your needs, you may decide to keep it.",
  },
  {
    q: "Do you meet in Greensboro, High Point, and Winston-Salem?",
    a: "Yes. I serve Greensboro, High Point, Winston-Salem, and nearby communities, including Kernersville, Summerfield, Jamestown, Oak Ridge, and Archdale. I can arrange a home visit or talk by phone.",
  },
] as const;

export default function LifeInsurancePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Life insurance", path: "/life-insurance" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Personal life insurance help in Greensboro, Winston-Salem & High Point",
              description:
                "Understand your life insurance options and what to review in an existing policy.",
              path: "/life-insurance",
              datePublished: "2026-08-25",
              dateModified: "2026-09-18",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Life insurance review",
              description:
                "Personal reviews of existing life insurance in Greensboro, High Point, Winston-Salem, and nearby communities. No-cost consultation, with no obligation to buy.",
              path: "/life-insurance",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Life insurance" }]}
        eyebrow="Life insurance agent · Greensboro, Winston-Salem, High Point & Kernersville"
        title="Life insurance help from a local Triad agent"
        lede="Review employer and personal coverage, beneficiaries, policy end dates, and how long your family may need protection. Work directly with a licensed agent who meets in Greensboro, Winston-Salem, High Point, Kernersville, and nearby Triad towns."
        secondaryHref="/start?topic=life_insurance"
        secondaryLabel="Get a personal coverage review →"
      />

      <section
        className="app-shell measure-prose max-w-3xl py-10"
        aria-labelledby="nc-service-heading"
      >
        <h2 id="nc-service-heading" className="text-28 font-semibold">
          Help across the Triad, Triangle, and Granville County
        </h2>
        <p className="text-17 mt-4">
          I&apos;m based in Greensboro and grew up in Creedmoor. We can start by phone from Raleigh,
          Durham, Chapel Hill, Cary, or elsewhere in North Carolina. In-person meetings are arranged
          individually.
        </p>
        <p className="text-17 mt-4">
          My services are insurance, annuities, and financial education. I don&apos;t provide
          investment management or personalized investment or tax advice. Read{" "}
          <Link className="underline" href="/financial-planning-nc">
            how I can help with financial planning questions
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/insurance-services">
            the insurance services I offer
          </Link>
          .
        </p>
        <p className="mt-4">
          <a className="underline" href="tel:+19194086671">
            (919) 408-6671
          </a>
        </p>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Coverage for a set period of time</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Some needs change over time, such as paying off a mortgage or helping a family member
            until another source of income begins. Term life insurance provides coverage for a set
            period. I can review the length of coverage and what happens when that period ends.
          </p>
          <h2 className="text-28 mt-10 font-semibold">Coverage for longer-term needs</h2>
          <p className="text-18 mt-4 leading-relaxed">
            You may want coverage to help with final expenses or provide support for a loved one
            over a longer period. Permanent life insurance is designed for ongoing coverage when the
            policy’s requirements are met. It’s important to understand the premiums and how the
            policy works over time.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The right fit depends on your needs, your budget, and the coverage you already have.
            I’ll talk through those details before considering a new policy.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">If you already have a policy, check two things</h2>
          <ol className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed">
            <li>
              <strong>Who your beneficiaries are.</strong> Review the people named to receive the
              benefit, especially after a marriage, divorce, death, or other family change. Ask your
              insurer how to update the records if needed.
            </li>
            <li>
              <strong>How long the coverage lasts.</strong> Check the end date, any renewal options,
              and whether the premium or benefits will change. Employer coverage deserves a review
              before your last day of work.
            </li>
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            You can review these details yourself or bring your policy to your consultation. I’m
            happy to explain the wording and help you identify questions to ask.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What my first conversation covers</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I use the first conversation to understand what matters to you, the people you care
            about, and any life insurance coverage you already have. You can ask me questions,
            describe your priorities, and decide whether you want to continue. There is no cost for
            the insurance consultation and no obligation to buy anything.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If financial planning comes up, I coordinate with an advisor. Any services they provide
            are separate and may carry their own fees, which they would explain to you before you
            agree to anything.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to get a life insurance quote</h2>
          <p className="text-18 mt-4 leading-relaxed">
            A quote starts with a short conversation, not a form that sells your number. I ask for
            your age, your health and tobacco use, how much coverage you need, and how long you need
            it, whether that is a set term or for life. That is enough to compare real options side
            by side.
          </p>
          <ol className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed">
            <li>
              <strong>Work out the amount first.</strong> Use the{" "}
              <Link href="/tools/life-insurance-needs" className="underline">
                life insurance needs calculator
              </Link>{" "}
              to run the DIME method on your debts, income, mortgage, and education costs, or bring
              your own numbers and we will run them together.
            </li>
            <li>
              <strong>Talk through term and permanent.</strong> We compare what each type costs for
              your age and health, what happens when a term ends, and whether a smaller permanent
              policy fits alongside term.
            </li>
            <li>
              <strong>Decide in your own time.</strong> The consultation is free and there is no
              obligation to buy anything. If your current coverage still meets your needs, you may
              decide to keep it.
            </li>
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Call or text (919) 408-6671, or{" "}
            <Link href="/start?topic=life_insurance" className="underline underline-offset-2">
              start the conversation online
            </Link>
            . You will talk to me directly, not a call center, and your questions are not sold to
            other agents.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me</h2>
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

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Personal help across the Triad</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} You’re welcome to include a spouse or family member in my
            conversation.
          </p>
          <p className="text-17 mt-5">
            Live in Forsyth County? Read about{" "}
            <Link href="/life-insurance-winston-salem-nc" className="underline">
              life insurance questions to ask in Winston-Salem
            </Link>
            , including employer coverage, beneficiaries, and policy costs.
          </p>
          <FeaturedPlaceCards
            hrefFor={(place) => `/life-insurance-in/${place.slug}`}
            labelFor={(place) => `Life insurance in ${place.name}`}
          />
          <p className="text-13 mt-8 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Nearby communities
          </p>
          <ServiceAreaTownList hrefFor={(place) => `/life-insurance-in/${place.slug}`} />
          <p className="text-17 mt-6">
            <Link href="/service-area" className="underline underline-offset-2">
              Every town in the service area →
            </Link>
          </p>
          <LeadCluster
            current="/life-insurance"
            heading="More questions as you approach retirement"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Ready for a personal policy review?"
        body="Bring your current policy and employer coverage details. Consultations are free and available in person or by phone."
        href="/start?topic=life_insurance"
        label="Review my coverage →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
      <MedicareByline reviewed="2026-09-18" />
      <RelatedMedicareGuides />
    </main>
  );
}
