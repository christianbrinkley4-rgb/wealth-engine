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
    absolute: "Medicare Agent in High Point, NC | Christian Brinkley",
  },
  description:
    "Looking for a Medicare agent in High Point, NC? Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-high-point-nc" },
  openGraph: pageOpenGraph({
    title: "A Medicare agent for High Point and Guilford County.",
    description:
      "Free Medicare plan reviews in the Furniture Capital. A local licensed agent, not a call center.",
    path: "/medicare-agent-high-point-nc",
  }),
};

const FAQ = [
  {
    q: "My doctors are split between High Point and Greensboro. Does my plan cover both?",
    a: "It might, but you cannot assume it. High Point sits close enough to Greensboro that plenty of folks see a GP here and specialists there, and networks do not always treat the two cities the same. A review means checking every doctor against the plan's provider list before you lock in for the year.",
  },
  {
    q: "High Point Regional is part of a bigger health system now. Should I recheck my plan?",
    a: "Yes. High Point Regional Hospital is part of Atrium Health Wake Forest Baptist now, and hospital mergers change which plans treat a hospital as in-network. If you have been on the same plan for years, the hospital changed around you. That is worth a look during Annual Enrollment.",
  },
  {
    q: "Do you meet people in person in High Point, or is it phone only?",
    a: "Either. We can do phone or video, or meet in person at a public spot like the High Point Public Library. Some folks bring their spouse and a folder of paperwork. That works great.",
  },
  {
    q: "I retired from a furniture company. Is there anything special I should know?",
    a: "Possibly. Retiree coverage from a former employer interacts with Medicare in ways that are easy to get wrong, like paying for two things that cover the same bills or dropping coverage you cannot get back. Bring the details from your old employer and we will sort through it together.",
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

export default function MedicareAgentHighPointPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in High Point, NC", path: "/medicare-agent-high-point-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in High Point, NC, for the Furniture Capital and Guilford County.",
              description:
                "Plain-English Medicare help for High Point and Guilford County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-high-point-nc",
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
              name: "Medicare plan review in High Point, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving High Point and Guilford County, NC.",
              path: "/medicare-agent-high-point-nc",
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
          { name: "Medicare agent in High Point, NC" },
        ]}
        eyebrow="Medicare agent · High Point and Guilford County"
        title="Medicare Agent in High Point, NC"
        lede="High Point is North Carolina's Furniture Capital, the second-largest city in the Triad, and home to the High Point Market that fills the town twice a year. It's also a city where a lot of people get their healthcare in more than one place: a doctor here, a specialist in Greensboro, a hospital visit across town. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in High Point and across Guilford County make sense of their Medicare options. The help is free, and you'll hear it from me plainly, not from a mailer or a call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in High Point: The Triad&apos;s Middle Ground</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              High Point&apos;s location is its blessing and its complication. You&apos;re
              close enough to Greensboro and Winston-Salem that splitting your doctors
              across cities is completely normal. That only works if your plan&apos;s
              network agrees with your habits. Every fall, I watch people discover that a
              plan which covers their High Point doctor just fine treats their Greensboro
              specialist very differently.
            </p>
            <p>
              Then there&apos;s the hospital question. High Point Regional Hospital is part
              of Atrium Health Wake Forest Baptist now. That kind of change doesn&apos;t
              automatically break your coverage, but it does mean your old assumptions are
              worth checking. Hospital systems change. Your plan&apos;s provider list
              changes. The one thing that doesn&apos;t change is that nobody mails you a
              plain-English warning when they stop matching.
            </p>
            <p>
              And for folks turning 65: your mailbox is about to get loud. The furniture
              market brings the crowds twice a year, but Medicare ads show up every single
              day. Most of them are selling something. A review with me isn&apos;t selling
              anything. It&apos;s twenty minutes of answers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>High Point Public Library.</strong> A quiet public spot right in
              town, and a good place to sit down with your coverage paperwork if
              you&apos;d rather meet face to face than talk on the phone.
            </p>
            <p>
              <strong>Senior centers in Guilford County.</strong> The county runs
              programming for older adults, and the libraries and senior centers around
              High Point and Jamestown are worth knowing about whether or not we ever
              meet. Good communities make this stuff less lonely.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan has to mail you its
              Annual Notice of Change by September 30, spelling out what&apos;s different
              next year: costs, drug coverage, doctor network. Bring that letter to our
              review, or just bring your questions. I walk through how to read the ANOC on
              my{" "}
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
            <li>Whether your High Point doctors and your Greensboro or Winston-Salem specialists all stay covered next year</li>
            <li>Your prescription costs under the new plan details</li>
            <li>How any retiree coverage from a former employer fits with Medicare</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from Jamestown, Archdale, Trinity, and
            across Guilford County are all welcome. Curious about the supplement route
            instead? Here&apos;s my page on{" "}
            <Link href="/medigap-plans-high-point-nc" className="underline underline-offset-2">
              Medigap plans in High Point
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in High Point</h2>
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
            I also help folks down the road in{" "}
            <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
              Kernersville
            </Link>{" "}
            and{" "}
            <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
              Winston-Salem
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
