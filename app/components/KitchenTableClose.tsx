import Link from "next/link";
import { Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";

export function KitchenTableClose({
  heading,
  body,
  href,
  label,
}: {
  heading: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="bg-[var(--color-paper)] py-14 md:py-16">
      <div className="app-shell max-w-2xl text-center">
        <h2 className="text-28 font-semibold">{heading}</h2>
        <p className="text-18 mt-4 text-[var(--color-ink-muted)]">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={AGENT.phoneHref}
            className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(21,46,52,0.1),0_4px_16px_rgba(21,46,52,0.1)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(21,46,52,0.08)]"
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            {AGENT.phone}
          </a>
          <Link
            href={href}
            className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] shadow-[0_1px_2px_rgba(21,46,52,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--color-gold-ink)] hover:text-[var(--color-gold-ink)] hover:shadow-[0_2px_4px_rgba(21,46,52,0.07),0_3px_12px_rgba(21,46,52,0.06)] active:translate-y-0"
          >
            {label}
          </Link>
        </div>
        <p className="text-16 mt-6 text-[var(--color-ink-muted)]">
          Free consultation in person or by phone. {AGENT.hours}
        </p>
      </div>
    </section>
  );
}
