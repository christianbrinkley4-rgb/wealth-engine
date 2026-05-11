"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, Activity } from "lucide-react";
import MedicareCostProjection from "./components/MedicareCostProjection";

export default function DualFunnelEngine() {
  const [age, setAge] = useState<number | "">("");
  const [zip, setZip] = useState("");
  const [funnel, setFunnel] = useState<"NONE" | "WEALTH" | "MEDICARE">("NONE");

  const routeUser = () => {
    if (!age || !zip) return;
    if (Number(age) >= 62) {
      setFunnel("MEDICARE");
    } else {
      setFunnel("WEALTH");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 font-sans text-slate-50 lg:p-8">
      {/* Initialization Screen */}
      {funnel === "NONE" && (
        <div className="animate-in fade-in zoom-in-95 w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl transition-all duration-500">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-block rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-sky-400 uppercase">
              Piedmont Triad Context Matrix
            </div>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
              Initialize Your <span className="text-sky-400">2026 Tax Law Changes Projection</span>
            </h1>
            <p className="text-sm text-slate-400">
              Calibrating tax, wealth, and healthcare algorithms for North Carolina residents.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Primary ZIP Code
              </label>
              <input
                type="text"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g. 27401"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-lg text-white transition-all outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
                Current Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  const value = e.target.value;
                  setAge(value === "" ? "" : Number(value));
                }}
                placeholder="e.g. 45"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-lg text-white transition-all outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              onClick={routeUser}
              disabled={!age || !zip}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(2,132,199,0.3)] transition-all hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Launch Assessment <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6 text-center">
            <p className="text-xs text-slate-500">
              Technical Architecture by{" "}
              <span className="font-medium text-slate-300">Christian</span>
            </p>
            <p className="mt-1 text-[10px] tracking-widest text-slate-600 uppercase">
              UNCG Master of Accounting
            </p>
          </div>
        </div>
      )}

      {/* WEALTH FUNNEL (Under 62) */}
      {funnel === "WEALTH" && (
        <div className="animate-in slide-in-from-bottom-10 fade-in w-full max-w-5xl duration-500">
          <button
            onClick={() => setFunnel("NONE")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            &larr; Reset Matrix
          </button>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <TrendingUp className="mb-4 h-10 w-10 text-sky-400" />
              <h2 className="mb-2 text-xl font-bold">Wealth & Tax Planning</h2>
              <p className="text-sm text-slate-400">
                Initiating Phase 2 for trajectory modeling with 2026 Tax Law Changes and planning
                gap analysis.
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-8">
              <p className="animate-pulse font-mono text-sm text-slate-500">
                Mounting Alpha Recharts Component...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MEDICARE FUNNEL (62 and Over) */}
      {funnel === "MEDICARE" && (
        <div className="animate-in slide-in-from-bottom-10 fade-in w-full max-w-5xl duration-500">
          <button
            onClick={() => setFunnel("NONE")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            &larr; Reset Matrix
          </button>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-1 rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <Activity className="mb-4 h-10 w-10 text-emerald-400" />
              <h2 className="mb-2 text-xl font-bold">Healthcare Drag Projection</h2>
              <p className="text-sm text-slate-400">
                Initiating Phase 2 for Retirement Healthcare. Modeling Medicare Part B/D premiums,
                supplemental gap coverage, and long-term care exposure.
              </p>
              <MedicareCostProjection />
            </div>
            <div className="col-span-2 flex items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-8">
              <p className="animate-pulse font-mono text-sm text-slate-500">
                Mounting CMS Cost Analysis Component...
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
