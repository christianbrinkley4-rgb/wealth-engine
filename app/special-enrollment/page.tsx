import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Special Enrollment Periods: the life changes that open a window outside
 * the usual enrollment dates. Stays qualitative about exact windows except
 * where the rule is long-settled (the 8-month Part B SEP after group
 * coverage based on current employment ends; the 63-day Part D creditable
 * coverage rule), and routes the specifics to a conversation.
 */

export const metadata: Metadata = {
  title: { absolute: "Special Enrollment Periods for Medicare — Greensboro, NC" },
  description:
    "Lost job coverage, moving, or another big change? A Special Enrollment Period may let you enroll in or change Medicare outside the usual dates.",
  alternates: { canonical: "/special-enrollment" },
  openGraph: pageOpenGraph({
    title: "Special Enrollment Periods for Medicare",
    description:
      "Life changes that open a Medicare enrollment window outside the usual dates — and how to use one before it closes.",
    path: "/special-enrollment",
  }),
};

const FAQ = [
  {
    q: "I lost my job-based coverage. How long do I have to enroll in Part B?",
    a: "Usually eight months from when the employment — or the coverage — ends, whichever comes first, without a late penalty. But the details matter: the coverage generally has to have been based on current employment, not retiree coverage or COBRA. Tell me what changed and when, and we'll work out your exact dates.",
  },
  {
    q: "I'm moving. Can I change my Medicare plan?",
    a: "Often, yes. Moving out of your plan's service area usually opens a window to enroll in coverage available at your new address. The exact timing depends on when you tell the plan about the move, so it's worth sorting out before moving day if you can.",
  },
  {
    q: "What's the difference between a Special Enrollment Period and Annual Enrollment?",
    a: "Annual Enrollment (October 15 to December 7) is open to everyone with Medicare, every fall. A Special Enrollment Period is personal — it's triggered by something that happened to you, like losing coverage or moving, and it opens its own window outside those fall dates.",
  },
  {
    q: "Does COBRA let me delay Part B without a penalty?",
    a: "No — and this is the mistake that costs people the most. COBRA and retiree coverage generally don't count as coverage that lets you delay Part B. If you're 65 or older and on COBRA instead of Part B, talk to someone before the 8-month window around the end of your employment closes.",
  },
  {
    q: "What if I already missed my Initial Enrollment Period?",
    a: "There's a General Enrollment Period each year from January 1 to March 31, though late penalties may apply. And depending on what happened — a move, lost coverage, a plan leaving your area — a Special Enrollment Period may still be open to you. The sooner we look at your dates, the more options you tend to have.",
  },
  {
    q: "Can you check whether I qualify for one?",
    a: "Yes. Bring (or just tell me) what changed, when it changed, and what coverage you had. I'll work out whether a Special Enrollment Period applies and what your deadlines are — no cost, no obligation.",
  },
] as const;

const TRIGGERS = [
  {
    title: "Job-based coverage ending",
    body: "Yours or your spouse's — retirement, a layoff, or hours dropping below full-time. This is the most common one I help with, and the 8-month Part B window usually starts when the employment or coverage ends.",
  },
  {
    title: "Moving",
    body: "A move out of your plan's service area — even across town, if it crosses county or plan boundaries — can open a window to choose coverage at your new address.",
  },
  {
    title: "Losing other coverage",
    body: "Losing Medicaid eligibility, a plan leaving your area, or a plan losing its Medicare contract can each trigger their own enrollment window.",
  },
  {
    title: "Qualifying life changes",
    body: "Things like losing Extra Help, certain changes after a disaster, or release from incarceration come with their own rules. If something big changed, it's worth asking.",
  },
] as const;

export default function SpecialEnrollmentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Special Enrollment Periods", path: "/special-enrollment" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Special Enrollment Periods for Medicare",
              description:
                "The life changes — lost job coverage, a move, a plan leaving — that open a Medicare enrollment window outside the usual dates.",
              path: "/special-enrollment",
              datePublished: "2026-09-19",
              dateModified: "2026-09-19",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Special Enrollment Periods" }]}
        eyebrow="Greensboro & the Triad"
        title="Life changed? Medicare may give you another window."
        lede="Losing job coverage, moving, or another big change can open a Special Enrollment Period — a chance to enroll or switch outside the usual dates."
        secondaryHref="/start?topic=medicare&ask=sep"
        secondaryLabel="Check my situation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The situations that usually qualify</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A Special Enrollment Period isn&apos;t a date on the calendar — it starts because
            something happened to you. These are the triggers I see most often in the Triad:
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {TRIGGERS.map((trigger) => (
              <div key={trigger.title} className="card-surface p-6">
                <h3 className="text-20 font-semibold">{trigger.title}</h3>
                <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                  {trigger.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-18 mt-6 leading-relaxed">
            The exact window depends on the situation — which is why the most useful thing you can
            do is tell me <em>what changed and when</em>. We&apos;ll work out your dates together.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to use one before it closes</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                title: "Write down the date things changed",
                body: "Your last day of employment, the day coverage ended, your moving date. The window is measured from real dates, so the exact day matters more than the month.",
              },
              {
                title: "Don't assume your old coverage protects you",
                body: "COBRA and retiree coverage feel like coverage — and they are, for health care — but they generally don't let you delay Part B without a penalty. This misunderstanding is the single most expensive one I see.",
              },
              {
                title: "Talk to someone before the window closes",
                body: "These windows are measured in months, not years, and they don't send reminders. A short conversation now is worth more than a perfect plan chosen too late.",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="text-17 flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-19 font-semibold">{step.title}</h3>
                  <p className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <GuideTownLinks heading="Medicare help near you" />
        </div>
      </section>

      <section className="bg-white py-14">
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
        heading="Tell me what changed"
        body="A date, a move, a coverage letter — bring what you have. We'll figure out whether a Special Enrollment Period applies to you, during a no-cost, no-obligation consultation."
        href="/start?topic=medicare&ask=sep"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Turning 65 soon rather than dealing with a change?{" "}
          <Link href="/turning-65" className="underline underline-offset-2">
            Your enrollment dates
          </Link>{" "}
          covers the standard windows. And every fall,{" "}
          <Link href="/annual-enrollment" className="underline underline-offset-2">
            Annual Enrollment
          </Link>{" "}
          (October 15 to December 7) is open to everyone.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
