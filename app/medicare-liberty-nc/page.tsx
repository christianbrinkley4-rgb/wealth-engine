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
 * The Liberty landing page.
 *
 * Liberty is a small rural town in Randolph County. Angle: small-town
 * crossroads where folks drive in every direction for care, and the
 * senior center and library sit on the same street. Copy in
 * Christian's voice, no invented facts: no office address, no provider
 * relationships claimed, no plan outcomes promised.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Liberty, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 in Liberty, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-liberty-nc" },
  openGraph: pageOpenGraph({
    title: "Small-town Medicare help, straight answers.",
    description:
      "Free, no-pressure Medicare plan reviews for Liberty and Randolph County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-liberty-nc",
  }),
};

const FAQ = [
  {
    q: "I live in Liberty but my doctors are in Asheboro and Greensboro. Does that matter?",
    a: "Yes, and it's one of the first things we check. Some plans have tight local networks, and a plan that covers your Asheboro doctor might not cover your Greensboro specialist. We'll map your doctors and your pharmacy against the plan's network before you commit for the year.",
  },
  {
    q: "Does living in Randolph County change my Medicare options?",
    a: "It can. Medicare Advantage plan availability can vary by county, so what's offered in Randolph County isn't identical to what's offered over in Guilford or Montgomery. When we talk, we'll check what's available at your address, along with your doctors and prescriptions.",
  },
  {
    q: "Can we meet in person in Liberty?",
    a: "Yes. We can meet somewhere convenient in Liberty, like the library on South Fayetteville Street, or talk by phone. You're welcome to include your spouse or another family member. The consultation is free, with no obligation to enroll in anything.",
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

export default function MedicareLibertyPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Liberty, NC", path: "/medicare-liberty-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Liberty, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Liberty and Randolph County from Christian Brinkley, a licensed insurance agent.",
              path: "/medicare-liberty-nc",
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
              name: "Medicare plan review in Liberty, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Liberty and Randolph County, NC.",
              path: "/medicare-liberty-nc",
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
          { name: "Medicare help in Liberty, NC" },
        ]}
        eyebrow="Medicare help · Liberty and Randolph County"
        title="Medicare Help in Liberty, NC"
        lede="Liberty is a small town in eastern Randolph County where people know their neighbors and healthcare usually isn't all in one place. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Liberty sort through Medicare with free, no-pressure reviews."
        secondaryHref="/start"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Liberty: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Liberty is a small town in the eastern part of Randolph County, the kind of
              place where the library and the senior center are on the same street and
              people know their neighbors. When you live somewhere like this, your
              healthcare usually isn&apos;t all in one place. That&apos;s just how it is
              out here.
            </p>
            <p>
              The big local issue is distance. Your primary care doctor might be in
              Liberty, your specialist might be in Asheboro or Greensboro, and your
              pharmacy somewhere else again. A plan with a tight local network can leave
              you paying out of network for care you thought was covered. This is the
              single most common surprise I see with folks in Liberty, and it&apos;s
              exactly what a twenty-minute review catches.
            </p>
            <p>
              One more local note: Medicare Advantage plan availability can vary by county.
              The plans offered here in Randolph County aren&apos;t identical to
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
              <strong className="text-[var(--color-navy)]">Liberty Public Library</strong>,
              239 S Fayetteville St. Right on the main drag through town, and a quiet,
              easy place to sit down with your plan paperwork if you&apos;d rather meet in
              person.
            </p>
            <p>
              <strong className="text-[var(--color-navy)]">Liberty Senior Center</strong>,
              128 S Fayetteville St, (336) 622-5844. Run by the Randolph Senior Adults
              Association, it serves adults 50 and over with meals, activities, and
              programs. If you&apos;re in the area and haven&apos;t been in, you&apos;re
              missing out.
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
              A free review with me is a conversation, not a sales pitch. Out here your care
              is usually spread across a few towns, so we check all of it. Here&apos;s what
              we cover:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Your current coverage and what you pay</li>
              <li>Every doctor you see, wherever they are, against next year&apos;s network</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Straight answers to what&apos;s been confusing you</li>
            </ul>
            <p>
              Phone, video, or in person at the library in Liberty. And I help folks all over
              Randolph County, including{" "}
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
          <h2 className="text-28 font-semibold">Common Questions in Liberty</h2>
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
