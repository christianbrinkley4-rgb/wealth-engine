import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
} from "@/lib/seo";

import { PlanCheckQuiz } from "./PlanCheckQuiz";

/**
 * The plan-fit quiz: "Does your Medicare plan still fit?"
 *
 * Server shell, deliberately. The heading, the explanation and the FAQ are
 * rendered on the server so crawlers and AI search see a real document; only
 * the interactive quiz is a client component. The quiz itself never
 * recommends a plan, names a carrier, or promises savings: every result tier
 * ends at a free review call.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Does Your Medicare Plan Still Fit? Free 90-Second Plan Check",
  },
  description:
    "Answer 7 quick questions about your doctors, prescriptions, and costs, and find out whether your Medicare plan is worth a second look before December 7. Free, educational, no obligation.",
  alternates: { canonical: "/plan-check" },
  openGraph: pageOpenGraph({
    title: "Does your Medicare plan still fit?",
    description:
      "A free 90-second plan check from Christian Brinkley, licensed NC agent. Seven questions, honest results, no obligation.",
    path: "/plan-check",
  }),
};

const FAQ = [
  {
    q: "What does the plan check actually tell me?",
    a: "It tells you whether anything meaningful has changed since you enrolled: your doctors, your prescriptions, your costs, your health, or how long it has been since anyone reviewed your plan. It does not recommend a specific plan or tell you to switch. It gives you an honest read on whether a free review is worth your time.",
  },
  {
    q: "Is this really free? What is the catch?",
    a: "No catch. The quiz is free and the 20-minute review it leads to is free. I am a licensed insurance agent in North Carolina, and I am paid by insurance companies when someone enrolls through me, not by you. If your plan still fits, I will tell you that.",
  },
  {
    q: "What happens to my answers?",
    a: "Your answers stay on your device while you take the quiz. Nothing is sent anywhere unless you ask me to email your results. If you do, I will only use your email to send the results and follow up about Medicare plan reviews. No spam, no sharing, unsubscribe anytime.",
  },
  {
    q: "Why does December 7 matter?",
    a: "December 7 is the end of Medicare's Annual Enrollment Period. It is your yearly window to change plans for the next year. After that date your coverage is locked in, with very few exceptions, so fall is the time to check.",
  },
] as const;

export default function PlanCheckPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Plan check", path: "/plan-check" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Plan check" }]}
        eyebrow="Free tool · 90 seconds · nothing is sent anywhere unless you ask"
        title="Does your Medicare plan still fit?"
        lede="Medicare plans change every year. So do you. Seven quick questions about your doctors, your prescriptions, and your costs, and I'll give you an honest read on whether your plan deserves a second look before December 7."
        secondaryHref="/start"
        secondaryLabel="Skip the quiz, book a review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <PlanCheckQuiz />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What the plan check covers</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              The seven questions walk through the things that actually make a plan stop fitting:
              whether your doctors are still in network, whether your prescriptions or drug costs
              changed, what you pay each month, whether your health changed since you enrolled,
              whether you spend time outside North Carolina, how much dental, vision, and hearing
              coverage matter to you, and when someone last reviewed your plan with you one on one.
            </p>
            <p>
              Your answers get sorted into one of three plain-English results. If nothing major
              has shifted, I will say so. If a few things look worth a second look, I will name
              them. Either way, the next step is the same: a free 20-minute review, by phone or
              video, before Annual Enrollment ends December 7.
            </p>
            <p>
              This is educational, not advice about your particular situation. I do not recommend
              plans in a quiz, and I do not promise outcomes. The review is where we look at your
              actual details together.{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                If you got an Annual Notice of Change letter, bring it
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-19 font-semibold">{item.q}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KitchenTableClose
        heading="Ninety seconds now, or twenty minutes with me"
        body="The quiz gives you the quick read. The review gives you the full picture. Both are free, and both come from a real person in Greensboro, not a call center."
        href="/start"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-15 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
          We do not offer every plan available in your area. Currently we represent 8 organizations
          which offer 65 products in your area. Please contact Medicare.gov or 1-800-MEDICARE to
          get information on all of your options.
        </p>
        <p className="text-15 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
          Questions go directly to {AGENT.name} at{" "}
          <a href={AGENT.phoneHref} className="underline underline-offset-2">
            {AGENT.phone}
          </a>
          . They are not sold to other agents.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
