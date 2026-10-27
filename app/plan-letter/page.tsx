import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { PLAN_LETTER_LIVE } from "@/lib/planLetter";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { PlanLetterTool } from "./PlanLetterTool";

/**
 * "Explain my plan letter": photograph an Annual Notice of Change and get the
 * changes in plain English. The tool stays switched off (and says to call
 * Christian instead) until PLAN_LETTER_ENABLED, NEXT_PUBLIC_PLAN_LETTER_ENABLED
 * and ANTHROPIC_API_KEY are set in Netlify. Nothing a visitor uploads is stored.
 */

const PATH = "/plan-letter";
const TITLE = "Explain My Medicare Plan Letter (ANOC) in Plain English";
const DESCRIPTION =
  "Take a photo of your Medicare Advantage or Part D Annual Notice of Change and see what changes for 2027 in plain English: premium, deductible, out-of-pocket max and drugs. Free, no name or email needed.";

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is the Annual Notice of Change?",
    a: "It's the letter your Medicare Advantage or Part D plan mails every September. It lists what changes on January 1: your premium, deductible, copays, out-of-pocket maximum, drug list and network. Annual Enrollment, October 15 to December 7, is when you can act on it.",
  },
  {
    q: "Which pages should I take a picture of?",
    a: "The table called \"Summary of Important Costs\" does most of the work. It's usually in the first few pages. If your letter has a section on drug coverage changes, add that page too. You can skip the page with your name and address.",
  },
  {
    q: "Is my letter saved?",
    a: "Not by this site. The pages are sent to Anthropic, the company behind the Claude AI, to be read, and the summary comes back to your screen. This site doesn't keep the pages or the summary, and you don't need to give your name, phone number or email. Anthropic's standard policy is to delete them from its systems within 30 days. To be safe, skip the page with your name and address.",
  },
  {
    q: "Will it tell me whether to change plans?",
    a: "No. It explains what changed. Whether to change depends on your doctors, your prescriptions and your budget, which a letter can't show. That's what a free plan review with a licensed agent is for.",
  },
  {
    q: "Can it make mistakes?",
    a: "Yes. An AI can misread a blurry photo or a crowded table. Your letter is the official word, so double-check any number that matters to you, or call your plan using the number on your member card.",
  },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  // Kept out of search until the tool is switched on.
  robots: PLAN_LETTER_LIVE ? undefined : { index: false, follow: true },
  openGraph: pageOpenGraph({
    title: "Got your plan's change letter? Get it in plain English.",
    description: "Snap a photo of your Annual Notice of Change and see what changes for 2027. Free, no name or email needed.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Got your plan's change letter? Get it in plain English.",
    description: "Snap a photo of your Annual Notice of Change and see what changes for 2027. Free, no name or email needed.",
    path: PATH,
  }),
};

export default function PlanLetterPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Your ANOC letter", path: "/anoc" },
              { name: "Explain my letter", path: PATH },
            ]),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Your ANOC letter", href: "/anoc" },
          { name: "Explain my letter" },
        ]}
        eyebrow="Free tool · No name or email needed"
        title="Got your plan's change letter? See what it means."
        lede="Take a photo of your Annual Notice of Change and get the 2027 changes in plain English: premium, deductible, out-of-pocket max and drugs. No name, phone or email needed."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Rather talk it through? Ask me"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <PlanLetterTool />

          <div className="mt-10 rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">Your privacy</p>
            <ul className="text-17 mt-2 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-[var(--color-ink-muted)]">
              <li>Skip the page with your name, address and member ID. The tool doesn&apos;t need it.</li>
              <li>
                Your pages go to Anthropic, the company behind the Claude AI, to be read. This site
                doesn&apos;t save them. Anthropic&apos;s standard policy is to delete them within 30
                days.
              </li>
              <li>The summary leaves out names, ID numbers and the plan&apos;s name.</li>
            </ul>
          </div>

          <h2 className="text-28 mt-14 font-semibold">What the summary can and can&apos;t do</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            It reads what your plan printed and puts it in plain words. It can&apos;t tell you whether
            your doctors stay in network, what your own prescriptions will cost, or whether another
            plan would fit you better. Those are the three checks of a plan review, and Annual
            Enrollment ends December 7.{" "}
            <Link href="/anoc" className="underline underline-offset-2">
              More about the ANOC letter
            </Link>{" "}
            ·{" "}
            <Link href="/medicare-2027-by-county" className="underline underline-offset-2">
              What&apos;s changing in your county
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <KitchenTableClose
        heading="Rather go through the letter together?"
        body={`Bring it to a free phone review and I'll check your doctors and prescriptions against next year's plans. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-27" />
    </main>
  );
}
