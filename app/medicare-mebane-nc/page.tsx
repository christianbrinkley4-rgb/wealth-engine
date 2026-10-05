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
    absolute: "Medicare Help in Mebane, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 or reviewing your Medicare in Mebane, NC? Free local help from Christian Brinkley, licensed NC agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-mebane-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Mebane and Alamance County.",
    description:
      "Free, no-pressure Medicare plan reviews for Mebane and Alamance County. A local licensed agent, not a call center.",
    path: "/medicare-mebane-nc",
  }),
};

const FAQ = [
  {
    q: "My doctors are in different cities. Does that matter for my plan?",
    a: "It can matter a lot. Some plans have tight local networks and some are broader. If your care spans Burlington and Durham, say, we need to check both against the plan's network before you commit for the year.",
  },
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7, every year. Changes take effect January 1.",
  },
  {
    q: "I just moved to Mebane from another state. Does my Medicare plan still work?",
    a: "Maybe, maybe not. Some plans are regional and their networks don't cross state lines well. If you moved in the last year, get your coverage rechecked before Annual Enrollment ends.",
  },
  {
    q: "Is the review really free?",
    a: "Yes. I'm paid by the insurance companies when someone enrolls through me, not by you. The review costs you nothing either way, even if you change nothing.",
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

export default function MedicareMebanePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare help in Mebane, NC", path: "/medicare-mebane-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Mebane, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Mebane and Alamance County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-mebane-nc",
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
              name: "Medicare plan review in Mebane, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Mebane and Alamance County, NC.",
              path: "/medicare-mebane-nc",
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
          { name: "Medicare help in Mebane, NC" },
        ]}
        eyebrow="Medicare help · Mebane and Alamance County"
        title="Medicare Help in Mebane, NC"
        lede="Mebane sits right on the I-40/85 corridor between Greensboro and Durham, and that in-between-ness shapes everything, including Medicare. Half the town commutes toward the Triad, half toward the Triangle. Your doctors might be in two different directions, which means your plan's network needs to actually cover your real life, not just your zip code. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help people across Alamance County make sense of their Medicare options, and the help is free. No cost, no pressure, no obligation."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Mebane: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              The commuter pattern is the big one. If your primary care doctor is in
              Burlington but your specialist is in Durham, a plan with a tight local network
              can leave you paying out of network for care you thought was covered. This is
              the single most common surprise I see with folks in Mebane, and it&apos;s
              exactly what a twenty-minute review catches.
            </p>
            <p>
              The second thing: Mebane keeps growing. New neighbors arriving from out of
              state sometimes don&apos;t realize their old plan&apos;s network didn&apos;t
              follow them to North Carolina. If you moved here in the last year or two and
              never rechecked your coverage, that review is overdue.
            </p>
            <p>
              And if you&apos;re turning 65 soon, welcome to the mail avalanche. You&apos;ll
              get more Medicare mail than you thought possible. Most of it is marketing.
              I&apos;ll help you sort the real deadlines from the noise.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Mebane Public Library</strong>, 101 South First Street, Mebane. Part of
              the Alamance County library system, right near downtown. Quiet tables, easy to
              park, and a fine place to sit down with your plan paperwork if you&apos;d
              rather meet in person.
            </p>
            <p>
              <strong>Senior Connect at the Mebane Arts and Community Center</strong>, 633
              Corregidor Street, Mebane. The city&apos;s Recreation and Parks Department
              runs senior programming here: gym walking, cornhole, ping pong, board and card
              games, social hours. It&apos;s built for connection, and it&apos;s the kind of
              place where Medicare questions come up naturally. Worth knowing about whether
              or not we ever talk.
            </p>
            <p>
              Folks in Mebane also have the{" "}
              <strong>John Robert Kernodle Senior Center</strong> over in Burlington, 1535
              South Mebane Street, which serves adults 55 and up across the county with
              activities and programs.
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
              which drugs they cover, and which doctors are in network. Your plan mails an
              Annual Notice of Change by the end of September. Read it, or bring it to me
              and we&apos;ll read it together. My{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                ANOC page
              </Link>{" "}
              walks through what to look for.
            </p>
            <p>
              The stakes are real but the process doesn&apos;t have to be stressful. Twenty
              minutes, once a year, and you know where you stand for January.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>What you have now and what it costs you</li>
            <li>Whether your doctors are in network next year, in whichever direction they are</li>
            <li>What your prescriptions will cost under the new plan details</li>
            <li>Straight answers to whatever&apos;s confusing you</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person at the library in Mebane. Folks from{" "}
            <Link href="/medicare-graham-nc" className="underline underline-offset-2">
              Graham
            </Link>
            ,{" "}
            <Link href="/medicare-in/burlington" className="underline underline-offset-2">
              Burlington
            </Link>,
            and{" "}
            <Link href="/medicare-in/elon" className="underline underline-offset-2">
              Elon
            </Link>{" "}
            are welcome too. Your call.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Mebane</h2>
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
            I also help folks over in Granville County, around{" "}
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
            </Link>
            . Here&apos;s{" "}
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
