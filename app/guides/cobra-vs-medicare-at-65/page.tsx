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
 * COBRA vs. Medicare at 65: why COBRA can cost you.
 *
 * Targets "cobra vs medicare at 65". High booking-likelihood topic for people
 * retiring late. No invented deadlines: the 8-month SEP and late-penalty rules
 * are federal and verifiable.
 */

export const metadata: Metadata = {
  title: {
    absolute: "COBRA vs. Medicare at 65: Why COBRA Can Cost You",
  },
  description:
    "Turning 65 with COBRA coverage? Keeping COBRA instead of enrolling in Medicare can trigger late penalties and coverage gaps. Here is how the rules actually work.",
  alternates: { canonical: "/guides/cobra-vs-medicare-at-65" },
  openGraph: pageOpenGraph({
    title: "COBRA vs. Medicare at 65: why COBRA can cost you",
    description:
      "COBRA does not count as creditable coverage for Medicare. Delaying Part B while on COBRA can mean penalties and months without coverage.",
    path: "/guides/cobra-vs-medicare-at-65",
  }),
  twitter: pageTwitter({
    title: "COBRA vs. Medicare at 65: why COBRA can cost you",
    description:
      "COBRA does not count as creditable coverage for Medicare. Delaying Part B while on COBRA can mean penalties and months without coverage.",
    path: "/guides/cobra-vs-medicare-at-65",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does COBRA count as creditable coverage for Medicare Part B?",
    a: "No. COBRA is not considered creditable coverage for delaying Medicare Part B. If you keep COBRA past 65 without enrolling in Part B, you can face a late enrollment penalty and a gap before Part B starts.",
  },
  {
    q: "What happens if I stay on COBRA after turning 65 instead of taking Medicare?",
    a: "You risk a 10% Part B late penalty for every year you were eligible but not enrolled, added to your premium permanently. You may also have to wait for the next enrollment window, leaving months without Part B coverage.",
  },
  {
    q: "Can I have COBRA and Medicare at the same time?",
    a: "Yes. If you already have COBRA when you become eligible for Medicare, you can keep both, and Medicare becomes the primary payer. But you cannot use COBRA to delay Part B without penalty.",
  },
  {
    q: "What is the 8-month special enrollment period after employment ends?",
    a: "When your job or your employer coverage ends, you get an 8-month special enrollment period to sign up for Part B without penalty. This applies to active employer coverage, not COBRA. The clock starts when employment ends, not when COBRA runs out.",
  },
  {
    q: "Is COBRA ever cheaper than Medicare at 65?",
    a: "Almost never. COBRA premiums are typically the full cost of the employer plan plus an administrative fee, often several hundred dollars a month. Medicare Part B plus a supplement or Advantage plan usually costs less for comparable coverage.",
  },
];

export default function CobraVsMedicareAt65Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/cobra-vs-medicare-at-65" },
              { name: "COBRA vs. Medicare", path: "/guides/cobra-vs-medicare-at-65" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "COBRA vs. Medicare at 65: Why COBRA Can Cost You",
              description:
                "Why COBRA does not protect you from Medicare late penalties, the 8-month rule that trips people up, and what to do when you turn 65 with COBRA.",
              path: "/guides/cobra-vs-medicare-at-65",
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
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "COBRA vs. Medicare" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="COBRA vs. Medicare at 65: why COBRA can cost you"
        lede="COBRA feels like the safe choice when you turn 65. Keep the plan you know. But COBRA does not protect you from Medicare's late penalties, and the mistake can follow you for life."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              COBRA is not creditable coverage for Medicare Part B. If you turn 65, keep COBRA,
              and skip Part B, you can owe a permanent late penalty and face months with no Part
              B coverage when COBRA ends. Enroll in Medicare on time. COBRA is almost never the
              cheaper or safer path at 65.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The mistake almost everyone makes</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Here is how it usually goes. You retire or leave a job at 64 or 65. Your employer
            offers COBRA, which lets you keep your workplace health plan for up to 18 months by
            paying the full premium yourself. It feels like the path of least resistance. Same
            doctors, same card, no new paperwork. So you take COBRA and figure you will sort out
            Medicare later.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The problem is that &ldquo;later&rdquo; has a price. Federal rules do not treat COBRA as active
            employer coverage for Medicare purposes. The special protections that let working
            people delay Part B past 65 do not apply to COBRA. Every month you are on COBRA past
            65 without Part B is a month the late enrollment penalty can grow.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 8-month rule that trips people up</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            When your employment ends, you get an 8-month special enrollment period to sign up
            for Medicare Part B without penalty. That sounds generous. The trap is when the clock
            starts. It starts when your employment ends, not when your COBRA runs out.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Say you leave your job in January and take 18 months of COBRA. Your 8-month Part B
            enrollment window closes in September, while you are still on COBRA and feeling
            covered. When COBRA ends the following July, you discover you missed your window.
            Now you wait for the next general enrollment period, and the late penalty has been
            building the whole time. People end up with a permanent 10% penalty per year of
            delay, plus months of no Part B coverage exactly when they need it.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What COBRA actually costs vs. Medicare</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            COBRA is expensive by design. You pay the entire premium your employer used to split
            with you, plus up to a 2% administrative fee. For many people that means several
            hundred dollars a month for one person. It is the same coverage you had while
            working, at the full unsubsidized price.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Part B has a standard monthly premium set by the government each year. Add a
            Medigap plan or a Medicare Advantage plan, plus Part D for prescriptions, and most
            people land well below what COBRA costs, with coverage that is at least as good.
            There are exceptions, especially if you take very expensive brand-name drugs, but the
            math favors Medicare for the large majority of 65-year-olds.
          </p>

          <h2 className="text-28 mt-12 font-semibold">When COBRA and Medicare overlap</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You are allowed to have both. If you already have COBRA when you enroll in Medicare,
            you can keep COBRA as secondary coverage. Medicare pays first, COBRA pays second. In
            practice, paying two premiums rarely makes sense, because Medicare plus a supplement
            usually covers what COBRA would have covered as the secondary payer.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            One warning in the other direction: if you are on COBRA and enroll in Medicare Part
            A, your COBRA coverage for the services Part A covers can end. Check with your COBRA
            administrator before enrolling, so you understand exactly what continues and what
            stops.{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              Here is the full turning-65 enrollment checklist
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">What to do if you are 65 and on COBRA now</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Check your 8-month window.</strong>{" "}
              Count 8 months from when your employment ended, not when COBRA started. If the
              window is still open, enroll in Part B now.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Do not wait for COBRA to expire.</strong>{" "}
              COBRA ending does not reopen your Part B enrollment window. Enroll while you still
              can.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Compare the real costs.</strong> Price
              out Medicare Part B plus a supplement or Advantage plan against your COBRA premium.
              Include your prescriptions.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Talk to someone before you decide.</strong>{" "}
              The penalty rules have edge cases. A free review now beats a permanent penalty
              later.
            </li>
          </ul>
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
            Turning 65 with COBRA and not sure what to do? Call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="cobra-vs-medicare-at-65" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Do not let COBRA cost you a penalty"
        body={`Tell me your timeline: when employment ended, when COBRA started. We will figure out your enrollment window and your cheapest path forward. Call or text ${AGENT.phone}.`}
        href="/schedule?topic=medicare"
        label="Book a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
