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
  howToJsonLd,
  pageOpenGraph,
} from "@/lib/seo";

/**
 * The national turning-65 guide. The /turning-65 page is geo-locked to
 * Greensboro and cannot rank for the national query "turning 65 medicare
 * what to do." This page is the national version: no local sections, the
 * winning format (direct answer, numbered steps, scenario sections), and the
 * high-intent entities (CMS-40B, CMS-L564) that the ranking YouTube videos use.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Turning 65? Your Medicare Enrollment Guide (2026-2027)",
  },
  description:
    "Turning 65? Here is exactly what to do: your 7-month enrollment window, the Part B penalty, Medigap timing, and what changes if you are still working. Step by step.",
  alternates: { canonical: "/turning-65-medicare-guide" },
  openGraph: pageOpenGraph({
    title: "Turning 65? Your Medicare enrollment guide",
    description:
      "The 7-month window, the Part B penalty, Medigap timing, and every scenario: still working, on Medicaid, self-employed. Step by step.",
    path: "/turning-65-medicare-guide",
  }),
};

const STEPS = [
  {
    t: "Find your 7-month Initial Enrollment Period",
    b: "Your window covers the 3 months before the month you turn 65, your birthday month, and the 3 months after. If your birthday falls on the first of the month, the window shifts one month earlier.",
  },
  {
    t: "Enroll in the first 3 months for on-time coverage",
    b: "Enrolling before your birthday month generally means Part B starts the month you turn 65. Enrolling during or after the birthday month usually delays your start date by one or more months.",
  },
  {
    t: "Decide about Part B if you are still working",
    b: "If you have group health coverage based on current employment (yours or your spouse's), you can usually delay Part B without penalty and enroll later through a Special Enrollment Period. Retiree coverage and COBRA do not qualify. If you contribute to an HSA, do not enroll in any part of Medicare, including premium-free Part A.",
  },
  {
    t: "Mark your 6-month Medigap window separately",
    b: "Medigap open enrollment starts the first month you are 65 or older and enrolled in Part B, and lasts 6 months. During this window, insurers cannot deny you a policy or charge more based on health. This protection is generally a one-time event.",
  },
  {
    t: "Compare your coverage options",
    b: "Original Medicare plus Medigap plus a Part D drug plan, or a Medicare Advantage plan that bundles hospital, medical, and usually drug coverage. Compare using your doctors, your prescriptions, and your budget, not just the premium.",
  },
  {
    t: "Apply through Social Security",
    b: "Enroll in Parts A and B through Social Security: online at ssa.gov, by phone at 1-800-772-1213, or in person at a local office. If you are already receiving Social Security benefits, you are enrolled automatically.",
  },
  {
    t: "Confirm everything before your start date",
    b: "Check that your doctors accept your coverage, your prescriptions are on the plan's formulary, and your cards have arrived. Fix problems before your coverage starts, not after.",
  },
] as const;

const SCENARIOS = [
  {
    t: "Still working with employer coverage",
    b: "If your employer has 20 or more employees and your coverage is based on current employment, you can usually delay Part B without the late penalty. When that job or coverage ends, you get an 8-month Special Enrollment Period to sign up for Part B. You will need Form CMS-40B (the Part B application) and Form CMS-L564 (proof of employer coverage, signed by your employer). Part A is usually premium-free, but if you contribute to an HSA, enrolling in Part A ends your eligibility to contribute.",
  },
  {
    t: "On Medicaid",
    b: "If you have full Medicaid when you turn 65, you generally must enroll in Medicare. Medicaid may continue as secondary coverage, paying costs Medicare does not. You may also qualify for a Medicare Savings Program. Do not assume Medicaid alone is enough: check with your state Medicaid office about how the two work together in your case.",
  },
  {
    t: "Self-employed or no employer coverage",
    b: "Without group coverage based on current employment, there is no penalty-free way to delay. Enroll in the first 3 months of your Initial Enrollment Period so coverage starts on time. Individual marketplace plans do not count as creditable coverage for delaying Part B.",
  },
  {
    t: "On disability (under 65)",
    b: "If you have received Social Security disability benefits for 24 months, you are automatically enrolled in Medicare regardless of age. The turning-65 rules above do not apply, but you get a second Initial Enrollment Period at 65 with fresh Medigap protections in most states.",
  },
] as const;

const FAQ = [
  {
    q: "What is the Part B late enrollment penalty?",
    a: "10% of the standard Part B premium for every full 12 months you were eligible but did not enroll, charged for as long as you hold Part B. It is permanent. With the 2026 standard premium at $202.90 a month, a one-year delay adds about $20 a month to your premium for life.",
  },
  {
    q: "What forms do I need to enroll in Part B if I delayed?",
    a: "Form CMS-40B, the Application for Enrollment in Medicare Part B, and Form CMS-L564, the Request for Employment Information, which your employer signs to prove you had group coverage based on current employment. Submit both to Social Security when your employer coverage ends.",
  },
  {
    q: "Can I contribute to an HSA after enrolling in Medicare?",
    a: "No. Once you enroll in any part of Medicare, including premium-free Part A, you can no longer contribute to a Health Savings Account. If you are still working and contributing to an HSA at 65, delay all Medicare enrollment until you stop contributing.",
  },
  {
    q: "What is the difference between my Initial Enrollment Period and Annual Enrollment?",
    a: "Your Initial Enrollment Period is based on your 65th birthday and is when you first join Medicare. Annual Enrollment, October 15 through December 7 each year, is for people already on Medicare to review or change Medicare Advantage and Part D plans. They are separate windows with separate rules.",
  },
  {
    q: "Do I have to sign up for Medicare at 65 if I am still working?",
    a: "Not necessarily. If you have group health coverage based on current employment from an employer with 20 or more employees, you can usually delay Part B without penalty. You get a Special Enrollment Period when that coverage ends. Retiree plans and COBRA do not qualify for the delay.",
  },
  {
    q: "When does my Medigap open enrollment period start?",
    a: "The first month you are 65 or older and enrolled in Part B. It lasts 6 months. During this window, insurers must sell you any Medigap policy they offer without medical underwriting. Outside this window, they can deny coverage or charge more based on your health in most states.",
  },
  {
    q: "Where do I actually sign up for Medicare?",
    a: "Through Social Security: online at ssa.gov, by phone at 1-800-772-1213, or in person at a local Social Security office. If you already receive Social Security benefits, enrollment in Parts A and B is automatic.",
  },
] as const;

export default function Turning65GuidePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Turning 65 Medicare guide", path: "/turning-65-medicare-guide" },
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
              headline: "Turning 65? Your Medicare enrollment guide, step by step",
              description:
                "The 7-month Initial Enrollment Period, the Part B late penalty, Medigap timing, and every scenario: still working, on Medicaid, self-employed.",
              path: "/turning-65-medicare-guide",
              datePublished: "2026-10-12",
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
              name: "How to enroll in Medicare when you turn 65",
              description:
                "Seven steps from finding your enrollment window to confirming your coverage starts on time.",
              path: "/turning-65-medicare-guide",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Turning 65 Medicare guide" }]}
        eyebrow="Initial Enrollment Period · National guide"
        title="Turning 65? Here is exactly what to do about Medicare"
        lede="Your Initial Enrollment Period is 7 months: the 3 months before the month you turn 65, your birthday month, and the 3 months after. Enroll in the first 3 months to avoid coverage gaps and the Part B late penalty, which is 10% of the premium for every year you delay, charged permanently. The seven steps below cover every scenario."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon&quick=1"
        secondaryLabel="Get help with my timeline →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-15 font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
            By {AGENT.name}, {AGENT.licenseLine} · Updated October 2026
          </p>
          <h2 className="text-28 font-semibold mt-6">The seven steps, in order</h2>
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
          <h2 className="text-28 font-semibold">Which situation sounds like you?</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The rules change based on your situation. Find yours below.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            {SCENARIOS.map((item) => (
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
          <h2 className="text-28 font-semibold">Key numbers to know</h2>
          <table className="mt-6 w-full text-left text-17">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 pr-4 font-semibold">Figure</th>
                <th className="py-3 font-semibold">2026</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Part B standard premium</td>
                <td className="py-3">$202.90 / month (CMS)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Part B annual deductible</td>
                <td className="py-3">$283 (CMS)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 pr-4">Part B late penalty</td>
                <td className="py-3">10% of premium per 12 months delayed, permanent</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Initial Enrollment Period</td>
                <td className="py-3">7 months around your 65th birthday</td>
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
              href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Medicare.gov enrollment
            </a>
            ,{" "}
            <a
              href="https://www.ssa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              SSA.gov
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
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
            current="/turning-65-medicare-guide"
            heading="Already on Medicare, or helping a parent instead?"
          />
        </div>
      </section>

      <ReadNext>
        <p>
          Already on Medicare? Read the <Link href="/annual-enrollment">annual enrollment guide</Link>. Comparing coverage types? See <Link href="/advantage-vs-medigap">Advantage vs. Medigap</Link>. In the Piedmont Triad, the <Link href="/turning-65">local turning-65 page</Link> has Greensboro-specific resources.
        </p>
        <ChecklistPointer />
      </ReadNext>

      <KitchenTableClose
        heading="Want help with your enrollment timeline?"
        body="We will map your 7-month window, check your current coverage, and answer your questions. Free consultation, no obligation, by phone or in person."
        href="/start?topic=medicare&stage=turning_65_soon&quick=1"
        label="Get help →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-sm text-gray-600">
          By Christian Brinkley, Licensed NC Insurance Agent (NPN 22217190). Last updated October 2026.
        </p>
        <p className="text-sm text-gray-600">
          Sources: <a href="https://www.medicare.gov" className="underline underline-offset-2" target="_blank" rel="noopener">Medicare.gov</a>, <a href="https://www.cms.gov" className="underline underline-offset-2" target="_blank" rel="noopener">CMS.gov</a>, <a href="https://www.ssa.gov" className="underline underline-offset-2" target="_blank" rel="noopener">SSA.gov</a>
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
