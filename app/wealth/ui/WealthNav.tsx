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
  const [open, setOpen] = useState(false);

  // Moving to another page closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [pathname ]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
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
          onClick={() => setOpen((value) => !value)}
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
                  onClick={() => setOpen(false)}
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
