"use client";

interface TickerItem {
  label: string;
  value: string;
  tone?: "up" | "down" | "neutral";
}

const ITEMS: TickerItem[] = [
  { label: "UNCG RESEARCH LENS", value: "LOCAL + PRACTICAL", tone: "up" },
  { label: "2026 TAX CHANGES", value: "PLANNING WINDOW OPEN", tone: "down" },
  { label: "MEDICARE PREMIUM TIERS", value: "IRMAA MONITORED", tone: "neutral" },
  { label: "TRIAD COMMUNITY FOCUS", value: "GREENSBORO FIRST", tone: "up" },
  { label: "STYLE OF REVIEW", value: "PERSONALIZED + CLEAR", tone: "up" },
  { label: "ACCOUNTING TRACK", value: "CPA PATH ACTIVE", tone: "neutral" },
];

function toneClass(tone?: TickerItem["tone"]) {
  if (tone === "up") return "text-(--emerald)";
  if (tone === "down") return "text-(--rose)";
  return "text-(--slate)";
}

export default function MarketTicker() {
  const stream = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-b border-(--rule) bg-(--ink-3) py-2">
      <div className="ticker-track font-mono text-[10px] tracking-[0.08em] text-(--slate-dim)">
        {stream.map((item, index) => (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            <span>{item.label}</span>
            <span className={toneClass(item.tone)}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
