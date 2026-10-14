import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Scam Alert page.
 *
 * Consumer protection content tied to the viral TikTok content about the
 * $90 check scam. Everything here matches published FTC and Medicare
 * guidance. Updated during AEP, when these scams spike.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Scam Alert: The Calls and Tricks Targeting Seniors",
  },
  description:
    "Medicare scams spike during open enrollment. Learn what Medicare will never do, how the $90 check scam works, and where to report fraud. Free local help in Greensboro.",
  alternates: { canonical: "/medicare-scam-alert" },
  openGraph: pageOpenGraph({
    title: "Medicare scam alert for Greensboro, Winston-Salem & High Point",
    description:
      "The $90 check scam calls, fake Medicare representatives, and what Medicare will never do. What to do if you get the call, and where to report it.",
    path: "/medicare-scam-alert",
  }),
  twitter: pageTwitter({
    title: "Medicare scam alert for Greensboro, Winston-Salem & High Point",
    description:
      "The $90 check scam calls, fake Medicare representatives, and what Medicare will never do. What to do if you get the call, and where to report it.",
    path: "/medicare-scam-alert",
  }),
};

const NEVER_DO = [
  {
    rule: "Medicare will never call you out of the blue about a payment.",
    detail:
      "If you got a real government payment (like the 2026 Medicare payment), it arrives automatically. Nobody needs to call you to release it, and nobody needs your bank info to send it.",
  },
  {
    rule: "Medicare will never ask for your bank account or Social Security number over the phone.",
    detail:
      "Treat any unexpected request for bank details, account passwords, or a photo of your ID as a reason to end the call.",
  },
  {
    rule: "Medicare will never charge you for a new card, and there is no new plastic microchip card.",
    detail:
      "Your Medicare card is paper, and it is free. Any call, text, or mailer claiming you need to pay for or activate a new card is a scam.",
  },
  {
    rule: "Medicare will never visit your home uninvited or pressure you to decide on the spot.",
    detail:
      "Plans also cannot market next-year coverage before October 1. An unsolicited pitch before then is a red flag.",
  },
] as const;

const SCAM_SIGNS = [
  "The caller knows your name and address. That does not make them legitimate. Judge the caller by what they are asking you to do, not by what they already seem to know.",
  "They ask you to verify your Medicare number. That number is the prize. Scammers use it to submit fraudulent claims for services you never received.",
  "They create urgency: your benefits will be cancelled, your card will be deactivated, the payment expires today. Real Medicare does not work that way.",
  "The caller ID looks official. Caller ID can be faked. What matters is whether the contact was unexpected and whether they are pressuring you.",
] as const;

const STEPS = [
  {
    name: "Hang up",
    text: "You do not owe an unfamiliar caller a conversation. Hang up. It is the fastest protection you have.",
  },
  {
    name: "Do not call back or click anything",
    text: "Do not return the call, reply to the text, or click links in emails about the payment. If you want to check something, look up the number yourself.",
  },
  {
    name: "Check through a channel you trust",
    text: "Call 1-800-MEDICARE (1-800-633-4227) yourself to ask about your coverage or any payment. Find the number on medicare.gov, not in the message you received.",
  },
  {
    name: "Report it",
    text: "Report the call at ReportFraud.ftc.gov, and call 1-800-MEDICARE to report suspected fraud. If you already gave out your Medicare number, call 1-800-MEDICARE right away and ask about getting a new one.",
  },
  {
    name: "Check your Medicare statements",
    text: "Look at your monthly Medicare statements. Do the visits and services match your records? If something shows up that you did not get, tell your doctor or health plan, and contact the Senior Medicare Patrol at 1-877-808-2468 for help documenting it.",
  },
] as const;

const FAQ = [
  {
    q: "I got a call about a $90 Medicare payment. Is it real?",
    a: "A $90 Medicare payment was real in 2026, but here is the key: it arrives automatically. Medicare never calls you about it, never asks for your bank info to release it, and never charges a fee to process it. Any call, text, or email asking for your details in connection with that payment is a scam. Hang up and check your payment status by calling 1-800-MEDICARE yourself.",
  },
  {
    q: "Does Medicare ever call me?",
    a: "Almost never first. Medicare, Social Security, and CMS do not initiate contact by phone call, text, or email to discuss your benefits, your card, or your premium. The exceptions are narrow: your own plan may call if you are already a member, or 1-800-MEDICARE may return a call you asked for. If you did not start the conversation, treat it with suspicion.",
  },
  {
    q: "The caller knew my name and address. How?",
    a: "Personal details are easy to find or buy. Scammers use them to sound official, then ask for the one thing they do not have: your Medicare number, bank details, or Social Security number. Judge the caller by what they are asking you to do, not by what they already know.",
  },
  {
    q: "What should I do if I already gave out my information?",
    a: "Call 1-800-MEDICARE (1-800-633-4227) right away and tell them what happened. Ask about getting a new Medicare number. Review your Medicare statements for charges you do not recognize, and report the incident at ReportFraud.ftc.gov.",
  },
  {
    q: "Where can I get free help checking whether something is legitimate?",
    a: "Call 1-800-MEDICARE, or talk to a free NC SHIIP counselor at 855-408-1212. You can also ask me. I am a licensed local agent, and I would rather you call me with a suspicious letter than fall for a scam. My consultations are free: (919) 408-6671.",
  },
] as const;

export default function MedicareScamAlertPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare scam alert", path: "/medicare-scam-alert" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Medicare scam alert: the calls and tricks targeting seniors",
              description:
                "What Medicare will never do, how the $90 check scam works, what to do if you get the call, and where to report fraud.",
              path: "/medicare-scam-alert",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare scam alert" }]}
        eyebrow="Greensboro, Winston-Salem & High Point · Updated for open enrollment"
        title="If Medicare calls you about money, it is not Medicare"
        lede="Every year during open enrollment, scammers call seniors pretending to be from Medicare. This year they are calling about a real $90 payment and using it as bait to steal bank and Medicare information. Here is how the scam works, what Medicare will never do, and what to do if you get the call."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Talk to a real local agent →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four things Medicare will never do</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Memorize these. They settle almost every suspicious call on their own.
          </p>

          <dl className="mt-8 flex flex-col gap-5">
            {NEVER_DO.map((item, index) => (
              <div key={item.rule} className="flex gap-4 border-t border-gray-300 pt-5">
                <span className="text-15 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <dt className="text-19 font-semibold">{item.rule}</dt>
                  <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.detail}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to spot the scam</h2>
          <ul className="text-18 mt-6 flex list-disc flex-col gap-3 pl-6 leading-relaxed">
            {SCAM_SIGNS.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
          <p className="text-18 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Open enrollment (October 15 to December 7) is the busiest stretch of the year for this
            kind of fraud. If something arrives during this window and asks for your information,
            slow down.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What to do if you get the call</h2>
          <ol className="text-18 mt-6 flex flex-col gap-5 leading-relaxed">
            {STEPS.map((step, index) => (
              <li key={step.name}>
                <strong>
                  {index + 1}. {step.name}.
                </strong>{" "}
                {step.text}
              </li>
            ))}
          </ol>
          <GuideTownLinks heading="Personal Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get about Medicare scams</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Not sure about a call or letter you got?"
        body="Bring it to me before you respond to it. I would rather spend ten minutes looking at something suspicious with you than have you learn the hard way. Free consultation, no obligation."
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          For free, unbiased counseling with no sales angle, see{" "}
          <Link href="/medicare-help-directory" className="underline underline-offset-2">
            the free Medicare help directory
          </Link>
          . For what is changing this year, read{" "}
          <Link href="/medicare-changes-2027" className="underline underline-offset-2">
            Medicare changes for 2027
          </Link>
          .
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
      <RelatedMedicareGuides />
    </main>
  );
}
