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
 * Novant Health doctors and Medicare: how to check.
 *
 * Sibling of /guides/cone-health-medicare-doctors (Search Console position
 * 5.4, Oct 2026). Targets Winston-Salem, Kernersville, Clemmons and
 * Thomasville searches like "does novant take medicare advantage".
 *
 * Facts (verified Oct 27, 2026): hospitals from the Wikipedia list of NC
 * hospitals plus novanthealth.org (Clemmons); accepted-plan list lives on
 * novanthealth.org. No plan or carrier names and no network claims.
 */

const PATH = "/guides/novant-health-medicare-doctors";
const TITLE = "Does Novant Health Take Your Medicare Plan? How to Check for 2027";
const DESCRIPTION =
  "Seeing Novant Health doctors in Winston-Salem, Kernersville, Clemmons or Thomasville? Medicare Advantage networks change every fall. How to check before you enroll for 2027.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Does Novant Health take your Medicare plan?",
    description:
      "Networks change every fall. How to check your Novant Health doctors against next year's plan before you lock in.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Does Novant Health take your Medicare plan?",
    description:
      "Networks change every fall. How to check your Novant Health doctors against next year's plan before you lock in.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does Novant Health accept Medicare?",
    a: "Original Medicare works at any doctor or hospital that accepts Medicare, with no network to check. Medicare Advantage plans each have their own network, so whether a Novant Health doctor is covered depends on the specific plan and the plan year.",
  },
  {
    q: "How do I check if my Novant Health doctor is in my Medicare Advantage plan for 2027?",
    a: "Look the doctor up by name in the plan's 2027 provider directory, check the accepted insurance plans list on Novant Health's website, then call the doctor's office and ask if they're in network for that exact plan in 2027.",
  },
  {
    q: "Do I need to check every Novant doctor I see, or just my primary care doctor?",
    a: "Every one you see regularly. A plan can include a primary care practice and leave out a specialist, or include the hospital and not a specific surgeon. Check each doctor by name.",
  },
  {
    q: "What if Novant leaves my plan's network during the year?",
    a: "Call your plan to confirm the change, then ask whether you qualify for a special enrollment period or continuity-of-care coverage, especially if you're in the middle of treatment. Neither is guaranteed, but both are worth asking about.",
  },
  {
    q: "Will a Medigap plan let me keep my Novant Health doctors?",
    a: "Medigap plans follow Original Medicare's rules, so there's no network. Any doctor who accepts Medicare works. You pay a higher monthly premium in exchange for not having to check a network every fall.",
  },
];

export default function NovantHealthMedicareDoctorsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Novant Health and Medicare", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: TITLE,
              description:
                "How to check whether your Novant Health doctors are in your Medicare plan's network for 2027, and the questions to ask before Annual Enrollment ends.",
              path: PATH,
              datePublished: "2026-10-27",
              dateModified: "2026-10-27",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Novant Health and Medicare" }]}
        eyebrow="Guide · Updated October 27, 2026"
        title="Does Novant Health take your Medicare plan?"
        lede="If your doctors are with Novant Health, check them against next year's plan before you lock in. Here's how."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              On Original Medicare, any Novant Health doctor who accepts Medicare is covered. On
              Medicare Advantage, it depends on your plan&apos;s network for the year, and networks
              can change every fall. Check the plan&apos;s 2027 directory, check Novant
              Health&apos;s accepted-insurance list, then call your doctor&apos;s office. Annual
              Enrollment ends December 7.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Where Novant Health is in the Triad</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            In the Triad, Novant Health runs Forsyth Medical Center and Medical Park Hospital in
            Winston-Salem, Kernersville Medical Center, Clemmons Medical Center and Thomasville
            Medical Center, along with Rowan Medical Center in Salisbury and practices across
            Forsyth and Davidson counties. If you live in Winston-Salem, Kernersville, Clemmons or
            Thomasville, there&apos;s a good chance at least one of your doctors is with Novant.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage plans each negotiate with health systems on their own. One plan can
            include Novant and leave out another system, or include a hospital but not every
            specialist. So the question isn&apos;t &ldquo;does Novant take Medicare Advantage,&rdquo;
            it&apos;s &ldquo;does Novant take this plan, for these doctors, in 2027.&rdquo;
          </p>

          <h2 className="text-28 mt-12 font-semibold">How to check, in three steps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">1. The plan&apos;s 2027 provider directory.</strong>{" "}
            Look up each doctor by name. Use the directory for the year you&apos;re enrolling in,
            which during Annual Enrollment is 2027. Check every specialist you see regularly, not
            just your primary care doctor.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">2. Novant Health&apos;s own list.</strong>{" "}
            Novant Health posts the insurance plans it accepts on its website, under billing and
            insurance. If your plan isn&apos;t on it, look closer before you enroll.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">3. A call to the doctor&apos;s office.</strong>{" "}
            Give them the exact plan name and ask if they&apos;ll be in network for it in 2027. The
            billing staff answers this all fall. When all three agree, you can enroll with
            confidence.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Questions worth asking before you enroll</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Are my primary care doctor and every specialist I see in network for 2027?</li>
            <li>Which hospitals does this plan cover for a planned surgery, not just the emergency room?</li>
            <li>Do I need a referral to see a specialist, and does it have to stay in network?</li>
            <li>Does this plan cover any out-of-network care, and at what cost?</li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">Emergencies are different</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Every Medicare Advantage plan has to cover emergency care, in or out of network. The
            network question matters for planned care: checkups, specialists, scans and scheduled
            surgery.
          </p>

          <h2 className="text-28 mt-12 font-semibold">If keeping your doctors is the whole point</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Original Medicare with a Medigap plan has no network. Any doctor who accepts Medicare
            works, Novant or otherwise. The tradeoff is a higher monthly premium.{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Here&apos;s the Advantage vs. Medigap comparison in plain English
            </Link>
            . Also seeing Cone Health or Wake Forest Baptist doctors?{" "}
            <Link href="/guides/cone-health-medicare-doctors" className="underline underline-offset-2">
              Cone Health
            </Link>{" "}
            and{" "}
            <Link
              href="/guides/atrium-wake-forest-baptist-medicare-doctors"
              className="underline underline-offset-2"
            >
              Atrium Health Wake Forest Baptist
            </Link>{" "}
            have their own guides.
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
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Want help checking your doctors against next year&apos;s plans? Call or text Christian
            Brinkley at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="novant-health-medicare-doctors" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Keep your doctors, pick your plan with confidence"
        body={`Tell me which doctors you see. I'll check them against next year's plans with you before Annual Enrollment ends. Call or text ${AGENT.phone}.`}
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
