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
    absolute: "Medicare Agent in Burlington, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Burlington, NC and Alamance County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-burlington-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Burlington and Alamance County.",
    description:
      "Free Medicare plan reviews for Burlington and Alamance County. A local licensed agent, not a call center.",
    path: "/medicare-agent-burlington-nc",
  }),
};

const FAQ = [
  {
    q: "My doctors are with Cone Health. Does that limit my Medicare options?",
    a: "Not really, but it focuses them. Alamance Regional Medical Center is part of Cone Health, and most plans built for this area include Cone facilities and doctors. The review is about confirming your specific doctors are in, not guessing. Twenty minutes with the provider list settles it.",
  },
  {
    q: "Burlington sits between Greensboro and the Triangle. Does my address change what's available?",
    a: "Yes. Plan availability follows your county, and Burlington is in Alamance County, not Guilford or Orange. Your options are Alamance County's options, even if your doctors are one county over. That county-line detail is one of the most common sources of confusion I see.",
  },
  {
    q: "Do you cover the rest of Alamance County?",
    a: "All of it. Graham, Mebane, Elon, Gibsonville, Haw River, Green Level, Swepsonville, and everywhere in between. If you are in Alamance County, you are in my area.",
  },
  {
    q: "Can we meet in person in Burlington?",
    a: "Absolutely. Phone or video works too, but I am happy to meet at a public spot like the downtown public library. Bring the paperwork you have been avoiding. We will go through it together.",
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

export default function MedicareAgentBurlingtonPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Burlington, NC", path: "/medicare-agent-burlington-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Burlington, NC, for Alamance County.",
              description:
                "Plain-English Medicare help for Burlington and Alamance County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-burlington-nc",
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
              name: "Medicare plan review in Burlington, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Burlington and Alamance County, NC.",
              path: "/medicare-agent-burlington-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-burlington-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Burlington, NC" },
        ]}
        eyebrow="Medicare agent · Burlington and Alamance County"
        title="Medicare Agent in Burlington, NC"
        lede="Burlington is Alamance County's hub city: a revived downtown, a strong textile history, and Alamance Regional Medical Center anchoring local healthcare. It's also a crossroads town, close enough to Greensboro and the Triangle that people's doctors scatter in both directions. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Burlington and across Alamance County understand their Medicare options in plain English. Free help, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Burlington: Alamance County&apos;s Crossroads</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Burlington&apos;s position is the whole story. You live in Alamance County,
              so your Medicare options are Alamance County&apos;s options. But your
              doctors might be in Greensboro, Durham, or Chapel Hill, which sit in
              different counties with different plan landscapes. A plan that covers your
              Burlington GP perfectly can treat your Durham specialist as a stranger.
              Nobody explains this in the brochures.
            </p>
            <p>
              Locally, Alamance Regional Medical Center is part of Cone Health, and most
              plans designed for this area include it. That&apos;s the good news. The
              part people miss is the prescription side: plans change their drug lists
              every year, and the drug that cost you a little last year can cost a lot
              this year. The Annual Enrollment review exists for exactly this.
            </p>
            <p>
              Turning 65 in Burlington? Expect the mailbox flood. It starts months
              early and it never really stops. One honest conversation will do more for
              you than a hundred mailers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Burlington&apos;s downtown public library.</strong> A quiet public
              spot to sit down with your coverage paperwork in person, if you&apos;d
              rather do it face to face.
            </p>
            <p>
              <strong>Senior centers in Alamance County.</strong> The county has programs
              for older adults in Burlington and the surrounding towns. Worth a visit
              whether or not we ever meet. Community counts for a lot at this stage.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan&apos;s Annual Notice of
              Change arrives by September 30, and in a crossroads town like Burlington,
              the network pages of that letter matter most. I explain how to read the
              ANOC on my{" "}
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
            <li>Your Burlington and Alamance County doctors checked, plus any specialists in Greensboro or the Triangle</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-graham-nc" className="underline underline-offset-2">
              Graham
            </Link>
            ,{" "}
            <Link href="/medicare-mebane-nc" className="underline underline-offset-2">
              Mebane
            </Link>
            , Elon, and everywhere in Alamance County are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Burlington</h2>
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
            Heading toward the Triad instead? I also help folks in{" "}
            <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
              High Point
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
