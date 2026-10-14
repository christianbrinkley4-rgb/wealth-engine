import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Turning 65 on an ACA Marketplace plan.
 *
 * Targets "turning 65 marketplace plan medicare". Covers the subsidy
 * cliff at 65, when to enroll in Medicare, ending Marketplace coverage,
 * and the HSA contribution trap. No invented deadlines; all timing is
 * standard Medicare enrollment rules.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Turning 65 on an ACA Marketplace Plan: What to Do and When",
  },
  description:
    "On a Marketplace plan and approaching 65? Your subsidies end when Medicare starts. When to enroll, when to cancel your Marketplace plan, and the HSA trap.",
  alternates: { canonical: "/guides/turning-65-aca-marketplace-plan" },
  openGraph: pageOpenGraph({
    title: "Turning 65 on an ACA Marketplace plan",
    description:
      "Your subsidies end at 65. The enrollment timing, the cancellation step, and the HSA trap.",
    path: "/guides/turning-65-aca-marketplace-plan",
  }),
  twitter: pageTwitter({
    title: "Turning 65 on an ACA Marketplace plan",
    description:
      "Your subsidies end at 65. The enrollment timing, the cancellation step, and the HSA trap.",
    path: "/guides/turning-65-aca-marketplace-plan",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Can I keep my Marketplace plan instead of enrolling in Medicare at 65?",
    a: "You can technically keep it, but it is almost always a bad idea. Once you are eligible for premium-free Part A, you lose eligibility for Marketplace premium tax credits. You would pay the full Marketplace premium out of pocket while also being eligible for Medicare. Almost everyone is better off moving to Medicare.",
  },
  {
    q: "When should I enroll in Medicare if I have a Marketplace plan?",
    a: "During your Initial Enrollment Period: the seven months around your 65th birthday (three months before, your birthday month, three months after). Enroll in the three months before your birthday month and your coverage starts the first of your birthday month. That timing lets you end your Marketplace plan cleanly.",
  },
  {
    q: "Do I need to cancel my Marketplace plan myself?",
    a: "Yes. Your Marketplace plan does not cancel automatically when Medicare starts. Log into your Marketplace account and end your coverage effective the day your Medicare begins. If you do not, you keep paying the Marketplace premium and you may have to repay any tax credits you received after becoming Medicare-eligible.",
  },
  {
    q: "What is the HSA trap when turning 65?",
    a: "You cannot contribute to a Health Savings Account once you enroll in any part of Medicare, including premium-free Part A. Part A can be retroactive up to six months when you enroll after 65, which means contributions you already made can become excess contributions subject to a tax penalty. Stop HSA contributions before your Medicare starts. The money already in your HSA stays yours and can still pay for qualified medical expenses.",
  },
  {
    q: "What if I am still working at 65 with employer coverage?",
    a: "Different rules. If you have qualifying employer coverage from active employment (yours or your spouse's), you can generally delay Medicare without penalty and keep your employer plan. The Marketplace guidance in this article is for people whose main coverage is an individual Marketplace plan, not employer coverage.",
  },
  {
    q: "Will I owe back the subsidies I received after turning 65?",
    a: "You can. Premium tax credits are only for people who are not eligible for other qualifying coverage, including premium-free Medicare Part A. If you kept receiving credits after becoming eligible for Medicare, you may have to repay some or all of them when you file your taxes. This is why the timing of your Medicare enrollment and Marketplace cancellation matters.",
  },
];

export default function MarketplaceToMedicarePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/turning-65-aca-marketplace-plan" },
              { name: "Marketplace to Medicare", path: "/guides/turning-65-aca-marketplace-plan" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Turning 65 on an ACA Marketplace Plan: What to Do and When",
              description:
                "Subsidies end at 65. When to enroll in Medicare, when to cancel your Marketplace plan, and the HSA trap.",
              path: "/guides/turning-65-aca-marketplace-plan",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
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
          { name: "Marketplace to Medicare" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Turning 65 on an ACA Marketplace plan"
        lede="Your Marketplace subsidies end when Medicare starts. Here is the timing, the cancellation step people forget, and the HSA trap."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free transition review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Once you are eligible for premium-free Medicare Part A at 65, you lose eligibility
              for Marketplace premium tax credits. Enroll in Medicare during your Initial
              Enrollment Period, end your Marketplace plan effective the day Medicare starts, and
              stop HSA contributions before Medicare begins. Miss any of these steps and you can
              end up paying full price for coverage you do not need, or owing back subsidies at
              tax time.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The subsidy cliff</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the core of it. Premium tax credits on the Marketplace are only available to
            people who do not have access to other qualifying coverage. Premium-free Medicare
            Part A counts as qualifying coverage. The month you become eligible for it, your
            subsidy eligibility ends.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Keeping your Marketplace plan past 65 without subsidies means paying the full
            premium out of pocket, on top of being eligible for Medicare. For almost everyone,
            that is the worst of both worlds. The move is to transition to Medicare, not to
            hold onto the Marketplace plan.
          </p>

          <h2 className="text-28 mt-12 font-semibold">When to enroll in Medicare</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Your Initial Enrollment Period runs seven months: the three months before your 65th
            birthday month, your birthday month, and the three months after. Enroll in the three
            months before your birthday month and your Medicare coverage starts on the first day
            of your birthday month.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Enrolling early matters more than usual when you are coming off a Marketplace plan,
            because you want your Medicare start date and your Marketplace end date to line up.
            Enroll late and your coverage starts later, which leaves an awkward gap where you
            are paying full price for the Marketplace plan or going without coverage.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Cancel your Marketplace plan yourself</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the step people miss. Your Marketplace plan does not cancel itself when
            Medicare starts. You have to log into your Marketplace account and end your
            coverage, effective the day your Medicare begins.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you skip this, two bad things happen. You keep paying the Marketplace premium
            for coverage you no longer need. And if you were still receiving premium tax
            credits after becoming eligible for Medicare, you may have to repay some or all of
            them when you file your taxes. Set a reminder for the week your Medicare starts.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The HSA trap</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you have a high-deductible health plan with a Health Savings Account, read this
            part twice. You cannot contribute to an HSA once you are enrolled in any part of
            Medicare, including premium-free Part A.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The trap: Part A can be retroactive up to six months when you enroll after age 65.
            Contributions you made during those retroactive months become excess contributions,
            and excess contributions get hit with a 6 percent excise tax each year they stay in
            the account.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The fix is simple: stop HSA contributions before your Medicare coverage starts. If
            you are enrolling right at 65, stop contributing the month before your birthday
            month. If you are delaying Medicare past 65, stop six months before you plan to
            enroll. The money already in your HSA stays yours. You can still use it for
            qualified medical expenses, including Medicare premiums, copays, and prescriptions.
            You just cannot add more.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What about dental and vision</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One thing people miss in the transition: many Marketplace plans include some dental
            or vision coverage, and Original Medicare does not cover routine dental, vision, or
            hearing. When you compare your Medicare options, factor in what you are giving up.
            Some Medicare Advantage plans include dental and vision benefits. With Original
            Medicare plus Medigap, you would buy separate dental and vision coverage or pay out
            of pocket.{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Here is the Advantage versus Medigap comparison
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">Your timeline</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Three months before your 65th birthday month:</strong>{" "}
              Enroll in Medicare Parts A and B through Social Security. Stop HSA contributions.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Before your birthday month:</strong>{" "}
              Choose your Medicare path: Advantage, or Original Medicare plus Medigap and Part
              D. Compare using your actual doctors and prescriptions.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">The week Medicare starts:</strong>{" "}
              Log into your Marketplace account and end your Marketplace coverage effective
              your Medicare start date.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">At tax time:</strong>{" "}
              Reconcile any premium tax credits on your return. If everything was timed right,
              there is nothing to repay.
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            New to Medicare entirely?{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              Start with the turning 65 guide
            </Link>
            . It covers the enrollment basics this article assumes you know.
          </p>
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
            On a Marketplace plan and turning 65 soon? Call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}. We will time the transition so nothing overlaps
            and nothing gets missed. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="turning-65-aca-marketplace-plan" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Turning 65 on a Marketplace plan? Let's time it right"
        body={`Tell me when you turn 65 and what coverage you have now. We will map out the enrollment, the cancellation, and the HSA timing. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Book a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
