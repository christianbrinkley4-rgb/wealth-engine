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
    "Medicare sets your premium from a tax return two years old. If you retired or your household changed, Form SSA-44 can get it recalculated. What qualifies.",
  alternates: { canonical: "/irmaa-appeal" },
  openGraph: pageOpenGraph({
    title: "Appealing a high Medicare premium (Form SSA-44)",
    description:
      "Retired since the tax year Medicare is using? You may not have to pay the higher premium. Here is what qualifies.",
    path: "/irmaa-appeal",
  }),
};

const QUALIFYING = [
  { event: "You stopped working", note: "Retirement is the most common one by a wide margin." },
  { event: "You reduced your hours", note: "A genuine cut in work, not a slow year." },
  { event: "You got married", note: "Filing status changes which thresholds apply to you." },
  { event: "You divorced, or had a marriage annulled", note: "Same reason." },
  {
    event: "Your spouse died",
    note: "Often the year a survivor’s premium jumps for no obvious reason.",
  },
  {
    event: "You lost a pension",
    note: "The pension income itself ending — not a change in how much you draw from savings.",
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
  "A Roth conversion — which is why the timing of one matters so much before 65",
  "A large withdrawal from a retirement account",
  "An inheritance, or a distribution from an inherited account",
] as const;

const FILING_STEPS = [
  {
    name: "Wait for the determination letter",
    text: "Social Security tells you what your premium will be and which tax year they used. That letter is what you’re responding to.",
  },
  {
    name: "Fill in Form SSA-44",
    text: "You state which event happened, when, and what you expect your income to be for the more recent year.",
  },
  {
    name: "Bring evidence",
    text: "Whatever proves the event — a letter from your employer, a death certificate, a marriage certificate, a pension statement — plus something supporting the income figure you’re claiming.",
  },
  {
    name: "File it with Social Security",
    text: "Your local office or the national line can take it — not Medicare, and not the IRS.",
  },
] as const;

const FAQ = [
  {
    q: "How would I even know this applies to me?",
    a: "Social Security sends a letter — an initial determination notice — telling you your Part B and Part D premiums for the coming year. If it shows an income-related amount on top of the standard premium and your income has dropped since the tax year they used, that’s the signal.",
  },
  {
    q: "Which tax year is Medicare using?",
    a: "Generally the return from two years before the premium year. That two-year lag is the whole reason this form exists — someone who retired last year is being charged on the income they earned while still working.",
  },
  {
    q: "What if the income is right but I disagree with the determination?",
    a: "That’s a different route — a request for reconsideration rather than a life-changing-event form. It’s also what you’d use if Social Security worked from the wrong year’s data or you’ve since filed an amended return.",
  },
  {
    q: "Does it cost anything to have you look at this?",
    a: "I’m not a tax preparer and I don’t file the form for you, but I can tell you whether your situation looks like one of the eight events, what evidence you’d need, and where it goes. If it turns out you need a CPA, I’ll say so.",
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
                "Medicare sets your premium from a tax return two years old. The eight life-changing events that qualify, and how filing Form SSA-44 actually works.",
              path: "/irmaa-appeal",
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
        title="You retired last year. Medicare is charging you on what you earned two years ago."
        lede="That is not a mistake — it’s how the rules work. Medicare sets the income-related part of your premium from a tax return two years old. But if the reason your income was high back then has since ended, there is a form for that, and most people have never heard of it."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare&ask=premium"
        secondaryLabel="Have me look at it →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The eight events that qualify</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Social Security calls these life-changing events. The list is closed — it is not a
            general appeal for “my income went down.” If one of these applies, you can ask them to
            use a more recent year instead.
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
            What doesn’t qualify — and this is where people get caught
          </h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            A one-off spike in income is the most common reason someone’s premium jumps, and it is
            generally <em>not</em> appealable. The event has to be one of the eight, not simply a
            year that looked unusual.
          </p>
          <ul className="text-18 mt-6 flex list-disc flex-col gap-3 pl-6 leading-relaxed">
            {NOT_QUALIFYING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="card-surface mt-8 border-l-4 border-l-[var(--color-gold-ink)] p-6">
            <p className="text-18 leading-relaxed">
              Which is the argument for planning the timing of a large withdrawal or a Roth
              conversion <strong>before</strong> you turn 63 — because at that point the two-year
              lookback means it lands on your first Medicare premium, and no form will undo it.
            </p>
            <Link
              href="/roth-window"
              className="text-17 mt-4 inline-block font-medium underline underline-offset-4"
            >
              Estimate a conversion against the brackets →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How filing actually goes</h2>
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
            Get the current form and the authoritative rules from{" "}
            <a
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              ssa.gov
            </a>
            . Do not rely on this page for the filing itself — it changes, and they are the ones who
            decide.
          </p>
          <GuideTownLinks heading="I sit down in these towns if you would rather not file this alone" />
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
        heading="Not sure whether yours qualifies?"
        body="Tell me what changed and I’ll tell you straight whether it’s one of the eight. No charge, and no obligation to do anything else."
        href="/start?topic=medicare&stage=already_on_medicare&ask=premium"
        label="Tell me what changed →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          If the increase came with a letter about next year’s plan rather than your income,{" "}
          <Link href="/annual-enrollment" className="underline underline-offset-2">
            the annual enrollment page
          </Link>{" "}
          is the one you want.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
