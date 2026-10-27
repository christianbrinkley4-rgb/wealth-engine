import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "@/components/Link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Going on Medicare when your spouse is younger than 65.
 *
 * Medicare is individual coverage. Covers the younger spouse's options and
 * the federal timing rules. No premium figures.
 */

const PATH = "/guides/medicare-spouse-younger-than-65";

export const metadata: Metadata = {
  title: {
    absolute: "Going on Medicare When Your Spouse Is Younger Than 65",
  },
  description: "Medicare doesn't cover spouses. If you turn 65 first, here's how your younger spouse can stay covered, and what to check before you leave your employer plan.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Going on Medicare when your spouse is younger than 65",
    description: "Medicare covers one person at a time. If you're turning 65 and your spouse isn't, here are the coverage options and the timing that matters.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Going on Medicare when your spouse is younger than 65",
    description: "Medicare covers one person at a time. If you're turning 65 and your spouse isn't, here are the coverage options and the timing that matters.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Can my spouse get Medicare when I turn 65?",
    a: "No. Medicare eligibility is individual. Your spouse qualifies when they turn 65, or earlier only if they qualify on their own through disability. Your turning 65 doesn't make them eligible.",
  },
  {
    q: "Can I add my younger spouse to my Medicare plan?",
    a: "No. Medicare, Medicare Advantage, Medicare Supplement, and Part D plans each cover one person. There's no family or spouse coverage. Your spouse needs their own health insurance until they qualify for Medicare.",
  },
  {
    q: "What health insurance can my spouse get if I retire at 65?",
    a: "The usual options are their own employer's plan, COBRA from your employer, a Marketplace plan through HealthCare.gov, or retiree coverage if your employer offers it. Losing your employer coverage generally opens a special sign-up window for the first three.",
  },
  {
    q: "Should I keep working so my spouse stays covered?",
    a: "That's a personal decision, and coverage is only one part of it. If your employer has 20 or more employees, you can generally keep the plan for both of you and delay Part B without a penalty. Compare that with what a Marketplace plan or COBRA would cost your spouse.",
  },
  {
    q: "Will my spouse's choices be tied to mine when they turn 65?",
    a: "No. Your spouse makes their own Medicare choices when they become eligible. The two of you can have different types of coverage and different plans.",
  },
];

export default function MedicareSpouseYoungerThan65Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Younger spouse", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Going on Medicare When Your Spouse Is Younger Than 65",
              description: "Medicare doesn't cover spouses. If you turn 65 first, here's how your younger spouse can stay covered, and what to check before you leave your employer plan.",
              path: PATH,
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Younger spouse" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Going on Medicare when your spouse is younger than 65"}
        lede={"Medicare covers you. It doesn't cover your husband or wife. If you turn 65 first and your spouse has been on your health plan, you need a plan for them before you make any changes."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"There's no family coverage in Medicare. Each person qualifies on their own, usually at 65. If your younger spouse is on your employer plan, find out what happens to their coverage before you retire or drop that plan. Their main options are your employer plan if you keep working, COBRA, a Marketplace plan, or their own job's coverage."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"Medicare is one person at a time"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This surprises a lot of couples. For years you've had one health plan that covered both of you. Medicare doesn't work that way. You'll have your own Medicare card, and your spouse will get their own when they qualify, usually at 65."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"So the question isn't really about your Medicare. It's about what your spouse does for coverage in the gap between your 65th birthday and theirs."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you're still working"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you have health coverage through your current job, you may not need to change anything yet. When the employer has 20 or more employees, you can generally keep the employer plan, keep your spouse on it, and delay Part B without a penalty. When you do stop working, you get a Special Enrollment Period to sign up."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If the employer has fewer than 20 employees, Medicare usually pays first at 65, so you'd want Part A and Part B. Your spouse may still be able to stay on the employer plan. Ask your benefits office how it works for both of you. There's more detail in my guide to "}
            <Link href="/guides/medicare-part-b-employer-coverage" className="underline underline-offset-2">
              {"Part B and employer coverage"}
            </Link>
            {"."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you're retiring and your spouse needs coverage"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This is where planning matters. When your employer coverage ends, your spouse loses it too. Here are the usual options."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Their own employer plan."}</strong>{" "}
              {"If your spouse works and their job offers health insurance, losing your coverage generally lets them enroll outside the normal sign-up window. They should ask their HR office about the deadline."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"COBRA from your employer."}</strong>{" "}
              {"COBRA lets your spouse keep the same plan for a limited time by paying the full premium. It's usually the most expensive choice, but it keeps the same doctors and can bridge a short gap."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"A Marketplace plan."}</strong>{" "}
              {"Losing your employer coverage opens a Special Enrollment Period on HealthCare.gov. Your spouse generally has 60 days to pick a plan. Depending on your household income, they may qualify for help with the premium."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Retiree coverage."}</strong>{" "}
              {"Some employers offer retiree health benefits that include a spouse. If yours does, read the terms before you turn it down, because you often can't get it back."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Which one fits depends on your spouse's age, health, doctors, and how long the gap is. A two-year gap and a seven-year gap are very different decisions."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Things couples often miss"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Part A on your spouse's work record."}</strong>{" "}
              {"If you didn't work long enough to get Part A without a premium, you may qualify through your spouse's work record once they're at least 62."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Health savings accounts."}</strong>{" "}
              {"Once you're enrolled in any part of Medicare, you can't add money to your own HSA. Your spouse's HSA follows their own coverage, not yours. See "}
              <Link href="/guides/medicare-hsa-contributions" className="underline underline-offset-2">
                {"Medicare and HSA contributions"}
              </Link>
              {"."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Income-related premiums."}</strong>{" "}
              {"If you file taxes jointly, your combined income from two years ago decides whether you pay more for Part B and Part D. A spouse who's still earning can push that up."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Dropping coverage too soon."}</strong>{" "}
              {"Don't cancel the employer plan until your Medicare is active and your spouse's new coverage has a start date."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"A simple order to work through"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"First,"}</strong>{" "}
              {"ask your benefits office what happens to your spouse's coverage when you enroll in Medicare, and when you retire. Get it in writing if you can."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Second,"}</strong>{" "}
              {"write down your spouse's doctors and prescriptions. Any new plan needs to work for those."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Third,"}</strong>{" "}
              {"compare the options above on total cost, not just the premium."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Fourth,"}</strong>{" "}
              {"line up the dates so nobody has a month without coverage."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"When your spouse reaches 65, they'll go through their own enrollment. Your choices don't lock in theirs. One of you can have a Medicare Supplement and the other a Medicare Advantage plan if that's what fits. And once you're both on Medicare, each of you can review your coverage every fall. I explain that window on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {"."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"I'm a licensed insurance agent, so I can help with the Medicare side and point you to the right place for the rest. If you'd like to map out the dates for both of you, "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". Your spouse is welcome to join."}
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
            {"Turning 65 before your spouse?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-spouse-younger-than-65" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Plan the gap for both of you"}
        body={`${"Tell me your birthday, your spouse's birthday, and when your employer coverage ends. I’ll lay out the dates and the options side by side."} Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
