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
 * The Medicare Prescription Payment Plan.
 *
 * The only figures are the Part D out-of-pocket caps: $2,100 for 2026 and
 * $2,400 for 2027 (CMS CY 2027 Rate Announcement, April 6, 2026).
 */

const PATH = "/guides/medicare-prescription-payment-plan";

export const metadata: Metadata = {
  title: {
    absolute: "The Medicare Prescription Payment Plan: How It Works",
  },
  description: "The Medicare Prescription Payment Plan lets you spread Part D drug costs over the year instead of paying at the pharmacy. It doesn't lower costs. Here's who it helps.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "The Medicare Prescription Payment Plan: spreading drug costs over the year",
    description: "You can pay your Part D drug costs in monthly bills instead of all at once at the pharmacy. It doesn't save money, but it can smooth out a hard January.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "The Medicare Prescription Payment Plan: spreading drug costs over the year",
    description: "You can pay your Part D drug costs in monthly bills instead of all at once at the pharmacy. It doesn't save money, but it can smooth out a hard January.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is the Medicare Prescription Payment Plan?",
    a: "It's an optional payment option that every Medicare drug plan offers. Instead of paying for covered Part D drugs at the pharmacy, you get a monthly bill from your plan that spreads the cost across the year.",
  },
  {
    q: "Does the Medicare Prescription Payment Plan save money?",
    a: "No. Medicare says it doesn't save you money or lower your drug costs. You pay the same total. It only changes the timing by spreading what you owe into monthly bills.",
  },
  {
    q: "How do I sign up for the Medicare Prescription Payment Plan?",
    a: "Contact your Medicare drug plan or your Medicare Advantage plan and ask to join. You can opt in before the plan year starts or at any point during the year.",
  },
  {
    q: "Is there a fee to use the Medicare Prescription Payment Plan?",
    a: "There's no cost to participate. You pay what you owe for your covered drugs, billed monthly, plus your regular plan premium if your plan has one.",
  },
  {
    q: "Who benefits most from the Medicare Prescription Payment Plan?",
    a: "People with high out-of-pocket drug costs early in the year tend to benefit most, especially if they join in the first few months. People with low, steady drug costs or with Extra Help usually see little benefit.",
  },
];

export default function MedicarePrescriptionPaymentPlanPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Prescription Payment Plan", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "The Medicare Prescription Payment Plan: How It Works",
              description: "The Medicare Prescription Payment Plan lets you spread Part D drug costs over the year instead of paying at the pharmacy. It doesn't lower costs. Here's who it helps.",
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Prescription Payment Plan" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"The Medicare Prescription Payment Plan: spreading drug costs over the year"}
        lede={"If your prescriptions hit hard in the first few months of the year, there's an option that lets you spread those costs out. It doesn't lower what you owe. It changes when you pay it."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"The Medicare Prescription Payment Plan is an optional program offered by every Part D plan. Instead of paying at the pharmacy counter, you get a monthly bill from your plan for your covered drugs. It costs nothing to join and it doesn't save you money. It helps most if you have high drug costs early in the year."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"What it is"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The Medicare Prescription Payment Plan is a way to pay for your covered Part D drugs in monthly installments. It's available whether you have a stand-alone drug plan or a Medicare Advantage plan that includes drug coverage. Every plan has to offer it, and joining is your choice."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"It's a payment option, not a discount program. Medicare says it plainly: it doesn't save you money or lower your drug costs. What it does is take one big bill and turn it into smaller ones."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"How it works"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"You opt in with your plan."}</strong>{" "}
              {"Contact your drug plan or Medicare Advantage plan and ask to join the Medicare Prescription Payment Plan. You can do this before the year starts or during the year."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You pay nothing at the pharmacy for covered drugs."}</strong>{" "}
              {"When you fill a covered Part D prescription, you don't pay the pharmacy. The plan pays, and you owe the plan."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You get a monthly bill."}</strong>{" "}
              {"Your plan bills you each month for what you owe. The amount can change from month to month as you fill more prescriptions."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your plan premium is separate."}</strong>{" "}
              {"If your plan has a monthly premium, you still pay that the usual way. The payment plan bill is on top of it."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"There's no cost to participate. Ask your plan how it figures your monthly amount and what happens if a payment is late, so there are no surprises."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"How it fits with the yearly cap"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Part D has a yearly limit on what you pay out of pocket for covered drugs. For 2026 the cap is $2,100. For 2027 it's $2,400. Once you reach it, you pay nothing more for covered drugs for the rest of that year."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The cap limits how much you pay. The payment plan decides when you pay it. Someone on an expensive medication might hit a big share of the cap in January or February. With the payment plan, that same amount gets spread across the remaining months of the year."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Who it tends to help"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"People with high drug costs early in the year."}</strong>{" "}
              {"If you'd otherwise owe hundreds or more at the pharmacy in the first couple of months, spreading it out can make a real difference to your budget."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"People on a fixed monthly income."}</strong>{" "}
              {"A steadier bill can be easier to plan around than one large payment."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"People who join early in the year."}</strong>{" "}
              {"The earlier you opt in, the more months there are to spread the cost over."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"Who it may not help"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"People with low or steady drug costs."}</strong>{" "}
              {"If your prescriptions cost about the same small amount every month, there's nothing to smooth out."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"People who qualify for Extra Help."}</strong>{" "}
              {"Extra Help lowers what you pay for drugs in the first place, which is usually the better benefit. See "}
              <Link href="/guides/extra-help-medicare-savings-programs-nc" className="underline underline-offset-2">
                {"Extra Help and Medicare Savings Programs in NC"}
              </Link>
              {"."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"People joining late in the year."}</strong>{" "}
              {"With only a month or two left, there's not much to spread."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare.gov has a short question tool that helps you decide whether the payment plan is likely to help in your situation."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Things to know before you sign up"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"It only covers Part D drugs your plan covers."}</strong>{" "}
              {"If a drug isn't on your plan's list, the payment plan doesn't apply to it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You still owe the full amount."}</strong>{" "}
              {"If you leave the payment plan or change drug plans during the year, you still owe what you've been billed."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"It's tied to your plan."}</strong>{" "}
              {"If you switch to a different drug plan for next year, ask the new plan about signing up again."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You can leave it."}</strong>{" "}
              {"If it's not working for you, you can opt out and go back to paying at the pharmacy."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"A good thing to ask about each fall"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The payment plan is one piece. The bigger piece is whether your drug plan is still the right one for your prescriptions next year. Drug lists and tiers change every January. I walk through that on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {", and the "}
            <Link href="/medicare-costs-2027" className="underline underline-offset-2">
              {"Medicare costs 2027"}
            </Link>
            {" page has the official figures."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you'd like to go through your prescriptions together and see whether the payment plan makes sense for you, "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". Bring your medication list with doses."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.medicare.gov/prescription-payment-plan" rel="noopener" className="underline underline-offset-2">
              {"Medicare.gov: Medicare Prescription Payment Plan"}
            </a>
            {"; "}
            <a href="https://www.cms.gov/files/document/2027-announcement.pdf" rel="noopener" className="underline underline-offset-2">
              {"CMS: CY 2027 Rate Announcement (April 6, 2026)"}
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
            {"Not sure if the payment plan fits your prescriptions?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-prescription-payment-plan" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"See what your prescriptions cost next year"}
        body={`${"Bring your medication list with doses and the pharmacy you use. We'll look at your drug costs for next year and whether spreading them out would help."} Call or text ${AGENT.phone}.`}
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
