import type { Metadata } from "next";
import Link from "next/link";

import { AGENT } from "@/lib/agent";
import { measurementProviders } from "@/lib/analytics";
import { SITE_OWNER, SITE_OWNER_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Christian Brinkley handles consultation requests, booking details, contact preferences, and information processed by website service providers. Your inquiry is never sold.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "September 10, 2026";

function listProviders(providers: string[]): string {
  if (providers.length === 1) return providers[0];
  return `${providers.slice(0, -1).join(", ")} and ${providers[providers.length - 1]}`;
}

export default function PrivacyPage() {
  const providers = measurementProviders(process.env as Record<string, string | undefined>);
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="measure-prose app-shell max-w-3xl py-12 md:py-16">
        <h1 className="text-32 leading-tight font-bold">Privacy</h1>
        <p className="text-16 mt-2 text-[var(--color-ink-muted)]">Effective {EFFECTIVE_DATE}</p>
        <p className="text-18 mt-4 leading-[1.8] text-[var(--color-ink-muted)]">
          This site is run by {SITE_OWNER}, a licensed insurance agent in {AGENT.city},{" "}
          {AGENT.state}. Your inquiry comes to me. I do not sell inquiries or distribute your
          contact information to other agents, call centers, or lead networks for their marketing.
        </p>

        <div className="text-18 mt-10 space-y-8 leading-[1.8]">
          <div>
            <h2 className="text-22 font-bold">What I collect</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              When you submit a consultation request or ask to receive calculator results, the
              information you send can include your name, email, optional phone number, ZIP code,
              answers, meeting preferences, and any details you choose to add. A household income
              range is optional. I keep a record of your contact choices, including the wording of
              your permission, its date and time, and technical information such as your IP address
              and browser. Simply reading a guide or using the Medicare date tool does not ask you
              to provide contact details.
            </p>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              If you arrive through an ad, mailer, text, or email link, I may record the campaign
              that brought you here. When you submit an inquiry, that information is saved with your
              request. A clear email or phone match may link the request to an existing contact
              record. Having a contact record does not by itself mean you agreed to follow-up.
            </p>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              If you use the booking calendar, it processes the contact details and appointment
              information you enter, such as the time, meeting method, and any later cancellation or
              rescheduling. Please keep Social Security numbers, Medicare numbers, payment details,
              and medical records out of inquiry forms and booking notes.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Website storage and advertising measurement</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              The question form can save your progress in this browser so you can return to it. Your
              name, email, phone number, and free-text notes are not saved with that progress. You
              can clear saved site data in your browser settings. Website and booking providers may
              use cookies or similar technology to operate their services and protect against abuse.
            </p>
            {providers.length > 0 ? (
              <>
                <p className="mt-2 text-[var(--color-ink-muted)]">
                  This site uses {listProviders(providers)} to count how many people reach the site,
                  call me, or send a request, so I know which advertising is worth paying for. These
                  services set cookies in your browser.
                </p>
                <p className="mt-2 text-[var(--color-ink-muted)]">
                  What they receive is limited on purpose: the name of the action (a call, a
                  finished date lookup, a submitted request) and the page it happened on. Your
                  answers, your dates, your income, your ZIP code, your email, and your phone number
                  are never sent to them, in any form. Personalized advertising signals are turned
                  off, so your visit is not used to build an advertising profile of you. You can
                  block these with your browser settings or an ad blocker, and the site works the
                  same either way.
                </p>
              </>
            ) : (
              <p className="mt-2 text-[var(--color-ink-muted)]">
                Advertising and analytics measurement is not enabled. Campaign labels may still be
                saved with a request to help me understand how visitors found the site. If
                measurement is introduced, this notice explains the providers, the information
                shared, and your choices before those tools are enabled.
              </p>
            )}
          </div>

          <div>
            <h2 className="text-22 font-bold">How I use it</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              I use your information to respond to your questions, prepare for and arrange our
              conversation, keep track of your contact preferences, and manage any appointment you
              make. When connected, email and booking services can send messages related to your
              request or appointment. I also use records to protect the site, resolve problems, and
              understand which sources lead to useful consultations. If you decide to work with me,
              additional information may be needed to compare, apply for, or service coverage.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Services that help me respond</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              Your inquiry is for me, but the companies that host the site, store requests, deliver
              email, and arrange appointments process information needed for those services. Their
              privacy notices and our service arrangements explain their handling of that
              information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--color-ink-muted)]">
              <li>
                <a href="https://www.netlify.com/privacy/" className="underline underline-offset-2">
                  Netlify
                </a>{" "}
                — hosts the new site and processes web requests and security information. The
                earlier vercel.app version is hosted by Vercel.
              </li>
              <li>
                <a href="https://supabase.com/privacy" className="underline underline-offset-2">
                  Supabase
                </a>{" "}
                — stores inquiries, contact permissions, and follow-up records in my contact
                management system.
              </li>
              <li>
                <a href="https://cal.com/privacy" className="underline underline-offset-2">
                  Cal.com
                </a>{" "}
                — when you use the booking calendar, processes appointment details and contact
                information. Connected calendar services, including Microsoft Outlook, may receive
                appointment details and invitations to check availability and keep the meeting on
                our calendars. A video meeting provider may also process information when you choose
                a video appointment.
              </li>
              <li>
                <a
                  href="https://resend.com/legal/privacy-policy"
                  className="underline underline-offset-2"
                >
                  Resend
                </a>{" "}
                — when email delivery is connected, processes recipients, message content, and
                delivery information for request confirmations and notices that help me respond.
              </li>
              <li>
                Cloudflare Turnstile — when bot protection is turned on, checks that form
                submissions come from people, not bots
              </li>
              <li>
                Insurance companies and related service providers — if you ask me to help obtain
                quotes, apply for coverage, or service a policy, the information needed for that
                work may be shared as part of the process explained to you.
              </li>
            </ul>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              I do not sell your information. If you would like an introduction to a financial
              advisor, we discuss it first; submitting this form does not automatically send your
              inquiry to an advisor. Information may also be disclosed where required by law or
              needed to address fraud, abuse, or a security issue.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">How long I keep it</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              I keep inquiry records for follow-up, to document your contact choices, and to meet
              applicable recordkeeping requirements. You can ask me about retention or request
              deletion using the contact details below. Some records may need to be retained to meet
              those requirements or honor a request not to contact you.
            </p>
          </div>

          <div>
            <h2 className="text-22 font-bold">Your choices</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              You can ask what information I hold about you, request a correction or deletion, or
              tell me to stop contacting you. I’ll honor your contact preference and explain if a
              record must be retained for the reasons described above. Email{" "}
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
            <h2 className="text-22 font-bold">Children</h2>
            <p className="mt-2 text-[var(--color-ink-muted)]">
              This site is meant for adults making their own coverage decisions, and I don’t
              knowingly collect information from anyone under 18.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="text-18 mt-12 inline-block font-medium underline decoration-2 underline-offset-4"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
