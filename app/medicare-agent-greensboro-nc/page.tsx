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
    absolute: "Medicare Agent in Greensboro, NC | Christian Brinkley",
  },
  description:
    "A local Medicare agent in Greensboro, NC. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent who answers his own phone. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-greensboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help in Greensboro from a local licensed agent.",
    description:
      "Free Medicare plan reviews in Greensboro and Guilford County. Not a call center.",
    path: "/medicare-agent-greensboro-nc",
  }),
};

const FAQ = [
  {
    q: "Do you only help people in Greensboro, or the surrounding towns too?",
    a: "Greensboro is home base, but I help folks across Guilford County and the whole Piedmont Triad: High Point, Jamestown, Summerfield, Oak Ridge, Pleasant Garden, Stokesdale, and the rest. If you are nearby, you are in my area.",
  },
  {
    q: "My doctors are in the Cone Health system. Does my Medicare plan need to like Cone?",
    a: "Yes, and this is the question that matters most in Greensboro. Cone Health runs Moses Cone Hospital and most of the specialist practices around here. Your plan review has to check every one of your doctors against the plan's network, not just the hospital name you recognize.",
  },
  {
    q: "Can we meet in person, or is everything by phone?",
    a: "Both work. I am local, so we can sit down in person at your home or a public spot, or do phone or video. Bring your spouse if you want. Most folks do.",
  },
  {
    q: "What does it cost to talk with you?",
    a: "Nothing. The consultation is free and there is no obligation to enroll in anything. I am paid by the insurance companies if you choose a plan, not by you.",
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

export default function MedicareAgentGreensboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Greensboro, NC", path: "/medicare-agent-greensboro-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Greensboro, NC: local help, not a call center.",
              description:
                "Plain-English Medicare help in Greensboro and Guilford County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-greensboro-nc",
              datePublished: "2026-10-12",
              dateModified: "2026-10-12",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Greensboro, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent in Greensboro, NC.",
              path: "/medicare-agent-greensboro-nc",
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
          { name: "Medicare agent in Greensboro, NC" },
        ]}
        eyebrow="Medicare agent · Greensboro and Guilford County"
        title="Medicare Agent in Greensboro, NC"
        lede="Greensboro is home. I am Christian Brinkley, a licensed insurance agent right here in town. I help folks across Greensboro and Guilford County sort through Medicare in plain English: your doctors, your prescriptions, your budget. Free help, no pressure, no call center. When you call, you get me."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Greensboro: Your Doctors Come First</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Here&apos;s what matters most about Medicare in Greensboro. Cone Health runs
              Moses Cone Hospital and most of the specialist practices in town. Your
              doctors probably belong to that system, and the plan you pick has opinions
              about which doctors cost you more.
            </p>
            <p>
              That&apos;s the work of a review here: mapping every doctor, every
              specialist, every hospital you&apos;d actually use against the plan&apos;s
              list. It takes about twenty minutes and it catches the exact surprise that
              ruins someone&apos;s February. Nobody should find out their doctor is out
              of network from a bill.
            </p>
            <p>
              For those turning 65: your mailbox is about to fill with Medicare ads from
              companies you have never heard of. Ignore the noise. Sit down for one real
              conversation with someone local first.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Your home, anywhere in Guilford County.</strong> I come to you. Bring
              your ANOC letter, your prescription list, and your questions.
            </p>
            <p>
              <strong>Or by phone or video.</strong> Whatever is easiest. Bring your spouse
              if you want. Most folks do.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan mails its Annual Notice
              of Change by September 30. That letter is where the doctor-list and
              prescription changes hide, so bring it to our review. I explain how to read
              the ANOC on my{" "}
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
            <li>Every one of your doctors checked against the plan</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
              High Point
            </Link>
            , Jamestown, Summerfield, and everywhere in Guilford County are welcome.
            Wondering how Advantage plans specifically work here? Here&apos;s my page on{" "}
            <Link href="/medicare-advantage-plans-greensboro-nc" className="underline underline-offset-2">
              Medicare Advantage plans in Greensboro
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Greensboro</h2>
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
            <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
              Winston-Salem
            </Link>{" "}
            and{" "}
            <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
              High Point
            </Link>
            , right down the Triad corridor. And here&apos;s{" "}
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
