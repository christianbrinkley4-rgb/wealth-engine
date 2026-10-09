import type { Metadata } from "next";
import Link from "next/link";
import { pageOpenGraph } from "@/lib/seo";

const title = "How this information is prepared";
const description =
  "Our sources, calculator assumptions, author qualifications, and corrections process.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: pageOpenGraph({ title, description, path: "/editorial-policy" }),
};

export default function EditorialPolicy() {
  return (
    <main className="app-shell measure-prose py-14">
      <h1 className="text-40 font-semibold">{title}</h1>
      <p className="mt-6">
        This site explains money and insurance questions in plain language. It provides general
        education, not personal tax, legal, or investment advice.
      </p>
      <h2 className="text-28 mt-10 font-semibold">Who writes it</h2>
      <p>
        <Link href="/about">Christian Brinkley</Link> is a licensed insurance agent and an
        accounting student. He is not a CPA, CFP, or registered investment adviser.
      </p>
      <p>
        Articles do not claim independent expert review unless a named reviewer actually reviewed
        them.
      </p>
      <h2 className="text-28 mt-10 font-semibold">Where the facts come from</h2>
      <p>
        Tax, benefit, and contribution figures link to primary sources such as the IRS, Social
        Security, CMS, and state agencies.
      </p>
      <p>
        A source-check date means those references were checked. It does not promise that rules will
        stay unchanged.
      </p>
      <h2 className="text-28 mt-10 font-semibold">What calculators can tell you</h2>
      <p>
        Calculators show arithmetic under stated assumptions. Sample inputs are examples, not
        current market rates or recommendations.
      </p>
      <p>
        Returns are uncertain. Taxes, fees, eligibility, and your circumstances can change the
        result. Check the assumptions before using an estimate.
      </p>
      <h2 className="text-28 mt-10 font-semibold">Corrections and compensation</h2>
      <p>
        Found a mistake? <Link href="/start">Send the page and the source</Link> so Christian can
        investigate and correct it.
      </p>
      <p>
        Christian may receive compensation for insurance business.{" "}
        <Link href="/about">Read his qualifications and compensation disclosure</Link> before
        requesting help.
      </p>
    </main>
  );
}
