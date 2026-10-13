import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare under 65 on disability (SSDI) in North Carolina.
 *
 * NC Medigap rules for under-65 beneficiaries verified against G.S. 58-54-45
 * and NCDOI's Medicare supplement page on October 13, 2026.
 */

const PATH = "/guides/medicare-under-65-disability-nc";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Under 65 on Disability (SSDI) in North Carolina",
  },
  description: "On SSDI in North Carolina? Medicare usually starts after 24 months. NC law gives you a six-month window to buy a Medigap Plan A, D, or G. Here's how it works.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Medicare under 65 on disability (SSDI) in North Carolina",
    description: "Medicare usually starts 24 months into SSDI. North Carolina adds a six-month window to buy certain Medigap plans under 65. Here's the timeline.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare under 65 on disability (SSDI) in North Carolina",
    description: "Medicare usually starts 24 months into SSDI. North Carolina adds a six-month window to buy certain Medigap plans under 65. Here's the timeline.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "When does Medicare start if I'm on SSDI?",
    a: "Medicare generally starts after you've been entitled to Social Security disability benefits for 24 months. You're enrolled in Part A and Part B automatically. People with ALS get Medicare the same month their disability benefits begin.",
  },
  {
    q: "Can I buy a Medicare Supplement under 65 in North Carolina?",
    a: "Yes. North Carolina law gives people on Medicare because of disability a guaranteed right to buy Medicare Supplement Plan A, D, or G. You have six months, starting with the first month you're enrolled in Part B.",
  },
  {
    q: "Are Medigap premiums higher if I'm under 65 in North Carolina?",
    a: "They can be. Companies may set rates specific to people under 65 on disability, and the NC Department of Insurance notes those premiums may be higher than for people 65 and older. A company can't price your policy on your individual health during your enrollment window.",
  },
  {
    q: "What happens to my Medicare Supplement options when I turn 65?",
    a: "You get a new six-month Medicare Supplement open enrollment period when you turn 65. During it, you can buy any standardized plan from any company with no health questions, at the rates for people 65 and older.",
  },
  {
    q: "Can I get a Medicare Advantage plan if I'm under 65 on disability?",
    a: "Yes. If you have Medicare Part A and Part B and live in a plan's service area, you can generally enroll in a Medicare Advantage plan regardless of age. Check your doctors and prescriptions against the plan first.",
  },
];

export default function MedicareUnder65DisabilityNcPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Medicare under 65 in NC", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Under 65 on Disability (SSDI) in North Carolina",
              description: "On SSDI in North Carolina? Medicare usually starts after 24 months. NC law gives you a six-month window to buy a Medigap Plan A, D, or G. Here's how it works.",
              path: PATH,
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Medicare under 65 in NC" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Medicare under 65 on disability (SSDI) in North Carolina"}
        lede={"Medicare isn't only for people 65 and older. If you're on Social Security Disability, it's coming, usually after two years. North Carolina also gives you a right that many states don't."}
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Book a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"Most people on SSDI get Medicare automatically after 24 months of disability benefits. In North Carolina, state law gives you six months from the start of Part B to buy a Medicare Supplement Plan A, D, or G without being turned down for your health. Premiums may be higher than for people 65 and older, and you get a fresh enrollment window when you turn 65."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"When Medicare starts"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you receive Social Security Disability Insurance, Medicare generally begins after you've been entitled to disability benefits for 24 months. You don't have to apply. Social Security enrolls you in Part A and Part B, and your card arrives in the mail a few months before coverage starts."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"There are two main exceptions. If you have ALS, Medicare starts the same month your disability benefits begin. If you have end-stage renal disease, Medicare follows its own timeline based on dialysis or a transplant."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Your choices are the same as anyone's on Medicare"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Original Medicare."}</strong>{" "}
              {"Part A and Part B, with a separate Part D plan for prescriptions."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Original Medicare with a Medicare Supplement."}</strong>{" "}
              {"The supplement helps pay the deductibles and the 20% that Original Medicare leaves to you."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"A Medicare Advantage plan."}</strong>{" "}
              {"A private plan that covers your Part A and Part B benefits, usually with drug coverage and a network."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"You have a seven-month window around your 25th month of disability benefits to choose a Medicare Advantage or Part D plan. After that, you can make changes each fall. I explain that window on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {"."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What North Carolina adds"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Federal law doesn't require companies to sell Medicare Supplement policies to people under 65. North Carolina law does. Under state law, if you're eligible for Medicare because of a disability, you have a guaranteed right to buy certain plans."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Which plans."}</strong>{" "}
              {"The NC Department of Insurance says people under 65 on Medicare because of disability can buy Plan A, Plan D, or Plan G. The law requires companies to offer Plan A, and to offer Plan D or G if they sell those to people 65 and older."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"How long you have."}</strong>{" "}
              {"Six months, starting with the first month you're enrolled in Part B. If Social Security approves you retroactively, the six months starts the month you get that notice."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"What the company can't do."}</strong>{" "}
              {"During that window, a company can't turn you down or set your price based on your health or claims history."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"What the company can do."}</strong>{" "}
              {"It can charge a rate specific to people under 65 on disability. The Department of Insurance notes those premiums may be higher than for people 65 and older."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Six months goes quickly when you're dealing with a health condition. If a supplement is something you want, put that date on the calendar when your Medicare card arrives."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you lose other coverage later"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The same North Carolina law gives you another chance if you were in a managed care plan and that coverage ends through cancellation, nonrenewal, or disenrollment. You have 63 days from the end date to buy Plan A, D, or G with the same protections. The federal rules on leaving a Medicare Advantage plan still apply, so ask before you make a move. I cover the general rules in "}
            <Link href="/guides/switching-medicare-advantage-to-medigap-nc" className="underline underline-offset-2">
              {"switching from Medicare Advantage to Medigap in NC"}
            </Link>
            {"."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What changes when you turn 65"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This is good news. When you reach 65, you get a brand-new six-month Medicare Supplement open enrollment period, the same one everyone gets. You can buy any plan letter from any company, at the rates for people 65 and older, with no health questions."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"So a supplement that's expensive at 58 doesn't lock you in for life. Many people on disability use a Medicare Advantage plan or a higher-priced supplement until 65, then review everything."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Help with costs"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Living on disability income often means a tight budget. Two programs are worth checking."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Extra Help."}</strong>{" "}
              {"Lowers what you pay for Part D premiums and prescriptions."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Medicare Savings Programs."}</strong>{" "}
              {"Run through NC Medicaid. Depending on your income, they can pay your Part B premium and sometimes your deductibles and coinsurance."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"I explain both in "}
            <Link href="/guides/extra-help-medicare-savings-programs-nc" className="underline underline-offset-2">
              {"Extra Help and Medicare Savings Programs in NC"}
            </Link>
            {". If you have both Medicare and full Medicaid, there are also Medicare Advantage plans made for that situation."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you or your spouse still have employer coverage"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you're covered by a large employer plan through your own or a family member's current job, that plan may pay first, and you may be able to delay Part B. For people on Medicare because of disability, this applies when the employer has 100 or more employees. Check with the benefits office before you turn down Part B."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"A short checklist"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Find your Medicare start date."}</strong>{" "}
              {"It's on your card and on the letter from Social Security."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Decide about a supplement early."}</strong>{" "}
              {"Your North Carolina window is six months from the start of Part B."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"List your doctors and prescriptions."}</strong>{" "}
              {"Every option should be checked against them."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask about Extra Help and the Medicare Savings Programs."}</strong>{" "}
              {"It costs nothing to apply."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you'd like to go through it together, "}
            <Link href="/schedule?topic=medicare" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". A family member or caregiver is welcome to join. For free counseling from someone who doesn't sell insurance, call NC SHIIP at 1-855-408-1212."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-supplement-medigap-plans" rel="noopener" className="underline underline-offset-2">
              {"NC Department of Insurance: Medicare supplement plans"}
            </a>
            {"; "}
            <a href="https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_58/GS_58-54-45.html" rel="noopener" className="underline underline-offset-2">
              {"North Carolina General Statutes 58-54-45"}
            </a>
            {"."}
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"On disability and getting close to your Medicare start date?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-under-65-disability-nc" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Don't let the six-month window pass by accident"}
        body={`${"Tell me your Part B start date. We'll mark your North Carolina window, check your doctors and prescriptions, and see whether you qualify for help with costs."} Call or text ${AGENT.phone}.`}
        href="/schedule?topic=medicare"
        label="Book a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
