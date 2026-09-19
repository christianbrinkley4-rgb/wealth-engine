import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The 2026 dollar figures on this page come from the CMS fact sheet
 * "2026 Medicare Parts A & B Premiums and Deductibles" (announced
 * November 14, 2025), matching the verified constants in lib/irmaa.ts.
 * Update the figures and dateModified when CMS publishes the next year.
 */

export const metadata: Metadata = {
  title: { absolute: "What Does Medicare Cost in 2026? — Greensboro, NC" },
  description:
    "2026 Medicare costs: the $202.90 Part B premium, the $283 deductible, hospital costs, and how income and late enrollment change what you pay.",
  alternates: { canonical: "/medicare-costs" },
  openGraph: pageOpenGraph({
    title: "What does Medicare cost in 2026?",
    description:
      "The 2026 premiums, deductibles, and penalties that decide what Medicare actually costs you — in plain English.",
    path: "/medicare-costs",
  }),
};

const FAQ = [
  {
    q: "How much is the Medicare Part B premium in 2026?",
    a: "The standard premium is $202.90 a month in 2026. Most people have it deducted from their Social Security check. Higher-income households pay more — see the income section below.",
  },
  {
    q: "What is the Part B deductible in 2026?",
    a: "$283 for the year. After you meet it, Part B generally pays 80% of the approved amount for covered services and you pay 20%, though some services work differently.",
  },
  {
    q: "Do I pay a premium for Part A?",
    a: "Most people don't. If you or your spouse paid Medicare taxes for at least 40 quarters (about 10 years), Part A has no premium. If you have to buy it, the full 2026 premium is $565 a month, or $311 with 30–39 quarters. The hospital deductible is $1,736 per benefit period in 2026.",
  },
  {
    q: "What about drug coverage and Medigap — what do those cost?",
    a: "Those have their own monthly premiums, and they vary by plan and by county — Greensboro and Winston-Salem can have different options. That's exactly the kind of comparison a personal review is for: we look at your prescriptions and budget against the actual plans available where you live.",
  },
  {
    q: "Can my Part B premium be higher because of my income?",
    a: "Yes. If your income from two years ago was above certain thresholds, Social Security adds an income-related monthly adjustment (IRMAA) to your Part B — and Part D — premium. But if your income has dropped since then, for example because you retired, you can ask Social Security to review it. There's more on that on the premium review page.",
  },
  {
    q: "What happens if I sign up for Part B late?",
    a: "If you delay Part B without coverage that lets you wait — generally a group health plan based on current employment — the premium usually goes up 10% for each full year you waited, and that increase is permanent. Going without drug coverage for 63 days or more after your window can add a separate monthly penalty too.",
  },
] as const;

export default function MedicareCostsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "What Medicare costs", path: "/medicare-costs" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "What does Medicare cost in 2026?",
              description:
                "The 2026 Part B premium and deductible, Part A hospital costs, income-related adjustments, and the penalties that raise what you pay.",
              path: "/medicare-costs",
              datePublished: "2026-09-19",
              dateModified: "2026-09-19",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "What Medicare costs" }]}
        eyebrow="Greensboro & the Triad"
        title="What does Medicare actually cost?"
        lede="Premiums, deductibles, and the penalties that raise them — the 2026 numbers, explained in plain English."
        secondaryHref="/start?topic=medicare&ask=costs"
        secondaryLabel="Talk through my costs →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The short answer</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            These are the 2026 figures CMS announced in November 2025. They change a little most
            years, so treat this as the current picture — not a permanent one.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Part B</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                <strong className="text-[var(--color-navy)]">$202.90 a month</strong> is the
                standard premium, with a <strong className="text-[var(--color-navy)]">$283</strong>{" "}
                annual deductible. Most people have the premium deducted from Social Security.
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Part A</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                <strong className="text-[var(--color-navy)]">No premium</strong> for most people —
                you earned it through payroll taxes. A hospital stay carries a{" "}
                <strong className="text-[var(--color-navy)]">$1,736</strong> deductible per benefit
                period in 2026.
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Part D & beyond</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                Drug plans, Medigap, and Medicare Advantage have{" "}
                <strong className="text-[var(--color-navy)]">their own premiums</strong> that vary
                by plan and county. That comparison is where a personal review earns its keep.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">When your income changes the Part B premium</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Social Security looks at your tax return from two years ago. If that income was above
            certain thresholds, a monthly adjustment (called IRMAA) is added to your Part B — and
            Part D — premium. The 2026 figures use your 2024 return.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Here&apos;s the part people miss: if your income has <em>dropped</em> since that tax
            year — because you retired, your spouse stopped working, or another big life change —
            you can ask Social Security to recalculate using your current situation. It&apos;s a
            standard request, and it often lowers the premium back down.{" "}
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              How to request a premium review
            </Link>{" "}
            walks through it.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Two ways people accidentally pay more</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Delaying Part B without qualifying coverage</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                Miss your window without coverage that lets you wait, and the premium usually rises
                10% for each full year you delayed — permanently. Still working with a group plan
                based on current employment is the usual exception.{" "}
                <Link href="/turning-65" className="underline underline-offset-2">
                  Your enrollment dates
                </Link>
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Going without drug coverage</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                Go 63 days or more without qualifying drug coverage after your enrollment window,
                and a penalty gets added to your Part D premium for as long as you have it. The
                amount is based on 1% of the national base premium per uncovered month.
              </p>
            </div>
          </div>
          <GuideTownLinks heading="Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Let's put real numbers on your situation"
        body="Premiums, prescriptions, and doctors — we'll look at what Medicare would actually cost you, during a no-cost, no-obligation consultation."
        href="/start?topic=medicare&ask=costs"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Wondering how the two main paths compare on cost?{" "}
          <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
            Medicare Advantage compared with Medigap
          </Link>{" "}
          explains the trade-offs. And if your income recently changed,{" "}
          <Link href="/irmaa-appeal" className="underline underline-offset-2">
            requesting a premium review
          </Link>{" "}
          may lower your Part B premium.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
