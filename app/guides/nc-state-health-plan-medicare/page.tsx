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
 * NC State Health Plan retirees and Medicare.
 *
 * Targets "nc state health plan medicare" / "state retiree medicare nc".
 * Local angle national sites cannot copy. All program facts verified from
 * public sources (hr.unc.edu, NC Health News). No plan recommendations;
 * retirees should confirm details with the State Health Plan each year.
 *
 * 2027 section (Oct 27, 2026) verified against shpnc.gov's Medicare-member
 * open enrollment page (Oct 12 - Nov 6, 2026; 70/30 members who do nothing
 * move to the Base plan; 70/30 tiered network), the NC Treasurer's Oct 14,
 * 2026 release (Atrium to the out-of-network tier) and Becker's Payer
 * Issues, June 8, 2026 (out-of-pocket maximums, Part B drug copay).
 * Atrium REVERSED Oct 27, 2026: multi-year deal puts all Atrium doctors and
 * hospitals in the plan's "access" tier for 2027 (WFDD / NC Newsroom and
 * NC Health News, Oct 27, 2026). Neither says how tiers apply to the
 * Medicare Advantage group plans, so the page points to the support center.
 * After Nov 6, 2026 the deadline copy goes stale: update or remove it.
 */

export const metadata: Metadata = {
  title: {
    absolute: "NC State Health Plan Medicare Retirees: 2027 Changes, Nov. 6 Deadline",
  },
  description:
    "NC state retirees on Medicare: 2027 open enrollment ends November 6, 2026. 70/30 plan members who do nothing move to the Base Medicare Advantage plan, out-of-pocket maximums rise, and Atrium Health stays in network. What to check.",
  alternates: { canonical: "/guides/nc-state-health-plan-medicare" },
  openGraph: pageOpenGraph({
    title: "NC State Health Plan retirees: 2027 changes and the Nov. 6 deadline",
    description:
      "What changes for state retirees on Medicare in 2027, what happens if you do nothing, and what to check before November 6.",
    path: "/guides/nc-state-health-plan-medicare",
  }),
  twitter: pageTwitter({
    title: "NC State Health Plan retirees: 2027 changes and the Nov. 6 deadline",
    description:
      "What changes for state retirees on Medicare in 2027, what happens if you do nothing, and what to check before November 6.",
    path: "/guides/nc-state-health-plan-medicare",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do NC state retirees have to enroll in Medicare at 65?",
    a: "Yes. State retirees must sign up for Medicare Parts A and B when they turn 65. The State Health Plan coordinates with Medicare after that. If you skip Part B, your retiree coverage will not pay the way it should.",
  },
  {
    q: "What are the three retiree health plan options at 65?",
    a: "The State Health Plan offers three choices for retirees 65 and over: a base Medicare Advantage plan, an enhanced Medicare Advantage plan that costs extra each month, and the 70/30 plan. The base Medicare Advantage plan covers the most retirees by far.",
  },
  {
    q: "What happens if I retire before age 65?",
    a: "Your State Health Plan coverage continues as it was. You get new ID cards because you move to the retiree group, but nothing else changes until you turn 65 and enroll in Medicare.",
  },
  {
    q: "Do state employees hired recently get retiree health coverage?",
    a: "Employees first hired on or after January 1, 2021 are not eligible for retiree medical coverage. This was set by state law. If you were hired before that date, your retiree eligibility is unchanged.",
  },
  {
    q: "Can my spouse stay on my retiree plan?",
    a: "Yes, you can cover eligible dependents, but you pay the full cost of their coverage. A spouse 65 or older must have Medicare Parts A and B to join your Medicare Advantage or 70/30 option.",
  },
  {
    q: "When can I change my retiree health plan for 2027?",
    a: "During the State Health Plan's open enrollment, which runs October 12 to November 6, 2026 for the 2027 plan year. That is your yearly chance to switch among the three retiree options. Outside open enrollment you generally need a qualifying event to change.",
  },
  {
    q: "What happens if I'm on the 70/30 plan and do nothing for 2027?",
    a: "According to the State Health Plan, retirees in the 70/30 plan who take no action during open enrollment are moved to the Base Medicare Advantage plan for 2027. If you want to stay on the 70/30 plan, you have to choose it before November 6, 2026.",
  },
  {
    q: "Is Atrium Health in network for state retirees in 2027?",
    a: "Yes. On October 14, 2026 the State Treasurer announced Atrium would move to the out-of-network tier, but on October 27 Atrium and the State Health Plan reached a multi-year agreement. For 2027, all Atrium doctors and hospitals, including Atrium Health Wake Forest Baptist, are in-network in the plan's middle \"access\" tier, at about today's costs. If you're not sure how your own plan treats your Atrium doctors, call the State Health Plan Medicare Support Center at 833-429-5003 before November 6.",
  },
];

export default function NcStateHealthPlanMedicarePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/nc-state-health-plan-medicare" },
              { name: "State retirees and Medicare", path: "/guides/nc-state-health-plan-medicare" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "NC State Health Plan Retirees and Medicare: How It Works",
              description:
                "What happens to NC State Health Plan coverage at 65, the three retiree options, the Part A and B requirement, and the deadlines that matter.",
              path: "/guides/nc-state-health-plan-medicare",
              datePublished: "2026-10-13",
              dateModified: "2026-10-27",
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
          { name: "State retirees and Medicare" },
        ]}
        eyebrow="Guide · Updated October 27, 2026"
        title="NC State Health Plan retirees and Medicare"
        lede="Open enrollment for 2027 ends November 6, 2026. Here is what changes for state retirees on Medicare, what happens if you do nothing, and what to check first."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              If you retired from North Carolina state employment, you must enroll in Medicare Parts
              A and B at 65. After that, you pick one of three State Health Plan retiree options.
              Most retirees land in the base Medicare Advantage plan automatically. Plan details and
              costs change year to year, so confirm everything with the State Health Plan during
              open enrollment. For 2027, that window closes November 6, 2026.
            </p>
            <p className="text-17 mt-3 leading-relaxed">
              <Link href="/state-health-plan-checklist" className="font-semibold underline underline-offset-2">
                Short on time? Use the one-page November 6 checklist
              </Link>
              , or print it for a friend.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What changes for 2027</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Open enrollment for the 2027 plan year runs October 12 to November 6, 2026. It was
            first set to end October 30 and was extended. Here is what changes for retirees on
            Medicare:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">On the 70/30 plan and do nothing?</strong>{" "}
              You&apos;re moved to the Base Medicare Advantage plan for 2027. To stay on the 70/30
              plan, you have to pick it before November 6.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Already on a Medicare Advantage plan?</strong>{" "}
              If you do nothing, you stay on the plan you have.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Higher out-of-pocket limits.</strong>{" "}
              The most you can pay in a year goes from $4,000 to $4,500 on the Base plan and from
              $3,300 to $3,700 on the Enhanced plan, and there&apos;s a new $50 copay for Part B
              drugs.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">A new network setup on the 70/30 plan.</strong>{" "}
              The 70/30 plan uses a three-tier provider network in 2027, and the tier your doctor
              is in can change what you pay.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Atrium Health is back in network (updated October 27).</strong>{" "}
              On October 14 the State Treasurer announced Atrium would move to the plan&apos;s
              out-of-network tier for 2027. On October 27, Atrium and the State Health Plan reached
              a multi-year agreement instead: for 2027, all Atrium doctors and hospitals, including
              Atrium Health Wake Forest Baptist in Winston-Salem and High Point, are in-network in
              the plan&apos;s middle &ldquo;access&rdquo; tier, at about today&apos;s costs. If you
              see Atrium doctors and aren&apos;t sure how your plan treats them, call the State
              Health Plan Medicare Support Center at 833-429-5003 before November 6.
            </li>
          </ul>
          <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: State Health Plan 2027 open enrollment page for Medicare members (shpnc.gov);
            NC Department of State Treasurer, October 14, 2026; WFDD / NC Newsroom and North
            Carolina Health News, October 27, 2026; Becker&apos;s Payer Issues, June 8, 2026.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The Part A and Part B requirement</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the part people miss. As an NC state retiree, you are required to sign up for
            Medicare Parts A and B when you turn 65. Your retiree coverage is built to coordinate
            with Medicare, not replace it. If you skip Part B, your state plan will not cover what
            Medicare would have paid. That is an expensive mistake.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are already collecting Social Security when you turn 65, Medicare enrollment is
            automatic. If not, you enroll yourself through Social Security, ideally in the three
            months before your 65th birthday month.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Your three options at 65</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Once you have Parts A and B, the State Health Plan gives you three choices:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Base Medicare Advantage plan.</strong>{" "}
              This is where the large majority of retirees end up. If your Part B was set up in
              alignment with your retirement, you default into this plan automatically.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Enhanced Medicare Advantage plan.</strong>{" "}
              A richer version of the base plan, with an extra monthly cost.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">The 70/30 plan.</strong>{" "}
              A PPO-style option where the plan pays 70 percent and you pay 30 percent, subject to a
              deductible and coinsurance. A small share of retirees choose this one.
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            These are the State Health Plan&apos;s own retiree options. They are separate from the
            Medicare Advantage and Medigap plans sold on the open market, and you cannot mix the
            two. If you are comparing your state options against outside plans, get the full
            details on both sides first. Premiums and benefits change from year to year.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Retiring before 65</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Retire early and your State Health Plan coverage simply continues. You will get new ID
            cards because your group changes from active employee to retiree, but your plan works
            the same. The Medicare decision arrives when you turn 65, not before.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 2021 cutoff</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One more thing to know. State employees first hired on or after January 1, 2021 are not
            eligible for retiree medical coverage at all. State law ended it for new hires. If you
            were hired before that date, your retiree eligibility stands. If you were hired after,
            you will need to plan for Medicare on the open market like everyone else.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What happens if you do nothing</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If your Medicare Part B was set up in alignment with your retirement, you default into
            the base Medicare Advantage plan automatically. That is by design: the state wants you
            covered. But &ldquo;default&rdquo; is not the same as &ldquo;best for you.&rdquo; The enhanced plan or the
            70/30 plan might fit your situation better, especially if you take expensive
            prescriptions or see specialists often. Use your first open enrollment to compare all
            three with your actual health needs in mind, not just the default.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Doing nothing during open enrollment has its own default too. For 2027, retirees on a
            Medicare Advantage plan stay where they are, and retirees on the 70/30 plan are moved to
            the Base Medicare Advantage plan. If that move isn&apos;t what you want, the only time to
            stop it is before November 6, 2026.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Can you skip the state options and buy your own plan?</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Some retirees wonder whether they should pass on the state retiree options and buy a
            Medicare Advantage or Medigap plan on the open market instead. You can, but understand
            the tradeoff. The state&apos;s base Medicare Advantage plan is heavily subsidized based
            on your years of service. Walking away from it means giving up that subsidy. Before you
            do, compare the total cost: premiums, copays, drug coverage, and your doctors. For most
            retirees with 20-plus years of service, the state option wins on price. Run the numbers
            for your situation before deciding.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Key dates and contacts</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The State Health Plan holds open enrollment every fall. For the 2027 plan year it runs
            October 12 to November 6, 2026, online through the State Health Plan&apos;s eBenefits
            site. That is your yearly window to switch among the three options. Outside of open
            enrollment, you generally cannot change plans unless you have a qualifying event.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            For questions about eligibility and enrollment, the State Health Plan&apos;s support
            center is at 855-859-0966. Retirees on Medicare can also call the State Health Plan
            Medicare Support Center at 833-429-5003. It can answer questions about the plans but
            can&apos;t enroll you in a different one.{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              New to Medicare entirely? Start with the turning 65 guide
            </Link>
            . Comparing your state options to outside plans?{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Here is how Annual Enrollment works
            </Link>
            .
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
            A state retiree weighing your options? Call or text Christian Brinkley in Greensboro,
            NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="nc-state-health-plan-medicare" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="State retiree? Let's walk through your three options"
        body={`Tell me where you are in the process. I will make sure your Medicare enrollment lines up with your retiree coverage. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-27" />
    </main>
  );
}
