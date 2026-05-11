"use client";

import { useState } from "react";
import { EmailResultsCapture } from "@/components/EmailResultsCapture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaxesPage() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      window.localStorage.setItem("tax_waitlist_email", email);
      setSaved(true);
    } catch {
      setSaved(true);
    }
  };

  return (
    <main className="app-shell py-8">
      <section className="card-surface p-6 md:p-8">
        <h1 className="text-[36px] font-bold leading-tight">2026 Tax Impact Calculator</h1>
        <p className="mt-3 text-[20px] text-[var(--color-muted)]">
          Coming soon. Enter your email to be notified when Christian&apos;s tax analysis tool goes
          live.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="christianbrinkley4@gmail.com"
            className="h-14 text-[18px]"
          />
          <Button
            type="submit"
            className="h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
          >
            Continue →
          </Button>
        </form>

        {saved ? (
          <p role="status" aria-live="polite" className="mt-4 text-[18px]">
            Thanks. You&apos;re on the waitlist.
          </p>
        ) : null}
      </section>

      <section className="mt-8 space-y-6">
        <Card className="card-surface border-gray-300 bg-white text-[var(--color-navy)]">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[20px] text-[var(--color-muted)]">
              Want a Free Personal Walkthrough?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <p className="text-[18px]">
              Christian is available for free 20-minute Zoom consultations for Triad-area residents.
              No sales pitch - this is academic research.
            </p>
            <Button
              asChild
              className="mt-4 h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
            >
              <a
                href="https://calendly.com/christianbrinkley4/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book My Free Call →
              </a>
            </Button>
          </CardContent>
        </Card>

        <EmailResultsCapture
          variant="tax"
          source="pdf_request"
          initialEmail={email}
          wizardData={{
            zip_code: "",
            filing_status: "individual",
            age: 65,
            annual_income: 0,
            calculated_premium: 0,
            irmaa_bracket: "Tax calculator — preview",
          }}
        />
      </section>
    </main>
  );
}
