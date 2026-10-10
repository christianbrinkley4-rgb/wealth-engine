import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
} from "@/lib/seo";

import { AepQuiz } from "./AepQuiz";

/**
 * "Do I Need to Act During AEP?" quiz.
 *
 * Server shell, deliberately. The heading, the explanation and the FAQ are
 * rendered on the server so crawlers and AI search see a real document; only
 * the interactive quiz is a client component. The quiz itself never
 * recommends a plan, names a carrier, or promises savings: every result tier
 * ends at a free review conversation.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Do I Need to Act During AEP? Free 60-Second Quiz | Greensboro NC",
  },
  description:
    "Five quick questions about your Medicare plan, doctors, and prescriptions. Get an honest read on whether a free fall review is worth your time before December 7.",
  alternates: { canonical: "/aep-quiz" },
  openGraph: pageOpenGraph({
    title: "Do I need to act during Annual Enrollment?",
    description:
      "A free 60-second quiz from Christian Brinkley, licensed NC agent. Five questions, honest results, no obligation.",
    path: "/aep-quiz",
  }),
};

const FAQ = [
  {
    q: "What does this quiz actually tell me?",
    a: "It tells you whether anything meaningful has changed since you picked your plan: your doctors, your prescriptions, or how you feel about your costs. Based on that, it gives you an honest read on whether a free fall review is worth your time. It does not recommend a specific plan or tell you to switch.",
  },
  {
    q: "What happens with my email?",
    a: "Your answers stay on your device while you take the quiz. Nothing is sent anywhere until you ask for your results. If you do, I will send the results and may follow up about Medicare plan reviews before December 7. No spam, no sharing, unsubscribe anytime.",
  },
  {
    q: "Is the review really free?",
    a: "Yes. The quiz is free and the review it can lead to is free. I am a licensed insurance agent in North Carolina, and I am paid by insurance companies when someone enrolls through me, not by you. If your plan still fits, I will tell you that.",
  },
  {
    q: "I am turning 65 soon. Should I take this quiz?",
    a: "You can, and the quiz will point you to the turning-65 guide if that fits better. Turning 65 comes with its own 7-month enrollment window, separate from the fall Annual Enrollment Period, so your dates work differently.",
  },
] as const;

export default function AepQuizPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Do I need to act during AEP?", path: "/aep-quiz" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Do I need to act during Medicare Annual Enrollment? Free 60-second quiz",
              description:
                "Five questions about your Medicare plan, doctors, and prescriptions. An honest read on whether a free fall review is worth your time before December 7.",
              path: "/aep-quiz",
              datePublished: "2026-10-10",
              dateModified: "2026-10-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "AEP quiz" }]}
        eyebrow="Free tool · 60 seconds · nothing is sent anywhere unless you ask"
        title="Do I need to act during Annual Enrollment?"
        lede="October 15 through December 7 is your yearly window to change Medicare coverage for next year. Five quick questions about your plan, your doctors, and your prescriptions, and I'll give you an honest read on whether a free review is worth your time."
        secondaryHref="/aep"
        secondaryLabel="Skip the quiz, read the AEP guide →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <AepQuiz />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What the quiz looks at</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              The five questions cover the things that actually make a fall review worthwhile:
              whether you are on Medicare yet, how you feel about your current plan, whether your
              doctors or prescriptions changed, and whether you are turning 65 soon. Each answer
              nudges the result toward a review, toward the turning-65 guide, or toward a simple
              watch list.
            </p>
            <p>
              The quiz never tells you to switch plans and never names a specific plan or carrier.
              It ends in one of three places: a free review booking, the{" "}
              <Link href="/turning-65" className="underline underline-offset-2">
                turning-65 guide
              </Link>
              , or the{" "}
              <Link href="/aep" className="underline underline-offset-2">
                Annual Enrollment guide
              </Link>
              . Whichever result you get, the next step is a conversation, not a sales pitch.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Questions about the quiz</h2>
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
        </div>
      </section>

      <KitchenTableClose
        heading="Not sure the quiz fits your situation?"
        body="Call me and we'll figure it out together in a few minutes. You'll reach me, not a call center."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
