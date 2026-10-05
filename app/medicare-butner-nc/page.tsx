import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The Butner landing page.
 *
 * Butner is a Granville County neighbor town to Christian's home in
 * Creedmoor. Angle: neighbor-to-neighbor help in a town built on
 * Camp Butner and the state facilities that followed. Copy in
 * Christian's voice, no invented facts: no office address, no provider
 * relationships claimed, no plan outcomes promised.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Butner, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 in Butner, NC? Free Medicare help from Christian Brinkley, licensed NC agent and your neighbor in Creedmoor. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-butner-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help from a neighbor, not a call center.",
    description:
      "Free, no-pressure Medicare plan reviews for Butner and Granville County, from a licensed agent who lives just up the road in Creedmoor.",
    path: "/medicare-butner-nc",
  }),
};

const FAQ = [
  {
    q: "You're actually nearby, right?",
    a: "Yes. I live in Creedmoor, which is just down the road from Butner. I'm a licensed insurance agent in North Carolina, and I help neighbors across Granville County understand their Medicare options. No call centers, just me.",
  },
  {
    q: "Does living in Granville County change my Medicare options?",
    a: "It can. Medicare Advantage plan availability can vary by county, so what's offered in Granville County isn't identical to what's offered over in Durham or Guilford. When we talk, we'll check what's available at your address, along with your doctors and prescriptions.",
  },
  {
    q: "Can we meet in person in Butner?",
    a: "Yes. We can meet somewhere convenient in or around Butner, talk by phone, or meet at the library between Butner and Creedmoor. You're welcome to include your spouse or another family member. The consultation is free, with no obligation to enroll in anything.",
  },
  {
    q: "What does the free review cover?",
    a: "We'll go over your current coverage, your doctors and prescriptions, and what's changing for next year, including your Annual Notice of Change letter if you got one. If your plan still looks good, I'll tell you so. If something changed that matters to you, we'll talk through your options before Medicare Open Enrollment ends December 7.",
  },
] as const;

function CtaBlock() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-[var(--color-paper)] p-6">
      <h3 className="text-22 font-semibold">Get your free Medicare review</h3>
      <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        Take the 2-minute plan-fit quiz and I&apos;ll reach out, or book a time that
        works for you.
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/plan-check"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(21,46,52,0.1),0_4px_16px_rgba(21,46,52,0.1)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(21,46,52,0.08)]"
        >
          Take the plan-fit quiz
        </Link>
        <a
          href="/schedule?topic=medicare"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] shadow-[0_1px_2px_rgba(21,46,52,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--color-gold-ink)] hover:text-[var(--color-gold-ink)] hover:shadow-[0_2px_4px_rgba(21,46,52,0.07),0_3px_12px_rgba(21,46,52,0.06)] active:translate-y-0"
        >
          Book a free call
        </a>
      </div>
      <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
        Prefer to talk? Call or text{" "}
        <a href={AGENT.phoneHref} className="underline underline-offset-2">
          {AGENT.phone}
        </a>
        .
      </p>
      <p className="text-16 mt-2 text-[var(--color-ink-muted)]">
        <em>
          Free help from a licensed North Carolina insurance agent. No cost, no pressure,
          no obligation.
        </em>
      </p>
    </div>
  );
}

export default function MedicareButnerPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Butner, NC", path: "/medicare-butner-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Butner, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Butner and Granville County from Christian Brinkley, a licensed agent who lives just up the road in Creedmoor.",
              path: "/medicare-butner-nc",
              datePublished: "2026-10-04",
              dateModified: "2026-10-04",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Butner, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Butner and Granville County, NC.",
              path: "/medicare-butner-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      {/* LocalBusiness markup comes once, site-wide, from app/layout.tsx. */}

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/service-area" },
          { name: "Medicare help in Butner, NC" },
        ]}
        eyebrow="Medicare help · Butner and Granville County"
        title="Medicare Help in Butner, NC"
        lede="I'm Christian Brinkley, a licensed insurance agent, and I live just up the road in Creedmoor. I help folks in Butner understand their Medicare options with free, no-pressure reviews. No call centers, no scripts, just a neighbor who'll sit down with you and explain it straight."
        secondaryHref="/start"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Butner: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Butner is a town with real roots. The whole place grew up around Camp Butner,
              the World War II Army training camp, and the state facilities that came after.
              Generations of families here have lived within a few miles of the same streets.
              When someone from here has a Medicare question, they deserve an answer from a
              real person, not a recording.
            </p>
            <p>
              Here&apos;s what I see with folks in Butner. Your doctors might be in Oxford,
              Durham, or Raleigh. That&apos;s normal around here. But it means your plan&apos;s
              network has to actually cover your real life, not just your zip code. A plan
              that looks fine on paper can get expensive fast if your cardiologist or your
              pharmacy isn&apos;t in it. That&apos;s exactly what a twenty-minute review
              catches.
            </p>
            <p>
              One local note that matters: Medicare Advantage plan availability can vary by
              county. The plans offered here in Granville County aren&apos;t identical to
              what&apos;s offered over in Durham or Guilford. When we talk, we&apos;ll check
              what&apos;s available at your address, not somebody else&apos;s.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong className="text-[var(--color-navy)]">
                South Granville Public Library
              </strong>
              , 1550 S Campus Dr. The Granville County library branch between Butner and
              Creedmoor. Quiet tables, easy parking, and a solid spot to sit down and go
              through your plan paperwork together in person.
            </p>
            <p>
              <strong className="text-[var(--color-navy)]">
                Granville County Senior Services
              </strong>
              , 107 Lanier St, Oxford. The county&apos;s senior center, and the place to ask
              about SHIIP, the state&apos;s free, unbiased Medicare counseling program. A
              great starting point. I&apos;m happy to be your second set of eyes after. Two
              free opinions beat one.
            </p>
            <p>
              <strong className="text-[var(--color-navy)]">
                South Granville Senior Center
              </strong>
              , Creedmoor, (919) 528-0848. The senior center serving our end of the county,
              with classes, meals, and programs for folks 60 and up. If you haven&apos;t been
              in, it&apos;s worth a visit on its own merits.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage and Part D plans can change what they charge,
              which drugs they cover, and which doctors are in network for the next year.
              Your plan is supposed to mail you an Annual Notice of Change by the end of
              September. Most people file it with the junk mail. Don&apos;t.
            </p>
            <p>
              The review takes twenty minutes. We look at what changed, check your doctors
              and your prescriptions against the new details, and you go into January
              knowing where you stand. If nothing important changed, I&apos;ll tell you that
              too.{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                Learn more about the ANOC letter
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              A free review with me is a conversation, not a sales pitch. Since I&apos;m just
              up the road in Creedmoor, we can do this by phone or sit down somewhere local.
              We go through:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>What you have now and what it costs you</li>
              <li>Whether your doctors and pharmacy are covered next year</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Any questions you have, dumb ones included (they aren&apos;t)</li>
            </ul>
            <p>
              Phone, video, or in person. And if you&apos;re in{" "}
              <Link href="/medicare-oxford-nc" className="underline underline-offset-2">
                Oxford
              </Link>
              , same deal.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Butner</h2>
          <div className="text-17 mt-4 space-y-6 leading-relaxed text-[var(--color-ink-muted)]">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-20 font-semibold text-[var(--color-navy)]">{item.q}</h3>
                <p className="mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Talk to a neighbor first</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You don&apos;t have to figure Medicare out from mailers and 1-800 numbers. Call
            or text me, and we&apos;ll go through your situation together. Free consultation,
            no obligation to enroll in anything, no pressure. If your plan is already fine,
            I&apos;ll say so.
          </p>
          <CtaBlock />
        </div>
      </section>

      <KitchenTableClose
        heading="From a neighbor, for neighbors"
        body="I'd rather you hear it from someone just up the road than from a call center. About fifteen minutes, free, and you'll actually understand your options."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
