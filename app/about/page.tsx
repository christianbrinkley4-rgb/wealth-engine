import Link from "next/link";
import { User } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <section className="bg-[var(--color-paper)] py-12 md:py-16">
        <div className="app-shell">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
            <div
              className="flex aspect-[3/4] w-full max-w-[320px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center md:mx-0"
              style={{
                backgroundColor: "rgba(15, 34, 65, 0.08)",
                borderColor: "rgba(15, 34, 65, 0.2)",
              }}
            >
              <User className="size-16 text-[var(--color-muted)]" strokeWidth={1.25} aria-hidden />
              <p className="text-[18px] font-semibold text-[var(--color-navy)]">Photo of Christian</p>
              <p className="text-[16px] text-[var(--color-muted)]">Coming before launch</p>
            </div>

            <div>
              <h1 className="text-[36px] font-bold leading-tight text-[var(--color-navy)]">
                Hi — I&apos;m Christian.
              </h1>
              <p className="mt-4 max-w-xl text-[20px] text-[var(--color-muted)]">
                UNCG accounting student. Licensed insurance professional. Greensboro native.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-14">
        <div className="app-shell max-w-3xl space-y-8 text-[18px] leading-[2] text-[var(--color-navy)]">
          <p>
            I&apos;m a senior in the Department of Accounting at UNCG, on track to sit for the CPA exam.
            My concentration is in tax and financial planning — which means I spend a lot of time thinking
            about exactly the kind of problems the 2026 tax changes are going to create for people in
            retirement.
          </p>
          <p>
            I built this tool because most retirement calculators online are built by companies trying to
            sell you something. I wanted to build something that just told you the truth about your
            numbers — no agenda, no sales pressure, no fine print.
          </p>
          <p>
            I&apos;m also a licensed insurance agent with Bankers Life. I&apos;ll be upfront about that
            because you deserve to know. If you use this tool and want help acting on what you find, I can
            help with that too. But the tool is free regardless, and there&apos;s no obligation to work with
            me.
          </p>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-14">
        <div className="app-shell">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div className="card-surface p-6 md:p-8">
              <h2 className="text-[22px] font-bold text-[var(--color-navy)]">Academic credentials</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-[18px] leading-relaxed text-[var(--color-navy)]">
                <li>UNCG, B.S. Accounting, Expected 2026</li>
                <li>Concentration: Tax &amp; Financial Planning</li>
                <li>CPA Track</li>
              </ul>
            </div>
            <div className="card-surface p-6 md:p-8">
              <h2 className="text-[22px] font-bold text-[var(--color-navy)]">Professional credentials</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-[18px] leading-relaxed text-[var(--color-navy)]">
                <li>Licensed Insurance Agent, State of NC</li>
                <li>Bankers Life</li>
                <li>Specialization: Medicare &amp; Retirement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-16">
        <div className="app-shell text-center">
          <h2 className="text-[28px] font-bold text-[var(--color-navy)]">Ready to see your numbers?</h2>
          <Link
            href="/medicare"
            className="mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 text-[18px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
          >
            Get My Free Report →
          </Link>
          <p className="mt-6 text-[18px] text-[var(--color-muted)]">
            Have questions first? Email me:{" "}
            <a href="mailto:christianbrinkley4@gmail.com" className="font-medium text-[var(--color-navy)] underline underline-offset-2">
              christianbrinkley4@gmail.com
            </a>
          </p>
          <Link
            href="/"
            className="mt-10 inline-block text-[18px] font-medium underline decoration-2 underline-offset-4"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
