import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
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
    absolute: "Medicare Agent in Creedmoor, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent from Creedmoor, NC. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent who grew up here. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-creedmoor-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help in Creedmoor from someone who grew up here.",
    description:
      "Free Medicare plan reviews in Creedmoor and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-agent-creedmoor-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare help in Creedmoor from someone who grew up here.",
    description:
      "Free Medicare plan reviews in Creedmoor and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-agent-creedmoor-nc",
  }),
};

const FAQ = [
  {
    q: "Are you really from Creedmoor?",
    a: "Yes. I grew up here. This is home, not a sales territory. When I say I will sit down with you, I mean at your kitchen table or wherever works for you in Creedmoor, Oxford, Butner, or Stem.",
  },
  {
    q: "Do I have the same Medicare options in Creedmoor as in Raleigh or Durham?",
    a: "Mostly, but plan availability and costs can differ by county. Granville County has its own plan lineup. A review checks what is actually available at your address, not what a national ad promised.",
  },
  {
    q: "My doctors are in Durham or Raleigh. Does that matter?",
    a: "It can. Many folks in Creedmoor see specialists at Duke or UNC. Your plan needs to cover the doctors you actually use, wherever they are. That is one of the first things we check in a review.",
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
            href="/start?topic=medicare&quick=1"
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

export default function MedicareAgentCreedmoorPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Creedmoor, NC", path: "/medicare-agent-creedmoor-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Creedmoor, NC: local help from someone who grew up here.",
              description:
                "Plain-English Medicare help in Creedmoor and Granville County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-creedmoor-nc",
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
              name: "Medicare plan review in Creedmoor, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent in Creedmoor, NC.",
              path: "/medicare-agent-creedmoor-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-creedmoor-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Creedmoor, NC" },
        ]}
        eyebrow="Medicare agent · Creedmoor and Granville County"
        title="Medicare Agent in Creedmoor, NC"
        lede="I grew up right here in Creedmoor. I am Christian Brinkley, a licensed insurance agent, and I help folks in Creedmoor, Oxford, Butner, and Stem understand Medicare in plain English: your doctors, your prescriptions, your budget. Free help, no pressure, no call center. When you call, you get me."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Creedmoor: Small Town, Real Choices</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Creedmoor is home. I know the roads, the people, and the way folks here
              take care of each other. That matters for Medicare, because the plan
              you pick has to work with the doctors you actually see, and plenty of
              us drive to Durham, Raleigh, or Oxford for care.
            </p>
            <p>
              That is the work of a review here: checking every doctor, every
              specialist, every hospital you would actually use against the
              plan&apos;s list, for your Granville County address. It takes about
              twenty minutes and it catches the surprise that ruins someone&apos;s
              February. Nobody should find out their specialist is out of network
              from a bill.
            </p>
            <p>
              For those turning 65: your mailbox is about to fill with Medicare ads
              from companies you have never heard of. Ignore the noise. Sit down
              for one real conversation with someone from here first.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Your home, anywhere in Granville County.</strong> I come to you.
              Bring your ANOC letter, your prescription list, and your questions.
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
            <Link href="/medicare-agent-oxford-nc" className="underline underline-offset-2">
              Oxford
            </Link>
            , Butner, Stem, and everywhere in Granville County are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Creedmoor</h2>
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
            <Link href="/medicare-agent-oxford-nc" className="underline underline-offset-2">
              Oxford
            </Link>
            , Butner, and Stem, plus{" "}
            <Link href="/medicare-agent-greensboro-nc" className="underline underline-offset-2">
              Greensboro
            </Link>{" "}
            and the Triad. Here&apos;s{" "}
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
      <MedicareByline reviewed="2026-10-12" />
      <RelatedMedicareGuides />
    </main>
  );
}
