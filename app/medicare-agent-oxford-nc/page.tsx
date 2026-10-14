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
    absolute: "Medicare Agent in Oxford, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent serving Oxford, NC and Granville County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent from nearby Creedmoor. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-oxford-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help in Oxford from a nearby local agent.",
    description:
      "Free Medicare plan reviews in Oxford and Granville County. A licensed agent from Creedmoor, not a call center.",
    path: "/medicare-agent-oxford-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare help in Oxford from a nearby local agent.",
    description:
      "Free Medicare plan reviews in Oxford and Granville County. A licensed agent from Creedmoor, not a call center.",
    path: "/medicare-agent-oxford-nc",
  }),
};

const FAQ = [
  {
    q: "Where are you based?",
    a: "I live in Creedmoor, right down the road. Oxford is the county seat and I am over here regularly. When I say I will sit down with you, I mean at your home in Oxford or wherever works for you in Granville County.",
  },
  {
    q: "Do Oxford residents get the same Medicare plans as Raleigh?",
    a: "Not exactly. Plan availability and costs are set by county, so Granville County has its own lineup. A review checks what is actually available at your Oxford address, not what a TV ad promised.",
  },
  {
    q: "I see doctors at Granville Health System. Will my plan cover them?",
    a: "That is one of the first things we check. Your plan needs to include the doctors and facilities you actually use. Bring your doctor list to our review and we will verify each one.",
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

export default function MedicareAgentOxfordPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Oxford, NC", path: "/medicare-agent-oxford-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Oxford, NC: local help from nearby Creedmoor.",
              description:
                "Plain-English Medicare help in Oxford and Granville County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-oxford-nc",
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
              name: "Medicare plan review in Oxford, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Oxford, NC.",
              path: "/medicare-agent-oxford-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-oxford-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Oxford, NC" },
        ]}
        eyebrow="Medicare agent · Oxford and Granville County"
        title="Medicare Agent in Oxford, NC"
        lede="Oxford is the county seat, and it feels like it. Downtown Main Street, folks who have lived here for decades. I am Christian Brinkley, a licensed insurance agent from nearby Creedmoor. I help people across Oxford and Granville County understand Medicare in plain English. Free help, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Oxford: Know Your Doctors, Know Your Plan</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Oxford folks tend to stay close to home for care, and that is a good
              thing, as long as your plan agrees. Granville Health System serves a
              lot of people here, and your Medicare plan needs to include the
              doctors and facilities you actually use.
            </p>
            <p>
              That is the work of a review: checking every doctor, every
              specialist, every place you would go against the plan&apos;s list,
              for your Oxford address. It takes about twenty minutes and it
              catches the surprise that ruins someone&apos;s February. Nobody
              should find out their doctor is out of network from a bill.
            </p>
            <p>
              For those turning 65: your mailbox is about to fill with Medicare ads
              from companies you have never heard of. Ignore the noise. Sit down
              for one real conversation with someone nearby first.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Your home, anywhere in Granville County.</strong> I am in
              Creedmoor, so Oxford is a short drive. Bring your ANOC letter, your
              prescription list, and your questions.
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
            <Link href="/medicare-agent-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
            </Link>
            , Butner, Stem, and everywhere in Granville County are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Oxford</h2>
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
            <Link href="/medicare-agent-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
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
        heading="From nearby, not a call center"
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
