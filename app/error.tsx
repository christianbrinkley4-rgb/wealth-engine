"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="app-shell py-16">
      <h1 className="text-28 font-bold text-[var(--color-navy)]">Something went wrong</h1>
      <p className="text-18 mt-4 max-w-xl text-[var(--color-ink-muted)]">
        This page hit an unexpected error. You can try again, or go home and continue from there.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => reset()}
          className="h-12 bg-[var(--color-navy)] px-6 text-[var(--color-paper)]"
        >
          Try again
        </Button>
        <Button type="button" variant="outline" className="h-12 px-6" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
