import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

const title = "Financial Planning Questions in NC | Christian Brinkley";
const description =
  "Insurance, annuities, and financial education for NC families. Prepare retirement questions and understand when to work with an investment or tax professional.";
const path = "/financial-planning-nc";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Financial planning questions in NC", path },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Financial planning questions in NC" }]}
        eyebrow="Insurance, annuities, and financial education"
        title="Financial planning questions in North Carolina"
        lede="I'm Christian Brinkley, a 21-year-old licensed NC insurance agent and UNCG accounting student. I help people understand insurance and retirement income questions. I don't provide investment management, personalized investment advice, or personal tax advice."
        secondaryHref="/start?topic=financial_planning&quick=1"
        secondaryLabel="Ask an insurance or retirement question"
      />
      <section className="app-shell measure-prose max-w-3xl py-12">
        <h2 className="text-28 font-semibold">Start with the decision in front of you</h2>
        <p className="text-18 mt-4">
          Planning for retirement can bring several questions together: health coverage, monthly
          expenses, income, family protection, and taxes. You may need more than one professional.
          My role is insurance and education. An investment adviser or tax professional handles
          advice that falls outside that role.
        </p>
        <p className="text-18 mt-4">
          I'm based in Greensboro and grew up in Creedmoor. Phone conversations are available across
          North Carolina, including the Triad, Triangle, and Granville County. In-person meetings
          are arranged individually.
        </p>
        <ol className="text-18 mt-8 list-decimal space-y-6 pl-6">
          <li>
            <h3 className="font-semibold">Write down your income and regular expenses.</h3>
            <p>
              List wages, pensions, Social Security, insurance premiums, debt payments, and
              household spending. Keep estimates separate from income you already receive. Use the{" "}
              <Link className="underline" href="/retirement-income">
                retirement income guide
              </Link>{" "}
              to organize questions.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Prepare for health coverage changes.</h3>
            <p>
              If employer insurance is ending, ask your benefits administrator about coordination
              and your family&apos;s coverage before canceling it. Bring the coverage notice to a{" "}
              <Link className="underline" href="/turning-65">
                Medicare enrollment conversation
              </Link>
              .
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Review what your life insurance is meant to cover.</h3>
            <p>
              List dependents, debts, and existing policies. Review beneficiaries and policy costs.
              The{" "}
              <Link className="underline" href="/life-insurance">
                life insurance guide
              </Link>{" "}
              explains the questions to ask before comparing coverage.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Understand an annuity before considering one.</h3>
            <p>
              An annuity is an insurance contract. Ask about fees, surrender charges, access to
              money, and how payments work. NC DOI explains that most annuities are long-term
              contracts. Read the{" "}
              <Link className="underline" href="/annuities">
                annuity guide
              </Link>{" "}
              and compare the actual terms.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Choose the right professional for personal advice.</h3>
            <p>
              For investment advice, check the professional and firm through Investor.gov. Ask about
              registration, services, compensation, and conflicts. For tax decisions, speak with a
              qualified tax professional about your own facts. My{" "}
              <Link className="underline" href="/taxes-and-retirement">
                taxes and retirement articles
              </Link>{" "}
              are educational.
            </p>
          </li>
        </ol>
        <h2 className="text-28 mt-10 font-semibold">What a conversation with me covers</h2>
        <p className="text-18 mt-4">
          Bring the insurance question you want to work through and any relevant policy or employer
          notices. Don&apos;t send Social Security numbers, account numbers, or medical records
          through the request form. The consultation has no cost and no obligation to buy. Insurance
          products have their own costs, eligibility rules, and limits.
        </p>
        <p className="text-18 mt-4">
          I represent a limited number of insurance companies and receive a commission if you buy a
          policy through me. I&apos;m not a CPA, CFP professional, or registered investment adviser.
        </p>
        <Link className="btn btn-outline mt-6" href="/start?topic=financial_planning&quick=1">
          Ask your insurance or retirement question
        </Link>
        <h2 className="text-24 mt-10 font-semibold">Sources and related help</h2>
        <ul className="text-17 mt-4 space-y-3">
          <li>
            <a className="underline" href="https://www.ncdoi.gov/consumers/annuities">
              NC DOI: annuities
            </a>
          </li>
          <li>
            <a
              className="underline"
              href="https://www.investor.gov/introduction-investing/getting-started/working-investment-professional/check-out-your-investment-professional"
            >
              Investor.gov: check your investment professional
            </a>
          </li>
          <li>
            <Link className="underline" href="/medicare-nc-towns">
              Medicare help by town
            </Link>
          </li>
          <li>
            <Link className="underline" href="/about">
              About Christian and license information
            </Link>
          </li>
        </ul>
        <p className="text-16 mt-6">
          Updated November 9, 2026. Educational information, not personal investment or tax advice.
        </p>
        <ComplianceDisclosure variant="medicare" />
        <p className="mt-6">
          <a href="tel:+19194086671" className="underline">
            (919) 408-6671
          </a>
        </p>
      </section>
    </main>
  );
}
