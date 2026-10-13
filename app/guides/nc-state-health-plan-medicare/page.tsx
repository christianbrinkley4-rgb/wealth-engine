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
 */

export const metadata: Metadata = {
  title: {
    absolute: "NC State Health Plan Retirees and Medicare: How It Works",
  },
  description:
    "Turning 65 as an NC state retiree? You must enroll in Medicare Parts A and B, then choose among three State Health Plan retiree options. Here is how it works.",
  alternates: { canonical: "/guides/nc-state-health-plan-medicare" },
  openGraph: pageOpenGraph({
    title: "NC State Health Plan retirees and Medicare",
    description:
      "What happens to your state coverage at 65, the three retiree options, and the deadlines that matter.",
    path: "/guides/nc-state-health-plan-medicare",
  }),
  twitter: pageTwitter({
    title: "NC State Health Plan retirees and Medicare",
    description:
      "What happens to your state coverage at 65, the three retiree options, and the deadlines that matter.",
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
    q: "When can I change my retiree health plan?",
    a: "During the State Health Plan's annual open enrollment each October, done through the ORBIT system. That is your yearly chance to switch among the three retiree options.",
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
          { name: "State retirees and Medicare" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="NC State Health Plan retirees and Medicare"
        lede="Turning 65 on the State Health Plan? Your coverage changes in ways that surprise people. Here is what happens and what you have to do."
        secondaryHref="/schedule?topic=medicare"
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
              costs change year to year, so confirm everything with the State Health Plan each
              October during open enrollment.
            </p>
          </div>

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
            covered. But "default" is not the same as "best for you." The enhanced plan or the
            70/30 plan might fit your situation better, especially if you take expensive
            prescriptions or see specialists often. Use your first open enrollment to compare all
            three with your actual health needs in mind, not just the default.
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
            The State Health Plan holds its open enrollment each October, and retirees make their
            choices through the ORBIT system. That is your yearly window to switch among the three
            options. Outside of open enrollment, you generally cannot change plans unless you have
            a qualifying event.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            For questions about eligibility and enrollment, the State Health Plan&apos;s support
            center is at 855-859-0966.{" "}
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
        body={`Tell me where you are in the process. We will make sure your Medicare enrollment lines up with your retiree coverage. Call or text ${AGENT.phone}.`}
        href="/schedule?topic=medicare"
        label="Book a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
