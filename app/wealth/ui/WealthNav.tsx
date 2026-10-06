"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { WEALTH_BRAND, WEALTH_NAV } from "@/lib/wealth/site";

/**
 * The hub's own header. No menu button: on a phone the links sit in a row
 * that scrolls sideways, so every section is one tap away.
 */
export function WealthNav() {
  const pathname = usePathname() ?? "/wealth";
  return (
    <header className="w-nav">
      <a href="#main-content" className="w-skip">
        Skip to the main content
      </a>
      <div className="w-shell w-nav-bar">
        <Link href="/wealth" className="w-nav-brand" aria-label={`${WEALTH_BRAND}, home`}>
          <span aria-hidden>cb</span>
          {WEALTH_BRAND}
        </Link>
        <nav aria-label="Wealth hub">
          <ul className="w-nav-links">
            {WEALTH_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
