import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The tax-aware moat, as a page.
 *
 * Almost nobody selling Medicare in this market can talk about Form SSA-44,
 * and the people it applies to — anyone who just retired and is being charged
 * on the income they earned two years ago — are exactly the households worth
 * knowing. It is also genuinely useful whether or not they ever call.
 *
 * Everything here is a structural rule rather than a dollar figure, so it does
 * not go stale. The bracket amounts live in the calculator at /medicare.
 */

export const metadata: Metadata = {
  title: { absolute: "Appealing a High Medicare Premium — Form SSA-44" },
  description:
    "If your income has fallen after retirement or another qualifying life change, Social Security may be able to review your income-related Medicare premium charges.",
  alternates: { canonical: "/irmaa-appeal" },
  openGraph: pageOpenGraph({
    title: "Appealing a high Medicare premium (Form SSA-44)",
    description:
      "Retired since the tax year Medicare is using? You may not have to pay the higher premium. Here is what qualifies.",
    path: "/irmaa-appeal",
  }),
};

const QUALIFYING = [
  { event: "You stopped working", note: "This can include leaving work for retirement." },
  { event: "You reduced your hours", note: "A reduction in your work hours can qualify." },
  {
    event: "You got married",
    note: "Marriage can change your household income and filing status.",
  },
  {
    event: "You divorced, or had a marriage annulled",
    note: "Divorce or annulment may affect household income.",
  },
  {
    event: "Your spouse died",
    note: "The loss of a spouse can change household income.",
  },
  {
    event: "You lost a pension",
    note: "Certain losses or reductions in pension income can qualify. Check the requirements in Form SSA-44.",
  },
  {
    event: "You lost income-producing property",
    note: "Through a disaster, or something outside your control. Selling it does not count.",
  },
  {
    event: "You received an employer settlement",
    note: "From a bankruptcy, a closure, or a reorganization.",
  },
] as const;

const NOT_QUALIFYING = [
  "Selling a house, even if the gain is what pushed your income up",
  "A one-off capital gain from selling investments",
  "A Roth conversion",
  "A large withdrawal from a retirement account",
  "A taxable distribution from an inherited retirement account",
] as const;

const FILING_STEPS = [
  {
    name: "Review your Medicare premium notice",
    text: "Social Security tells you what your premium will be and which tax year they used. That letter is what you’re responding to.",
  },
  {
    name: "Fill in Form SSA-44",
    text: "You state which event happened, when, and what you expect your income to be for the more recent year.",
  },
  {
    name: "Bring evidence",
    text: "Gather documents that support the event and your expected income, such as an employer letter or pension statement. The form’s instructions explain what evidence may be needed.",
  },
  {
    name: "File it with Social Security",
    text: "Contact Social Security for instructions on submitting your request and supporting documents.",
  },
] as const;

const FAQ = [
  {
    q: "How do I know whether this applies to me?",
    a: "Social Security sends a letter — an initial determination notice — telling you your Part B and Part D premiums for the coming year. If it shows an income-related amount on top of the standard premium and your income has dropped since the tax year they used, that’s the signal.",
  },
  {
    q: "Which tax year is Medicare using?",
    a: "Medicare generally uses the tax return from two years before the premium year. For example, 2026 income-related charges generally use 2024 income. If your income has since fallen because of a qualifying life change, you can ask about a review.",
  },
  {
    q: "What if the income is right but I disagree with the determination?",
    a: "Follow the instructions on your notice to contact Social Security about reconsideration. If you filed an amended tax return or believe the income information is incorrect, tell the representative so they can explain the appropriate process.",
  },
  {
    q: "Does it cost anything to have you look at this?",
    a: "There is no charge for a consultation. I can help you understand the notice and prepare questions for Social Security. They decide whether your premium can change. For tax advice, you’ll need a qualified tax professional.",
  },
] as const;

export default function IrmaaAppealPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "IRMAA appeal", path: "/irmaa-appeal" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Appealing a high Medicare premium (Form SSA-44)",
              description:
                "Learn which life changes may qualify for a review of income-related Medicare premium charges and how to prepare a request to Social Security.",
              path: "/irmaa-appeal",
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
              name: "How to file Form SSA-44 for a Medicare IRMAA appeal",
              description:
                "Four steps to ask Social Security to recalculate a Medicare premium after a qualifying life-changing event.",
              path: "/irmaa-appeal",
              steps: FILING_STEPS,
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "IRMAA appeal" }]}
        eyebrow={`${AGENT.city} · Form SSA-44`}
        title="Has your income gone down since you retired?"
        lede="Medicare generally uses income from two years earlier to calculate income-related premium charges. If you’ve retired, reduced your work hours, or had another qualifying life change, you may be able to request a review through Social Security."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare&ask=premium"
        secondaryLabel="Ask about your Medicare premiums →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The eight events that qualify</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Social Security recognizes the following life-changing events. If one applies to you and
            your income has gone down, you can ask Social Security to review the income used to
            calculate your Medicare premiums.{" "}
          </p>

          <dl className="mt-8 flex flex-col gap-5">
            {QUALIFYING.map((item, index) => (
              <div key={item.event} className="flex gap-4 border-t border-gray-300 pt-5">
                <span className="text-15 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <dt className="text-19 font-semibold">{item.event}</dt>
                  <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.note}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            Income changes that may need a different approach
          </h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            A temporary increase in income, by itself, generally does not qualify as a life-changing
            event for Form SSA-44. Examples include the transactions below. If you think the income
            information or decision is wrong, contact Social Security about a review.
          </p>
          <ul className="text-18 mt-6 flex list-disc flex-col gap-3 pl-6 leading-relaxed">
            {NOT_QUALIFYING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="card-surface mt-8 p-6">
            <p className="text-18 leading-relaxed">
              Before a large withdrawal or Roth conversion, ask your tax professional or financial
              advisor how the additional income could affect your taxes and future Medicare
              premiums. Our calculator can help you explore an estimate using 2026 rates.
            </p>
            <Link
              href="/roth-window"
              className="text-17 mt-4 inline-block font-medium underline underline-offset-4"
            >
              Estimate the Medicare premium effect →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold"> How to prepare your request </h2>
          <ol className="text-18 mt-6 flex flex-col gap-5 leading-relaxed">
            {FILING_STEPS.map((step, index) => (
              <li key={step.name}>
                <strong>
                  {index + 1}. {step.name}.
                </strong>{" "}
                {step.text}
              </li>
            ))}
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            You can find the current form and instructions at{" "}
            <a
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              ssa.gov
            </a>
            . Social Security reviews your request and determines whether your premium can change.
          </p>
          <GuideTownLinks heading="Personal Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get about this</h2>
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

      <KitchenTableClose
        heading="Would you like help understanding your notice?"
        body="We can look at your notice, discuss what has changed, and identify questions to take to Social Security. Your consultation is no cost, with no obligation."
        href="/start?topic=medicare&stage=already_on_medicare&ask=premium"
        label="Tell me what changed →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          To see the brackets your notice is based on, along with every other published figure for
          the year, see{" "}
          <Link href="/medicare-costs-2026" className="underline underline-offset-2">
            what Medicare costs in 2026
          </Link>
          . For help reviewing changes to your plan, read{" "}
          <Link href="/annual-enrollment" className="underline underline-offset-2">
            our annual enrollment guide
          </Link>
          .
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
