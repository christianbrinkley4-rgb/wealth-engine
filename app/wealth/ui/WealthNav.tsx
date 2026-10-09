"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WEALTH_BRAND, WEALTH_NAV } from "@/lib/wealth/site";

/**
 * The hub's own header. On a phone the links fold into a hamburger menu;
 * on larger screens they sit in a row.
 */
export function WealthNav() {
  const pathname = usePathname() ?? "/wealth";
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    document.querySelector<HTMLElement>("#wealth-menu a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenOn(null); document.querySelector<HTMLElement>(".w-nav-menu")?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <header className="w-nav" data-open={open ? "true" : undefined}>
      <a href="#main-content" className="w-skip">
        Skip to the main content
      </a>
      <div className="w-shell w-nav-bar">
        <Link href="/wealth" className="w-nav-brand" aria-label={`cb ${WEALTH_BRAND}, home`}>
          <span aria-hidden>cb</span>
          {WEALTH_BRAND}
        </Link>
        <button
          type="button"
          className="w-nav-menu"
          aria-expanded={open}
          aria-controls="wealth-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          <span aria-hidden>{open ? "Close" : "Menu"}</span>
        </button>
        <nav aria-label="Wealth hub">
          <ul className="w-nav-links" id="wealth-menu">
            {WEALTH_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined
                  }
                  onClick={() => setOpenOn(null)}
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
