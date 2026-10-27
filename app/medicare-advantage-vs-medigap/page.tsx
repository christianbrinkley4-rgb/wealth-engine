import type { Metadata } from "next";
import Link from "@/components/Link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import { MedicareByline } from "@/app/components/MedicareByline";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  pageTwitter,
  serviceJsonLd,
} from "@/lib/seo";

const path = "/medicare-advantage-vs-medigap";
const title = "Medicare Advantage vs Medigap: A Plain English Guide";
const description =
  "Medicare Advantage vs Medigap, explained in plain English. Compare premiums, networks, drugs, travel, and switching rules before you choose.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

const FAQ = [
  {
    q: "What is the difference between Medicare Advantage and Medigap in plain English?",
    a: "Medicare Advantage is a bundled alternative to Original Medicare, offered by private insurers, and most plans include drug coverage. Medigap is separate coverage that works alongside Original Medicare and helps pay some of the costs Original Medicare does not pay. One replaces how you get your Medicare benefits. The other fills in some of the costs around Original Medicare.",
  },
  {
    q: "Can I have both at the same time?",
    a: "They are built for different paths. Medicare Advantage is an alternative to Original Medicare. Medigap is designed to work alongside Original Medicare. So the real question is which path fits you, and that is worth talking through before you sign up for anything.",
  },
  {
    q: "Can I switch between them, and when?",
    a: "Annual Enrollment runs October 15 through December 7, and changes take effect January 1. Medigap has its own timing. Your Medigap open enrollment lasts 6 months, starting the first month you are 65 or older and enrolled in Part B. Outside that window and guaranteed issue situations, insurers may consider your health when they review a Medigap application.",
  },
  {
    q: "Do both cover prescription drugs?",
    a: "Most Medicare Advantage plans include drug coverage, though drug lists can change every year. With Medigap, plan on looking at drug coverage separately. Part D has an out-of-pocket cap of $2,100 in 2026 and $2,400 in 2027. Also watch the Part D late penalty if you go 63 days or more without creditable drug coverage.",
  },
  {
    q: "What happens to my coverage when I travel?",
    a: "Medicare Advantage networks vary, and plan availability depends on your county. If you travel a lot, ask any Advantage plan how it handles care outside your area. If you are looking at Medigap, ask how your coverage works in the places you go. Either way, ask before you need care away from home.",
  },
  {
    q: "What if my health changes?",
    a: "Your health can affect your options with Medigap. During your 6 month Medigap open enrollment, or in a guaranteed issue situation, that is one thing. Outside those times, insurers may consider your health when reviewing an application. That is why it helps to think about where your health might go, not just where it is today.",
  },
] as const;

const COMPARISON: [string, string, string][] = [
  [
    "Monthly premium",
    "Varies by plan and can change every year.",
    "Separate coverage with its own cost, on top of Original Medicare. The standard Part B premium is $202.90 a month in 2026.",
  ],
  [
    "Doctor networks",
    "Networks vary by plan. Check that your doctors are in it.",
    "Works alongside Original Medicare, so check how your doctors work with Original Medicare.",
  ],
  [
    "Prescription drug coverage",
    "Most plans include drug coverage. Drug lists can change every year.",
    "Check drug coverage separately. Part D has an out-of-pocket cap of $2,100 in 2026 and $2,400 in 2027.",
  ],
  [
    "Travel outside your area",
    "Networks vary and plans are tied to your county. Ask how the plan handles care away from home.",
    "Works alongside Original Medicare. Ask how coverage works in the places you travel.",
  ],
  [
    "Yearly out-of-pocket limit",
    "Ask each plan what its yearly limit is.",
    "Original Medicare's 20 percent has no yearly ceiling of its own. Medigap helps pay some of those costs, depending on the letter.",
  ],
  [
    "Switching rules",
    "Annual Enrollment runs October 15 through December 7. Changes take effect January 1.",
    "Open enrollment lasts 6 months from the first month you are 65 or older and in Part B. Outside that and guaranteed issue situations, insurers may consider health.",
  ],
];

export default function AdvantageVsMedigapPage() {
  return (
    <main className="text-[var(--color-navy)]">
      {[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Medicare Advantage vs Medigap", path },
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare Advantage vs Medigap" }]}
        eyebrow="A plain English guide"
        title="Medicare Advantage vs Medigap: What's the Difference?"
        lede="Two different paths after Original Medicare, explained without jargon. Compare premiums, networks, drugs, travel, and switching rules, then talk it through with a licensed local agent. Free, no obligation."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free conversation"
      />
      <MedicareByline reviewed="2026-10-24" />

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Start With Original Medicare</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Before you compare anything, it helps to know what you are building on. Original Medicare
          is Part A, which covers hospital care, and Part B, which covers medical care.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          In 2026, the standard Part B premium is $202.90 a month. The Part B deductible is $283 a
          year. After you meet that deductible, you generally pay 20 percent of approved costs. Here
          is the part a lot of people miss. That 20 percent has no yearly ceiling of its own.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          That gap is why people start looking at Medicare Advantage and Medigap in the first place.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What Medicare Advantage Is</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Medicare Advantage is also called Part C. It is a bundled alternative to Original
          Medicare, and it is offered by private insurers.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Most Advantage plans include drug coverage. Networks vary from plan to plan. Which plans
          you can get depends on your county.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          One thing to keep in mind: Advantage plans can change their premiums, drug lists, and
          networks every year. So the plan you pick this year may look different next year.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What Medigap Is</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Medigap is also called Medicare Supplement. It is separate coverage that works alongside
          Original Medicare. It helps pay some of the costs Original Medicare does not pay.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Medigap plans go by letters. Benefits for the same letter are standardized. That means a
          plan with a given letter has the same benefits no matter who sells it.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Timing matters a lot with Medigap. Your Medigap open enrollment lasts 6 months. It starts
          the first month you are 65 or older and enrolled in Part B. Outside open enrollment and
          guaranteed issue situations, insurers may consider your health when they review your
          application.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Medicare Advantage vs Medigap at a Glance</h2>
        <div className="art-table-wrap mt-4">
          <ResponsiveTable className="art-table">
            <caption className="text-16">Medicare Advantage vs Medigap</caption>
            <thead>
              <tr>
                <th scope="col">What to compare</th>
                <th scope="col">Medicare Advantage</th>
                <th scope="col">Medigap</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, advantage, medigap]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{advantage}</td>
                  <td>{medigap}</td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        </div>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Don&apos;t Get Caught by Late Penalties</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Whatever you choose, watch your deadlines. Late penalties are real, and some of them stick
          around.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          If you delay Part B, you pay an extra 10 percent of the standard premium for every full 12
          months you waited. It usually lasts as long as you have Part B.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Part D has its own penalty. It is 1 percent of the national base premium for each full
          month you go without creditable drug coverage, once the gap reaches 63 days. The national
          base premium is $38.99 in 2026.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">How to Choose</h2>
        <p className="text-17 mt-4 leading-relaxed">
          There is no single right answer here. It comes down to your own life.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Look at your doctors, your prescriptions, your pharmacy, and how much you travel. Then
          think about your budget. Some people focus on what they pay each month. Others focus on
          what they would pay when they actually need care.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Keep this in mind. The lowest monthly premium does not mean the lowest total cost. Look at
          the whole picture. If you live in the Triad, the{" "}
          <Link
            href="/medicare-advantage-vs-medigap-greensboro-nc"
            className="underline underline-offset-2"
          >
            local coverage comparison for Greensboro
          </Link>{" "}
          adds the county detail.
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
          This guide is for educational purposes only and is not a recommendation of any specific
          plan. Have questions about your own situation? Call Christian Brinkley at{" "}
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
