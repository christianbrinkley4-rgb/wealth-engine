import type { Metadata } from "next";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
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
    absolute: "Medicare Agent in Winston-Salem, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Winston-Salem, NC and Forsyth County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-winston-salem-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Winston-Salem and Forsyth County.",
    description:
      "Free Medicare plan reviews in the Twin City. A local licensed agent, not a call center.",
    path: "/medicare-agent-winston-salem-nc",
  }),
};

const FAQ = [
  {
    q: "Winston-Salem has two big hospital systems. Does it matter which one my plan likes?",
    a: "Yes, this is the single most Winston-Salem question there is. Atrium Health Wake Forest Baptist and Novant Health are both here, and plans do not treat them identically. Your review has to check your doctors against both systems, not just the hospital with the billboard you remember.",
  },
  {
    q: "My cardiologist is in one system and my GP is in the other. Is that normal?",
    a: "Completely normal here. Plenty of folks built their care team over decades, one doctor at a time, without thinking about which system each one belongs to. A twenty-minute review maps your whole team against the plan before you commit for the year.",
  },
  {
    q: "Do you cover the rest of Forsyth County, or just Winston-Salem?",
    a: "All of it. Clemmons, Kernersville, Walkertown, Rural Hall, Lewisville, and everywhere in between. If you are in Forsyth County, you are in my area.",
  },
  {
    q: "Can we meet in person, or is everything by phone?",
    a: "Both work. We can do phone or video, or meet in person at a public spot like the Central Library downtown. Bring your spouse if you want. Most folks do.",
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

export default function MedicareAgentWinstonSalemPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Winston-Salem, NC", path: "/medicare-agent-winston-salem-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Winston-Salem, NC, for the Twin City and Forsyth County.",
              description:
                "Plain-English Medicare help for Winston-Salem and Forsyth County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-winston-salem-nc",
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
              name: "Medicare plan review in Winston-Salem, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Winston-Salem and Forsyth County, NC.",
              path: "/medicare-agent-winston-salem-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-winston-salem-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Winston-Salem, NC" },
        ]}
        eyebrow="Medicare agent · Winston-Salem and Forsyth County"
        title="Medicare Agent in Winston-Salem, NC"
        lede="Winston-Salem is the Twin City: arts downtown, a deep medical tradition, and two major hospital systems that shape where everybody gets care. That makes Medicare here a little more complicated than in a one-hospital town, because the plan you pick has opinions about your doctors. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks across Winston-Salem and Forsyth County sort through their options in plain English. Free help, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Winston-Salem: Two Systems, One Decision</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Here&apos;s what makes Winston-Salem different from most towns I serve. You
              don&apos;t have one hospital. You have Wake Forest Baptist Medical Center
              and Novant Health Forsyth Medical Center, and your doctors are spread across
              both. Most people chose their doctors years ago, one at a time, for good
              reasons that had nothing to do with insurance networks. Then a plan comes
              along and suddenly half your care team costs more.
            </p>
            <p>
              That&apos;s the work of a review here: mapping every doctor, every
              specialist, every hospital you&apos;d actually use against the plan&apos;s
              list. It takes about twenty minutes and it catches the exact surprise that
              ruins someone&apos;s February. Nobody should find out their cardiologist is
              out of network from a bill.
            </p>
            <p>
              For those turning 65: the downtown arts district will give you plenty to do
              on weekends. Your weekday mailbox, though, is about to fill with Medicare
              ads. Ignore the noise. Sit down for one real conversation first.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Forsyth County Central Library, downtown Winston-Salem.</strong> A
              good public spot to sit down with your paperwork in person if you&apos;d
              rather not do it over the phone.
            </p>
            <p>
              <strong>Senior services around the county.</strong> Forsyth County has
              senior centers and programs worth knowing about, in Winston-Salem and in
              the smaller towns. Ask me and I&apos;ll point you toward the ones near
              you.
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
              of Change by September 30. That letter is where the hospital-system and
              doctor-list changes hide, so bring it to our review. I explain how to read
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
            <li>Every one of your doctors checked against the plan, across both hospital systems</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
              Kernersville
            </Link>
            , Clemmons, and everywhere in Forsyth County are welcome. Wondering how
            Advantage plans specifically work here? Here&apos;s my page on{" "}
            <Link href="/medicare-advantage-plans-winston-salem-nc" className="underline underline-offset-2">
              Medicare Advantage plans in Winston-Salem
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Winston-Salem</h2>
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
            <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
              Kernersville
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
