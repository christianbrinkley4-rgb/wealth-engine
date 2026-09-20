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
 * SEO article: "Medicare Annual Enrollment 2026: Your Triad Review Checklist".
 * Target query: medicare annual enrollment nc. The five-step checklist from the
 * AEP 2026 content pack, in Christian's voice.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Annual Enrollment 2026: Your Triad Review Checklist",
  },
  description:
    "Oct 15 – Dec 7: the 5-step fall review checklist a licensed Greensboro Medicare agent walks through with Triad clients — prescriptions, doctors, costs, and Part D.",
  alternates: { canonical: "/medicare-annual-enrollment-2026-checklist" },
  openGraph: pageOpenGraph({
    title: "Medicare Annual Enrollment 2026: your Triad review checklist",
    description:
      "Five checks worth making between Oct 15 and Dec 7 — starting with the Annual Notice of Change most people never open.",
    path: "/medicare-annual-enrollment-2026-checklist",
  }),
};

const STEPS = [
  {
    t: "Read your Annual Notice of Change — really read it",
    b: "Every September, your plan mails you an Annual Notice of Change (ANOC). It lists exactly what's different for next year: premiums, deductibles, copays, drug coverage, network changes. This is the single most important document of the fall. Most people file it unopened. Don't.",
  },
  {
    t: "Check your prescriptions",
    b: "Drug coverage changes more than anything else, year to year. A medication that's affordable this year can move to a higher cost tier next year — or come off the plan's drug list entirely. Pull out your current medication list and check each one against your plan's 2027 formulary. This step alone is the reason most of my fall reviews happen.",
  },
  {
    t: "Check your doctors",
    b: '"My doctor takes Medicare" and "my doctor is in my plan\'s network" are two different statements. Every fall, some plans adjust their networks. Confirm your primary care doctor, your specialists, and your preferred hospital are still in-network for your specific plan in 2027 — not just "a Medicare plan," your plan.',
  },
  {
    t: "Add up your total costs — not just the premium",
    b: "A low monthly premium gets the attention, but it's only one line of the bill. Add the premium, the deductible, and what you'd realistically pay in copays over a year. Sometimes the plan with the slightly higher premium costs you less overall. The math is worth doing once a year.",
  },
  {
    t: "Don't forget Part D",
    b: "If you have a standalone Part D drug plan, it needs its own review. Part D plans change premiums and formularies aggressively from year to year — the plan that was cheapest for you this year often isn't next year.",
  },
] as const;

const FAQ = [
  {
    q: "When is Medicare Annual Enrollment 2026?",
    a: "October 15 through December 7, 2026. Changes take effect January 1, 2027.",
  },
  {
    q: "Do I have to switch plans during Annual Enrollment?",
    a: "No — you're never required to change. But reviewing is still worth it, because your plan's costs, drug list, and network can all change even if you do nothing.",
  },
  {
    q: "What's the difference between Annual Enrollment and Open Enrollment?",
    a: "For Medicare, \"Annual Enrollment Period\" (Oct 15 – Dec 7) is the fall window to change plans. There's also a separate Medicare Advantage Open Enrollment (Jan 1 – Mar 31) for people already in Advantage plans. They're different windows with different rules — don't mix them up.",
  },
  {
    q: "I'm happy with my plan. Should I still review it?",
    a: "Yes — that's exactly when a review matters most. Plans change their drug lists and networks every year. A 20-minute check now beats an unpleasant surprise at the pharmacy in January.",
  },
  {
    q: "Can a local agent actually help with this, or do I have to call Medicare?",
    a: "A licensed local agent can walk you through your options and help you enroll. I do this for folks across the Triad every fall. You can also compare plans yourself at Medicare.gov or call 1-800-MEDICARE.",
  },
] as const;

export default function AepChecklistPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment 2026", path: "/aep" },
              {
                name: "Review checklist",
                path: "/medicare-annual-enrollment-2026-checklist",
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Medicare Annual Enrollment 2026: Your Triad Review Checklist (Oct 15 – Dec 7)",
              description:
                "The 5-step fall review checklist: your Annual Notice of Change, prescriptions, doctors, total costs, and Part D.",
              path: "/medicare-annual-enrollment-2026-checklist",
              datePublished: "2026-09-19",
              dateModified: "2026-09-19",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to review your Medicare plan for 2026 annual enrollment",
              description:
                "The five-step fall review checklist: your plan letter, prescriptions, doctors, total costs, and Part D.",
              path: "/medicare-annual-enrollment-2026-checklist",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Annual enrollment 2026", href: "/aep" },
          { name: "Review checklist" },
        ]}
        eyebrow="October 15 – December 7, 2026 · Piedmont Triad"
        title="Medicare Annual Enrollment 2026: your Triad review checklist"
        lede="Every fall I sit down with folks across the Triad to review their plans — and every year, a few people are surprised by what changed. Here's the checklist I walk through with them, so you can do the same."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Get a free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            Every fall, from October 15 through December 7, Medicare holds its Annual Enrollment
            Period. If you live in Greensboro, High Point, Winston-Salem, or anywhere in the
            Piedmont Triad and you&apos;re on Medicare, this is your once-a-year window to change
            your coverage for the coming year. Changes you make during this window take effect
            January 1.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m Christian Brinkley, a licensed Medicare agent here in Greensboro. If you want
            the full picture on the fall window first,{" "}
            <Link href="/annual-enrollment" className="underline underline-offset-2">
              read the annual enrollment guide
            </Link>
            , or{" "}
            <Link href="/aep" className="underline underline-offset-2">
              book a free fall review with me
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">What you can actually change</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            During October 15 – December 7, you can:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-2 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Switch from one Medicare Advantage plan to another</li>
            <li>
              Switch from Original Medicare to a Medicare Advantage plan, or from a Medicare
              Advantage plan back to Original Medicare
            </li>
            <li>
              Join a Medicare Part D prescription drug plan, switch Part D plans, or drop your drug
              coverage
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One honest caveat: if you move from a Medicare Advantage plan back to Original Medicare
            and want a Medigap supplement, you may have to pass medical underwriting outside your
            one-time Medigap open enrollment window. It&apos;s not automatic. If that situation
            applies to you, talk it through with someone licensed before you make the move —
            I&apos;d rather you hear that from me now than discover it in January.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The 5-step fall review checklist</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Step 3 deserves its own deep dive —{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              here&apos;s exactly how to check whether your doctors are in a plan&apos;s network
            </Link>
            . And if you want to see the full cost picture before you decide,{" "}
            <Link href="/medicare-costs" className="underline underline-offset-2">
              here&apos;s what Medicare costs
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What happens after December 7</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The window closes on December 7, and that&apos;s firm. Changes take effect January 1.
            After the 7th, your options to change coverage are limited for the rest of the year.
            That&apos;s not a sales tactic — it&apos;s just the calendar. If you want to review your
            coverage, the fall is the time.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Free help in the Triad</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You don&apos;t have to do this review alone, and you don&apos;t have to do it with a
            call center. I do free fall reviews — in person around Greensboro or by phone — for
            folks across the Triad. Bring your plan letter and your medication list; we&apos;ll go
            through the checklist together in about 30–45 minutes. No fee, no obligation, no
            pressure.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Book a time or call me at {AGENT.phone}, Monday–Saturday 8:00–7:00. You&apos;ll
            reach me, not a call center.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Common questions</h2>
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
          <GuideTownLinks />
          <LeadCluster
            current="/medicare-annual-enrollment-2026-checklist"
            heading="Keep reading, or book your review"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Walk through the checklist with me"
        body="Bring your plan letter and your medication list. We'll go through all five checks together — free, no obligation, about 30–45 minutes."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
