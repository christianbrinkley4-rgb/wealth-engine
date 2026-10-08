import Link from "next/link";

import { WealthLane } from "@/lib/wealthLane";

import { WealthBar } from "./WealthBar";

/**
 * Header and disclosure for /wealth and /links.
 * The Medicare header, footer, and call bar stay off this lane.
 */
export function WealthChrome({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      <a className="wealth-skip" href="#wealth-main">
        {WealthLane.skipLabel()}
      </a>
      <header className="wealth-bar">
        <WealthBar />
      </header>
      <div id="wealth-main" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <footer className="wealth-foot">
        <div className="wealth-shell">
          <p>{WealthLane.disclosure()}</p>
          <p className="wealth-foot-links">
            {WealthLane.footerLinks().map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </p>
          <p>
            © {year} {WealthLane.markName()}.
          </p>
        </div>
      </footer>
    </>
  );
}
