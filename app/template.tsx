"use client";

import { useEffect, useState } from "react";

/**
 * A soft entrance when moving between pages inside the site.
 *
 * Skipped on the very first page load: the first paint should be immediate,
 * and fading in the largest element on the page only delays it. A template
 * remounts on every navigation, so the module-level flag tells later mounts
 * apart from the first.
 */
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  return <div className={animate ? "route-enter" : undefined}>{children}</div>;
}
