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
 * Everything here aimed at Medicare was written for somebody turning 65 — a
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
  title: { absolute: "Medicare Annual Enrollment, Oct 15–Dec 7 — Greensboro, NC" },
  description:
    "Review next year’s Medicare costs, prescriptions, and doctors with a local licensed agent before deciding whether to keep or change coverage.",
  alternates: { canonical: "/annual-enrollment" },
  openGraph: pageOpenGraph({
    title: "Reviewing your Medicare coverage for next year",
    description:
      "A personal review of your coverage, costs, doctors, and prescriptions can help you decide whether to make a change.",
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
    b: "Networks change in both directions — a practice can leave a plan, and a plan can drop a health system. Around here that usually means Cone Health, Novant or Atrium Health Wake Forest Baptist, and it’s worth confirming rather than assuming.",
  },
  {
    t: "Compare your options with your current coverage",
    b: "Once you’ve reviewed your doctors, prescriptions, and costs, you can decide whether to keep your current plan or consider a change. There’s no need to change simply because you received an advertisement.",
  },
] as const;

const FAQ = [
  {
    q: "When is Medicare annual enrollment?",
    a: "October 15 through December 7 every year, and anything you change starts January 1. If you’re already on a Medicare Advantage plan there’s a second window from January 1 to March 31, but it allows one change: to a different Advantage plan, or back to Original Medicare with a drug plan. It is not a second fall shopping season. On Original Medicare, it does not let you join an Advantage plan, pick up a standalone drug plan, or switch the drug plan you have. Your change starts the first of the month after the plan receives it.",
  },
  {
    q: "Do I have to do anything?",
    a: "Your plan generally renews automatically. A review can confirm whether the costs, prescription coverage, and choice of doctors still fit your needs before you decide whether to make a change.",
  },
  {
    q: "How do I know if I should switch?",
    a: "Consider whether your doctors, prescription coverage, expected costs, or personal needs have changed. We can compare those details before you decide whether a different plan would suit you.",
  },
  {
    q: "Why do I get so much mail and so many calls this time of year?",
    a: "Annual enrollment brings a lot of advertising. You don’t have to respond to every letter or call. Start with your current plan and your own needs, and ask for help if something is unclear.",
  },
  {
    q: "Can I change my Medigap policy during this window?",
    a: "Annual enrollment applies to Medicare Advantage and Part D plans. Medigap has different rules. Outside your Medigap open enrollment period or another protected situation, an insurer may review your health when you apply.",
  },
  {
    q: "Will you sit down with me and look at the letter?",
    a: "Yes. Meet in person or by phone. Bring the Annual Notice of Change and a list of your prescriptions. The review is free, and keeping your current coverage may be the right outcome.",
  },
  {
    q: "My premium went up and I didn’t change anything. Why?",
    a: "A premium increase can come from a plan change or from an income-related Medicare charge called IRMAA. Bring the notice so we can identify the reason and discuss what you can do next.",
  },
] as const;

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
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Reviewing your Medicare coverage for next year",
              description:
                "How to review your plan’s changes, prescription coverage, doctors, and costs before the annual enrollment deadline.",
              path: "/annual-enrollment",
              datePublished: "2026-08-31",
              dateModified: "2026-09-10",
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
                "A fall review of the Annual Notice of Change, prescriptions, and doctors — including when the appropriate answer is to keep the plan you have.",
              path: "/annual-enrollment",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Annual enrollment" }]}
        eyebrow="October 15 – December 7 · Greensboro, NC"
        title="Review your Medicare coverage for next year"
        lede="A yearly review can help you make sure your Medicare coverage still fits. We’ll look at next year’s costs, prescriptions, and doctors together before you decide whether to keep your plan or make a change."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Review my coverage →"
      />

      <section className="bg-white py-14">
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
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The dates, all of them</h2>
          <dl className="mt-6 flex flex-col gap-5">
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">October 15 – December 7</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                Annual enrollment. Join, switch or drop a Medicare Advantage or Part D drug plan.
                Whatever you pick starts January 1.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">January 1 – March 31</dt>
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
            Medicare Advantage options can vary by county. We’ll check the plans available at your
            home address and review the doctors, hospitals, and pharmacies you use.{" "}
            <Link href="/service-area" className="underline underline-offset-2">
              What that means where you live
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

      <KitchenTableClose
        heading="Get a personal coverage review"
        body="Bring your Annual Notice of Change and prescription list. We will review the details that may affect your care and costs."
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Review my coverage →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
