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
    absolute: "Medicare Agent in Thomasville, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Thomasville, NC and Davidson County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-thomasville-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Thomasville and Davidson County.",
    description:
      "Free Medicare plan reviews in the Chair City. A local licensed agent, not a call center.",
    path: "/medicare-agent-thomasville-nc",
  }),
};

const FAQ = [
  {
    q: "I spent my career in the furniture industry. Does retiree coverage change my Medicare decisions?",
    a: "It can, and this comes up a lot in the Chair City. Retiree coverage from a former employer can work alongside Medicare, but the order matters: which pays first, what you can drop, and what you can never get back. Bring the paperwork from your old employer and we will figure out the right combination.",
  },
  {
    q: "Novant Health Thomasville Medical Center is my hospital. Are there plans that don't include it?",
    a: "Yes. Plans build their own networks, and a hospital being close to your house does not automatically put it in your plan. Most plans designed for this area include it, but 'most' is not a promise. A review checks your actual hospital and doctors against the plan's actual list.",
  },
  {
    q: "My doctors are spread across Thomasville, Lexington, and High Point. Is that normal?",
    a: "Very normal in Davidson County. People follow the doctor they trust, not the town line. It only becomes a problem if your plan's network does not follow the same doctors. That is a twenty-minute check, and it is the most useful twenty minutes of the Medicare year.",
  },
  {
    q: "Can we meet in person in Thomasville?",
    a: "Of course. Phone or video works fine, but I am happy to meet at a public spot like the Thomasville library. Bring your spouse and your paperwork. That is how most folks prefer to do it.",
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

export default function MedicareAgentThomasvillePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Thomasville, NC", path: "/medicare-agent-thomasville-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Thomasville, NC, for the Chair City and Davidson County.",
              description:
                "Plain-English Medicare help for Thomasville and Davidson County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-thomasville-nc",
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
              name: "Medicare plan review in Thomasville, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Thomasville and Davidson County, NC.",
              path: "/medicare-agent-thomasville-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-thomasville-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Thomasville, NC" },
        ]}
        eyebrow="Medicare agent · Thomasville and Davidson County"
        title="Medicare Agent in Thomasville, NC"
        lede="Thomasville is the Chair City: a furniture town through and through, with generations of families who built their working lives in the industry. It's also a town where healthcare spreads out, with Novant Health Thomasville Medical Center close by and specialists in Lexington, High Point, and Winston-Salem. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Thomasville and across Davidson County understand their Medicare options in plain English. Free, no pressure, no call center."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Thomasville: The Chair City</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Thomasville&apos;s furniture heritage shows up in my work more than
              you&apos;d expect. A lot of folks here retired from the industry with some
              form of retiree coverage, and that coverage interacts with Medicare in
              ways that are easy to get wrong. Which one pays first. What you can drop
              safely. What you can never get back once it&apos;s gone. These are
              one-time decisions that deserve a real conversation, not a guess.
            </p>
            <p>
              Then there&apos;s the geography. Your hospital might be the Novant Health
              Thomasville Medical Center, your GP might be in town, and your specialists
              might be in Lexington or High Point. Davidson County folks follow the
              doctors they trust. A plan only works if its network follows the same
              doctors. Plans change their networks every year, which is why this gets
              rechecked every fall.
            </p>
            <p>
              Turning 65 in Thomasville? The big chair downtown isn&apos;t the only
              landmark you&apos;ll notice. Your mailbox is about to become one too, full
              of Medicare ads. Skip the pile. Start with one honest conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where We Can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>The Thomasville library.</strong> A comfortable public spot to sit
              down with your paperwork in person, if you&apos;d rather do it face to
              face.
            </p>
            <p>
              <strong>Senior programs in Davidson County.</strong> The county has
              programs and gathering spots for older adults in Thomasville and
              Lexington. Worth a visit whether or not we ever meet. Community counts.
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
              of Change arrives by September 30. In Davidson County, the network pages
              matter most, because your doctors are spread across three or four towns.
              I explain how to read the ANOC on my{" "}
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
            <li>Every doctor checked, whether they&apos;re in Thomasville, Lexington, High Point, or Winston-Salem</li>
            <li>How any retiree coverage from a former employer fits with Medicare</li>
            <li>Your prescription costs under the new plan details</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from{" "}
            <Link href="/medicare-agent-lexington-nc" className="underline underline-offset-2">
              Lexington
            </Link>
            , Denton, and everywhere in Davidson County are welcome.
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Thomasville</h2>
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
            I also help folks over in{" "}
            <Link href="/medicare-agent-lexington-nc" className="underline underline-offset-2">
              Lexington
            </Link>{" "}
            and up in{" "}
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
