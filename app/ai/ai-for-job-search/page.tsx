import type { Metadata } from "next";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

import { ContactLine } from "../components/ContactLine";
import { SiblingNav } from "../components/SiblingNav";

/**
 * AI for job search: drafting help on resumes, mock interview prep, and
 * realistic expectations. Never let it invent experience.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI for Job Search: Resumes and Interview Prep | Christian Brinkley",
  },
  description:
    "Use AI to sharpen your resume and practice interviews. Drafting help, mock questions, and realistic expectations. No invented experience, ever.",
  alternates: { canonical: "/ai/ai-for-job-search" },
  openGraph: pageOpenGraph({
    title: "AI for job search",
    description:
      "Sharper resumes, better interview prep, realistic expectations. How to use AI without letting it invent your work history.",
    path: "/ai/ai-for-job-search",
  }),
};

const FAQ = [
  {
    q: "Can AI write my whole resume?",
    a: "It can draft one from your facts. Feed it your real jobs, dates, and results. Check every line. Never let it invent experience.",
  },
  {
    q: "Should I tell employers I used AI?",
    a: "Nobody needs a disclaimer on a resume. The work history must be true and yours. AI is a writing tool, like spellcheck.",
  },
  {
    q: "Can it help with cover letters?",
    a: "Yes. Give it the job posting and your background. It drafts a letter that connects the two. Rewrite it in your voice before sending.",
  },
  {
    q: "What if I have almost no experience?",
    a: "Be honest about that. AI can help you describe class projects, part-time jobs, and volunteer work well. It cannot create experience from nothing.",
  },
] as const;

export default function AiForJobSearchPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AI for regular people", path: "/ai" },
              { name: "AI for job search", path: "/ai/ai-for-job-search" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "AI for Job Search: Resumes and Interview Prep",
              description:
                "Use AI to sharpen your resume and practice interviews. Drafting help, mock questions, and realistic expectations. No invented experience, ever.",
              path: "/ai/ai-for-job-search",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "AI for regular people", href: "/ai" },
          { name: "AI for job search" },
        ]}
        eyebrow="AI guides · Job search"
        title="AI for job search"
        lede="AI can sharpen your resume and your interview answers. It cannot invent experience you do not have. Here is how to use it well."
        secondaryHref="/start"
        secondaryLabel="Start a conversation →"
        proof={["Plain English, no jargon", "Written from daily use", "Honest about limits"]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Resumes: a great editor, a terrible author</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Paste your bullet points in and ask it to tighten the language. It turns wordy lines
            into clear ones. Never let it add jobs, titles, or numbers you cannot defend in an
            interview. Read every line before it goes out. The resume is yours. The chatbot is just
            an editor.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Interview prep: free practice reps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Ask for common questions for the role you want. Answer out loud, then paste your
            answers in for feedback. It catches rambling answers and vague claims. It does not know
            the company, so pair this with real research on their site.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Realistic expectations</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            AI will not get you hired. Hiring decisions come from people. What AI does is make your
            materials sharper and your practice reps free. A clean resume and tight answers still
            come from you.
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
          <div className="mt-8">
            <ContactLine />
          </div>
        </div>
      </section>

      <SiblingNav current="ai-for-job-search" />

      <KitchenTableClose
        heading="Working on a job search?"
        body={`I answer my own messages. Call or text ${AGENT.phone} and we will talk it through. No cost, no obligation.`}
        href="/start"
        label="Start a conversation →"
      />
    </main>
  );
}
