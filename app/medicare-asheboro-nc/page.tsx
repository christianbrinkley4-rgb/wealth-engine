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
    absolute: "Medicare Help in Asheboro, NC | Free Reviews | Christian Brinkley",
  },
  description:
    "Turning 65 or reviewing your Medicare in Asheboro, NC? Free local help from Christian Brinkley, licensed NC agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-asheboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Asheboro and Randolph County.",
    description:
      "Free, no-pressure Medicare plan reviews for Asheboro and all of Randolph County. A local licensed agent, not a call center.",
    path: "/medicare-asheboro-nc",
  }),
};

const FAQ = [
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7 every year. Any changes you make take effect January 1.",
  },
  {
    q: "I've been on the same plan for years. Do I really need to review it?",
    a: "Honestly, yes, and you're exactly who Annual Enrollment is for. Plans change their drug lists and costs every year. The plan that was perfect three years ago might not be anymore. The review is free and takes about twenty minutes.",
  },
  {
    q: "My doctors are in Asheboro but my specialists are in Greensboro. Does that matter?",
    a: "It can. If your primary care is local but you see specialists in Greensboro or High Point, we need to check every one of them against your plan's network before you commit for the year. That's the kind of surprise a twenty-minute review catches.",
  },
  {
    q: "Do you only help people in Asheboro?",
    a: "No. I cover all of Randolph County: Archdale, Randleman, Liberty, Ramseur, Trinity, Franklinville, Seagrove, Staley, and everywhere in between.",
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
            className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(21,46,52,0.1),0_4px_16px_rgba(21,46,52,0.1)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(21,46,52,0.08)]"
          >
            Take the plan-fit quiz →
          </Link>
          <a
            href="/schedule?topic=medicare"
            className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] shadow-[0_1px_2px_rgba(21,46,52,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--color-gold-ink)] hover:text-[var(--color-gold-ink)] hover:shadow-[0_2px_4px_rgba(21,46,52,0.07),0_3px_12px_rgba(21,46,52,0.06)] active:translate-y-0"
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

export default function MedicareAsheboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare help in Asheboro, NC", path: "/medicare-asheboro-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Asheboro, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Asheboro and Randolph County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-asheboro-nc",
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
              name: "Medicare plan review in Asheboro, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Asheboro and Randolph County, NC.",
              path: "/medicare-asheboro-nc",
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
          { name: "Medicare help in Asheboro, NC" },
        ]}
        eyebrow="Medicare help · Asheboro and Randolph County"
        title="Medicare Help in Asheboro, NC"
        lede="Asheboro is the county seat of Randolph County, home of the North Carolina Zoo, and the hub town for a whole stretch of central North Carolina. Folks drive in from Ramseur, Liberty, Franklinville, and Seagrove for shopping, for doctors, for just about everything. If you're on Medicare anywhere in Randolph County, Asheboro is probably where a lot of your healthcare happens. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help people across Randolph County understand their Medicare options. The help is free, and I'd rather you hear that from me plainly than from a mailer."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Asheboro: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Because Asheboro is the county&apos;s medical hub, network questions here cut
              both ways. If your doctors are all in Asheboro, most plans built for this area
              will cover them fine. But if you see specialists in Greensboro or High Point,
              that&apos;s where people get surprised. Twenty minutes with your plan&apos;s
              provider list beats a surprise bill in February.
            </p>
            <p>
              Randolph County also has a lot of folks who&apos;ve been on the same plan for
              years without ever rechecking it. Loyalty is admirable. It&apos;s also how you
              end up paying for a drug tier that changed three years ago. The Annual
              Enrollment Period exists so you can fix that once a year without penalty.
            </p>
            <p>
              And for those turning 65: the zoo isn&apos;t the only thing in Asheboro that
              draws a crowd. Your mailbox is about to fill up with Medicare ads. Most of them
              are selling something. I&apos;m not selling anything in a review. I&apos;m
              answering questions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Asheboro Public Library</strong>, 201 Worth Street, Asheboro. The
              headquarters branch of the Randolph County library system, right in town. Good
              quiet meeting spot if you&apos;d like to go through your coverage paperwork in
              person.
            </p>
            <p>
              <strong>Randolph Senior Adults Association</strong>, 347 West Salisbury Street,
              Asheboro. The Harry and Jeanette Weinberg Adult Resource and Education Center
              serves adults 50 and older with programs, classes, fitness, and community.
              It&apos;s one of the most active senior organizations in the county, and if
              you&apos;re in the area and haven&apos;t visited, you&apos;re missing out.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan can change its costs, its
              drug coverage, and its doctor network, and it has to tell you about it in the
              Annual Notice of Change mailed by September 30. Bring that letter to our
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
            <li>Whether your Asheboro doctors (and any specialists elsewhere) stay covered next year</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-ramseur-nc" className="underline underline-offset-2">
              Ramseur
            </Link>
            ,{" "}
            <Link href="/medicare-liberty-nc" className="underline underline-offset-2">
              Liberty
            </Link>,
            and{" "}
            <Link href="/medicare-in/randleman" className="underline underline-offset-2">
              Randleman
            </Link>{" "}
            are all welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Asheboro</h2>
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
