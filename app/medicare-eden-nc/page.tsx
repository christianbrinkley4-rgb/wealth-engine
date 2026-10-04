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
 * The Eden, NC town page (Rockingham County, 27288).
 *
 * Local angle: former mill town on the Smith River, northern Rockingham
 * corridor. No invented facts: no mill names or dates, no provider names,
 * no plan outcomes promised. Library and county senior services verified
 * by web search 2026-10-04.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Eden, NC | Christian Brinkley",
  },
  description:
    "Free Medicare plan reviews in Eden, NC from Christian Brinkley, licensed NC agent. Plain-English help for Rockingham County. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-eden-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Eden and northern Rockingham County.",
    description:
      "Free, no-pressure Medicare plan reviews for Eden and Rockingham County from Christian Brinkley, a licensed NC agent. Call (919) 408-6671.",
    path: "/medicare-eden-nc",
  }),
};

const FAQ = [
  {
    q: "I live in Eden. Can we actually meet in person?",
    a: "Yes. We can sit down at the Eden Library or another public spot in town, or just talk by phone. You are welcome to bring your spouse or a family member. The review is free either way, with no obligation to enroll in anything.",
  },
  {
    q: "Does living in Rockingham County change my Medicare options?",
    a: "It can. Medicare Advantage plan availability varies by county, so what is offered here is not identical to what is offered over in Guilford or Forsyth. When we review your situation, we check what is available at your home address, along with your doctors, your pharmacy, and your prescriptions.",
  },
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7, every year. Any changes you make take effect January 1.",
  },
  {
    q: "What should I bring to a review?",
    a: "Your Annual Notice of Change letter if you got one, a list of your current prescriptions, and the names of your doctors. If you do not have all of that, come anyway. We will work with what you have.",
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

export default function MedicareEdenPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Eden, NC", path: "/medicare-eden-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Eden, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Eden and northern Rockingham County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-eden-nc",
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
              name: "Medicare plan review in Eden, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed agent serving Eden and northern Rockingham County, NC.",
              path: "/medicare-eden-nc",
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
          { name: "Medicare help in Eden, NC" },
        ]}
        eyebrow="Medicare help · Eden and northern Rockingham County"
        title="Medicare Help in Eden, NC"
        lede="Eden grew up around the mills on the Smith River, and a lot of folks here have been with the same doctor and pharmacy for decades. I&apos;m Christian Brinkley, a licensed insurance agent in North Carolina. I help people in Eden and northern Rockingham County make sense of Medicare in plain English. Free reviews, and you always talk to me, never a call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Eden: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Eden is a former mill town on the Smith River, up in the northern part of
              Rockingham County. People here tend to stay put. Same house, same doctor, same
              pharmacy for years. That loyalty is a good thing, until your plan quietly
              changes something and you find out at the pharmacy counter.
            </p>
            <p>
              The question that comes up most here is networks. Eden sits between Reidsville
              and the Virginia line, and plenty of folks here see doctors toward Reidsville
              or Greensboro. A plan can look fine on paper and still cost you more if your
              doctor or your pharmacy falls outside its network. That is exactly what a
              twenty-minute review catches.
            </p>
            <p>
              One more local note. Medicare Advantage availability can vary by county, and
              Rockingham County has its own set of options. When we talk, we check what is
              available at your address, not somebody else&apos;s.
            </p>
            <p>
              And if you are turning 65 in Eden, brace for the mail avalanche. Your
              mailbox will fill up fast, and most of it is marketing dressed up to look
              official. I will help you sort the real deadlines from the noise, and we
              will check the options for your street address, not somebody else&apos;s.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Eden Library</strong>, 598 S. Pierce Street, Eden, NC 27288. A branch
              of the Rockingham County Public Library, with quiet tables and easy parking.
              If you would rather meet in person than talk on the phone, it is a good spot
              to go through your plan paperwork together.
            </p>
            <p>
              <strong>Aging, Disability &amp; Transit Services (ADTS) of Rockingham
              County</strong>, 105 Lawsonville Ave, Reidsville, NC 27320. The county&apos;s
              senior services department. They run senior nutrition programs, activities,
              home care, and public transit for older adults. Worth knowing about whether or
              not we ever talk.
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
              double-check before December 7. I explain the ANOC letter in more detail on{" "}
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
              A free review with me is a conversation, not a sales pitch. Since plans
              re-file their details every fall, the review is really about catching what
              changed on paper before it hits you in real life. Here&apos;s what we check:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>What you have now and what it costs you</li>
              <li>Whether your Eden doctors and pharmacy stay covered next year</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>The questions you&apos;ve been meaning to ask</li>
            </ul>
            <p>
              Phone, video, or in person. About twenty minutes, and if your plan still looks
              good, I will tell you that and you can get on with your day.
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
          <h2 className="text-28 font-semibold">Common Questions in Eden</h2>
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
            <Link href="/medicare-madison-nc" className="underline underline-offset-2">
              Madison
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
        heading="Medicare help without the runaround"
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
