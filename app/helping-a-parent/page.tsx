import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Written for the adult child, not the person turning 65.
 *
 * A large share of Medicare decisions are actually researched by a son or
 * daughter in their forties or fifties — and every other page on this site
 * addresses the beneficiary directly, which leaves that person reading over
 * someone else’s shoulder. They’re also the audience paid social can still
 * reach properly, since the ad rules that strip age targeting on the 65-plus
 * audience don’t hurt nearly as much here.
 */

export const metadata: Metadata = {
  title: { absolute: "Helping a Parent with Medicare — Greensboro, NC" },
  description:
    "If you are the one researching for Mom or Dad: the deadlines that matter, what you are allowed to do on their behalf, and what to ask. Greensboro, NC.",
  alternates: { canonical: "/helping-a-parent" },
  openGraph: pageOpenGraph({
    title: "Helping a parent with Medicare",
    description:
      "The deadlines, the paperwork you need before Social Security will talk to you, and what to ask. No cost.",
    path: "/helping-a-parent",
  }),
};

const START_HREF = "/start?topic=medicare&stage=helping_spouse_or_parent&ask=parent";

const FIRST_STEPS = [
  {
    title: "Get authorization before you need it",
    body: "Ask your parent how they would like you to help, and check what authorization Medicare, Social Security, or their insurer needs before discussing their personal information. Different organizations may use different forms.",
  },
  {
    title: "Find out the exact month",
    body: "Their sign-up window runs seven months: the three months before the month they turn 65, that month, and the three months after. Everything else on this page hangs off that date, so pin it down first.",
  },
  {
    title: "Ask whether they’re still working",
    body: "If your parent — or their spouse — still has coverage through a job, whether they can safely delay Part B depends on how many people that employer employs. Twenty or more usually means they can wait. Fewer than twenty usually means Medicare pays first whether or not they’ve enrolled, and claims can fall through the gap.",
  },
  {
    title: "Know which window closes quietly",
    body: "There’s a separate six-month window for supplemental coverage that opens once they’re 65 and on Part B. Inside it, their health history can’t be used to deny them or charge more. Outside it, in most states, it can — and that matters most for exactly the parents whose health is already the reason you’re researching this.",
  },
] as const;

const FAQ = [
  {
    q: "Can I enroll my parent myself?",
    a: "You can help research options, organize paperwork, and join a conversation with your parent’s permission. Taking action on their behalf may require separate legal authority. Confirm what the relevant agency or plan requires.",
  },
  {
    q: "My parent is overwhelmed and doesn’t want to talk about it. What do I do?",
    a: "Start by asking what concerns them most. You can work through one question at a time, beginning with any upcoming dates. If they would like help, we can have a conversation together at their pace.",
  },
  {
    q: "They live in the Triad but I don’t. Can you still help?",
    a: "Yes — coverage depends on where they live, not where you do. I’m happy to have you both on the call, which is usually the easiest way to do this anyway.",
  },
  {
    q: "What does this cost?",
    a: COMPENSATION_DISCLOSURE,
  },
] as const;

export default function HelpingAParentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Helping a parent", path: "/helping-a-parent" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Helping a parent with Medicare",
              description:
                "Authorization, the seven-month sign-up window, and the Medigap deadline an adult child needs to pin down first.",
              path: "/helping-a-parent",
              datePublished: "2026-08-31",
              dateModified: "2026-09-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to help a parent with Medicare",
              description:
                "Four things to settle first: authorization, the exact month they turn 65, whether they can delay Part B, and the Medigap window that closes quietly.",
              path: "/helping-a-parent",
              steps: FIRST_STEPS.map((step) => ({ name: step.title, text: step.body })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Helping a parent" }]}
        eyebrow={`For the son or daughter · ${AGENT.city}`}
        title="Helping a parent with Medicare? You can work through it together."
        lede="If you’re helping a parent understand Medicare, there can be a lot to sort through. This guide covers enrollment dates, current coverage, and ways to support them while keeping their wishes at the center of the conversation."
        secondaryHref={START_HREF}
        secondaryLabel="Tell me their situation →"
        note="You’re welcome to join your parent for a no-cost consultation, in person or by phone."
      />

      <section className="bg-white py-14 md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four things to settle first</h2>
          <ol className="mt-8 flex flex-col gap-8">
            {FIRST_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{step.title}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] py-14 text-[var(--color-paper)] md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-26 font-semibold">Keep their enrollment dates somewhere handy </h2>
          <p className="text-18 mt-4 leading-relaxed" style={{ color: "rgba(245,240,232,0.9)" }}>
            Our Medicare date tool can help you find their estimated enrollment window and save it
            to a calendar. You can use it without sharing a name, email, or phone number.{" "}
          </p>
          <Link
            href="/turning-65#enrollment-dates"
            className="text-18 mt-7 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-paper)] px-7 font-semibold text-[var(--color-navy)]"
          >
            Find their Medicare dates →
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get from adult children</h2>
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

      <section className="bg-[var(--color-paper)] py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <GuideTownLinks heading="Medicare help near your parent" />
        </div>
      </section>

      <KitchenTableClose
        heading="Let’s talk through your family’s questions."
        body="We can arrange a conversation with your parent and anyone they would like to include. No cost and no obligation."
        href={START_HREF}
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
