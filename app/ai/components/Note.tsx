import type { ReactNode } from "react";

/** A visible disclaimer box for pages that touch money or health topics. */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-xl border border-[var(--color-navy)]/20 bg-[var(--color-paper)] p-6">
      <p className="text-17 font-semibold">{title}</p>
      <div className="text-16 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{children}</div>
    </aside>
  );
}
