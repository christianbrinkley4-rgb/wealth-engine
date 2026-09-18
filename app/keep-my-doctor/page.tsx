import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * The first real question anyone asks, answered locally.
 *
 * Deliberately contains no claim about which plans any particular hospital or
 * practice participates in. Those change every year, they vary by individual
 * plan rather than by carrier, and publishing a stale table would be worse
 * than publishing nothing — someone could choose a plan on it and lose their
 * doctor. What the page does instead is teach the reliable way to check, which
 * is genuinely useful, and offer to do the checking.
 */

export const metadata: Metadata = {
  title: { absolute: "Can I Keep My Doctor on Medicare? — Greensboro, NC" },
  description:
    "Whether you keep your doctor depends on the coverage you choose. How to check networks in Greensboro, High Point, and Winston-Salem before you enroll.",
  alternates: { canonical: "/keep-my-doctor" },
  openGraph: pageOpenGraph({
    title: "Can I keep my doctor on Medicare?",
    description:
      "The first question everyone asks, answered for Greensboro, High Point, and Winston-Salem — including how to check properly before you sign up.",
    path: "/keep-my-doctor",
  }),
};

const CHECK_STEPS = [
  {
    title: "Make a list of your doctors",
    body: "Include each doctor’s name, practice, and office location. This helps you check the specific providers you want to keep seeing.",
  },
  {
    title: "Check the plan’s own directory, for the right year",
    body: "Every plan publishes a provider directory. Make sure you’re looking at the one for the year the coverage starts, not the year you’re reading it in.",
  },
  {
    title: "Then phone the practice’s billing office",
    body: "Ask whether your doctor participates in the exact plan you’re considering for the year your coverage starts. If you would be a new patient, ask whether the practice is accepting new patients with that coverage. Confirm the information with the plan as well.",
  },
  {
    title: "Ask about the hospital as well as the doctor",
    body: "Check your preferred hospital separately from your doctor. Their participation in a plan may differ, so include both in your review.",
  },
  {
    title: "Re-check every fall",
    body: "Provider networks can change. Review your plan’s notices and check your doctors again when comparing coverage for the coming year.",
  },
] as const;

const FAQ = [
  {
    q: "Does Original Medicare have a network?",
    a: "Original Medicare lets you see doctors and hospitals that accept Medicare across the United States. Ask your providers whether they accept Medicare, and review the costs you would pay yourself. You can also discuss whether Medicare Supplement insurance may fit your needs.",
  },
  {
    q: "And Medicare Advantage?",
    a: "Medicare Advantage plans generally use provider networks. Network rules and costs vary by plan type, so check your doctors, hospitals, and any out-of-network coverage before you enroll.",
  },
  {
    q: "My doctor said they “take Medicare”. Is that the same answer?",
    a: "Not necessarily. Accepting Medicare and being in a particular Medicare Advantage plan’s network are two different things, and practice staff sometimes answer the first question when you meant the second. Ask about the specific plan by name. It is also worth asking whether they accept assignment: a provider can take Medicare without accepting assignment, and you may pay more. A small number of providers opt out of Medicare altogether, and for those Medicare generally pays nothing except in an emergency.",
  },
  {
    q: "What if my spouse and I use different doctors?",
    a: "You can choose different Medicare plans. We can review each person’s doctors, prescriptions, and coverage needs while discussing your household budget together.",
  },
  {
    q: "Can you just check for me?",
    a: "Yes. Bring a list of your doctors and preferred hospitals. I can help check them against the plans I offer and explain where to find information about other Medicare options.",
  },
  {
    q: "I live in Greensboro and see a specialist in Winston-Salem. Can I keep both?",
    a: "We can check each doctor and hospital against the specific plan you’re considering. Original Medicare generally lets you see providers who accept Medicare, including across the Triad. Medicare Advantage plans use networks that can differ by county, so a Greensboro address and a Winston-Salem specialist both need a look.",
  },
] as const;

export default function KeepMyDoctorPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Keep my doctor", path: "/keep-my-doctor" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Can I keep my doctor on Medicare?",
              description:
                "How Medicare Advantage networks work in Greensboro, High Point, and Winston-Salem, and how to verify a specific doctor against a specific plan.",
              path: "/keep-my-doctor",
              datePublished: "2026-08-31",
              dateModified: "2026-09-18",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to check whether your doctor accepts a Medicare plan",
              description:
                "Five steps to verify a specific doctor against a specific plan before you enroll.",
              path: "/keep-my-doctor",
              steps: CHECK_STEPS.map((step) => ({ name: step.title, text: step.body })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Keep my doctor" }]}
        eyebrow="Greensboro & the Triad"
        title="“Can I keep my doctor?”"
        lede="Your doctors know you and your health history. If you’d like to keep seeing them, let’s check how they fit with your Medicare options before you choose a plan."
        secondaryHref="/start?topic=medicare&ask=doctors"
        secondaryLabel="Tell me who you see →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            How your coverage affects your choice of doctors
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Original Medicare</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                You can see doctors and hospitals across the country that accept Medicare. Check
                with your providers, and review what you would pay for care. Medicare Supplement
                insurance is a separate option that may help with some of those costs.
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Medicare Advantage</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                These plans generally use provider networks. Check each doctor and hospital against
                the specific plan you’re considering. Benefits, network rules, and costs vary, and
                they can change from one year to the next.
              </p>
            </div>
          </div>
          <p className="text-18 mt-6 leading-relaxed">
            Your doctors are one part of the decision. We can also discuss your prescriptions,
            budget, and travel plans to help you understand how the options fit your life.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to check your doctors before enrolling</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            These steps can help you confirm your coverage. If you’d like someone to work through
            them with you, I’m happy to help.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {CHECK_STEPS.map((step, index) => (
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
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Care across the Triad</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Whether you receive care through Cone Health, Novant Health, Atrium Health Wake Forest
            Baptist, or an independent practice, we’ll start with the doctors and locations you use.
            Include any specialists you see outside your hometown, too.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Coverage depends on the specific plan and provider. Even within the same health system,
            it’s helpful to check the doctors and office locations you use. We can review that
            information together before you make a decision.
          </p>
          <GuideTownLinks heading="Medicare help near you" />
          <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I’m not affiliated with these health systems. They’re examples of local providers we can
            check as part of your coverage review.
          </p>
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
        heading="Tell me who you see"
        body="Bring a list of your doctors, hospitals, and prescriptions. We can review them together during a no-cost, no-obligation consultation."
        href="/start?topic=medicare&ask=doctors"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Still deciding between the two routes rather than checking a plan?{" "}
          <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
            Medicare Advantage compared with Medigap
          </Link>{" "}
          explains the main differences and questions to consider.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
