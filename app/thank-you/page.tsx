"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function isWizardSource(source: string) {
  const s = source.toLowerCase();
  return s.includes("wizard") || s === "pdf_request";
}

function ThankYouInner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const emailRaw = searchParams.get("email") ?? "";
  let emailDisplay = "";
  try {
    emailDisplay = emailRaw ? decodeURIComponent(emailRaw) : "";
  } catch {
    emailDisplay = emailRaw;
  }

  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const [smsError, setSmsError] = useState<string | null>(null);

  const showWizardLayout = isWizardSource(source);

  if (!showWizardLayout) {
    return (
      <div className="flex min-h-[calc(100vh-2.5rem)] items-center justify-center bg-[var(--color-paper)] px-4 py-16">
        <div className="text-center">
          <CheckCircle2 className="mx-auto size-14 text-[#16A34A]" aria-hidden />
          <h1 className="mt-4 text-[32px] font-bold text-[var(--color-navy)]">
            ✓ You&apos;re on the list.
          </h1>
          <p className="mt-2 max-w-md text-[18px] text-[var(--color-muted)]">
            Watch for the free 2026 Triad Retirement Brief in your inbox.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-[16px] text-[var(--color-navy)] underline underline-offset-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  async function handleSmsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSmsError(null);
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setSmsError("Please enter a valid phone number.");
      return;
    }
    if (!emailDisplay.trim()) {
      setSmsError("We need your email from the link you used to finish SMS signup.");
      return;
    }
    setSmsLoading(true);
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailDisplay.trim(),
          source: "sms_optin",
          phone_number: phone,
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setSmsError(data.error ?? "Something went wrong. Try again?");
        setSmsLoading(false);
        return;
      }
      setSmsSuccess(true);
    } catch {
      setSmsError("Something went wrong. Try again?");
    } finally {
      setSmsLoading(false);
    }
  }

  const inboxCopy = emailDisplay
    ? `Check ${emailDisplay} in the next few minutes. Check spam if it doesn't arrive.`
    : "Check your inbox in the next few minutes. Check spam if it doesn't arrive.";

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <section className="bg-[var(--color-paper)] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle2 className="mx-auto size-16 text-[#16A34A]" aria-hidden />
          <h1 className="mt-6 text-[32px] font-bold text-[var(--color-navy)]">
            ✓ Your report is on its way.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[18px] text-[var(--color-muted)]">{inboxCopy}</p>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white px-6 py-14">
        <div className="mx-auto max-w-[640px]">
          <p className="text-center text-[14px] font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
            ONE MORE THING
          </p>
          <h2 className="mt-3 text-center text-[28px] font-bold text-[var(--color-navy)]">
            Want to go through your numbers together?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.8] text-[var(--color-muted)]">
            I personally review every report before it goes out. If you want to talk through your
            specific situation, I have a few free 20-minute Zoom slots open this week. Triad
            residents only. No sales pitch.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <Button
              asChild
              className="h-14 w-full max-w-md bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
            >
              <a
                href="https://calendly.com/christianbrinkley4/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book My Free Call →
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white px-6 py-14">
        <div className="mx-auto max-w-[480px]">
          <p className="mb-8 text-center text-[14px] tracking-wide text-[var(--color-muted)]">
            — or —
          </p>
          <h3 className="text-center text-[22px] font-semibold text-[var(--color-navy)]">
            Want a text when your report is ready?
          </h3>
          <p className="mt-2 text-center text-[16px] text-[var(--color-muted)]">
            I&apos;ll send one text message when your report is reviewed and sent. That&apos;s it.
          </p>

          <div className="mt-8">
            {smsSuccess ? (
              <p role="status" aria-live="polite" className="text-center text-lg font-semibold text-[var(--color-success)]">
                ✓ Got it. Watch for a text from Christian.
              </p>
            ) : (
              <form onSubmit={handleSmsSubmit} className="space-y-4" noValidate>
                <label htmlFor="sms-phone" className="sr-only">
                  Mobile phone number
                </label>
                <input
                  id="sms-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(336) 555-0100"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (smsError) setSmsError(null);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[var(--color-navy)] outline-none focus-visible:border-[var(--color-navy)] focus-visible:ring-2 focus-visible:ring-[var(--color-navy)]/20"
                  style={{ fontSize: "18px", minHeight: "56px" }}
                />

                <label className="flex cursor-pointer gap-3 text-left text-[16px] leading-snug text-[var(--color-muted)]">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(event) => setSmsConsent(event.target.checked)}
                    className="mt-1 size-5 shrink-0 rounded border-gray-400"
                  />
                  <span>
                    I agree to receive one SMS from Christian Brinkley regarding my Medicare report.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!smsConsent || smsLoading}
                  className="min-h-14 w-full rounded-lg bg-[var(--color-navy)] px-6 py-4 text-[18px] font-semibold text-[var(--color-paper)] transition-colors hover:bg-[#1a3460] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                >
                  Text Me When It&apos;s Ready →
                </button>
                {smsError ? (
                  <p role="alert" className="text-center text-[16px] text-[var(--color-error)]">
                    {smsError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[var(--color-paper)] px-6 py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[14px] leading-relaxed text-[var(--color-muted)]">
            Not ready to book? No problem. Your numbers are saved and I&apos;ll follow up by email.
            You can also reach me anytime at:
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[16px] font-medium text-[var(--color-navy)]">
            <a href="mailto:christianbrinkley4@gmail.com" className="underline underline-offset-2">
              christianbrinkley4@gmail.com
            </a>
            <span className="font-mono">(919) 408-6671</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouInner />
    </Suspense>
  );
}
