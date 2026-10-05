import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

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
 * The Granville County landing page.
 *
 * Christian is a lifelong Creedmoor resident. This page is the local trust
 * play: a neighbor who happens to be a licensed agent, not a call center.
 * Targets "Medicare agent Creedmoor NC" and "Medicare help Creedmoor"
 * searches with near-zero local competition. Copy in Christian's voice,
 * no invented facts: no office address, no provider relationships claimed,
 * no plan outcomes promised.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Creedmoor, NC | Free Local Plan Reviews",
  },
  description:
    "Christian Brinkley is a licensed insurance agent and lifelong Creedmoor resident helping Granville County neighbors understand Medicare. Free, no-pressure plan reviews in Creedmoor, Oxford, Butner, and Stem. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-creedmoor-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help from someone who grew up here.",
    description:
      "Free, no-pressure Medicare plan reviews for Creedmoor, Oxford, Butner, and Stem. A local licensed agent, not a call center.",
    path: "/medicare-creedmoor-nc",
  }),
};

const FAQ = [
  {
    q: "Are you really from Creedmoor?",
    a: "Yes. I grew up in Creedmoor and live here in Granville County. I'm a licensed insurance agent in North Carolina, and I help neighbors here understand their Medicare options. No call centers, just me.",
  },
  {
    q: "Does where I live affect my Medicare choices?",
    a: "Yes. Medicare Advantage plan availability can vary by county, so what's offered in Granville County isn't identical to what's offered in Guilford. We'll check the options for your home address, along with your doctors, prescriptions, and coverage needs.",
  },
  {
    q: "Can we meet in person?",
    a: "Yes. We can meet at a convenient public place around Creedmoor, Oxford, or Butner, or talk by phone. You're welcome to include your spouse or another family member. The consultation is free, with no obligation to enroll in anything.",
  },
  {
    q: "What does the free review cover?",
    a: "We'll go over your current coverage, your doctors and prescriptions, and what's changing for next year, including your Annual Notice of Change letter if you got one. If your plan still looks good, I'll tell you so. If something changed that matters to you, we'll talk through your options before Medicare Open Enrollment ends December 7.",
  },
] as const;

export default function MedicareCreedmoorPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Creedmoor, NC", path: "/medicare-creedmoor-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Creedmoor, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Creedmoor, Oxford, Butner, and Stem from Christian Brinkley, a licensed agent and lifelong Creedmoor resident.",
              path: "/medicare-creedmoor-nc",
              datePublished: "2026-10-03",
              dateModified: "2026-10-03",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Creedmoor, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Creedmoor, Oxford, Butner, and Stem in Granville County, NC.",
              path: "/medicare-creedmoor-nc",
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
          { name: "Medicare help in Creedmoor, NC" },
        ]}
        eyebrow="Medicare help · Creedmoor and Granville County"
        title="Your neighbor for Medicare questions."
        lede="I'm Christian Brinkley, a licensed insurance agent, and I grew up right here in Creedmoor. I help folks in Creedmoor, Oxford, Butner, and Stem understand their Medicare options with free, no-pressure reviews. No call centers, no scripts, just a local who'll sit down with you and explain it straight."
        secondaryHref="/start"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare, in plain English</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Medicare has a lot of moving parts, and most of the mail you get about it reads
              like it was written by lawyers. Here&apos;s the short version. Part A covers
              hospital stays. Part B covers doctor visits and outpatient care. Part D covers
              prescriptions. Then you choose how to fill the gaps: a Medicare Advantage plan
              (Part C), which bundles everything through a private insurer, or Original Medicare
              plus a Medigap supplement and a separate Part D plan.
            </p>
            <p>
              Which one fits depends on your doctors, your prescriptions, your health, and your
              budget. There&apos;s no universal right answer, and anyone who tells you there is
              hasn&apos;t looked at your situation. That&apos;s what the free review is for: we
              look at your actual situation and figure out what makes sense.
            </p>
            <p>
              One local note: Medicare Advantage plan availability can vary by county. The plans
              offered here in Granville County aren&apos;t identical to what&apos;s offered over
              in Guilford. When we talk, we&apos;ll check what&apos;s available at your address,
              not somebody else&apos;s.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why this fall matters</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Medicare Open Enrollment runs October 15 through December 7. That&apos;s your
              window to switch plans for next year. If you have a Medicare Advantage plan or a
              Part D drug plan, you should have gotten an Annual Notice of Change letter in
              September listing what&apos;s different for 2027. Your premium, your drug costs,
              your coverage rules: any of it can change January 1.
            </p>
            <p>
              Most people never read the letter. Bring it to me and I&apos;ll walk you through
              it in plain English, free. What changed, what it could cost you, and what you may
              want to double-check. If nothing important changed, I&apos;ll tell you that too.{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                Learn more about the ANOC letter
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I serve</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m based right here in Granville County, so meeting up is easy. I work with
            folks in:
          </p>
          <ul className="text-17 mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Creedmoor",
                b: "My hometown. Happy to meet anywhere convenient around town.",
              },
              {
                t: "Oxford",
                b: "The county seat. I come up regularly and can meet around your schedule.",
              },
              {
                t: "Butner",
                b: "Just down the road. In-person or by phone, your call.",
              },
              {
                t: "Stem",
                b: "Small town, same service. Phone reviews work great here too.",
              },
            ].map((item) => (
              <li key={item.t} className="rounded-xl border border-gray-200 bg-[var(--color-paper)] p-5">
                <h3 className="text-20 font-semibold">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            I also serve the Greensboro area and the wider Piedmont Triad.{" "}
            <Link href="/service-area" className="underline underline-offset-2">
              See the full service area
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Free workshops in Creedmoor</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              I&apos;m setting up free Medicare 101 workshops at the South Branch Library here
              in Creedmoor this fall. Thirty-five minutes, plain English: how Medicare works,
              enrollment windows, what the penalties are for signing up late, and how to read
              that ANOC letter. No sales pitch, no sign-up sheets you didn&apos;t ask for.
              Just answers.
            </p>
            <p>
              Dates are being finalized now. Call or text me at{" "}
              <a href={AGENT.phoneHref} className="underline underline-offset-2">
                {AGENT.phone}
              </a>{" "}
              and I&apos;ll make sure you get a seat, or{" "}
              <Link href="/remind-me" className="underline underline-offset-2">
                get a reminder when dates are announced
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Talk to a neighbor first</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You don&apos;t have to figure Medicare out from mailers and 1-800 numbers. Call or
            text me, and we&apos;ll go through your situation together. Free consultation, no
            obligation to enroll in anything, no pressure. If your plan is already fine,
            I&apos;ll say so.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={AGENT.phoneHref}
              aria-label={`Call ${AGENT.name} at ${AGENT.phone} for free Medicare help in Creedmoor`}
              className="btn"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href="/start"
              className="btn btn-outline"
            >
              Book my free review →
            </Link>
          </div>
          <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
            Free consultation. No obligation to enroll. No call centers, just me.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="From Creedmoor, for Creedmoor"
        body="I'd rather you hear it from a neighbor than a call center. About fifteen minutes, free, and you'll actually understand your options."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
