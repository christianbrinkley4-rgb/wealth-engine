import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ASK_QUESTIONS } from "@/lib/askWall";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { AskQuestionForm } from "./AskQuestionForm";

const description =
  "A public wall of real money, tax, and retirement questions, answered in plain English. Read the answers, or ask your own. Educational only.";

export const metadata: Metadata = {
  title: { absolute: "Ask Christian: Real Questions, Plain Answers" },
  description,
  alternates: { canonical: "/ask" },
  openGraph: pageOpenGraph({
    title: "Ask Christian: Real Questions, Plain Answers",
    description,
    path: "/ask",
  }),
};

/**
 * The wall itself is informational: no phone number, no sales CTA in the
 * page content. The header chrome carries the phone, as on every page.
 */
export default function AskWallPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Ask Christian", path: "/ask" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Ask Christian" }]}
        eyebrow="The public Q&A wall"
        title="Ask Christian"
        lede="Real questions from neighbors about money, taxes, and retirement, answered in plain English. Read the wall, or ask your own below."
        hidePhoneCta
        secondaryHref="#ask-form"
        secondaryLabel="Ask your question"
        note="New questions join the pile I answer from. Answers are educational only."
        proof={[
          `Licensed agent · ${AGENT.licenseLine}`,
          "One local person, not a call center",
          "Every figure checked against the source",
        ]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-24 font-semibold">How the wall works</h2>
          <p className="text-18 mt-3 leading-relaxed">
            Neighbors send in the questions they would ask across the kitchen table. I answer them
            one at a time, in plain English, and every figure is checked against the source before
            it goes up. Names are never published, only the question and the answer.
          </p>
          <p className="text-18 mt-3 leading-relaxed">
            This wall is education, not personal advice. It cannot see your situation the way a
            conversation can, so check the official sources linked under each answer before you
            act on anything.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-24 font-semibold">Answered so far</h2>
          <ul className="mt-2 flex flex-col gap-8">
            {ASK_QUESTIONS.map((question) => (
              <li key={question.slug} className="border-t border-gray-300 pt-6">
                <h3 className="text-24 font-semibold">
                  <Link
                    href={`/ask/${question.slug}`}
                    className="underline underline-offset-2"
                  >
                    {question.title}
                  </Link>
                </h3>
                <p className="text-18 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {question.lede}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ask-form" className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl scroll-mt-24">
          <h2 className="text-24 font-semibold">Ask your question</h2>
          <p className="text-18 mt-3 leading-relaxed">
            Ask it like you would ask a neighbor. I read every one myself, and the best questions
            get answered on this wall for everyone. Your question goes to me only, it is never
            sold or shared with other agents.
          </p>
          <div className="mt-6">
            <AskQuestionForm />
          </div>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" showEstimateNote />
      </div>
    </main>
  );
}
