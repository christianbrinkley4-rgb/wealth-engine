import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Annuities, written to be trusted rather than to convert.
 *
 * Every other page ranking for "annuities" in this market is either an
 * insurer's brochure or a lead form wearing an article's clothes, and the
 * people searching know it — which is why the query converts so badly for
 * everyone running it. The gap in the market is the page that says plainly
 * when an annuity is the wrong answer, and it happens to be the page a
 * language model will quote, because it is the only one making a falsifiable
 * claim rather than a promise.
 *
 * Scope note: fixed and indexed annuities are insurance products and sit
 * inside a life licence. Variable annuities are securities and do not, so this
 * page says so rather than quietly blurring the line.
 */

export const metadata: Metadata = {
  title: { absolute: "Annuities and Retirement Income | Greensboro, NC" },
  description:
    "What a fixed or indexed annuity does, when it’s the wrong answer, and what to ask before you sign. From a licensed agent in Greensboro. No cost to talk.",
  alternates: { canonical: "/annuities" },
  openGraph: pageOpenGraph({
    title: "Understanding annuities and retirement income",
    description:
      "When a fixed or indexed annuity makes sense, when it does not, and the questions worth asking first.",
    path: "/annuities",
  }),
};

const FAQ = [
  {
    q: "What does an annuity actually do?",
    a: "An annuity is a contract with an insurance company. Depending on the contract, it can help build savings for retirement or provide income now or later. Benefits, fees, access to your money, and guarantees vary.",
  },
  {
    q: "Is an annuity a good investment?",
    a: "An annuity may be one part of a retirement income plan. Different types have different risks and features. We can discuss the insurance products I offer and involve a financial advisor when reviewing how they fit with your investments.",
  },
  {
    q: "What is the catch?",
    a: "Understand when you can withdraw money and what charges may apply. Early withdrawals can involve surrender charges, other adjustments, or taxes. Keep your emergency needs in mind before committing money.",
  },
  {
    q: "Can I put my 401(k) into one?",
    a: "Some retirement funds may be eligible for a rollover to an annuity. Before deciding, review your current plan, costs, tax treatment, and access to your money with the appropriate financial and tax professionals.",
  },
  {
    q: "Do you sell variable annuities?",
    a: "Variable annuities require a securities license. I offer fixed and fixed indexed insurance products. For securities or investment advice, I work with an advisor.",
  },
  {
    q: "How are you paid on an annuity?",
    a: "The insurance company pays me a commission when a contract is issued. I’ll explain how I’m paid and review the contract’s costs and terms with you before you decide.",
  },
] as const;

const WRONG_FITS = [
  {
    t: "You might need the money in the next few years",
    b: "Consider the savings you need for emergencies, household expenses, and other planned purchases. Review withdrawal limits and charges before placing money in an annuity.",
  },
  {
    t: "You are looking for growth",
    b: "A fixed indexed annuity may limit the interest credited through caps, participation rates, or other terms. Understand those limits and how interest is calculated before comparing it with other options.",
  },
  {
    t: "You’re unsure which figures are guaranteed",
    b: "Ask which values are guaranteed and which are illustrations. Review the conditions behind any income amount, interest credit, or optional benefit shown in a proposal.",
  },
  {
    t: "It would take most of what you have",
    b: "Consider how much of your savings you would still have available for other needs. A financial advisor can help assess the proposal alongside the rest of your retirement plan.",
  },
] as const;

export default function AnnuitiesPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annuities", path: "/annuities" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Understanding annuities in Greensboro",
              description:
                "What a fixed or indexed annuity does, when it is the wrong answer, and what to ask before signing.",
              path: "/annuities",
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
            howToJsonLd({
              name: "Questions to ask before choosing an annuity",
              description:
                "Review access to your money, how interest is credited, guarantees, and how an annuity would fit with your other savings.",
              path: "/annuities",
              steps: WRONG_FITS.map((item) => ({ name: item.t, text: item.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Annuities" }]}
        eyebrow={`${AGENT.city} · ${AGENT.region}`}
        title="Could an annuity fit your retirement plans?"
        lede="If you’re considering an annuity, you deserve time to understand it. We can discuss how it works, what it costs, when you can access your money, and whether it fits your retirement needs."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Ask a question first →"
        note="Meet at home or by phone. Your consultation is no cost, with no obligation to buy anything."
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> Understanding the contract </h2>
          <p className="text-18 mt-4 leading-relaxed">
            An annuity is a contract with an insurance company. Some contracts provide income right
            away; others allow you to save for income later. Payment options, interest, fees, and
            guarantees depend on the contract.{" "}
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Before considering a contract, think about the income you already have, what you need
            for everyday expenses, and the savings you want to keep available. We can review those
            questions together.{" "}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four times the answer is no</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Take time to discuss these questions before making a decision.{" "}
          </p>
          <ul className="mt-8 flex flex-col gap-6">
            {WRONG_FITS.map((item) => (
              <li key={item.t} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What I can walk you through</h2>
          <p className="text-18 mt-4 leading-relaxed">
            My North Carolina insurance license covers fixed and indexed annuities, life insurance,
            and Medicare. Those are the contracts I can explain line by line, compare against each
            other, and put in place for you — including the parts people gloss over, like the
            surrender period and what it costs to reach your own money early.
          </p>
          <p className="text-18 mt-4 leading-relaxed">
            We start by reviewing your situation together, because an annuity only makes sense next
            to everything else you have. If what you actually need is an investment adviser or a tax
            professional, I introduce you to one — a name and a conversation, not a brush-off.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Variable annuities are securities and sit outside my license, so those conversations go
            to the right professional, who explains their own services and fees first.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about annuities</h2>
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
        heading="Have a proposal in front of you?"
        body="Bring the proposal or a statement from a contract you already own. We can review the guarantees, fees, withdrawal rules, and your questions together. There’s no obligation to make a change."
        href="/start?topic=financial_planning"
        label="Ask a question first →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
