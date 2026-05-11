"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopRouteChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <div className="trust-pill sticky top-0 z-50 flex h-10 w-full items-center justify-center px-4 text-center text-[14px] leading-snug">
        UNCG Student Research Project &nbsp;&nbsp;|&nbsp;&nbsp; Spring 2026 &nbsp;&nbsp;|&nbsp;&nbsp;
        Serving the Piedmont Triad
      </div>
      {!isHome ? (
        <div className="app-shell py-3">
          <Link
            href="/"
            className="inline-flex items-center text-[18px] font-medium underline decoration-2 underline-offset-4"
          >
            ← Home
          </Link>
        </div>
      ) : null}
    </>
  );
}
