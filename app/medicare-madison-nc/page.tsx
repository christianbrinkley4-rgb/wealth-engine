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
  localBusinessJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The Madison, NC town page (Rockingham County, 27025).
 *
 * Local angle: small town right next to Mayodan, Dan River corridor, western
 * Rockingham County. No invented facts: no provider names, no plan outcomes
 * promised. Library and county senior services verified by web search
 * 2026-10-04.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Madison, NC | Christian Brinkley",
  },
  description:
    "Free Medicare plan reviews in Madison, NC from Christian Brinkley, licensed NC agent. Plain-English help for Rockingham County. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-madison-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Madison and western Rockingham County.",
    description:
      "Free, no-pressure Medicare plan reviews for Madison and Rockingham County from Christian Brinkley, a licensed NC agent. Call (919) 408-6671.",
    path: "/medicare-madison-nc",
  }),
};

const FAQ = [
  {
    q: "Do you also help folks in Mayodan?",
    a: "Yes. Madison and Mayodan are right next to each other, and I help people in both, plus Stoneville and the rest of western Rockingham County. Phone reviews work great here, or we can meet in person.",
  },
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7, every year. Any changes you make take effect January 1.",
  },
  {
    q: "I am turning 65 soon. When should we talk?",
    a: "A month or two before your 65th birthday is a good time. That gives us room to go over your options without rushing, and to make sure you do not miss your initial enrollment window.",
  },
  {
    q: "What does the review cost?",
    a: "Nothing. It is free, with no obligation to enroll in anything. If your current setup still looks good, I will tell you that.",
  },
] as const;

function ReviewCta() {
  return (
    <div>
      <h2 className="text-28 font-semibold">Get your free Medicare review</h2>
      <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
        Take the 2-minute plan-fit quiz and I&apos;ll reach out, or book a time that works
        for you.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/plan-check"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(21,46,52,0.1),0_4px_16px_rgba(21,46,52,0.1)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(21,46,52,0.08)]"
        >
          Take the plan-fit quiz →
        </Link>
        <a
          href="https://calendly.com/christianbrinkley4/free-medicare-review-call"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] shadow-[0_1px_2px_rgba(21,46,52,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--color-gold-ink)] hover:text-[var(--color-gold-ink)] hover:shadow-[0_2px_4px_rgba(21,46,52,0.07),0_3px_12px_rgba(21,46,52,0.06)] active:translate-y-0"
        >
          Book a free call
        </a>
      </div>
      <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
        Prefer to talk?{" "}
        <a href={AGENT.phoneHref} className="underline underline-offset-2">
          Call or text {AGENT.phone}
        </a>
        .
      </p>
      <p className="text-16 mt-4 text-[var(--color-ink-muted)] italic">
        Free help from a licensed North Carolina insurance agent. No cost, no pressure, no
        obligation.
      </p>
    </div>
  );
}

export default function MedicareMadisonPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Madison, NC", path: "/medicare-madison-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Madison, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Madison and western Rockingham County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-madison-nc",
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
              name: "Medicare plan review in Madison, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed agent serving Madison and western Rockingham County, NC.",
              path: "/medicare-madison-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/service-area" },
          { name: "Medicare help in Madison, NC" },
        ]}
        eyebrow="Medicare help · Madison and western Rockingham County"
        title="Medicare Help in Madison, NC"
        lede="Madison sits in the Dan River corridor next to Mayodan, the kind of town where people wave from their porches. I&apos;m Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Madison and western Rockingham County with Medicare questions, in plain English. Free reviews, and you always reach me directly."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Madison: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Madison is a small town in western Rockingham County, right next door to
              Mayodan, in the Dan River corridor. It is the kind of place where people
              wave from their porches and have had the same family doctor for twenty
              years.
            </p>
            <p>
              That is exactly why the network question matters here. Plenty of Madison
              folks see specialists toward Greensboro or Reidsville. If your plan&apos;s
              network does not reach your doctors, you find out the expensive way. A
              twenty-minute review checks that before January.
            </p>
            <p>
              Turning 65 in Madison comes with the usual mail avalanche. Most of it is
              marketing. I will help you sort the real deadlines from the noise. The
              trick is knowing which letters are real deadlines and which ones are sales
              pitches. We will also check what is available at your address, since
              Medicare Advantage options can vary by county.
            </p>
            <p>
              The same-plan-for-years habit is common here too. If you have been on the
              same plan for a few years without rechecking it, the Annual Enrollment
              Period is your window each year to fix that without penalty. Twenty
              minutes, and you will know where you stand.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Madison-Mayodan Public Library</strong>, 611 Burton Street, Madison,
              NC 27025. The library branch serving Madison and Mayodan, with quiet tables
              and easy parking. A good spot to go through your plan paperwork in person
              if you would rather not do it by phone, and Mayodan folks will feel right
              at home there too.
            </p>
            <p>
              <strong>Aging, Disability &amp; Transit Services (ADTS) of Rockingham
              County</strong>, 105 Lawsonville Ave, Reidsville, NC 27320. The county&apos;s
              senior services department, based in Reidsville. They run senior nutrition
              programs, activities, home care, and public transit for older adults. Worth
              knowing about whether or not we ever talk.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage and Part D plans can change their costs, their
              drug lists, and their doctor networks for the next year. Your plan is supposed
              to mail you an Annual Notice of Change by the end of September, listing what
              is different for 2027.
            </p>
            <p>
              Bring that letter to a review and I will walk you through it in plain
              English. What changed, what it could cost you, and what you may want to
              double-check before December 7. If nothing important changed, I will tell
              you that too. I explain the ANOC letter in more detail on{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                my ANOC page
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
              A free review with me is a conversation, not a sales pitch. In a town like
              Madison, where folks have had the same family doctor for twenty years, the
              review is mostly about making sure the plan still fits the life. We go through:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>What you have now and what you pay for it</li>
              <li>Whether your doctor and pharmacy are covered next year</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Your questions, including the simple ones</li>
            </ul>
            <p>
              Phone, video, or in person. About twenty minutes. Bring your spouse along if
              you want a second set of ears.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <ReviewCta />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Madison</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-20 font-semibold">{item.q}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I serve</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m based over in Creedmoor, in Granville County (
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              my home base
            </Link>
            ), and I help folks across northern North Carolina by phone, video, or in
            person. Folks in{" "}
            <Link href="/medicare-eden-nc" className="underline underline-offset-2">
              Eden
            </Link>{" "}
            and{" "}
            <Link href="/medicare-in/reidsville" className="underline underline-offset-2">
              Reidsville
            </Link>{" "}
            are covered too, and you can{" "}
            <Link href="/medicare-nc-towns/" className="underline underline-offset-2">
              see every town I serve
            </Link>
            .
          </p>
          <div className="mt-10">
            <ReviewCta />
          </div>
        </div>
      </section>

      <KitchenTableClose
        heading="A local voice for your Medicare questions"
        body="About twenty minutes, free, and you&apos;ll actually understand your options. No call centers, just me."
        href="/plan-check"
        label="Take the plan-fit quiz →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-15 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
          We do not offer every plan available in your area. Currently we represent 8 organizations
          which offer 65 products in your area. Please contact Medicare.gov or 1-800-MEDICARE to
          get information on all of your options.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
