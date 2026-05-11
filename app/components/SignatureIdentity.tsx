"use client";

interface SignatureIdentityProps {
  variant?: "compact" | "full";
}

export default function SignatureIdentity({ variant = "full" }: SignatureIdentityProps) {
  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md border border-(--rule-accent) bg-(--gold-dim) font-serif text-[15px] text-(--ink)">
          CB
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-(--ink) uppercase">
            Christian
          </span>
          <span className="text-[10px] tracking-[0.04em] text-(--slate-dim)">
            UNCG Graduate Student · Student Researcher
          </span>
          <span className="text-[10px] tracking-[0.04em] text-(--slate-dim)">
            Greensboro · High Point · Winston-Salem
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 border border-t-0 border-(--rule) bg-(--ink-2) px-8 py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-12">
      <div className="flex items-center gap-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-(--rule-accent) bg-(--gold-dim) font-serif text-[18px] text-(--ink)">
          CB
        </div>
        <div>
          <p className="font-serif text-[18px] text-(--ink)">Christian Brinkley</p>
          <p className="mt-1 text-[12px] tracking-[0.02em] text-(--slate-dim)">
            UNCG Graduate Student · Student Researcher · CPA Track
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <a
          href="https://www.linkedin.com/in/christianbrinkley/"
          target="_blank"
          rel="noreferrer"
          className="border-b border-(--gold-border) pb-1 text-[10px] font-bold tracking-[0.14em] text-(--gold) uppercase transition-colors hover:border-(--gold)"
        >
          Connect on LinkedIn →
        </a>
        <span className="border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-emerald-800 uppercase">
          Proudly serving the Triad community
        </span>
      </div>
    </section>
  );
}
