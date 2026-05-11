"use client";

import { ReactNode } from "react";

interface GlassTooltipProps {
  label?: string;
  rows: Array<{
    color?: string;
    name: string;
    value: ReactNode;
  }>;
}

export default function GlassTooltip({ label, rows }: GlassTooltipProps) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/60 p-3 shadow-[0_18px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(34,211,238,0.18)] backdrop-blur-xl">
      {label ? (
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
          {label}
        </p>
      ) : null}
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-light text-slate-300">
              {row.color ? (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: row.color,
                    boxShadow: `0 0 10px ${row.color}`,
                  }}
                />
              ) : null}
              {row.name}
            </span>
            <span className="text-xs font-semibold tabular-nums text-slate-50">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
