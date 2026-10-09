import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The ANOC campaign landing page.
 *
 * Every Medicare Advantage member gets an Annual Notice of Change letter in
 * late September / early October. Most never read it. This page offers a
 * free, plain-English translation, the no-pressure door opener for the two
 * weeks before Annual Enrollment opens. Copy from the ANOC campaign brief,
 * in Christian's voice.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Got Your ANOC Letter? Free Medicare Review | Greensboro",
  },
  description:
    "Your plan's Annual Notice of Change, translated into plain English. Free, no-pressure review with licensed local agent Christian Brinkley. Call (919) 408-6671.",
  alternates: { canonical: "/anoc" },
  openGraph: pageOpenGraph({
    title: "Got your ANOC letter? Don't just file it away.",
    description:
      "Your plan's September letter, translated into plain English, free. What's changing, what it costs you, whether your doctors are still in.",
    path: "/anoc",
  }),
};

// Short contact form, pre-tagged so inquiries from this page are attributable.
const START_HREF = "/start?topic=medicare&stage=already_on_medicare&quick=1&utm_source=site&utm_medium=anoc_page&utm_campaign=aep_2026";

export default function AnocPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment 2026", path: "/aep" },
              { name: "Your ANOC letter", path: "/anoc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Got your ANOC letter? Don't just file it away.",
              description:
                "What the Annual Notice of Change is, why most people never read it, and how to get a free plain-English translation from a licensed local agent.",
              path: "/anoc",
              datePublished: "2026-09-21",
              dateModified: "2026-10-06",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "ANOC letter review",
              description:
                "A free plain-English translation of your Medicare Advantage Annual Notice of Change with a licensed local agent in Greensboro.",
              path: "/anoc",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Annual enrollment 2026", href: "/aep" },
          { name: "Your ANOC letter" },
        ]}
        eyebrow="Medicare Advantage and Part D · The September letter"
        title="Got your ANOC letter? Don't just file it away."
        lede="Every fall, Medicare Advantage and Part D plans send an Annual Notice of Change, a letter explaining what's different next year. Bring it to me, in person or by phone, and I'll walk you through it in plain English. Free. No pressure to switch plans, no obligation to enroll in anything."
        secondaryHref={START_HREF}
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What the letter is telling you</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage and Part D plans send you an Annual Notice of Change,
              usually called an ANOC. It&apos;s a letter explaining important changes to your plan
              for next year. Your premium, your drug costs, your coverage rules: any of it can
              change on January 1, and the letter is how you find out. (If you have Original
              Medicare with a Medigap supplement, you won&apos;t get one of these. This is for
              Advantage and Part D members.)
            </p>
            <p>
              Most people never read it. Honestly, who can blame them? It&apos;s long, it&apos;s
              dense, and it doesn&apos;t tell you what to <em>do</em>.
            </p>
            <p>
              Here&apos;s what to do: bring it to me. I&apos;ll sit down with you, in person or by
              phone, and go through it in plain English. What&apos;s changing, what it could cost
              you, and what you may want to double-check. Free. No pressure to switch plans, no
              obligation to enroll in anything.
            </p>
            <p>
              One honest note: the letter points you in the right direction, but it doesn&apos;t
              answer everything by itself. Whether your specific doctor is still in network,
              whether your exact prescription is covered the same way, those answers live in your
              plan&apos;s provider directory and drug list. I&apos;ll show you where to look.
            </p>
            <p>
              If your plan still looks good, I&apos;ll tell you so. If something changed that
              matters to you, we&apos;ll talk through your options before Annual Enrollment ends
              December 7.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The 3 things worth checking</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You don&apos;t have to read all of it. Start with these three:
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "Your premium",
                b: "Is it going up, going down, or staying put for 2027?",
              },
              {
                t: "Your drugs",
                b: "Did any of your prescriptions change cost tiers? Your plan's drug list has the final word, not just the letter.",
              },
              {
                t: "Your doctors",
                b: "Is your doctor network changing? Confirm against your plan's current provider directory.",
              },
            ].map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            If all three look fine, you&apos;re probably in good shape, and I&apos;ll happily
            confirm that for free. If one of them changed and you don&apos;t like the answer, you
            have until December 7 to do something about it.{" "}
            <Link href="/aep" className="underline underline-offset-2">
              See how Annual Enrollment works
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Bring me the letter</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A photo of it works fine. We&apos;ll go through it together, in person around
            Greensboro or by phone, and you&apos;ll understand what changed and what to check
            before the December 7 deadline. The changes in the letter take effect January 1
            whether you read it or not, so sooner beats later.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={AGENT.phoneHref}
              aria-label={`Call ${AGENT.name} at ${AGENT.phone}, let's go through your letter together`}
              className="btn"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href={START_HREF}
              className="btn btn-outline"
            >
              Book my free review →
            </Link>
          </div>
          <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
            Free consultation. No obligation to enroll. No call centers, just me.
          </p>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl py-8"><p>Compare your notice with the <Link href="/medicare-changes-2027">2027 changes</Link> and the <Link href="/medicare-part-d-donut-hole-2027">Part D cap explanation</Link>. Use the <Link href="/medicare-annual-enrollment-2026-checklist">fall checklist</Link> to organize your questions.</p></div>

      <div className="measure-prose app-shell max-w-3xl py-8"><p>Before you research coverage, <Link href="/medicare-plan-checklist">make a printable sheet of your doctors, prescriptions, and priorities</Link>. Your entries stay on your device.</p></div>
      <div className="measure-prose app-shell max-w-3xl py-8"><p>Before you research coverage, <Link href="/medicare-plan-checklist">make a printable sheet of your doctors, prescriptions, and priorities</Link>. Your entries stay on your device.</p></div>
      <KitchenTableClose
        heading="That letter won't read itself"
        body="The changes take effect January 1 either way. About fifteen minutes with me now beats a surprise in January. Free, no pressure."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
