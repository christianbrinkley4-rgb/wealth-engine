import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";
import { FeaturedPlaceCards, ServiceAreaTownList } from "@/app/components/ServiceAreaTownList";
import { LeadCluster } from "@/app/components/LeadCluster";
import { SERVICE_AREA_LABEL, SERVICE_AREA_LEDE } from "@/lib/triad";

/**
 * The 401(k) and retirement-income territory, as education rather than advice.
 *
 * This is the line that matters on this page, and it is worth stating plainly
 * because it decides what the page is allowed to be:
 *
 *   Explaining how something works, in public, to everyone — publishing.
 *   Telling one person what they specifically should do with their money,
 *   for compensation — investment advice, which needs registration.
 *
 * So this page answers "what are my four options and what does each one do",
 * names the deadlines and the tax mechanics, and stops there. It does not
 * recommend a course of action, does not compare investments, and says out
 * loud which parts belong to a registered adviser or a CPA. Framed that way
 * it can rank for the searches without holding anybody out as something they
 * are not — and educational depth is what gets quoted by an assistant anyway,
 * where a services page never would be.
 */

export const metadata: Metadata = {
  title: { absolute: "Retirement Planning Help in Greensboro, NC — 401(k) & Medicare Timing" },
  description:
    "Learn how 401(k) options, required distributions, and retirement income can affect Medicare premiums. Local education from a Greensboro insurance agent.",
  alternates: { canonical: "/retirement-income" },
  openGraph: pageOpenGraph({
    title: "Retirement questions, answered in person in Greensboro",
    description:
      "Educational guidance on 401(k) options, retirement-income timing, and potential Medicare premium effects.",
    path: "/retirement-income",
  }),
};

const OPTIONS = [
  {
    t: "Leave it where it is",
    b: "Your former employer’s plan may let you keep the account. Review its investment options, fees, withdrawal rules, and any minimum balance requirements with the plan administrator.",
  },
  {
    t: "Roll it to an IRA",
    b: "An IRA rollover can change your investment options, fees, and account rules. Discuss those differences and the tax treatment with a qualified professional before moving money.",
  },
  {
    t: "Roll it into a new employer's plan",
    b: "An option if you’re still working somewhere whose plan takes transfers. Worth knowing about, because money in the plan where you still work can be exempt from required withdrawals in a way IRA money isn’t.",
  },
  {
    t: "Cash it out",
    b: "A cash distribution may make the taxable amount income in a single year and can affect the income Medicare reviews two years later. A CPA or registered investment adviser can help assess the consequences for your situation.",
  },
] as const;

const FAQ = [
  {
    q: "When do required minimum distributions start?",
    a: "For many people, required minimum distributions begin at 73. The starting age is 75 for people born in 1960 or later. Your account type and circumstances can also affect the rules.",
  },
  {
    q: "Why review withdrawals before required distributions begin?",
    a: "For some households, the years after paychecks stop and before required distributions begin may bring lower taxable income. That can make the timing of withdrawals and conversions worth discussing with a CPA or registered investment adviser.",
  },
  {
    q: "How can retirement income affect Medicare costs?",
    a: "Medicare generally uses income from two years earlier to determine whether an income-related charge applies. A large taxable withdrawal or Roth conversion may affect future premiums. We can identify the questions to discuss with your tax professional or advisor.",
  },
  {
    q: "Is a rollover taxable?",
    a: "A direct rollover is generally not taxable at the time of transfer. Receiving the funds yourself can trigger withholding and a 60-day rollover deadline. Confirm the rules and your circumstances with the plan administrator and a qualified tax professional.",
  },
  {
    q: "Can you advise me on how to invest it?",
    a: "No. I hold an insurance license, not a securities license, and I am not a registered investment adviser. I can provide general education about deadlines and Medicare interactions, then identify questions for a CPA or registered investment adviser.",
  },
  {
    q: "How can you help with my retirement questions?",
    a: "I help you understand your Medicare and insurance options and how they relate to retirement. For financial planning, I work with an advisor. We can discuss your priorities and identify the right next steps.",
  },
  {
    q: "Are you a financial advisor?",
    a: "I’m a licensed insurance agent and an accounting master’s student at UNCG. I work with an advisor for retirement financial planning, and I can help you prepare questions for a CPA when tax advice is needed.",
  },
] as const;

export default function RetirementIncomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Retirement income", path: "/retirement-income" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "What to do with a 401(k) when you retire",
              description:
                "The four options, the deadlines attached to each, and how a withdrawal lands on a Medicare premium two years later.",
              path: "/retirement-income",
              datePublished: "2026-08-25",
              dateModified: "2026-09-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Retirement income and Medicare timing",
              description:
                "401(k) options, Social Security timing, and how a withdrawal lands on a Medicare premium. Education, not investment advice.",
              path: "/retirement-income",
            }),
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "What to do with a 401(k) when you retire",
              description:
                "The four options for an old 401(k), the deadlines attached to each, and how a withdrawal lands on a Medicare premium two years later.",
              path: "/retirement-income",
              steps: OPTIONS.map((option) => ({ name: option.t, text: option.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Retirement income" }]}
        eyebrow={SERVICE_AREA_LABEL}
        title="Coordinate retirement income with Medicare"
        lede="Retiring can change where your monthly income comes from and what you pay for Medicare. I can help you understand the Medicare questions and work with an advisor for financial planning."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Check Medicare income effects →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The four options</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {OPTIONS.map((option, index) => (
              <li key={option.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{option.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {option.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The years before required distributions</h2>
          <p className="text-18 mt-4 leading-relaxed">
            For some households, taxable income falls after work ends and before required
            distributions begin. The timing of withdrawals and conversions during those years may
            affect taxes and future Medicare premiums.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            A change in retirement income may also affect what you pay for Medicare. Looking at both
            together can help you prepare for future costs. A qualified tax professional or advisor
            can assess your individual situation.{" "}
          </p>
          <div className="card-surface mt-8 p-6">
            <p className="text-18 leading-relaxed">
              Our calculator compares the estimated Medicare premium effect of two Roth conversion
              timing examples using 2026 rates. You can review the results with your tax
              professional or financial advisor.{" "}
            </p>
            <Link
              href="/plan"
              className="text-17 mt-4 inline-block font-medium underline underline-offset-4"
            >
              See what the timing is worth →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How I can help</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I’m a licensed insurance agent finishing a master’s in accounting. I’m not a registered
            investment adviser or a CPA. I don’t manage money, recommend investments, or tell you
            what to hold inside a 401(k) or an IRA.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I help you understand how insurance and Medicare fit into your retirement decisions. For
            financial planning, I work with an advisor and can coordinate a conversation with your
            permission. The advisor explains their services, qualifications, and any fees before you
            decide to work together. Tax advice belongs with a qualified tax professional.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask</h2>
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

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local retirement and Medicare education</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} Meet directly with Christian in person or by phone.
          </p>
          <FeaturedPlaceCards
            hrefFor={(place) => `/retirement-in/${place.slug}`}
            labelFor={(place) => `Retirement help in ${place.name}`}
          />
          <p className="text-13 mt-8 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Retirement help in nearby communities{" "}
          </p>
          <ServiceAreaTownList hrefFor={(place) => `/retirement-in/${place.slug}`} />
          <p className="text-17 mt-6">
            <Link href="/service-area" className="underline underline-offset-2">
              Every town in the service area →
            </Link>
          </p>
          <LeadCluster
            current="/retirement-income"
            heading="More help with Medicare and insurance"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Check how income may affect Medicare"
        body="Review the two-year income lookback and identify which questions belong with a CPA or registered investment adviser."
        href="/start?topic=financial_planning"
        label="Ask a question →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Your Social Security start date is another part of retirement planning. Consider your
          income needs, your spouse’s benefits, and other savings as you compare your options.{" "}
          <Link href="/social-security-timing" className="underline underline-offset-2">
            When to take Social Security
          </Link>{" "}
          explains the main ages and questions to discuss with your advisor.{" "}
        </p>
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
