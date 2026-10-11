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

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Agent in Reidsville, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Reidsville, NC and Rockingham County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-reidsville-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Reidsville and Rockingham County.",
    description:
      "Free Medicare plan reviews for Reidsville and Rockingham County. A local licensed agent, not a call center.",
    path: "/medicare-agent-reidsville-nc",
  }),
};

const FAQ = [
  {
    q: "My specialists are in Greensboro, about 25 minutes away. Does the drive matter for my plan?",
    a: "The drive doesn't matter. The network does. Plenty of Reidsville folks see specialists in Greensboro, and the question is always the same: are those specialists in your plan's network? A plan can be great for your Reidsville GP and still treat your Greensboro cardiologist as out of network. Check before you commit.",
  },
  {
    q: "Annie Penn is my hospital. Should I worry about network changes?",
    a: "Annie Penn Hospital is part of Cone Health, and most plans built for this area include it. Still, plans and networks shift every year, and assumptions from three years ago are how people get surprised. A quick Annual Enrollment check keeps it settled.",
  },
  {
    q: "Do you cover the rest of Rockingham County?",
    a: "All of it. Eden, Madison, Wentworth, Stoneville, Ruffin, Pelham, and everywhere in between. If you are in Rockingham County, you are in my area.",
  },
  {
    q: "I've been on the same plan for years and never had a problem. Do I really need a review?",
    a: "You are exactly who the review is for. Plans change their drug lists and costs every year, and 'no problems yet' just means the changes haven't hit your drugs or your doctors so far. Twenty minutes, free, and if your plan is already fine I will tell you so.",
  },
] as const;

function CtaBlock() {
  return (
    <section className="bg-white py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">Get your free Medicare review</h2>
        <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Take the 2-minute plan-fit quiz and I&apos;ll reach out, or book a time that works
          for you.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/plan-check"
            className="btn"
          >
            Take the plan-fit quiz →
          </Link>
          <a
            href="/schedule?topic=medicare"
            className="btn btn-outline"
          >
            Book a free call
          </a>
        </div>
        <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
          Prefer to talk? Call or text{" "}
          <a href={AGENT.phoneHref} className="underline underline-offset-2">
            {AGENT.phone}
          </a>
          .
        </p>
        <p className="text-16 mt-4 italic text-[var(--color-ink-muted)]">
          Free help from a licensed North Carolina insurance agent. No cost, no pressure, no
          obligation.
        </p>
      </div>
    </section>
  );
}

export default function MedicareAgentReidsvillePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Reidsville, NC", path: "/medicare-agent-reidsville-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Reidsville, NC, for Rockingham County.",
              description:
                "Plain-English Medicare help for Reidsville and Rockingham County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-reidsville-nc",
              datePublished: "2026-10-10",
              dateModified: "2026-10-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Reidsville, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Reidsville and Rockingham County, NC.",
              path: "/medicare-agent-reidsville-nc",
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
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Reidsville, NC" },
        ]}
        eyebrow="Medicare agent · Reidsville and Rockingham County"
        title="Medicare Agent in Reidsville, NC"
        lede="Reidsville is a proud small city in Rockingham County: historic downtown, Annie Penn Hospital close by, and Greensboro just down the road for the specialists. It's the kind of town where your healthcare life splits naturally between local care and the bigger city. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Reidsville and across Rockingham County understand their Medicare options in plain English. Free, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Reidsville: A Small City With Big Questions</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Reidsville&apos;s pattern is one I know well. Your GP is probably right in
              town, maybe at Annie Penn. Your specialists are probably in Greensboro.
              That works fine as a way to live, but it only works as a plan if your
              coverage treats both places the same. Every year I see people learn the
              hard way that their plan&apos;s network had a different idea about their
              Greensboro doctors.
            </p>
            <p>
              The other Reidsville pattern is loyalty. Folks here stay on the same plan
              for years, sometimes a decade, because it worked when they picked it.
              Loyalty is a good trait. It&apos;s just a bad strategy for Medicare, where
              drug lists and costs move every single year. The plan that was perfect in
              2021 might be quietly expensive now.
            </p>
            <p>
              If you&apos;re turning 65 in Rockingham County, here&apos;s the short
              version: the mailers are coming, most of them are selling something, and
              one real conversation with a local agent will teach you more than all of
              them. That conversation is free.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>The Reidsville library.</strong> A quiet public spot to go through
              your paperwork face to face, if you&apos;d rather not do it over the
              phone.
            </p>
            <p>
              <strong>Senior programs in Rockingham County.</strong> The county has
              programs and gathering spots for older adults in Reidsville and the
              surrounding towns. Worth knowing about whether or not we ever meet.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan&apos;s Annual Notice
              of Change arrives by September 30. Read the network pages with your
              Greensboro specialists in mind, not just your Reidsville doctors. I walk
              through how to read the ANOC on my{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                ANOC page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Your current coverage and what you&apos;re paying</li>
            <li>Your Reidsville doctors and your Greensboro specialists, all checked against the plan</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-eden-nc" className="underline underline-offset-2">
              Eden
            </Link>
            ,{" "}
            <Link href="/medicare-madison-nc" className="underline underline-offset-2">
              Madison
            </Link>
            , Wentworth, and everywhere in Rockingham County are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Reidsville</h2>
          <div className="text-17 mt-6 space-y-6 leading-relaxed text-[var(--color-ink-muted)]">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-20 font-semibold">{item.q}</h3>
                <p className="mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            I also help folks in{" "}
            <Link href="/medicare-eden-nc" className="underline underline-offset-2">
              Eden
            </Link>{" "}
            and{" "}
            <Link href="/medicare-madison-nc" className="underline underline-offset-2">
              Madison
            </Link>
            . And here&apos;s{" "}
            <Link href="/medicare-nc-towns" className="underline underline-offset-2">
              the full list of towns I serve
            </Link>
            .
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="From a neighbor, not a call center"
        body="About twenty minutes, free, and you'll actually understand your options. If your plan is already fine, I'll tell you so."
        href="/plan-check"
        label="Take the plan-fit quiz →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
