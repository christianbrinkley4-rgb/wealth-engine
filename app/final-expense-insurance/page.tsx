import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
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
  serviceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Final Expense Insurance Help in Greensboro, NC",
  },
  description:
    "Final expense and burial insurance in Greensboro, NC. Talk through costs and coverage with Christian Brinkley, a licensed local agent. Free consultation.",
  alternates: { canonical: "/final-expense-insurance" },
  openGraph: pageOpenGraph({
    title: "Final expense insurance in Greensboro and the Triad.",
    description:
      "Small whole life policies that cover funeral and burial costs. No medical exam options. Free consultation, no obligation.",
    path: "/final-expense-insurance",
  }),
  twitter: pageTwitter({
    title: "Final expense insurance in Greensboro and the Triad.",
    description:
      "Small whole life policies that cover funeral and burial costs. No medical exam options. Free consultation, no obligation.",
    path: "/final-expense-insurance",
  }),
};

const FAQ = [
  {
    q: "What is final expense insurance?",
    a: "It is a small whole life insurance policy, usually between $5,000 and $25,000, meant to cover funeral costs, burial or cremation, and other end-of-life expenses. The benefit goes to whoever you name, and they can use it for whatever the family needs most.",
  },
  {
    q: "How is it different from regular life insurance?",
    a: "The main differences are size and purpose. Regular life insurance often covers hundreds of thousands to replace income or pay off a mortgage. Final expense is smaller and simpler, designed for one job: making sure your family does not get a bill at the hardest moment.",
  },
  {
    q: "Do I need a medical exam?",
    a: "Many final expense policies do not require a medical exam. You answer health questions on the application instead. Some options exist for people with health concerns, though the cost and waiting periods vary by policy. I can talk through what fits your situation.",
  },
  {
    q: "How much does a funeral cost in North Carolina?",
    a: "Costs vary widely by choices like burial versus cremation, casket, service type, and cemetery. The National Funeral Directors Association's 2023 study put the national median at $8,300 for a funeral with viewing and burial, and $6,280 for a funeral with viewing and cremation, not counting the cemetery plot, marker, or cash advances. Under the FTC Funeral Rule, the funeral home must give you a written general price list, and you may buy only the items you want. Bring your preferences to your conversation and I can talk through a realistic number.",
  },
  {
    q: "Does final expense insurance cover cremation?",
    a: "Yes. The benefit is a lump sum your beneficiary can use for burial or cremation, whichever you prefer. The National Funeral Directors Association's 2023 study put the national median at $6,280 for a funeral with viewing and cremation, and $8,300 for a funeral with viewing and burial. Those medians do not include the cemetery plot, the grave marker, or cash advances like flowers and obituaries.",
  },
  {
    q: "Can I get this if I am already in my 70s or 80s?",
    a: "Many final expense policies are available to people in their 70s and 80s. Eligibility, cost, and benefit amounts depend on age, health answers, and the specific policy. A conversation is the fastest way to find out what is available to you.",
  },
  {
    q: "What does it cost to talk with you?",
    a: "Nothing. The consultation is free and there is no obligation to buy anything. I am paid by the insurance companies if you choose a policy, not by you.",
  },
] as const;

export default function FinalExpenseInsurancePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insurance services", path: "/insurance-services" },
              { name: "Final expense insurance", path: "/final-expense-insurance" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Final expense insurance in Greensboro, NC: cover funeral costs without leaving a bill.",
              description:
                "What final expense insurance is, who it helps, and how to choose a policy. Free consultation with Christian Brinkley, licensed NC agent.",
              path: "/final-expense-insurance",
              datePublished: "2026-10-12",
              dateModified: "2026-11-07",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Final expense insurance consultation in Greensboro, NC",
              description:
                "Free, no-pressure help choosing final expense insurance in Greensboro and the Piedmont Triad.",
              path: "/final-expense-insurance",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Insurance services", href: "/insurance-services" },
          { name: "Final expense insurance" },
        ]}
        eyebrow="Greensboro and the Piedmont Triad"
        title="Final Expense Insurance in Greensboro, NC"
        lede="A small policy with one job: making sure your family does not get a funeral bill at the hardest moment. I am Christian Brinkley, a licensed insurance agent in Greensboro. I will talk through what you want covered, what it costs, and whether a policy makes sense for you. Free, no pressure."
        secondaryHref="/start?topic=life_insurance"
        secondaryLabel="Start the conversation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What final expense insurance does</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              When someone passes, the family gets a funeral bill within days. Final
              expense insurance is a small whole life policy that pays a lump sum to
              whoever you name, so they can cover the funeral, burial or cremation,
              and the smaller costs that pile up, without reaching into savings or asking family
              to cover it.
            </p>
            <p>
              Policies are usually between $5,000 and $25,000. That is smaller than
              traditional life insurance on purpose. This is not income replacement.
              It is one bill, handled. It is also called burial insurance, because
              burial costs are usually the biggest bill it covers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Who it helps most</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              People who want to leave things settled. If your savings would take a
              hit from a $10,000 funeral, or if you do not want your children arguing
              about who pays, a small policy answers the question in advance.
            </p>
            <p>
              It also helps people whose health makes larger policies hard to get.
              Many final expense policies ask health questions instead of requiring
              a medical exam, and options exist for a range of health situations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What final expense costs by age</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Age is the biggest factor in the monthly premium. The figures below
              are market averages for a simplified-issue policy for a non-tobacco
              applicant, from MoneyGeek&apos;s 2026 final expense rate analysis,
              updated September 22, 2026. They are sample averages, not quotes.
              Your premium is set by the insurer after your application and health
              questions.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <ResponsiveTable className="w-full border-collapse text-left text-base">
              <caption className="mb-4 text-left font-semibold">
                Average monthly premium for final expense coverage
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b-2 p-3">Age</th>
                  <th scope="col" className="border-b-2 p-3">Women, $10,000</th>
                  <th scope="col" className="border-b-2 p-3">Women, $20,000</th>
                  <th scope="col" className="border-b-2 p-3">Men, $10,000</th>
                  <th scope="col" className="border-b-2 p-3">Men, $20,000</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="border-b p-3 align-top font-semibold">70</th>
                  <td className="border-b p-3 align-top">$64</td>
                  <td className="border-b p-3 align-top">$124</td>
                  <td className="border-b p-3 align-top">$84</td>
                  <td className="border-b p-3 align-top">$162</td>
                </tr>
                <tr>
                  <th scope="row" className="border-b p-3 align-top font-semibold">75</th>
                  <td className="border-b p-3 align-top">$87</td>
                  <td className="border-b p-3 align-top">$171</td>
                  <td className="border-b p-3 align-top">$113</td>
                  <td className="border-b p-3 align-top">$220</td>
                </tr>
                <tr>
                  <th scope="row" className="border-b p-3 align-top font-semibold">80</th>
                  <td className="border-b p-3 align-top">$125</td>
                  <td className="border-b p-3 align-top">$246</td>
                  <td className="border-b p-3 align-top">$164</td>
                  <td className="border-b p-3 align-top">$321</td>
                </tr>
              </tbody>
            </ResponsiveTable>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            The sharpest jump comes between 75 and 80, when average premiums rise
            about 44 percent for women and 45 percent for men. Tobacco use
            typically adds 25 to 30 percent. Guaranteed issue policies, which ask
            no health questions, usually cost more than these simplified-issue
            averages for the same benefit.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How much coverage to buy</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Start with what you want covered. Ten thousand to $15,000 covers a
              basic funeral at the national median of $8,300. Fifteen thousand to
              $25,000 covers a funeral with cemetery costs on top. Twenty-five
              thousand to $40,000 leaves something beyond the funeral for small
              bills or family. Pick the amount from the bill you want handled, not
              from a round number, and ask for the funeral home&apos;s general price
              list before you decide.
            </p>
            <p>
              If you are 70 or older, read the{" "}
              <Link href="/guides/final-expense-insurance-for-seniors-over-70" className="underline underline-offset-2">
                final expense guide for seniors over 70
              </Link>
              , which walks through options at 70, 75, 80, and 85, and the
              two-year waiting period on guaranteed issue policies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What to ask before you buy</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>How much is the monthly premium, and can it change?</li>
            <li>Is there a waiting period before the full benefit pays?</li>
            <li>What health questions does the application ask?</li>
            <li>Who receives the benefit, and how fast is it paid?</li>
            <li>What happens if you stop paying premiums?</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Bring these questions to your conversation. I will walk through each one
            with the actual policy language, not a brochure summary. If you already
            have a policy, bring it and I will review what you have before
            discussing anything new.
          </p>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
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



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            Also see my pages on{" "}
            <Link href="/life-insurance" className="underline underline-offset-2">
              life insurance
            </Link>
            ,{" "}
            <Link href="/guides/final-expense-insurance-for-seniors-over-70" className="underline underline-offset-2">
              final expense for seniors over 70
            </Link>
            ,{" "}
            <Link href="/long-term-care-insurance" className="underline underline-offset-2">
              long-term care insurance
            </Link>
            , and{" "}
            <Link href="/medicare-agent-greensboro-nc" className="underline underline-offset-2">
              Medicare help in Greensboro
            </Link>
            .
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="One bill, handled in advance"
        body="About twenty minutes, free, and your family never has to guess what you wanted. If what you have is already enough, I'll tell you so."
        href="/start?topic=life_insurance"
        label="Start the conversation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="general" />
      </div>
      <MedicareByline reviewed="2026-11-07" />
      <RelatedMedicareGuides />
    </main>
  );
}
