import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function ClientPortalPage() {
  return (
    <main className="app-shell py-8">
      <section className="card-surface p-8">
        <h1 className="text-[36px] font-bold">Client Portal</h1>
        <p className="mt-3 text-[18px] text-[var(--color-muted)]">
          The legacy client portal is temporarily offline while the core Medicare experience is being
          rebuilt for accessibility and low-bandwidth performance.
        </p>
        <Button
          asChild
          className="mt-6 h-14 bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </section>
    </main>
  );
}
