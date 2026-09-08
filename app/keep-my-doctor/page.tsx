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
    "Whether you keep your doctor depends on which kind of Medicare coverage you choose. How networks work in the Greensboro area, and how to check properly.",
  alternates: { canonical: "/keep-my-doctor" },
  openGraph: pageOpenGraph({
    title: "Can I keep my doctor on Medicare?",
    description:
      "The first question everyone asks, answered for the Triad — including how to check properly before you sign up.",
    path: "/keep-my-doctor",
  }),
};

const CHECK_STEPS = [
  {
    title: "Write down the actual names",
    body: "Not “my cardiologist” — the practice name and the individual doctor. Networks are agreed practice by practice and sometimes doctor by doctor, so a practice being in-network doesn’t guarantee every physician in it is.",
  },
  {
    title: "Check the plan’s own directory, for the right year",
    body: "Every plan publishes a provider directory. Make sure you’re looking at the one for the year the coverage starts, not the year you’re reading it in.",
  },
  {
    title: "Then phone the practice’s billing office",
    body: "This is the step people skip and the one that actually settles it. Ask specifically: “Do you accept this exact plan, for next year, and are you taking new Medicare patients?” Directories go out of date; billing offices know.",
  },
  {
    title: "Ask about the hospital as well as the doctor",
    body: "Your physician can be in-network at a hospital that isn’t, which is how people end up with a surprise on a surgery. Worth checking both.",
  },
  {
    title: "Re-check every fall",
    body: "Networks are renegotiated annually. A plan that covered your doctor this year may not next year, and the plan will not ring you about it.",
  },
] as const;

const FAQ = [
  {
    q: "Does Original Medicare have a network?",
    a: "With Original Medicare you can see any provider in the country who accepts Medicare, which most do. The trade-off is what it doesn’t cap — which is why people pair it with supplemental coverage. If keeping a specific set of doctors is your top priority, this is the route that protects it.",
  },
  {
    q: "And Medicare Advantage?",
    a: "Those plans work through networks, like the insurance you had at work. Many people are perfectly happy on them and they often include extras Original Medicare doesn’t. But the network is the thing to check before you sign up, not after.",
  },
  {
    q: "My doctor said they “take Medicare”. Is that the same answer?",
    a: "Not necessarily. Accepting Medicare and being in a particular Medicare Advantage plan’s network are two different things, and practice staff sometimes answer the first question when you meant the second. Ask about the specific plan by name.",
  },
  {
    q: "What if my spouse and I use different doctors?",
    a: "Then you may want different plans. There’s no rule that a couple has to be on the same one, and choosing together when your needs differ is a common way people end up unhappy.",
  },
  {
    q: "Can you just check for me?",
    a: "Yes, and that’s usually the fastest way. Tell me who you see and where you’d rather be treated, and I’ll come back with what I can offer that fits — and tell you honestly when the answer is that a plan I can’t offer suits you better.",
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
                "How Medicare Advantage networks work in the Greensboro area, and how to verify a specific doctor against a specific plan.",
              path: "/keep-my-doctor",
              datePublished: "2026-08-31",
              dateModified: "2026-08-31",
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
        lede="It’s the first thing almost everyone asks, and it’s the question a national phone service answers worst — because the answer depends on which practices around here take which specific plan. The good news is that it’s knowable before you commit to anything."
        secondaryHref="/start?topic=medicare&ask=doctors"
        secondaryLabel="Tell me who you see →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">It comes down to which road you take</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Original Medicare</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                No network. Any provider in the country who accepts Medicare — and most do. If
                keeping a particular specialist matters more than anything else, this is the route
                that protects it. Usually paired with supplemental coverage, which has its own
                six-month window at 65 when your health history can’t be held against you.
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-20 font-semibold">Medicare Advantage</h3>
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                Works through a network, like employer insurance did. Often includes extras, and
                plenty of people are happy on one. But your doctors need checking against the
                specific plan before you sign up — and again every fall, because networks are
                renegotiated every year.
              </p>
            </div>
          </div>
          <p className="text-18 mt-6 leading-relaxed">
            Neither is the right answer in general. Which one is right depends on who you see, how
            often, and how much unpredictability you can live with — which is a twenty-minute
            conversation, not a web page.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to check properly</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            If you do nothing else on this page, do step three. It is the one that settles the
            question, and it is the one almost everybody skips.
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
          <h2 className="text-28 font-semibold">Around here specifically</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Most people in Greensboro and the surrounding towns are attached to one of the large
            systems in the area — Cone Health locally, with Novant Health and Atrium Health Wake
            Forest Baptist serving much of the wider Triad — plus a set of independent practices
            people have often used for decades.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I deliberately don’t publish a table of which plans each of them takes. Those
            arrangements change annually, they vary plan by plan rather than by insurance company,
            and a page that’s six months stale is exactly how somebody chooses a plan and then loses
            their doctor. Checking it properly for your specific doctors takes me a few minutes, so
            ask me instead of trusting a table.
          </p>
          <GuideTownLinks heading="Check the county first — then the doctor" />
          <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I have no affiliation with any of those health systems; they’re named here only because
            they’re where most people in the area are seen.
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
        body="Give me the names and I’ll check them against what I can offer — and tell you plainly when something I can’t offer would suit you better."
        href="/start?topic=medicare&ask=doctors"
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Still deciding between the two routes rather than checking a plan?{" "}
          <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
            Medicare Advantage compared with Medigap
          </Link>{" "}
          walks through what actually decides it.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
