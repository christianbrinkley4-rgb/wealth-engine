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
 * The Graham landing page.
 *
 * Graham is the Alamance County seat, built around the historic
 * courthouse square downtown. Angle: county-seat town where folks
 * drive in every direction for care, so plan networks matter. Copy
 * in Christian's voice, no invented facts: no office address, no
 * provider relationships claimed, no plan outcomes promised.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Graham, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 in Graham, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-graham-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help that covers your whole map.",
    description:
      "Free, no-pressure Medicare plan reviews for Graham and Alamance County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-graham-nc",
  }),
};

const FAQ = [
  {
    q: "I'm in Graham but my doctors are in Burlington. Does that matter?",
    a: "It can matter a lot. Some plans have tight local networks, and a plan that covers your Graham doctor might not cover your Burlington specialist. That's the first thing we check in a review, before you commit to anything for the year.",
  },
  {
    q: "Does living in Alamance County change my Medicare options?",
    a: "It can. Medicare Advantage plan availability can vary by county, so what's offered in Alamance County isn't identical to what's offered over in Guilford or Orange. When we talk, we'll check what's available at your address, along with your doctors and prescriptions.",
  },
  {
    q: "Can we meet in person in Graham?",
    a: "Yes. We can meet somewhere convenient in Graham, like the library on South Main Street, or talk by phone. You're welcome to include your spouse or another family member. The consultation is free, with no obligation to enroll in anything.",
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

export default function MedicareGrahamPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Graham, NC", path: "/medicare-graham-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Graham, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Graham and Alamance County from Christian Brinkley, a licensed insurance agent.",
              path: "/medicare-graham-nc",
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
              name: "Medicare plan review in Graham, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Graham and Alamance County, NC.",
              path: "/medicare-graham-nc",
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
          { name: "Medicare help in Graham, NC" },
        ]}
        eyebrow="Medicare help · Graham and Alamance County"
        title="Medicare Help in Graham, NC"
        lede="Graham is Alamance County's seat, built around the old courthouse on the downtown traffic circle and the mill and railroad days. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Graham understand Medicare with free, no-pressure reviews. No call centers, just straight answers."
        secondaryHref="/start"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Graham: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Graham is the county seat of Alamance County, and you can feel it. The old
              courthouse sits right on the traffic circle downtown, the one Main Street
              wraps around, and the whole town grew up in Alamance County&apos;s mill and
              railroad days. People here tend to stay put, which means I meet a lot of
              folks in Graham who&apos;ve had the same plan for years and never really
              rechecked it.
            </p>
            <p>
              The big local issue is direction. Your primary care doctor might be right
              here in Graham, your specialist might be in Burlington, and your pharmacy
              somewhere else again. That&apos;s a normal life around here. But a plan with
              a tight local network can leave you paying out of network for care you thought
              was covered. This is the single most common surprise I see, and it&apos;s
              exactly what a twenty-minute review catches.
            </p>
            <p>
              One more local note: Medicare Advantage plan availability can vary by county.
              The plans offered here in Alamance County aren&apos;t identical to what&apos;s
              offered over in Orange or Guilford. When we talk, we&apos;ll check
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
              <strong className="text-[var(--color-navy)]">Graham Public Library</strong>,
              211 S Main St. Part of the Alamance County library system, right on Main
              Street downtown. Quiet tables, easy to park, and a fine place to sit down
              with your plan paperwork if you&apos;d rather meet in person.
            </p>
            <p>
              <strong className="text-[var(--color-navy)]">Alamance Eldercare</strong>,
              210 E Elm St, Graham. A local nonprofit that helps older adults and their
              families sort through aging-care questions. They run caregiver support groups
              and educational workshops. If you&apos;re helping a parent figure out
              Medicare, they&apos;re worth knowing about.
            </p>
            <p>
              One more: SHIIP, the state&apos;s free, unbiased Medicare counseling program,
              has trained counselors in every North Carolina county. It&apos;s a great
              starting point, and I&apos;m happy to be your second set of eyes after. Two
              free opinions beat one.
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
              A free review with me is a conversation, not a sales pitch. Here&apos;s what we
              go through:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>What you have now and what it costs you</li>
              <li>Whether your doctors, in Graham or toward Burlington, stay in network next year</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Straight answers, including the questions you think are dumb (they aren&apos;t)</li>
            </ul>
            <p>
              Phone, video, or in person at the library in Graham. And I help folks across
              Alamance County, including{" "}
              <Link href="/medicare-mebane-nc" className="underline underline-offset-2">
                Mebane
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Graham</h2>
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
          <h2 className="text-28 font-semibold">Talk to a local first</h2>
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
        heading="Straight answers, plain English"
        body="I'd rather you hear it from a real person than from a mailer. About fifteen minutes, free, and you'll actually understand your options."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
