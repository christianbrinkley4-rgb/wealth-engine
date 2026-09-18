"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";
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

    /*
     * The commonest cause of this screen is not a bug in the page: it is a
     * visitor whose browser still holds the previous build. Every deploy gives
     * the scripts new filenames, so the moment they click a link, the browser
     * asks for a file that no longer exists and React lands here.
     *
     * A reload fixes it, and a 65-year-old should not have to know that. So we
     * reload once, guarded by a key in session storage — if the same failure
     * survives a fresh copy of the site, it is a real error and the page stays
     * put with the phone number on it rather than looping.
     */
    const message = `${error.name}: ${error.message}`;
    const staleBuild =
      /chunk|Failed to fetch dynamically imported module|Importing a module script failed|Loading CSS chunk/i.test(
        message,
      );
    if (!staleBuild) return;

    try {
      const key = "we-stale-build-reload";
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      window.location.reload();
    } catch {
      // Private browsing can block storage; showing this page is the safe end.
    }
  }, [error]);

  return (
    <main className="app-shell py-16">
      <h1 className="text-28 font-bold text-[var(--color-navy)]">Something went wrong</h1>
      <p className="text-18 mt-4 max-w-xl text-[var(--color-ink-muted)]">
        This page hit an unexpected error. You can try again, go home, or call me directly — that
        route does not depend on this form working.
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
        <a
          href={AGENT.phoneHref}
          className="text-17 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)]"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {AGENT.phone}
        </a>
      </div>
    </main>
  );
}
