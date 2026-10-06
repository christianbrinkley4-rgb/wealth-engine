"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { WealthLane } from "@/lib/wealthLane";

/** Lane bar. Client-only so the current page can be marked without a new router. */
export function WealthBar() {
  const pathname = usePathname() ?? "/";

  return (
    <div className="wealth-shell wealth-bar-row">
      <Link
        href={WealthLane.hubPath}
        className="wealth-mark"
        aria-current={pathname === WealthLane.hubPath ? "page" : undefined}
      >
        <span className="wealth-mark-name">{WealthLane.markName()}</span>
        <span className="wealth-mark-role">{WealthLane.markRole()}</span>
      </Link>
      <nav aria-label="Wealth" className="wealth-nav">
        <ul>
          {WealthLane.nav().map((item) => {
            const path = item.href.split("#")[0];
            const current = pathname === path && !item.href.includes("#");
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={current ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
