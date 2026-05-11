import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function OpsInsightsPage() {
  return (
    <main className="app-shell py-8">
      <section className="card-surface p-8">
        <h1 className="text-[36px] font-bold">Operations Insights</h1>
        <p className="mt-3 text-[18px] text-[var(--color-muted)]">
          Admin analytics are currently paused while the simplified retirement workflows ship.
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
