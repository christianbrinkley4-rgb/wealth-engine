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
    absolute: "Medigap Plans in High Point, NC | Christian Brinkley",
  },
  description:
    "Confused by Medicare Supplement (Medigap) plans in High Point, NC? Plain-English help from Christian Brinkley, a licensed NC agent. Free. Call (919) 408-6671.",
  alternates: { canonical: "/medigap-plans-high-point-nc" },
  openGraph: pageOpenGraph({
    title: "Medigap plans in High Point, explained in plain English.",
    description:
      "What Medicare Supplement plans cover, who they suit, and the turning-65 window that matters. Free local help in High Point and Guilford County.",
    path: "/medigap-plans-high-point-nc",
  }),
};

const FAQ = [
  {
    q: "What does a Medigap plan actually pay for?",
    a: "Medigap, also called Medicare Supplement, helps pay some of the costs Original Medicare leaves behind: deductibles, coinsurance, and copays. The plans are standardized by letter, so a Plan G is a Plan G no matter which company sells it. The difference between companies is the price and the service, not the coverage.",
  },
  {
    q: "Can I keep my High Point doctors with a Medigap plan?",
    a: "Yes, that is one of the main reasons people choose this route. With Original Medicare plus a Medigap plan, you can see any doctor in the country who accepts Medicare. No network to check, no referrals for specialists. If your doctors are split between High Point and Greensboro, that freedom matters.",
  },
  {
    q: "I missed my turning-65 window. Can I still get a Medigap plan?",
    a: "You can apply, but in North Carolina the rules change after your initial window. During the six months after you turn 65 and enroll in Part B, companies have to sell you a plan without asking health questions. After that, they can ask, and they can charge more or decline you based on your health. If you are past the window, sooner is better than later.",
  },
  {
    q: "How is Medigap different from a Medicare Advantage plan?",
    a: "They are two different ways to fill the gaps Original Medicare leaves. Medigap works with Original Medicare and lets you see any Medicare doctor, with a separate drug plan for prescriptions. Advantage plans bundle everything into one plan with a network and often extra benefits. Neither is right for everyone. I walk through the tradeoffs on my comparison page.",
  },
] as const;

function CtaBlock() {
  return (
    <section className="bg-white py-14">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">Talk through your options, free</h2>
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

export default function MedigapPlansHighPointPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medigap plans in High Point, NC", path: "/medigap-plans-high-point-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medigap plans in High Point, NC, explained in plain English.",
              description:
                "What Medicare Supplement plans cover, who they suit, and the turning-65 enrollment window, for High Point and Guilford County.",
              path: "/medigap-plans-high-point-nc",
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
              name: "Medigap plan guidance in High Point, NC",
              description:
                "Free, no-pressure Medicare Supplement guidance with a licensed local agent serving High Point and Guilford County, NC.",
              path: "/medigap-plans-high-point-nc",
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
          { name: "Medigap plans in High Point, NC" },
        ]}
        eyebrow="Medicare Supplement · High Point and Guilford County"
        title="Medigap Plans in High Point, NC"
        lede="Medigap is the other path. Instead of joining a managed plan with a network, you keep Original Medicare and add a Supplement policy that helps pay what Medicare doesn't. For a lot of folks in High Point, especially those whose doctors are scattered across the Triad, that freedom is the whole appeal. I'm Christian Brinkley, a licensed insurance agent in North Carolina. Here's what Medigap is, who it suits, and the one timing rule you really need to know. Free help, plain English, no pressure."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What Medigap Is, in Plain English</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Original Medicare pays a lot, but not everything. It leaves deductibles,
              coinsurance, and copays on your side of the table. A Medigap policy,
              also called Medicare Supplement insurance, helps pay those leftover
              costs. You still have Original Medicare underneath. The Supplement just
              picks up part of the bill.
            </p>
            <p>
              The plans are standardized by letter: A, B, D, G, K, L, M, N. A Plan G
              from one company covers exactly the same things as a Plan G from
              another. What differs is the price and the company behind it. That
              standardization is genuinely helpful, because it means you can compare
              on price and service instead of decoding fine print.
            </p>
            <p>
              One thing people mix up: Medigap does not include prescription drug
              coverage. Most folks pair it with a separate Part D drug plan. That
              sounds like a hassle, but it also means your drug plan can be changed
              every year without touching the rest of your setup.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why Some High Point Folks Choose It</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              High Point is a spread-out healthcare town. Your GP might be here, your
              specialists in Greensboro, and a hospital visit could land anywhere in
              the Triad. With Medigap plus Original Medicare, there is no network to
              satisfy. Any doctor who takes Medicare is your doctor. For people who
              have built a care team across two or three cities, that simplicity is
              worth real money to them.
            </p>
            <p>
              It also suits travelers. If you spend part of the year somewhere else,
              or you just like knowing your coverage works the same in every state,
              Medigap travels with you. No checking whether you are in or out of a
              service area.
            </p>
            <p>
              The tradeoff is cost structure: you generally pay a monthly premium for
              the Supplement plus your Part B premium plus a drug plan, in exchange
              for more predictable costs when you actually need care. Whether that
              tradeoff is right for you depends on your health, your doctors, and
              your budget. That is a conversation, not a calculator.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The Turning-65 Window Matters More Here</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Here is the timing rule that matters most for Medigap. For the six
              months after you turn 65 and enroll in Part B, you have guaranteed
              issue rights: companies must sell you a Medigap plan, cannot charge
              you more for health problems, and cannot make you wait for
              pre-existing conditions. It is the easiest you will ever get a
              Supplement plan.
            </p>
            <p>
              After that window, North Carolina lets companies ask health
              questions. They can charge more or decline you. Plenty of healthy
              people still get approved later, but the window is the sure thing.
              If you are approaching 65 and leaning toward the Supplement route,
              this is the detail to act on.
            </p>
            <p>
              Turning 65 soon? My{" "}
              <Link href="/turning-65" className="underline underline-offset-2">
                turning 65 guide
              </Link>{" "}
              walks through the timeline step by step.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Conversation Covers</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Whether the Supplement route fits your doctors, your travel, and your budget</li>
            <li>How Medigap, Original Medicare, and a drug plan work together</li>
            <li>Your timing: where you are relative to the turning-65 window</li>
            <li>How this compares to the Advantage route, honestly</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person. Want the side-by-side first? Here&apos;s my{" "}
            <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
              Advantage vs. Medigap comparison
            </Link>
            . And if you&apos;d rather talk general Medicare in High Point, start on my{" "}
            <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
              High Point Medicare agent page
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBlock />

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Medigap Questions in High Point</h2>
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
            Also serving Guilford County generally: here&apos;s my page on{" "}
            <Link href="/medigap-plans-greensboro-nc" className="underline underline-offset-2">
              Medigap plans in Greensboro
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
