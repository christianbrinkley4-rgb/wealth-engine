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
 * Moving to North Carolina on Medicare.
 *
 * Targets "moving to north carolina medicare" / relocating retirees.
 * Local angle national sites cannot copy. Covers moving SEP rules,
 * what changes by plan type, NC-specific resources (SHIIP).
 */

export const metadata: Metadata = {
  title: {
    absolute: "Moving to North Carolina on Medicare: What Changes",
  },
  description:
    "Moving to NC on Medicare? Your move opens a special enrollment period. What changes for Advantage, Medigap, and Part D plans, and what to do before and after.",
  alternates: { canonical: "/guides/moving-to-north-carolina-medicare" },
  openGraph: pageOpenGraph({
    title: "Moving to North Carolina on Medicare: what changes",
    description:
      "Your move opens a special enrollment period. How Advantage, Medigap, and Part D handle a move to North Carolina, and the checklist to follow.",
    path: "/guides/moving-to-north-carolina-medicare",
  }),
  twitter: pageTwitter({
    title: "Moving to North Carolina on Medicare: what changes",
    description:
      "Your move opens a special enrollment period. How Advantage, Medigap, and Part D handle a move to North Carolina, and the checklist to follow.",
    path: "/guides/moving-to-north-carolina-medicare",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does moving to North Carolina let me change Medicare plans?",
    a: "Yes, if you move out of your current plan's service area. A permanent move opens a special enrollment period that generally runs from the month before your move through two full months after the month you move. That is your window to pick new coverage.",
  },
  {
    q: "Does Original Medicare work the same in North Carolina?",
    a: "Yes. Original Medicare works with any doctor or hospital in the country that accepts Medicare. Moving changes nothing about your coverage itself. Update your address with Social Security so your mail follows you.",
  },
  {
    q: "What happens to my Medicare Advantage plan when I move to NC?",
    a: "Check whether your plan operates in your new North Carolina county. If it does, you may be able to keep it. If it does not, your move opens a special enrollment period to choose a plan that serves your new area.",
  },
  {
    q: "What happens to my Medigap plan when I move?",
    a: "Medigap moves with you. There are no networks and no service areas, so your supplement works the same in North Carolina as it did before. Your premium may change because Medigap prices vary by area, but your coverage does not.",
  },
  {
    q: "Do I need a new Part D drug plan when I move?",
    a: "Maybe. Part D plans have service areas too. If your plan does not operate in your new area, your move opens a special enrollment period to pick one that does. Check your plan's service area before you move.",
  },
  {
    q: "Where can I get free Medicare help in North Carolina?",
    a: "North Carolina runs the Seniors' Health Insurance Information Program, or SHIIP, through the state Department of Insurance. Volunteer counselors in every county offer free, unbiased Medicare help. It is a good first stop for anyone new to the state.",
  },
];

export default function MovingToNorthCarolinaMedicarePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/moving-to-north-carolina-medicare" },
              { name: "Moving to NC on Medicare", path: "/guides/moving-to-north-carolina-medicare" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Moving to North Carolina on Medicare: What Changes",
              description:
                "How a move to North Carolina affects Medicare Advantage, Medigap, and Part D plans, the special enrollment period a move opens, and a before-and-after checklist.",
              path: "/guides/moving-to-north-carolina-medicare",
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
          { name: "Moving to NC on Medicare" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Moving to North Carolina on Medicare: what changes"
        lede="Retiring to the Triad? Your move changes your Medicare options. Here is what follows you, what doesn't, and what to handle before the boxes arrive."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              A permanent move out of your plan&apos;s service area opens a special enrollment
              period, generally from the month before your move through two full months after. Original
              Medicare and Medigap move with you automatically. Medicare Advantage and Part D plans
              may not operate in your new county, so check before you go.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What follows you automatically</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Original Medicare does not care where you live. Your red, white, and blue card works the
            same in North Carolina as it did in your old state. Medigap follows the same rules: no
            networks, no service areas, no changes. One thing can shift, though. Medigap premiums
            vary by area, so your monthly rate may change even though your coverage does not. Ask
            your insurer what the North Carolina rate looks like.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Update your address with Social Security as soon as you move. Medicare mail, including
            your annual notices, goes wherever Social Security thinks you live. Miss an ANOC because
            it went to your old address and you lose your best chance to review next year&apos;s
            changes.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What needs checking: Advantage and Part D</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage plans are local by design. Each one operates in a defined service
            area, usually a set of counties. Before your move, check whether your plan operates in
            your new North Carolina county. If it does, you may be able to keep it. If it does
            not, your move opens a special enrollment period and you pick a plan that serves your
            new home.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Part D drug plans have service areas too, so run the same check on your prescriptions
            plan. This is also the right moment to recheck your drug list against the new
            plan&apos;s formulary. A move is a natural time to make sure your medications are still
            covered at a pharmacy near your new home.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            New to the Advantage vs. Medigap decision?{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Here is the plain-English comparison
            </Link>
            . Wondering how special enrollment periods work in general?{" "}
            <Link href="/special-enrollment" className="underline underline-offset-2">
              Here is the full guide
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">The checklist: before and after the move</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Before you move:</strong> check whether your
            Advantage and Part D plans operate in your new county. List your doctors and
            prescriptions. If your plan will not follow you, start comparing North Carolina options
            during your special enrollment window. Do not disenroll from anything until the new
            coverage is confirmed.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">After you arrive:</strong> update your
            address with Social Security. Find new in-network doctors and transfer your records.
            Check that your pharmacy is in your Part D plan&apos;s network. If you moved mid-year,
            review your plan during the next Annual Enrollment like everyone else.{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Here is what to review each fall
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">Timing your move around Annual Enrollment</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you have flexibility on timing, moving in the fall has an advantage. Your moving
            special enrollment period and the Annual Enrollment Period (October 15 to December 7)
            can overlap, giving you a wide window to compare North Carolina plans without rushing.
            Moving in the spring or summer works fine too; the special enrollment period stands on
            its own. Either way, do not let the move push your plan shopping to the last minute.
            Give yourself a few weeks on each side of moving day.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Snowbirds and part-time residents</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Splitting time between North Carolina and another state? This is where plan type really
            matters. Most Medicare Advantage plans disenroll you if you spend more than six
            continuous months outside the service area. Original Medicare plus Medigap has no such
            rule; it works everywhere. If you plan to spend winters in Florida and summers in the
            Triad, talk through the tradeoffs carefully before you commit to an Advantage plan.{" "}
            <Link href="/guides/medicare-travel" className="underline underline-offset-2">
              Here is the full guide to Medicare and travel
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">Free help for newcomers</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            North Carolina runs the Seniors&apos; Health Insurance Information Program, or SHIIP,
            through the state Department of Insurance. Volunteer counselors in every county offer
            free, unbiased Medicare help. If you are new to the state and want a second set of eyes
            on your options, SHIIP is a solid first stop. And if you would rather talk to a local
            agent who does this every day, that is what I am here for.
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
            Moving to the Triad? Call or text Christian Brinkley in Greensboro, NC at{" "}
            {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="moving-to-north-carolina-medicare" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="New to North Carolina? Let's get your coverage settled"
        body={`Tell me where you're moving from and when. We will make sure your Medicare lands smoothly in your new home. Call or text ${AGENT.phone}.`}
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
