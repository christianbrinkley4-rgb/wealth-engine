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
    absolute: "Medicare Advantage in Winston-Salem: Compare Plans",
  },
  description:
    "Medicare Advantage plans in Winston-Salem, NC, explained by a local licensed agent. Networks, drug coverage, yearly changes. Free help. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-advantage-plans-winston-salem-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage in Winston-Salem, explained in plain English.",
    description:
      "How Advantage plans work in the Twin City, the two-system network question, and what changes every year. Free local help.",
    path: "/medicare-advantage-plans-winston-salem-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare Advantage in Winston-Salem, explained in plain English.",
    description:
      "How Advantage plans work in the Twin City, the two-system network question, and what changes every year. Free local help.",
    path: "/medicare-advantage-plans-winston-salem-nc",
  }),
};

const FAQ = [
  {
    q: "Do Advantage plans in Winston-Salem cover both hospital systems?",
    a: "It depends on the plan, and this is the question that matters most here. Some plans include both Atrium Health Wake Forest Baptist and Novant Health facilities and doctors. Others lean toward one. You cannot assume, and the marketing never leads with the gaps. A review checks your specific doctors against the plan's actual network.",
  },
  {
    q: "My plan's drug list changed for next year. What do I do?",
    a: "This is exactly what Annual Enrollment is for. Plans change their formularies every year, and a drug moving to a higher tier can cost you real money. Bring your prescription list to a review and I will check each drug against next year's details. October 15 through December 7 is your window to fix it.",
  },
  {
    q: "If I move within Forsyth County, does my plan change?",
    a: "Usually not. Moving within the same county keeps you in the same service area. Moving to a different county is the trigger: plans are built by county, so a move across the line can mean new options and a special enrollment window. Tell me before you move and I will sort it out.",
  },
  {
    q: "Are the extra benefits, like dental and vision, worth choosing a plan for?",
    a: "They are nice, but they should not lead the decision. Compare the core first: your doctors, your hospitals, your drugs. A plan with great dental that does not cover your cardiologist is a bad plan with great dental. Extras are the tiebreaker, never the reason.",
  },
] as const;

export default function MedicareAdvantagePlansWinstonSalemPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare Advantage plans in Winston-Salem, NC", path: "/medicare-advantage-plans-winston-salem-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Advantage plans in Winston-Salem, NC, explained in plain English.",
              description:
                "How Medicare Advantage works in Winston-Salem, the two-system network question, and what to recheck every year, for Forsyth County.",
              path: "/medicare-advantage-plans-winston-salem-nc",
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
              name: "Medicare Advantage plan review in Winston-Salem, NC",
              description:
                "A free, no-pressure Medicare Advantage plan review with a licensed local agent serving Winston-Salem and Forsyth County, NC.",
              path: "/medicare-advantage-plans-winston-salem-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-advantage-plans-winston-salem-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare Advantage plans in Winston-Salem, NC" },
        ]}
        eyebrow="Medicare Advantage · Winston-Salem and Forsyth County"
        title="Medicare Advantage Plans in Winston-Salem, NC"
        lede="Medicare Advantage bundles your hospital, medical, and usually drug coverage into one plan, often with extras like dental and vision. In Winston-Salem, the whole game is the network: two big hospital systems, doctors spread across both, and plans that treat them differently. I'm Christian Brinkley, a licensed insurance agent in North Carolina. Here's how Advantage plans actually work here, what to watch, and what to recheck every fall. Free help, plain English, no pressure."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How Medicare Advantage Works Here</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              A Medicare Advantage plan, also called Part C, is Medicare delivered
              through a private plan instead of directly through the government. One
              card, one plan, usually including prescription drug coverage. Most plans
              here work on a network: you pay less when you use the plan&apos;s
              doctors and hospitals, and more, or everything, when you go outside it.
            </p>
            <p>
              That network part is the entire story in Winston-Salem. Your plan has a
              list. Your doctors are on it or they aren&apos;t. The list changes every
              year. Nobody mails you a warning that says &ldquo;your cardiologist
              left.&rdquo; You find out from the Annual Notice of Change, if you read
              it, or from a bill, if you don&apos;t.
            </p>
            <p>
              Plans also vary by county. Forsyth County&apos;s lineup is Forsyth
              County&apos;s lineup. Move across the county line and the options can
              change. It is one more reason the address on your plan matters as much
              as the name on it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The Two-System Question</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Winston-Salem has Atrium Health Wake Forest Baptist and Novant Health,
              and your care team probably spans both. You chose those doctors over
              the years for good reasons. An Advantage plan does not care about your
              reasons. It cares about its contracts.
            </p>
            <p>
              So the review here is mechanical: list every doctor, every specialist,
              every hospital you would actually use, and check each one against the
              plan. Not the plan&apos;s advertising. The plan&apos;s provider
              directory. That twenty-minute exercise is the difference between a plan
              that works and a plan that surprises you in February.
            </p>
            <p>
              If you ever wonder how this compares to the no-network route, my{" "}
              <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
                Advantage vs. Medigap comparison
              </Link>{" "}
              lays out both sides honestly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What Changes Every Year, and Why You Recheck</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Three things move every year: the drug list, the costs, and the
              network. Your prescriptions get reshuffled into different tiers. Your
              copays and maximums shift. Doctors join and leave the network. Any one
              of those can turn a good plan into an expensive one without you doing
              anything wrong.
            </p>
            <p>
              That is what October 15 through December 7 is for. Your plan mails the
              Annual Notice of Change by September 30. Bring it, bring your
              prescription list, and bring your questions. I explain how to read the
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
            <li>Every one of your doctors checked against the plan, across both hospital systems</li>
            <li>Every prescription checked against next year&apos;s drug list</li>
            <li>Your costs under the new plan details, explained plainly</li>
            <li>Whether the extras you are paying attention to are worth the tradeoff</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Folks from Clemmons,{" "}
            <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
              Kernersville
            </Link>
            , and everywhere in Forsyth County are welcome. For general Medicare
            help in the Twin City, start on my{" "}
            <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
              Winston-Salem Medicare agent page
            </Link>
            .
          </p>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Advantage Questions in Winston-Salem</h2>
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
            Curious how Advantage plans compare in Greensboro? Here&apos;s my page on{" "}
            <Link href="/medicare-advantage-plans-greensboro-nc" className="underline underline-offset-2">
              Medicare Advantage plans in Greensboro
            </Link>
            . And during enrollment season, my{" "}
            <Link href="/aep" className="underline underline-offset-2">
              AEP hub
            </Link>{" "}
            keeps the dates and deadlines straight.
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
