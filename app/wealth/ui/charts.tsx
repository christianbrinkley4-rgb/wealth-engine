"use client";

import { useId, useState } from "react";

import { money, moneyShort } from "@/lib/wealth/math";

export type ChartSeries = {
  name: string;
  /** A CSS color or variable. */
  color: string;
  values: number[];
  dashed?: boolean;
  area?: boolean;
};

const W = 640;
const H = 400;
const PAD = { top: 18, right: 18, bottom: 44, left: 76 };

function niceMax(value: number): number {
  if (value <= 0) return 100;
  const power = Math.pow(10, Math.floor(Math.log10(value)));
  const scaled = value / power;
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return step * power;
}

/**
 * Line chart on the dark panel. Drag or hover to scrub: the readout above the
 * chart follows your finger, so there is no tooltip to cover the line on a
 * phone.
 */
export function LineChart({
  series,
  xLabel,
  xTitle,
  describe,
}: {
  series: ChartSeries[];
  /** Label for a point index, e.g. "Age 30" or "Month 14". */
  xLabel: (index: number) => string;
  xTitle: string;
  /** One sentence for screen readers that states the result. */
  describe: string;
}) {
  const id = useId();
  const length = Math.max(...series.map((item) => item.values.length), 1);
  const [scrub, setScrub] = useState<number | null>(null);
  const active = scrub === null ? length - 1 : Math.min(scrub, length - 1);

  const top = niceMax(Math.max(...series.flatMap((item) => item.values), 1));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (index: number) => PAD.left + (index / Math.max(1, length - 1)) * innerW;
  const y = (value: number) => PAD.top + innerH - (value / top) * innerH;

  const path = (values: number[]) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => fraction * top);
  const xTicks = [...new Set([0, Math.round((length - 1) / 2), length - 1])];

  function onMove(event: React.PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = ((event.clientX - box.left) / box.width) * W;
    const index = Math.round(((ratio - PAD.left) / innerW) * (length - 1));
    setScrub(Math.min(length - 1, Math.max(0, index)));
  }

  return (
    <figure className="w-chart">
      <figcaption className="w-chart-readout">
        <span className="w-chart-when">{xLabel(active)}</span>
        {series.map((item) => (
          <span key={item.name} className="w-chart-key">
            <i style={{ background: item.color }} aria-hidden />
            {item.name}
            <b>{money(item.values[Math.min(active, item.values.length - 1)] ?? 0)}</b>
          </span>
        ))}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={describe}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setScrub(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} className="w-chart-grid" />
            <text x={PAD.left - 10} y={y(tick) + 7} textAnchor="end" className="w-chart-axis">
              {moneyShort(tick)}
            </text>
          </g>
        ))}
        {xTicks.map((tick, index) => (
          <text
            key={tick}
            x={x(tick)}
            y={H - 12}
            textAnchor={index === 0 ? "start" : index === xTicks.length - 1 ? "end" : "middle"}
            className="w-chart-axis"
          >
            {xLabel(tick)}
          </text>
        ))}
        <g>
          {series.map((item) =>
            item.area ? (
              <path
                key={`${item.name}-area`}
                d={`${path(item.values)} L${x(item.values.length - 1)},${y(0)} L${x(0)},${y(0)} Z`}
                fill={item.color}
                className="w-chart-area"
              />
            ) : null,
          )}
          {series.map((item) => (
            <path
              key={item.name}
              d={path(item.values)}
              fill="none"
              stroke={item.color}
              strokeWidth={item.dashed ? 2.5 : 4}
              strokeDasharray={item.dashed ? "3 7" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={item.dashed ? undefined : 1}
              className={item.dashed ? "w-chart-dash" : "w-chart-line"}
              style={{ filter: `drop-shadow(0 0 7px ${item.color})` }}
            />
          ))}
        </g>
        <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + innerH} className="w-chart-cursor" />
        {series.map((item) => {
          const value = item.values[Math.min(active, item.values.length - 1)];
          const cx = x(Math.min(active, item.values.length - 1));
          return value === undefined ? null : (
            <g key={`${item.name}-dot`}>
              <circle cx={cx} cy={y(value)} r={6} fill={item.color} className="w-chart-ping" />
              <circle cx={cx} cy={y(value)} r={6} fill={item.color} className="w-chart-dot" />
            </g>
          );
        })}
      </svg>
      <label htmlFor={id} className="w-chart-foot">
        {xTitle} <span>Read 1 point at a time.</span>
      </label>
      <input id={id} className="w-chart-scrubber" type="range" min={0} max={length - 1} value={active} disabled={length < 2}
        aria-label={`${xTitle}: chart point`}
        aria-valuetext={`${xLabel(active)}. ${series.map((item) => `${item.name}: ${money(item.values[Math.min(active, item.values.length - 1)] ?? 0)}`).join(". ")}`}
        onChange={(event) => setScrub(Number(event.target.value))} />
      <p className="w-chart-foot">
        Drag the line or use the slider.
      </p>
    </figure>
  );
}

export type DonutSlice = { label: string; value: number; color: string };

/** Donut whose slices slide as the numbers change. */
export function Donut({
  slices,
  centerTop,
  centerBottom,
}: {
  slices: DonutSlice[];
  centerTop: string;
  centerBottom: string;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const starts = slices.map((_, index) =>
    slices.slice(0, index).reduce((sum, slice) => sum + (slice.value / total) * circumference, 0),
  );

  return (
    <div className="w-donut">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={slices.map((slice) => `${slice.label} ${Math.round((slice.value / total) * 100)}%`).join(", ")}
      >
        <circle cx="100" cy="100" r={radius} fill="none" className="w-donut-track" strokeWidth="26" />
        {slices.map((slice, index) => {
          const span = (slice.value / total) * circumference;
          const dash = `${Math.max(0, span - 3)} ${circumference}`;
          const start = starts[index];
          return (
            <circle
              key={slice.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth="26"
              strokeDasharray={dash}
              strokeDashoffset={-start}
              transform="rotate(-90 100 100)"
              className="w-donut-slice"
            />
          );
        })}
      </svg>
      <div className="w-donut-center">
        <strong>{centerTop}</strong>
        <span>{centerBottom}</span>
      </div>
    </div>
  );
}
