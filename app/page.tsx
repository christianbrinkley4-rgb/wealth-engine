import Link from "next/link";
import {
  Calculator,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Lock,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const primaryCtaClassName =
  "inline-flex h-16 min-h-16 min-w-[280px] w-full shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-6 text-[20px] font-bold text-balance text-[var(--color-paper)] transition-opacity hover:bg-[var(--color-navy)] hover:opacity-95 sm:px-8 md:w-auto";

function StarRow({ className }: { className?: string }) {
  return (
    <p className={`text-[18px] leading-none tracking-tight ${className ?? ""}`} aria-hidden>
      <span className="text-[var(--color-gold)]">★★★★★</span>
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      {/* SECTION 2: HERO */}
      <section className="bg-[var(--color-paper)] pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
            <div>
              <p
                className="text-[14px] font-medium tracking-[0.1em] text-[var(--color-gold)] uppercase"
                style={{ letterSpacing: "0.1em" }}
              >
                Free Personalized Report
              </p>

              <h1 className="mt-4 text-[32px] leading-[1.1] font-extrabold text-[var(--color-navy)] md:text-[48px] md:leading-[1.1]">
                Greensboro Retirees: Your 2026 Medicare &amp; Tax Bill Just Changed.
              </h1>

              <p className="mt-4 max-w-xl text-[22px] leading-snug font-normal text-[var(--color-muted)]">
                Get your free personalized 2-page report in 4 minutes. See exactly what changes,
                what it costs you, and what to do about it.
              </p>

              <ul className="mt-6 max-w-xl space-y-3">
                {[
                  "Your exact projected 2026 Medicare Part B premium",
                  "Your personal IRMAA bracket and surcharge amount",
                  "Your estimated additional 2026 federal tax burden",
                  "Three action steps specific to your situation",
                  "Optional free 20-minute review with Christian",
                ].map((label) => (
                  <li key={label} className="flex gap-3 text-[18px] leading-[1.6] text-[var(--color-navy)]">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-[var(--color-gold)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild className={primaryCtaClassName}>
                  <Link href="/medicare">Start My Free Report →</Link>
                </Button>
                <p className="mt-2 text-center text-[12px] text-[var(--color-muted)] md:text-left">
                  Takes 4 minutes. No account needed. No sales calls unless you want one.
                </p>
              </div>

              <div
                className="mt-6 max-w-xl rounded-[12px] border border-[rgba(15,34,65,0.15)] bg-white/40 p-5"
                style={{ borderColor: "rgba(15, 34, 65, 0.15)" }}
              >
                <StarRow className="mb-3" />
                <p className="text-[16px] leading-relaxed text-[var(--color-navy)]">
                  &ldquo;Christian explained my Medicare situation better than my doctor&apos;s
                  office did. Got my report in minutes and actually understood it.&rdquo;
                </p>
                <p className="mt-3 text-[14px] text-[var(--color-muted)]">
                  — Margaret T., Irving Park, Greensboro
                </p>
              </div>
            </div>

            <div
              className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center"
              style={{
                backgroundColor: "rgba(15, 34, 65, 0.08)",
                borderColor: "rgba(15, 34, 65, 0.2)",
              }}
            >
              <User className="size-16 text-[var(--color-muted)]" strokeWidth={1.25} aria-hidden />
              <p className="text-[18px] font-semibold text-[var(--color-navy)]">Photo of Christian</p>
              <p className="text-[16px] text-[var(--color-muted)]">Coming before launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[32px] font-bold text-[var(--color-navy)]">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div className="text-center md:text-left">
              <ClipboardList
                className="mx-auto mb-4 size-10 text-[var(--color-gold)] md:mx-0"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-[20px] font-bold text-[var(--color-navy)]">Answer 4 Questions</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-muted)]">
                ZIP code, filing status, age, and income. No account. No Social Security number.
                Nothing sensitive.
              </p>
            </div>
            <div className="text-center md:text-left">
              <Calculator
                className="mx-auto mb-4 size-10 text-[var(--color-gold)] md:mx-0"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-[20px] font-bold text-[var(--color-navy)]">Get Your Numbers</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-muted)]">
                We calculate your exact 2026 Medicare premium and tax exposure using the same IRMAA
                brackets the government uses.
              </p>
            </div>
            <div className="text-center md:text-left">
              <FileText
                className="mx-auto mb-4 size-10 text-[var(--color-gold)] md:mx-0"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="text-[20px] font-bold text-[var(--color-navy)]">Receive Your Report</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-muted)]">
                A plain-English PDF report lands in your inbox. Bring it to your doctor. Show it to
                your financial advisor. Keep it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TRUST */}
      <section className="bg-[var(--color-navy)] py-16 text-[var(--color-paper)]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p
                className="text-[14px] font-medium tracking-[0.1em] text-[var(--color-gold)] uppercase"
                style={{ letterSpacing: "0.1em" }}
              >
                About This Project
              </p>
              <h2 className="mt-3 text-[28px] leading-snug font-semibold text-[var(--color-paper)]">
                Built by a UNCG student. Designed for Greensboro neighbors.
              </h2>
              <div className="mt-6 space-y-4 text-[18px] leading-[1.8]" style={{ color: "rgba(245, 240, 232, 0.85)" }}>
                <p>
                  I&apos;m Christian Brinkley, a senior accounting student at UNCG. I built this tool
                  because I kept seeing people in the Triad get blindsided by Medicare costs they
                  never saw coming.
                </p>
                <p>
                  This is my research project. I&apos;m also a licensed insurance professional —
                  and I&apos;ll tell you that upfront, because you deserve to know who you&apos;re
                  talking to.
                </p>
                <p>
                  The tool is free. The report is free. The 20-minute review is free. I get paid only
                  if you decide to work with me, and only if what I offer actually makes sense for
                  your situation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  Icon: GraduationCap,
                  title: "UNCG Student Research",
                  body: "Senior, Department of Accounting",
                },
                {
                  Icon: Shield,
                  title: "Licensed Professional",
                  body: "NC Licensed Insurance Agent",
                },
                {
                  Icon: Lock,
                  title: "Your Data Stays Yours",
                  body: "Never sold. Never shared. You can delete it anytime.",
                },
                {
                  Icon: MapPin,
                  title: "Locally Built",
                  body: "Greensboro, NC. Not a national lead farm.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="rounded-[12px] border border-white/10 bg-white/5 p-5">
                  <Icon className="mb-3 size-10 text-[var(--color-gold)]" strokeWidth={1.5} aria-hidden />
                  <h3 className="text-[18px] font-bold text-[var(--color-paper)]">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-paper)]/85">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THREE ROUTING CARDS */}
      <section className="bg-[var(--color-paper)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p
            className="text-[14px] font-medium tracking-[0.1em] text-[var(--color-gold)] uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            Choose Your Report
          </p>
          <h2 className="mt-3 text-[32px] font-bold text-[var(--color-navy)]">What do you want to know?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full max-w-5xl mx-auto px-4 mt-10">
          {/* Medicare */}
          <Card className="card-surface flex h-full flex-col border-gray-300 bg-white text-left text-[var(--color-navy)] transition-transform duration-200 hover:scale-[1.02] hover:border-[var(--color-gold)]">
            <CardHeader className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-3">
                <Shield className="size-10 shrink-0 text-[var(--color-navy)]" aria-hidden strokeWidth={1.5} />
                <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-center text-[12px] leading-tight font-semibold whitespace-nowrap text-[var(--color-navy)]">
                  Most Popular
                </span>
              </div>
              <CardTitle className="text-[22px] leading-tight font-bold text-[var(--color-navy)]">
                Personalized Medicare Review
              </CardTitle>
              <CardDescription className="text-[16px] leading-[1.7] text-[var(--color-muted)]">
                Find out your exact projected 2026 Part B premium and whether you owe an IRMAA
                surcharge based on your Triad-area income.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-0">
              <Button asChild className="mt-auto h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)] hover:bg-[var(--color-navy)]">
                <Link href="/medicare">See My Medicare Estimate →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tax */}
          <Card className="card-surface flex h-full flex-col border-gray-300 bg-white text-left text-[var(--color-navy)] transition-transform duration-200 hover:scale-[1.02] hover:border-[var(--color-gold)]">
            <CardHeader className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-3">
                <Calculator className="size-10 shrink-0 text-[var(--color-navy)]" aria-hidden strokeWidth={1.5} />
                <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-center text-[12px] leading-tight font-semibold whitespace-nowrap text-[var(--color-navy)]">
                  New for 2026
                </span>
              </div>
              <CardTitle className="text-[22px] leading-tight font-bold text-[var(--color-navy)]">
                2026 Tax Impact Calculator
              </CardTitle>
              <CardDescription className="text-[16px] leading-[1.7] text-[var(--color-muted)]">
                The 2025 tax cuts expire January 1st. See exactly how much more you could owe in
                federal taxes and what you can do before the deadline.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-0">
              <Button asChild className="mt-auto h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)] hover:bg-[var(--color-navy)]">
                <Link href="/taxes">Calculate My Tax Impact →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="card-surface flex h-full flex-col border-gray-300 bg-white text-left text-[var(--color-navy)] transition-transform duration-200 hover:scale-[1.02] hover:border-[var(--color-gold)]">
            <CardHeader className="space-y-3 p-6">
              <GraduationCap className="size-10 text-[var(--color-navy)]" aria-hidden strokeWidth={1.5} />
              <CardTitle className="text-[22px] leading-tight font-bold text-[var(--color-navy)]">
                About This Project
              </CardTitle>
              <CardDescription className="text-[16px] leading-[1.7] text-[var(--color-muted)]">
                Why a UNCG accounting student built a free financial tool for Greensboro retirees —
                and why you can trust the numbers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6 pt-0">
              <Button asChild className="mt-auto h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)] hover:bg-[var(--color-navy)]">
                <Link href="/about">Meet Christian →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* TODO: Replace with verified testimonials before launch */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-[12px] bg-[var(--color-paper)] p-6">
              <StarRow className="mb-3" />
              <p className="text-[16px] italic leading-relaxed text-[var(--color-navy)]">
                &ldquo;I had no idea my 2024 income bump would affect my 2026 Medicare premium. This
                caught it before it was too late.&rdquo;
              </p>
              <p className="mt-3 text-[14px] text-[var(--color-muted)]">— Robert K., Hamilton Lakes</p>
            </div>
            <div className="rounded-[12px] bg-[var(--color-paper)] p-6">
              <StarRow className="mb-3" />
              <p className="text-[16px] italic leading-relaxed text-[var(--color-navy)]">
                &ldquo;Simple, clear, and actually useful. Not like those other Medicare websites that
                just want to sell you something.&rdquo;
              </p>
              <p className="mt-3 text-[14px] text-[var(--color-muted)]">— Patricia M., Summerfield</p>
            </div>
            <div className="rounded-[12px] bg-[var(--color-paper)] p-6">
              <StarRow className="mb-3" />
              <p className="text-[16px] italic leading-relaxed text-[var(--color-navy)]">
                &ldquo;Christian walked me through my numbers in plain English. First time I actually
                understood my Medicare statement.&rdquo;
              </p>
              <p className="mt-3 text-[14px] text-[var(--color-muted)]">— James H., Oak Ridge</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="bg-[var(--color-navy)] py-16 text-center text-[var(--color-paper)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[36px] font-extrabold text-[var(--color-paper)]">
            Your 2026 numbers are ready to calculate.
          </h2>
          <p className="mt-4 text-[20px]" style={{ color: "rgba(245, 240, 232, 0.8)" }}>
            Free. Takes 4 minutes. Built for Greensboro.
          </p>
          <div className="mt-8 flex flex-col items-center">
            <Button asChild className={primaryCtaClassName}>
              <Link href="/medicare">Start My Free Report →</Link>
            </Button>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed md:whitespace-normal" style={{ color: "rgba(245, 240, 232, 0.6)" }}>
              UNCG Student Research Project &nbsp;|&nbsp; Spring 2026 &nbsp;|&nbsp; No obligation{" "}
              &nbsp;|&nbsp; Data never sold
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
