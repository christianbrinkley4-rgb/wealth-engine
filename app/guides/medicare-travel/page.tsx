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
 * Does Medicare work out of state? Travel and moving with Medicare.
 *
 * Targets "does medicare advantage work out of state" / "can I use medicare
 * in another state". Emergency/urgent nationwide rule, HMO vs PPO, the
 * 6-month service-area rule, moving SEP, foreign travel.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Does Medicare Work Out of State? Travel Rules Explained",
  },
  description:
    "Original Medicare works in every state. Medicare Advantage depends on your plan type. Emergency care is covered nationwide; routine care is not.",
  alternates: { canonical: "/guides/medicare-travel" },
  openGraph: pageOpenGraph({
    title: "Does Medicare work out of state?",
    description:
      "Traveling or moving with Medicare: what works in every state, the emergency rule every Advantage plan must follow, and what changes when you move.",
    path: "/guides/medicare-travel",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Can I use my Medicare Advantage plan in another state?",
    a: "For emergencies and urgent care, yes, at in-network rates, anywhere in the United States. For routine care, it depends on your plan type. HMOs generally cover only in-network providers in the plan's service area.",
  },
  {
    q: "Does Original Medicare work in every state?",
    a: "Yes. Original Medicare works with any doctor or hospital in the country that accepts Medicare. No referrals, no networks, no state lines to worry about.",
  },
  {
    q: "What happens if I move to another state?",
    a: "Moving out of your plan's service area opens a special enrollment period. Original Medicare and Medigap move with you automatically. A Medicare Advantage plan may not operate in your new area, so you pick a new plan.",
  },
  {
    q: "Can I keep my Medicare Advantage plan if I travel for months?",
    a: "Most plans disenroll you if you are outside the service area for more than 6 months at a time. Some allow up to a year. Check your plan's Evidence of Coverage before a long trip.",
  },
  {
    q: "Does Medicare cover me on a cruise or abroad?",
    a: "Original Medicare does not pay for care outside the United States except in rare border situations. Some Medigap plans include foreign travel emergency coverage. Some Advantage plans cover emergencies abroad. Check your plan.",
  },
  {
    q: "Is a PPO better than an HMO for travelers?",
    a: "PPOs generally cover out-of-network care at a higher cost share, which helps on the road. HMOs generally do not. If you travel often or split time between states, network flexibility deserves a hard look each fall.",
  },
];

export default function MedicareTravelPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-travel" },
              { name: "Medicare and travel", path: "/guides/medicare-travel" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Does Medicare Work Out of State? Travel Rules Explained",
              description:
                "Medicare travel rules: nationwide coverage under Original Medicare, the emergency rule for Advantage plans, moving to a new state, and foreign travel.",
              path: "/guides/medicare-travel",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
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
          { name: "Medicare and travel" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Does Medicare work out of state?"
        lede="Visiting grandkids in Florida? Snowbirding for the winter? Whether your coverage travels with you depends on which kind of Medicare you have."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              A service area is the set of counties where your Medicare Advantage plan operates.
              Original Medicare has no service area. It works with any provider that accepts
              Medicare, in all 50 states. Advantage plans are local by design, with one federal
              exception: emergencies.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Original Medicare and Medigap: fully portable</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            With Original Medicare, your red, white, and blue card works the same in every state.
            See any doctor or hospital that accepts Medicare. No referrals needed. Medigap follows
            the same rules, so your supplement travels too. If you move, nothing changes except your
            address on file.
          </p>

          <h2 className="text-28 mt-12 font-semibold">
            Medicare Advantage: emergencies yes, routine care maybe
          </h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Federal law requires every Medicare Advantage plan to cover emergency and urgent care
            anywhere in the United States. No higher copays for going out of network in an
            emergency. That part is simple and universal.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Routine care is where plan type matters:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">HMO plans</strong> generally cover only
              providers inside the plan's network and service area. A checkup in another state is
              typically not covered.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">PPO plans</strong> generally cover
              out-of-network care, but you pay more than you would at home.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Travel benefits</strong> are add-ons some
              plans offer for temporary out-of-area care. They vary widely. Ask about them before
              you enroll.
            </li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">Moving to a new state</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A move out of your plan's service area opens a special enrollment period, so you can
            pick new coverage in your new home. Original Medicare and Medigap need no changes. With
            Medicare Advantage, check whether your plan operates in the new area. If it does not,
            you will need a new plan.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Snowbirds, take note: most Advantage plans disenroll you if you stay outside the
            service area for more than 6 continuous months. Some plans allow up to a year. Read
            your plan's Evidence of Coverage before an extended stay.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Outside the United States</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Original Medicare does not pay for care in another country, except in rare situations
            near the border. Some Medigap plans include foreign travel emergency coverage. Some
            Medicare Advantage plans cover emergencies abroad. For a cruise or an overseas trip, ask
            your plan exactly what is covered before you board.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Choosing between plan types with travel in mind?{" "}
            <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
              Here is Medicare Advantage vs. Medigap in plain English
            </Link>
            . Moving soon?{" "}
            <Link href="/special-enrollment" className="underline underline-offset-2">
              Here is how special enrollment periods work
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
            Travel or planning a move? Call or text Christian Brinkley in Greensboro, NC at{" "}
            {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-travel" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Make sure your plan fits your life on the road"
        body={`Tell me where you travel and where you might move. We will check that your coverage travels with you. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
