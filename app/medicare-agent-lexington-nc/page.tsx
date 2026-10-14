import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";

import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Agent in Lexington, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Lexington, NC and Davidson County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-lexington-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Lexington and Davidson County.",
    description:
      "Free Medicare plan reviews in the Barbecue Capital. A local licensed agent, not a call center.",
    path: "/medicare-agent-lexington-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare help for Lexington and Davidson County.",
    description:
      "Free Medicare plan reviews in the Barbecue Capital. A local licensed agent, not a call center.",
    path: "/medicare-agent-lexington-nc",
  }),
};

const FAQ = [
  {
    q: "My doctors are in Lexington but my hospital trips go to Winston-Salem. What should I check?",
    a: "This is the classic Davidson County setup, and the thing to check is the plan's hospital list, not just the doctor list. Your Lexington doctors can be perfectly covered while the Winston-Salem hospital you'd actually use sits in a different tier. A review checks both ends of that trip.",
  },
  {
    q: "Lexington is the county seat. Does that matter for Medicare?",
    a: "Only in a practical sense. The county offices and senior programs are here, which makes Lexington a good home base for paperwork and questions. Your Medicare options are set by your county and plan choices, the same as anywhere in Davidson County. The seat just means the resources are close.",
  },
  {
    q: "Can I still do a review during Barbecue Festival season?",
    a: "Absolutely. The festival is one weekend; Annual Enrollment is eight weeks. But it is a good reminder that October and November fill up fast on both sides. Book early and you will not be thinking about Medicare while you are thinking about barbecue.",
  },
  {
    q: "Do you cover the rest of Davidson County?",
    a: "All of it. Thomasville, Denton, Midway, Welcome, Arcadia, Wallburg, and everywhere in between. If you are in Davidson County, you are in my area.",
  },
] as const;

export default function MedicareAgentLexingtonPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Lexington, NC", path: "/medicare-agent-lexington-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Lexington, NC, for the county seat and Davidson County.",
              description:
                "Plain-English Medicare help for Lexington and Davidson County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-lexington-nc",
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
              name: "Medicare plan review in Lexington, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Lexington and Davidson County, NC.",
              path: "/medicare-agent-lexington-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-lexington-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Lexington, NC" },
        ]}
        eyebrow="Medicare agent · Lexington and Davidson County"
        title="Medicare Agent in Lexington, NC"
        lede="Lexington is the Davidson County seat and the self-declared Barbecue Capital of the World, and folks here take both titles seriously. It's also the county's center of gravity: the offices, the programs, and for a lot of people, the doctors. But the bigger hospitals sit up in Winston-Salem, which means Lexington healthcare lives in two places at once. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Lexington and across Davidson County understand their Medicare options in plain English. Free, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Lexington: The County Seat</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Being the county seat means Lexington is where a lot of Davidson County
              life happens: the courthouse, the county programs, the senior resources.
              For Medicare, that&apos;s convenient. What&apos;s less convenient is the
              two-city shape of Lexington healthcare. Your regular doctors are probably
              right here. The hospital you&apos;d go to for something serious is
              probably in Winston-Salem. A plan has to cover both, and the Annual Notice
              of Change is where the mismatch hides.
            </p>
            <p>
              The other thing I notice in Lexington: strong opinions, held politely.
              People have feelings about their barbecue and their doctors in equal
              measure, and they don&apos;t switch either one lightly. That&apos;s fine.
              A good review doesn&apos;t ask you to switch doctors. It checks whether
              your plan still deserves the doctors you&apos;ve chosen.
            </p>
            <p>
              Turning 65 in Davidson County? The mailers are coming. Most of them are
              selling something. One free conversation with a local agent will teach you
              more than the whole pile.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>The Lexington library.</strong> A quiet public spot to sit down
              with your paperwork in person, if you&apos;d rather do it face to face
              than over the phone.
            </p>
            <p>
              <strong>Senior programs in Davidson County.</strong> The county runs
              programs for older adults, and as the county seat, Lexington is where a
              lot of them are based. Worth knowing about whether or not you ever meet with me.
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
              of Change arrives by September 30. For Lexington folks, read the hospital
              pages first, then the doctor list. I explain how to read the ANOC on my{" "}
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
            <li>Your Lexington doctors and your Winston-Salem hospitals, all checked against the plan</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-agent-thomasville-nc" className="underline underline-offset-2">
              Thomasville
            </Link>
            , Denton, and everywhere in Davidson County are welcome.
          </p>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Lexington</h2>
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



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            I also help folks in{" "}
            <Link href="/medicare-agent-thomasville-nc" className="underline underline-offset-2">
              Thomasville
            </Link>{" "}
            and up in{" "}
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
      <MedicareByline reviewed="2026-10-10" />
      <RelatedMedicareGuides />
    </main>
  );
}
