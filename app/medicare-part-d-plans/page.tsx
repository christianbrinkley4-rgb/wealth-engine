import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import { MedicareByline } from "@/app/components/MedicareByline";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  pageTwitter,
  serviceJsonLd,
} from "@/lib/seo";

const path = "/medicare-part-d-plans";
const title = "Medicare Part D Plans Explained in Plain English";
const description =
  "Medicare Part D explained in plain English: formularies, 2026 costs, the out-of-pocket cap, late penalties, and how to compare drug plans each fall.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

const FAQ = [
  {
    q: "What is Medicare Part D?",
    a: "Medicare Part D is prescription drug coverage. You can get it as a standalone plan alongside Original Medicare, or built into most Medicare Advantage plans. Each plan has its own list of covered drugs, its own tiers, and its own pharmacy network.",
  },
  {
    q: "Do I need Part D if I take no prescriptions?",
    a: "That is a common question. The key thing to know is the late enrollment penalty. If you go 63 days or more without creditable drug coverage, a penalty of 1 percent of the national base premium can apply for each full month you went without it. So it is worth thinking about even if you do not take anything today.",
  },
  {
    q: "What is a formulary, and why does it matter?",
    a: "A formulary is a plan's list of covered drugs. Every Part D plan has its own, and plans can change them every year. If your drug is not on a plan's formulary, that plan will not treat it as covered, so checking the formulary is one of the most important steps when you compare.",
  },
  {
    q: "What is the Part D out-of-pocket cap?",
    a: "In 2026, Part D out-of-pocket spending is capped at $2,100. Once you reach it, you pay nothing further for covered drugs that year. It does not mean every drug you take is covered. For 2027, the cap is projected to rise to $2,400, with final numbers confirmed by CMS in mid-November.",
  },
  {
    q: "What happens if I sign up late?",
    a: "If you go without creditable drug coverage for 63 days or more, a late enrollment penalty can apply. It is 1 percent of the national base premium for each full month without coverage, and the base premium is $38.99 in 2026. Most employer coverage counts as creditable, but COBRA and retiree plans have different rules, so check first.",
  },
  {
    q: "Should I review my drug plan every fall?",
    a: "It is a good habit. Plans can change their formularies, tiers, and costs every year. Your plan mails an Annual Notice of Change each fall, and Annual Enrollment runs October 15 through December 7, with changes taking effect January 1.",
  },
] as const;

export default function PartDPlansPage() {
  return (
    <main className="text-[var(--color-navy)]">
      {[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Medicare Part D prescription drug plans", path },
        ]),
        articleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-24",
          dateModified: "2026-10-24",
        }),
        serviceJsonLd({ name: "Free Medicare consultation in Greensboro", description, path }),
        faqJsonLd(FAQ),
      ].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <LocationBusinessMarkup path={path} />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare Part D" }]}
        eyebrow="A plain English guide for 2026 and 2027"
        title="Medicare Part D Prescription Drug Plans, Explained Simply"
        lede="Formularies, tiers, the out-of-pocket cap, and the late penalty, in plain English. Check your exact drugs against next year's plan before December 7. Free help from a licensed local agent, no obligation."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free conversation"
      />
      <MedicareByline reviewed="2026-10-24" />

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What Medicare Part D Is</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Medicare Part D is prescription drug coverage. That is the short version.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          You can get it two ways. One is a standalone drug plan that sits alongside Original
          Medicare. The other is built into a Medicare Advantage plan, since most of those include
          drug coverage.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Either way, the goal is the same: help with the cost of the medications you take.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Why No Two Drug Plans Are Alike</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Every Part D plan has its own formulary. That is the list of drugs the plan covers. Each
          plan also sets its own tiers and its own pharmacy network.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          This matters more than people expect. The same drug can cost one amount on one plan and a
          different amount on another. It can even cost different amounts at different pharmacies
          under the same plan.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Plans can also change their formularies every year. A drug that is covered this year is
          not automatically covered next year.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What Part D Costs Look Like in 2026</h2>
        <p className="text-17 mt-4 leading-relaxed">
          In 2026, the highest deductible a Part D plan can charge is $615. Some plans may charge
          less, but none can go above that.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Your out-of-pocket spending on Part D is capped at $2,100 in 2026. Once you reach that
          cap, you pay nothing more for covered drugs for the rest of the year.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          One important catch. Hitting the cap does not mean every drug you take is covered. It only
          applies to drugs on your plan&apos;s formulary.{" "}
          <Link href="/medicare-costs-2026" className="underline underline-offset-2">
            See every 2026 Medicare cost
          </Link>
          .
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What&apos;s Expected for 2027</h2>
        <p className="text-17 mt-4 leading-relaxed">
          The numbers are projected to go up in 2027. The deductible ceiling is expected to rise to
          $700, and the out-of-pocket cap is expected to rise to $2,400.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          The average Part D premium is projected at $41.33 a month. That is tied to the end of the
          premium stabilization demonstration.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Keep in mind these 2027 figures are projections. CMS confirms the final numbers in
          mid-November.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">The Late Enrollment Penalty</h2>
        <p className="text-17 mt-4 leading-relaxed">
          If you go without creditable drug coverage for 63 days or more, a late enrollment penalty
          can apply.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          The penalty is 1 percent of the national base premium for each full month you went without
          creditable coverage. In 2026, that base premium is $38.99.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Most employer drug coverage counts as creditable. COBRA and retiree plans have different
          rules, though. Check before you assume you are protected.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">
          Annual Enrollment and Your Annual Notice of Change
        </h2>
        <p className="text-17 mt-4 leading-relaxed">
          Annual Enrollment runs October 15 through December 7 each year. Any changes you make take
          effect January 1.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Each fall, your plan mails you an Annual Notice of Change. It spells out what is different
          for next year, like costs or covered drugs.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Do not toss it. It is the easiest way to spot a change that could affect you before the
          new year starts.{" "}
          <Link href="/aep" className="underline underline-offset-2">
            Read the Annual Enrollment guide
          </Link>
          .
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Help With Drug and Premium Costs</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Extra Help and Medicare Savings Programs can help eligible people with drug and premium
          costs.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Eligibility is assessed by your county DSS and by Social Security. There is no guaranteed
          outcome, but it is worth asking if money is tight.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">How to Compare Part D Plans</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Start with your exact drugs, your exact doses, and the pharmacy you use. Write them all
          down.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Then check each drug against the plan&apos;s formulary for the year you are considering.
          Not this year&apos;s list. Next year&apos;s.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Finally, look at total yearly cost. The monthly premium is only one piece. Deductibles,
          tiers, and pharmacy pricing all add up. If you live in the Triad, the{" "}
          <Link href="/medicare-part-d-greensboro-nc" className="underline underline-offset-2">
            Greensboro Part D guide
          </Link>{" "}
          adds the local detail.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Frequently Asked Questions</h2>
        {FAQ.map((item) => (
          <div key={item.q} className="mt-6">
            <h3 className="text-20 font-semibold">{item.q}</h3>
            <p className="text-17 mt-2">{item.a}</p>
          </div>
        ))}
        <p className="text-16 mt-6">
          This page is for educational purposes only and is not a recommendation of any specific
          plan. Have questions about your drug coverage? Call Christian Brinkley at{" "}
          <a href="tel:+19194086671" className="underline underline-offset-2">
            (919) 408-6671
          </a>{" "}
          or request a free review at{" "}
          <Link href="/aep" className="underline underline-offset-2">
            christianbrinkleync.com/aep
          </Link>
          .
        </p>
      </section>

      <RelatedMedicareGuides />
      <KitchenTableClose
        heading="Bring your Medicare questions"
        body="I will go through your doctors, prescriptions, and coverage options with you. Free, with no obligation to enroll."
        href="/start?topic=medicare&quick=1"
        label="Request a free conversation"
      />
      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
