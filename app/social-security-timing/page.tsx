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
    "62, full retirement age, or 70. What each choice actually costs, the survivor benefit most break-even math ignores, and how it lands on your Medicare premium later.",
  alternates: { canonical: "/social-security-timing" },
  openGraph: pageOpenGraph({
    title: "When to take Social Security",
    description:
      "The break-even math is the easy part. The survivor benefit and the Medicare surcharge are what people miss.",
    path: "/social-security-timing",
  }),
};

const AGES = [
  {
    age: "62",
    head: "The earliest you can claim",
    b: "You lock in roughly 30 percent less than your full benefit, permanently — not until full retirement age, permanently. It is the right answer for some people, particularly if you are in poor health or you need the money to stop working. It is the wrong answer if you picked it because it was simply the first door available.",
  },
  {
    age: "67",
    head: "Full retirement age",
    b: "For anyone born in 1960 or later, this is 67. Claim here and you get the benefit your earnings record actually says you earned, with no reduction and no bonus, and the earnings test stops applying so you can work as much as you like.",
  },
  {
    age: "70",
    head: "The last useful year to wait",
    b: "Every year you delay past full retirement age adds about 8 percent, up to age 70. Nothing accrues after that, so waiting past 70 costs you money for nothing. That 8 percent is guaranteed and adjusted for inflation each year afterwards, which is a hard return to find anywhere else.",
  },
] as const;

const MISSED = [
  {
    t: "The survivor benefit, if you are married",
    b: "This is the one that gets left out of every break-even calculator. When one of you dies, the survivor keeps the larger of the two benefits and the smaller one stops. So the higher earner is not really choosing their own income — they are setting the floor under whichever of you lives longer, for the rest of that person’s life. That usually argues for the higher earner waiting, even when their own break-even age looks unattractive.",
  },
  {
    t: "What it does to your Medicare premium two years later",
    b: "Medicare sets your Part B and Part D premiums from a tax return two years back. Which accounts you draw from while you wait to claim can push that return over a bracket line and raise your premium in a year you have forgotten about it. The waiting years are often the best years you will ever get for a Roth conversion, and also the easiest years to trip the surcharge by accident.",
  },
  {
    t: "How much of the benefit gets taxed",
    b: "Up to 85 percent of your Social Security can be taxable depending on your other income, and those thresholds have never been indexed to inflation, so more people cross them every year. Two households with the same total income can owe noticeably different tax on the same benefit, purely because of which accounts the rest of the money came out of.",
  },
  {
    t: "Working while you claim, before full retirement age",
    b: "Claim before full retirement age and keep working, and earnings above an annual limit withhold part of your benefit. It is not lost forever — your benefit is recalculated upward at full retirement age — but it surprises people who did not expect their first checks to be smaller than the statement said.",
  },
] as const;

const FAQ = [
  {
    q: "What is the best age to take Social Security?",
    a: "There is no single answer, and anybody who gives you one without asking about your health, your marriage and your other income is guessing. The three things that decide it are how long you expect to need the money, whether somebody would inherit your benefit as a survivor, and what you would otherwise be living on in the meantime.",
  },
  {
    q: "How much less do I get at 62?",
    a: "About 30 percent less than at full retirement age if you were born in 1960 or later, and that reduction is permanent. It does not go back up when you reach 67.",
  },
  {
    q: "Is waiting until 70 worth it?",
    a: "Roughly 8 percent a year, guaranteed and inflation-adjusted, is a real return that is hard to match elsewhere. Whether it is worth it to you depends on what you would live on while you wait and how long you expect to collect. For a married couple’s higher earner it is worth more than the break-even math suggests, because it also raises what the survivor keeps.",
  },
  {
    q: "Does taking Social Security affect my Medicare premium?",
    a: "Indirectly, and it catches people. Medicare sets your premium from your income two years earlier, so the accounts you draw from while waiting to claim — a large IRA withdrawal, a Roth conversion, selling property — can push you over a bracket line and raise your premium later. Planning the two together is most of the value in doing this properly.",
  },
  {
    q: "Can I change my mind after I claim?",
    a: "There is a narrow withdrawal window within twelve months of claiming, and it requires paying back what you have received, and you only get to do it once. There is also the option at full retirement age of suspending your benefit to earn delayed credits. Both are real, both are limited, and neither is a substitute for getting the first decision right.",
  },
  {
    q: "Do you sell Social Security?",
    a: "Nobody does — it is a federal benefit, and I am not affiliated with the Social Security Administration. I am a licensed insurance agent, so I can walk through the timing, the survivor question and the Medicare consequences with you, and I will tell you plainly when what you need is a CPA or a registered investment adviser instead of me.",
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
                "What claiming at 62, 67 or 70 actually costs, the survivor benefit break-even math ignores, and how the decision lands on your Medicare premium two years later.",
              path: "/social-security-timing",
              datePublished: "2026-08-31",
              dateModified: "2026-08-31",
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
                "What claiming at 62, at full retirement age, and at 70 each costs, before the survivor and Medicare pieces most calculators skip.",
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
        lede="The break-even math is the easy part, and it’s all anybody puts online. What decides it for most households is the piece those calculators leave out — what happens to the benefit when one spouse dies, and what your income in the waiting years does to your Medicare premium two years later."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Talk it through →"
        note="Meet in person or by phone. No cost, and nobody is paid on the date you pick — including me."
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
            You can claim in any month in between, not just on those three birthdays. The benefit
            adjusts month by month, so a decision to wait another six months is a real decision and
            not a rounding error.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What the calculators leave out</h2>
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
            className="text-18 mt-8 border-l-4 py-3 pl-5 leading-relaxed"
            style={{ borderColor: "#7a5c12" }}
          >
            The years between retiring and claiming are usually the lowest-income years of your
            life, which makes them the best years for a Roth conversion and the easiest years to
            trigger a Medicare surcharge by accident.{" "}
            <Link href="/plan" className="underline underline-offset-2">
              There’s a calculator here that shows both at once
            </Link>{" "}
            — how much you can convert before you cross the next bracket line.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I stop</h2>
          <p className="text-18 mt-4 leading-relaxed">
            I’m a licensed insurance agent, not a registered investment adviser and not the Social
            Security Administration. I can walk through the timing, the survivor question and the
            Medicare consequences, and I’ll say so plainly when the answer you need is a CPA’s or an
            adviser’s. Nobody sells Social Security, so nobody is paid on which date you pick,
            including me.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your own numbers come from your Social Security statement at ssa.gov, and it’s worth
            pulling before any conversation about this — including one with me.
          </p>
          <GuideTownLinks kind="retirement" heading="Retirement pages for the towns I drive to" />
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
            heading="Medicare, life insurance, and the retirement page itself"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Bring your statement and your questions"
        body="I’ll walk through what each claiming age does to your income, your spouse’s income later on, and your Medicare premium. No cost, and no appointment needed to ask."
        href="/start?topic=financial_planning"
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
