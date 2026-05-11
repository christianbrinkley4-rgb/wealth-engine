"use client";

interface ReturnChartProps {
  age: number;
}

export default function ReturnChart({ age }: ReturnChartProps) {
  return (
    <div className="card-surface p-6">
      <h3 className="text-[28px] font-semibold">Projected Returns</h3>
      <p className="mt-2 text-[18px] text-[var(--color-muted)]">
        Chart rendering is disabled to keep page performance high on slower connections. Age input
        received: {age}.
      </p>
    </div>
  );
}
