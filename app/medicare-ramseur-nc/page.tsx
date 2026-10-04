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
 * The Ramseur landing page.
 *
 * Ramseur is a small mill town in Randolph County, just minutes from
 * Asheboro. Angle: Asheboro is the medical hub for the whole area, so
 * Ramseur folks have easy doctor access but still need to watch plan
 * networks, especially for specialists in Greensboro or High Point.
 * Copy in Christian's voice, no invented facts: no office address, no
 * provider relationships claimed, no plan outcomes promised.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Ramseur, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 in Ramseur, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-ramseur-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help close to home in Ramseur.",
    description:
      "Free, no-pressure Medicare plan reviews for Ramseur and Randolph County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-ramseur-nc",
  }),
};

const FAQ = [
  {
    q: "Most of my doctors are in Asheboro. Does my plan care about that?",
    a: "It's the first thing we check. If your doctors are all in Asheboro, most plans built for this area will cover them fine. But if you see specialists in Greensboro or High Point, that's where people get surprised. Twenty minutes with your plan's provider list beats a surprise bill in February.",
  },
  {
    q: "Does living in Randolph County change my Medicare options?",
    a: "It can. Medicare Advantage plan availability can vary by county, so what's offered in Randolph County isn't identical to what's offered over in Guilford or Montgomery. When we talk, we'll check what's available at your address, along with your doctors and prescriptions.",
  },
  {
    q: "Can we meet in person in Ramseur?",
    a: "Yes. We can meet somewhere convenient in Ramseur, like the library on Main Street, or talk by phone. You're welcome to include your spouse or another family member. The consultation is free, with no obligation to enroll in anything.",
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
          href="https://calendly.com/christianbrinkley4/free-medicare-review-call"
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

export default function MedicareRamseurPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Ramseur, NC", path: "/medicare-ramseur-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Ramseur, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Ramseur and Randolph County from Christian Brinkley, a licensed insurance agent.",
              path: "/medicare-ramseur-nc",
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
              name: "Medicare plan review in Ramseur, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Ramseur and Randolph County, NC.",
              path: "/medicare-ramseur-nc",
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
          { name: "Medicare help in Ramseur, NC" },
        ]}
        eyebrow="Medicare help · Ramseur and Randolph County"
        title="Medicare Help in Ramseur, NC"
        lede="Ramseur is a small mill town a few minutes from Asheboro with deep roots. The Women's Club started the library back in the 1930s, which tells you what kind of place this is. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Ramseur with Medicare questions. Free, no pressure."
        secondaryHref="/start"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Ramseur: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Ramseur is a small mill town just a few minutes from Asheboro, with deep
              roots. The Ramseur Women&apos;s Club started the public library back in the
              1930s, and that tells you something about this place. People here look out
              for each other. When it comes to Medicare, that means getting advice from a
              real person, not a phone tree.
            </p>
            <p>
              Being this close to Asheboro is a real advantage. Asheboro is the medical
              hub for this whole part of the county, so a lot of your care probably
              happens there. If your doctors are all in Asheboro, most plans built for
              this area will cover them fine. But if you see specialists in Greensboro or
              High Point, that&apos;s where people get surprised. Twenty minutes with your
              plan&apos;s provider list beats a surprise bill in February.
            </p>
            <p>
              One local note that matters: Medicare Advantage plan availability can vary by
              county. The plans offered here in Randolph County aren&apos;t identical to
              what&apos;s offered over in Guilford. When we talk, we&apos;ll check
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
              <strong className="text-[var(--color-navy)]">Ramseur Public Library</strong>,
              1512 Main St. One of the seven branches of the Randolph County library
              system, right on Main Street. A quiet, easy place to sit down with your plan
              paperwork if you&apos;d rather meet in person.
            </p>
            <p>
              <strong className="text-[var(--color-navy)]">Liberty Senior Center</strong>,
              128 S Fayetteville St, Liberty, (336) 622-5844. The closest Randolph Senior
              Adults Association senior center to Ramseur, serving adults 50 and over with
              meals, activities, and programs.
            </p>
            <p>
              For a bigger trip, the Weinberg Adult Resource and Education Center at
              347 W Salisbury St in Asheboro is the association&apos;s main hub. And SHIIP,
              the state&apos;s free, unbiased Medicare counseling program, has trained
              counselors in every North Carolina county. I&apos;m happy to be your second
              set of eyes after. Two free opinions beat one.
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
              A free review with me is a conversation, not a sales pitch. Most folks in
              Ramseur get a lot of their care in Asheboro, so that&apos;s where we start. We
              cover:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>What you have now and what you pay for it</li>
              <li>Whether your Asheboro doctors (and specialists elsewhere) stay covered next year</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Your questions, dumb ones included (they aren&apos;t)</li>
            </ul>
            <p>
              Phone, video, or in person. And I help folks all over Randolph County, including{" "}
              <Link href="/medicare-asheboro-nc" className="underline underline-offset-2">
                Asheboro
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Ramseur</h2>
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
