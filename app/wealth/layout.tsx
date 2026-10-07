import { Motion } from "@/app/wealth/ui/Motion";
import { JsonLd, WealthFooter } from "@/app/wealth/ui/shell";
import { wealthHubJsonLd } from "@/lib/wealth/seo";
import { WealthNav } from "@/app/wealth/ui/WealthNav";

import "./wealth.css";

/**
 * The christianbuildswealth hub: a money section for people in their 20s and
 * 30s with its own look. The Medicare header, footer and sticky call bar step
 * aside on /wealth and /links (see their path checks), and this layout
 * supplies the hub's own.
 */
export default function WealthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-root">
      <JsonLd data={wealthHubJsonLd()} />
      <WealthNav />
      {children}
      <WealthFooter />
      <Motion />
    </div>
  );
}
