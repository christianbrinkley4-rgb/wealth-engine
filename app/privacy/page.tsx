import type { Metadata } from "next";
import Link from "next/link";

import { AGENT } from "@/lib/agent";
import { SITE_OWNER, SITE_OWNER_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Christian Brinkley handles information submitted on this site: what is collected, who processes it, how long it is kept, and how to have it deleted. Never sold.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "August 21, 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="app-shell max-w-3xl py-12 md:py-16">
        <h1 className="text-[32px] leading-tight font-bold">Privacy</h1>
        <p className="mt-2 text-[16px] text-[var(--color-ink-muted)]">Effective {EFFECTIVE_DATE}</p>
        <p className="mt-4 text-[18px] leading-[1.8] text-[var(--color-ink-muted)]">
          This site is run by {SITE_OWNER}, a licensed insurance agent in {AGENT.city},{" "}
          {AGENT.state}. It is not operated by a national lead company, and your information is
          never sold.
        </p>

        <div className="mt-10 space-y-8 text-[18px] leading-[1.8]">
          <div>
            <h2 className="text-[22px] font-bold">What I collect</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              When you use the question form or a calculator, I collect what you enter: your name,
              email, phone number if you give one, ZIP code, the answers you select, and — only if
              you choose to share it — a household income range. I also record the date and time you
              agreed to be contacted, along with your IP address and browser, because that record is
              what proves you gave permission.
            </p>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              If you arrive from an ad, I record which ad, campaign, and platform sent you. That is
              about the ad, not about you.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">Cookies and tracking</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              This site may use analytics and advertising tools, including Meta (Facebook) Pixel and
              Conversions API, Google Analytics, and the Nextdoor pixel, to measure which ads bring
              people here. Where information about a form submission is sent to Meta for measurement
              it is cryptographically hashed first, so the platform receives a scrambled value
              rather than your actual email address. You can limit this with your browser&apos;s
              privacy settings or an ad blocker, and the form will still work.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">How I use it</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              To send you the answers you asked for, to contact you personally about the topic you
              selected, and — if you decide to work with me — to help you compare and apply for
              coverage. Nothing else.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">Who else touches it</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              Running a website means a few companies process data on my behalf. They may only act
              on my instructions and may not use your information for their own purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--color-ink-muted)]">
              <li>Vercel — hosts the site</li>
              <li>Supabase — stores the submissions</li>
              <li>Resend — sends the email you receive and the alert I receive</li>
              <li>Cloudflare — checks that form submissions come from people, not bots</li>
              <li>The analytics and advertising providers named above</li>
              <li>
                If you choose to apply for coverage, the insurance carrier you select — and only
                then
              </li>
            </ul>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              I do not sell your information, and I do not pass it to other agents, call centers, or
              lead networks.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">How long I keep it</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              Inquiries that don&apos;t turn into a working relationship are deleted after two
              years. Records for clients are kept as long as insurance and tax rules require, which
              is generally longer.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">Your choices</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              You can ask me at any time to tell you what I hold about you, correct it, delete it,
              or simply stop contacting you — and I will, without asking why. Email{" "}
              <a href={`mailto:${SITE_OWNER_EMAIL}`} className="underline underline-offset-2">
                {SITE_OWNER_EMAIL}
              </a>{" "}
              or call{" "}
              <a href={AGENT.phoneHref} className="underline underline-offset-2">
                {AGENT.phone}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-bold">Children</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              This site is meant for adults making their own coverage decisions, and I don&apos;t
              knowingly collect information from anyone under 18.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-[18px] font-medium underline decoration-2 underline-offset-4"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
