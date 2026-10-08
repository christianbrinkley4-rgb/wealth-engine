import { TrafficGuideLinks } from "@/app/components/TrafficGuideLinks";
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
 * Do you have to renew Medicare every year?
 *
 * Targets "do you have to renew medicare every year" and the related "do I
 * get a new medicare card every year". Answer: no, automatic renewal, with
 * the exceptions spelled out.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Does Medicare Renew Automatically? 2026 Answer",
  },
  description:
    "Medicare renews automatically each year. No forms, no re-enrollment. Here is when you actually need to act, and why your card has no expiration date.",
  alternates: { canonical: "/guides/medicare-automatic-renewal" },
  openGraph: pageOpenGraph({
    title: "Do you have to renew Medicare every year?",
    description:
      "No. Medicare coverage renews on its own. The exceptions, the ANOC letter to watch for, and why your Medicare card never expires.",
    path: "/guides/medicare-automatic-renewal",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I have to re-enroll in Medicare every year?",
    a: "No. Once you are enrolled, your coverage renews automatically each year. You only need to act if you want to change plans, your plan ends, or you move.",
  },
  {
    q: "Do I get a new Medicare card every year?",
    a: "No. Your Original Medicare card has no expiration date. You keep the same card as long as you have Medicare. You only need a new one if it is lost, stolen, or damaged.",
  },
  {
    q: "What is the Annual Notice of Change?",
    a: "The Annual Notice of Change, or ANOC, is a letter your Medicare Advantage or Part D plan must send each September. It lists next year's premiums, copays, drug coverage, and network changes. Read it before December 7.",
  },
  {
    q: "What happens if my Medicare Advantage plan ends?",
    a: "Your plan must notify you before it ends. You get a special enrollment period to pick a new plan. If you do nothing, Medicare assigns you to Original Medicare, and you may lose drug coverage.",
  },
  {
    q: "Do Medigap plans renew automatically?",
    a: "Yes. Medigap policies are guaranteed renewable. As long as you pay your premium, the insurer cannot cancel your policy because of your health or claims.",
  },
  {
    q: "Should I review my plan even if it renews on its own?",
    a: "Yes. Automatic renewal keeps your coverage, not your costs. Premiums, drug tiers, and doctor networks change every year. A yearly review before December 7 takes an hour and can save real money.",
  },
];

export default function MedicareAutomaticRenewalPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-automatic-renewal" },
              { name: "Automatic renewal", path: "/guides/medicare-automatic-renewal" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Do You Have to Renew Medicare Every Year? No, It Renews Itself",
              description:
                "Medicare automatic renewal explained: which plans renew on their own, the exceptions, the ANOC letter, and why your card never expires.",
              path: "/guides/medicare-automatic-renewal",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
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
          { name: "Automatic renewal" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Do you have to renew Medicare every year?"
        lede="Short answer: no. Your coverage renews on its own. Here is the longer answer, including the few times you do need to act."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free yearly review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Automatic renewal means your plan continues into the next year with no paperwork from
              you. This applies to Original Medicare, Medicare Advantage, Part D, and Medigap. The
              only requirement on your side: keep paying any premiums you owe.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">How each type renews</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">Automatic renewal by Medicare coverage type</caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Coverage
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Renews on its own?
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    When you must act
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Original Medicare (A and B)
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Yes</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Only if you drop coverage or stop paying the Part B premium
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Medicare Advantage
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Yes</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    If the plan ends, you move out of its area, or you want different coverage
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Part D drug plan
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">Yes</td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    If the plan ends or you choose a different drug plan
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Medigap
                  </th>
                  <td className="text-16 py-4 pr-4 text-[var(--color-ink-muted)]">
                    Yes, guaranteed renewable
                  </td>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    If you switch insurers or stop paying the premium
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The letter that confuses everyone</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Each September, your Advantage or Part D plan sends an Annual Notice of Change. It lists
            next year's premiums, copays, drug tiers, and network changes. Many people open it,
            see official language, and assume they must re-enroll. You do not. The letter is a
            notice, not a renewal form. Read it, compare it to this year, and act only if you want
            to change something.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Your Medicare card has no expiration date</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The red, white, and blue Original Medicare card shows when your coverage started. It
            shows no end date. It stays valid as long as you have Medicare and pay your premiums.
            Replace it only if it is lost, stolen, or damaged. You can print a copy from your
            MyMedicare.gov account or call 1-800-MEDICARE.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Renewal is not the same as review</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Automatic renewal protects your coverage. It does not protect your wallet. Plans change
            premiums, move drugs to higher tiers, and drop doctors every year. A one-hour review
            each fall, before December 7, is how you catch it.{" "}
            <Link href="/anoc" className="underline underline-offset-2">
              Here is how to read your Annual Notice of Change
            </Link>
            . Missed the window?{" "}
            <Link
              href="/guides/missed-medicare-enrollment"
              className="underline underline-offset-2"
            >
              Here is what happens next
            </Link>
            .
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
            Want a second set of eyes on your renewal? Call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-automatic-renewal" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Get your free yearly plan review"
        body={`Bring your Annual Notice of Change and your prescription list. We will check whether your renewing plan still fits, before December 7. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    <TrafficGuideLinks slugs={["medicare-plan-not-renewing-triad"]} />
    </main>
  );
}
