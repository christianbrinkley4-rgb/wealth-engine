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
    absolute: "Medicare Agent in Kernersville, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Kernersville, NC, right in the middle of the Triad. Free, no-pressure help from Christian Brinkley, a licensed NC agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-kernersville-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Kernersville, in the middle of the Triad.",
    description:
      "Free Medicare plan reviews for Kernersville and the Triad corridor. A local licensed agent, not a call center.",
    path: "/medicare-agent-kernersville-nc",
  }),
};

const FAQ = [
  {
    q: "I live in Kernersville but my doctors are in Greensboro and Winston-Salem. Is that a problem?",
    a: "It is the most Kernersville situation there is. The town sits right between the two bigger cities, so plenty of folks have a doctor in each direction. It is not a problem as long as your plan's network matches your actual habits. That is exactly what a review checks.",
  },
  {
    q: "Kernersville is a small town. Do I have the same Medicare options as the big cities?",
    a: "Pretty much. Plan availability follows your county and ZIP code, not your town's size. Kernersville straddles Forsyth and Guilford counties, and both have a full set of options. The question is never whether you have choices. It is which one fits your doctors.",
  },
  {
    q: "I'm turning 65 but still working. Do I have to sign up for Medicare right away?",
    a: "Not always. If you have qualifying coverage through your job or your spouse's job, you may be able to delay without a penalty. But the details matter: the size of the employer, the kind of coverage, and the timing all count. Get this wrong and you can owe a late penalty for life. This is worth a conversation before your 65th birthday, not after.",
  },
  {
    q: "Where would we meet in person?",
    a: "Phone or video works for most folks, but I am happy to meet in person at a public spot like the Kernersville library. Bring your paperwork and your questions, and we will go through it together.",
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

export default function MedicareAgentKernersvillePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Kernersville, NC", path: "/medicare-agent-kernersville-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Kernersville, NC, for the Triad corridor.",
              description:
                "Plain-English Medicare help for Kernersville and the Triad corridor from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-kernersville-nc",
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
              name: "Medicare plan review in Kernersville, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Kernersville and the Triad corridor, NC.",
              path: "/medicare-agent-kernersville-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-kernersville-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Kernersville, NC" },
        ]}
        eyebrow="Medicare agent · Kernersville and the Triad corridor"
        title="Medicare Agent in Kernersville, NC"
        lede="Kernersville is the town in the middle: small-town feel, right on the corridor between Greensboro and Winston-Salem. Folks here commute both directions, shop both directions, and very often see doctors in both directions. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help people in Kernersville and the surrounding Triad corridor understand their Medicare options in plain English. Free, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Kernersville: The Middle of the Map</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Living between two bigger cities is great for restaurants and bad for
              assumptions. A plan that works beautifully for someone whose whole life
              happens in Greensboro can quietly fail someone in Kernersville who sees a
              GP here and a specialist twenty minutes west. The fix is simple but
              unglamorous: check every doctor, in every direction, against the plan.
            </p>
            <p>
              Kernersville also straddles two counties, Forsyth and Guilford, and plan
              details can shift at the county line. Your neighbor across the street might
              technically have different options. That sounds strange until you see it
              happen, and then it makes perfect sense why Medicare by mail feels so
              confusing.
            </p>
            <p>
              What I tell Kernersville folks turning 65: the town&apos;s quiet. Your
              mailbox won&apos;t be. One real conversation beats thirty mailers, and
              it&apos;s free.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>The Kernersville library.</strong> A comfortable public spot to go
              through your paperwork face to face. Some folks prefer it to the phone,
              and that&apos;s fine.
            </p>
            <p>
              <strong>Senior programs nearby.</strong> Both Forsyth and Guilford counties
              run programs for older adults, and there are senior centers within easy
              reach of town. If you&apos;re looking for community, not just coverage,
              start there.
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
              Change arrives by September 30. In a town where everybody&apos;s doctors
              point in different directions, that letter deserves a real read. I explain
              how to read the ANOC on my{" "}
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
            <li>Every doctor checked, whether they&apos;re in Kernersville, Greensboro, or Winston-Salem</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Timing questions if you&apos;re turning 65 or still working</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from Walkertown, Colfax, Oak Ridge, and
            across the Triad corridor are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Kernersville</h2>
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
            , on either end of the corridor. And here&apos;s{" "}
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
