import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * When to claim Social Security — the biggest retirement-income question
 * there is, and the site had nothing on it.
 *
 * Two things make this page worth publishing rather than duplicating what is
 * already out there. The first is the survivor benefit: for a married couple
 * the higher earner is not really choosing their own income, they are setting
 * the floor under whichever of the two lives longer, and most break-even
 * arithmetic online ignores that entirely. The second is the connection to
 * Medicare, which is this practice's actual edge — claiming decisions and
 * withdrawal decisions land in the same tax return that sets an IRMAA
 * surcharge two years later, and almost nobody looks at the two together.
 *
 * Scope: this is education about a federal benefit, not investment advice,
 * and the page says plainly where the line is.
 */

export const metadata: Metadata = {
  title: { absolute: "When to Take Social Security — Greensboro, NC" },
  description:
    "Understand how your Social Security start date can affect monthly income, benefits for a spouse, and retirement planning. Personal education in Greensboro.",
  alternates: { canonical: "/social-security-timing" },
  openGraph: pageOpenGraph({
    title: "When to take Social Security",
    description:
      "Your income needs, family circumstances, and other savings all matter when choosing when to start Social Security.",
    path: "/social-security-timing",
  }),
};

const AGES = [
  {
    age: "62",
    head: "The earliest you can claim",
    b: "For someone born in 1960 or later, starting at 62 reduces the monthly retirement benefit by about 30% compared with starting at full retirement age. Consider your income needs, health, and other resources when reviewing this option.",
  },
  {
    age: "67",
    head: "Full retirement age",
    b: "If you were born in 1960 or later, your full retirement age is 67. Starting then gives you your full retirement benefit based on your earnings record. The retirement earnings limit no longer applies once you reach full retirement age.",
  },
  {
    age: "70",
    head: "The last useful year to wait",
    b: "Waiting beyond full retirement age increases your monthly benefit through delayed retirement credits, up to age 70. Credits do not continue after 70. Your Social Security statement can help you compare the estimated amounts.",
  },
] as const;

const MISSED = [
  {
    t: "The survivor benefit, if you are married",
    b: "If you’re married, consider how each start date may affect the income available to a surviving spouse. Social Security can explain the survivor rules for your circumstances.",
  },
  {
    t: "What it does to your Medicare premium two years later",
    b: "Medicare generally looks at income from two years earlier when calculating income-related charges. Withdrawals and other taxable income during retirement may affect future premiums, so it’s useful to discuss taxes and Medicare together.",
  },
  {
    t: "How much of the benefit gets taxed",
    b: "Depending on your other income, part of your Social Security benefits may be taxable. A qualified tax professional can help you estimate the effect on your household and plan for any taxes due.",
  },
  {
    t: "Working while you claim, before full retirement age",
    b: "If you receive benefits while working before full retirement age, earnings above an annual limit can reduce the payments you receive. Social Security can explain the current limit and how your benefit is adjusted when you reach full retirement age.",
  },
] as const;

const FAQ = [
  {
    q: "What is the best age to take Social Security?",
    a: "The best timing depends on your income needs, health, family situation, and other resources. Compare the estimates on your Social Security statement and discuss how you would cover expenses at each starting age.",
  },
  {
    q: "How much less do I get at 62?",
    a: "About 30 percent less than at full retirement age if you were born in 1960 or later, and that reduction is permanent. It does not go back up when you reach 67.",
  },
  {
    q: "Is waiting until 70 worth it?",
    a: "Waiting past full retirement age can increase your monthly benefit, up to age 70. Whether waiting fits your situation depends on your other income, savings, health, and family needs.",
  },
  {
    q: "Does taking Social Security affect my Medicare premium?",
    a: "Your overall income can affect Medicare’s income-related premium charges. If you plan to use retirement savings while waiting to start Social Security, review the potential tax and Medicare effects with a qualified professional.",
  },
  {
    q: "Can I change my mind after I claim?",
    a: "There are limited options to withdraw an application or suspend benefits, with different eligibility and repayment rules. Contact Social Security before making a change so you understand how it may affect you and anyone receiving benefits on your record.",
  },
  {
    q: "Do you sell Social Security?",
    a: "Social Security is a federal benefit. I’m a licensed insurance agent and am not affiliated with the Social Security Administration. I can help explain how Medicare fits with your retirement questions and work with an advisor for financial planning.",
  },
] as const;

export default function SocialSecurityTimingPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Retirement income", path: "/retirement-income" },
              { name: "Social Security timing", path: "/social-security-timing" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "When to take Social Security",
              description:
                "Understand the main Social Security starting ages and questions about income, family benefits, and Medicare to discuss before you decide.",
              path: "/social-security-timing",
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
              name: "How to think about Social Security timing",
              description:
                "Compare the main starting ages and consider how Social Security fits with your household’s retirement income needs.",
              path: "/social-security-timing",
              steps: AGES.map((item) => ({ name: `${item.age}: ${item.head}`, text: item.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Retirement income", href: "/retirement-income" },
          { name: "Social Security timing" },
        ]}
        eyebrow={`${AGENT.city} · ${AGENT.region}`}
        title="When should you take Social Security?"
        lede="Choosing when to start Social Security is a personal decision. Here are the main ages to know and questions to consider about your monthly income, your family, and the savings you may use in retirement."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Talk it through →"
        note="Bring your Social Security statement and your questions. We can talk in person or by phone at no cost."
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The three doors</h2>
          <div className="mt-8 flex flex-col gap-6">
            {AGES.map((item) => (
              <div key={item.age} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-24 flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {item.age}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.head}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            You can start benefits in the months between these ages. Your estimated monthly benefit
            changes with your starting date, so you can compare the timing that works for your
            plans.{" "}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> Other questions to consider </h2>
          <ul className="mt-8 flex flex-col gap-6">
            {MISSED.map((item) => (
              <li key={item.t} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </p>
              </li>
            ))}
          </ul>

          <p
            className="text-18 mt-8 rounded-lg bg-[#f3f0e6] px-5 py-4 leading-relaxed"
            style={{ borderColor: "#7a5c12" }}
          >
            Your income may change between leaving work and starting Social Security. A qualified
            tax professional or financial advisor can help you consider withdrawals, taxes, and
            possible Medicare premium effects during that time.{" "}
            <Link href="/plan" className="underline underline-offset-2">
              Our calculator estimates the Medicare premium effect of a Roth conversion{" "}
            </Link>{" "}
            using 2026 rates. It can help you prepare questions for a tax professional or financial
            advisor.{" "}
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> How I can help </h2>
          <p className="text-18 mt-4 leading-relaxed">
            I’m a licensed insurance agent and work with an advisor for financial planning. I can
            help explain how Medicare fits with your retirement questions. Social Security can
            confirm your benefits, and a qualified professional can advise on taxes or
            investments.{" "}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your Social Security statement at ssa.gov shows your personal benefit estimates. Having
            a copy handy can make the conversation more useful.{" "}
          </p>
          <GuideTownLinks kind="retirement" heading="Retirement and Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about this</h2>
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
            current="/retirement-income"
            heading="More help with retirement and insurance"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Bring your statement and your questions"
        body="We can discuss your retirement and Medicare questions and identify the information to review with Social Security or your advisor. Your consultation is no cost, with no obligation."
        href="/start?topic=financial_planning"
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
