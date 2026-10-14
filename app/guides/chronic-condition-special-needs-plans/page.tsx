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
 * Chronic condition special needs plans (C-SNPs): who qualifies.
 *
 * No plan names and no benefit amounts. Availability is by county, so the
 * page never says a plan exists for a given condition in the Triad.
 */

const PATH = "/guides/chronic-condition-special-needs-plans";

export const metadata: Metadata = {
  title: {
    absolute: "C-SNPs Explained: Chronic Condition Special Needs Plans",
  },
  description: "A C-SNP is a Medicare Advantage plan built for people with a specific chronic condition, like diabetes or heart failure. Here's who qualifies and what to check first.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Chronic condition special needs plans (C-SNPs): who qualifies",
    description: "C-SNPs are Medicare Advantage plans for people with certain chronic conditions. Who qualifies, how you enroll, and what to check before you join.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Chronic condition special needs plans (C-SNPs): who qualifies",
    description: "C-SNPs are Medicare Advantage plans for people with certain chronic conditions. Who qualifies, how you enroll, and what to check before you join.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is a C-SNP in Medicare?",
    a: "A C-SNP is a chronic condition special needs plan. It's a type of Medicare Advantage plan that only enrolls people with a specific severe or disabling chronic condition and builds its network, drug list, and care coordination around that condition.",
  },
  {
    q: "Who qualifies for a chronic condition special needs plan?",
    a: "You need Medicare Part A and Part B, you must live in the plan's service area, and you must have the chronic condition the plan is built for. The plan confirms the diagnosis with your doctor.",
  },
  {
    q: "What conditions qualify for a C-SNP?",
    a: "Medicare's list includes diabetes, chronic heart failure, cardiovascular disorders, chronic lung disorders, end-stage renal disease, dementia, and several others. A plan has to be offered for your condition in your county for you to enroll.",
  },
  {
    q: "When can I enroll in a C-SNP?",
    a: "If you have a qualifying condition, you get a Special Enrollment Period to join a C-SNP for that condition, so you don't have to wait for fall. You can also enroll during the Annual Enrollment Period, October 15 to December 7.",
  },
  {
    q: "Do C-SNPs include prescription drug coverage?",
    a: "Yes. All Medicare special needs plans include Part D prescription drug coverage. You should still check that each of your medications is on the plan's drug list and what tier it's in.",
  },
];

export default function ChronicConditionSpecialNeedsPlansPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "C-SNPs", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "C-SNPs Explained: Chronic Condition Special Needs Plans",
              description: "A C-SNP is a Medicare Advantage plan built for people with a specific chronic condition, like diabetes or heart failure. Here's who qualifies and what to check first.",
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "C-SNPs" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Chronic condition special needs plans (C-SNPs): who qualifies"}
        lede={"If you have diabetes, heart failure, or a chronic lung condition, you may have heard there's a kind of Medicare plan made for you. There is. It's worth understanding before you decide if it fits."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"A chronic condition special needs plan, or C-SNP, is a type of Medicare Advantage plan that only enrolls people with a specific chronic condition. It builds its doctors, drug list, and care coordination around that condition. Your doctor has to confirm the diagnosis. Whether one is offered depends on your county."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"What a special needs plan is"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A special needs plan is a Medicare Advantage plan that limits who can join. There are three kinds. One is for people with certain chronic conditions. One is for people who have both Medicare and Medicaid. One is for people who live in a nursing home or need that level of care."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This guide is about the first kind, the C-SNP. Like any Medicare Advantage plan, it covers everything Part A and Part B cover. Every special needs plan also includes Part D drug coverage."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Which conditions qualify"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare keeps a list of severe or disabling chronic conditions that a C-SNP can be built around. Each plan picks one condition or a related group. Common examples include:"}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Diabetes."}</strong>{" "}
              {"One of the most common conditions these plans are built around."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Chronic heart failure and other cardiovascular disorders."}</strong>{" "}
              {"Sometimes grouped together in one plan."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Chronic lung disorders."}</strong>{" "}
              {"Such as COPD."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"End-stage renal disease."}</strong>{" "}
              {"Kidney failure that needs dialysis or a transplant."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Other conditions on Medicare's list."}</strong>{" "}
              {"Including dementia, certain cancers, stroke, and some autoimmune and neurological conditions."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Having a condition on the list isn't enough by itself. There has to be a C-SNP for that condition offered in your county."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"How a C-SNP is different"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"The provider network leans toward your condition."}</strong>{" "}
              {"Plans typically include specialists who treat it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"The drug list is built around it."}</strong>{" "}
              {"Medications commonly used for the condition are generally on the list. You still need to check yours."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You get care coordination."}</strong>{" "}
              {"The plan is required to have a care management program, often with a care coordinator who helps you keep track of appointments, tests, and medications."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Extra benefits may relate to the condition."}</strong>{" "}
              {"These vary by plan and can change each year."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"How you qualify and enroll"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"You need Medicare Part A and Part B, you need to live in the plan's service area, and you need the condition the plan covers. The plan will contact your doctor to confirm the diagnosis."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"One helpful rule: if you have a qualifying condition, you get a Special Enrollment Period to join a C-SNP for that condition. You don't have to wait for the fall. That special period is used up once you enroll, so later changes follow the normal calendar. I explain the fall window on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {", and other windows on the "}
            <Link href="/special-enrollment" className="underline underline-offset-2">
              {"Special Enrollment Periods"}
            </Link>
            {" page."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What to check before you join"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A plan built for your condition sounds like an easy yes. Sometimes it is. Check these first, the same as you would for any Medicare Advantage plan."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Your doctors."}</strong>{" "}
              {"Is your primary care doctor in the network? Your specialist? The hospital you'd use? Check each one by name for the coming year."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your prescriptions."}</strong>{" "}
              {"Look up every medication, not only the ones for your chronic condition. Note the tier and any prior authorization."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your costs."}</strong>{" "}
              {"Compare the premium, the copays for the visits you make most, and the out-of-pocket maximum."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Referrals and approvals."}</strong>{" "}
              {"Ask whether you need a referral to see specialists and which services need prior authorization."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your other conditions."}</strong>{" "}
              {"If you have more than one health issue, make sure the plan works for all of them."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"The tradeoffs"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A C-SNP is still a Medicare Advantage plan. That means a network, and usually rules about referrals and prior authorization. If you value seeing any doctor who takes Medicare, Original Medicare with a Medicare Supplement works differently. I compare the two paths in "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              {"Advantage vs. Medigap"}
            </Link>
            {"."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Also know what happens if your situation changes. If the plan can no longer confirm you have the qualifying condition, it has to disenroll you after a grace period. You'd get a Special Enrollment Period to pick other coverage."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Finding out what's available where you live"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Plans are offered by county, and the list changes every year. You can search by ZIP code on Medicare.gov and filter for special needs plans. A free NC SHIIP counselor can help at 1-855-408-1212."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Or "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {" and we'll check together whether any plan I offer for your condition is sold at your address, and whether your doctors and prescriptions fit. I don't offer every plan in the area, and I'll tell you when Medicare.gov is the better place to look."}
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
            {"Living with a chronic condition and wondering about your options?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="chronic-condition-special-needs-plans" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Check the plan against your whole care team"}
        body={`${"Bring your doctors, your prescriptions, and your diagnosis. We'll see what's offered at your address and whether it fits everything, not only the one condition."} Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
