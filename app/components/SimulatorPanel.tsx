"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FilingStatus, toCurrency } from "@/app/lib/financial";

export interface SimulatorValues {
  age: number;
  retirementAge: number;
  portfolioValue: number;
  monthlyContribution: number;
  annualIncome: number;
  filingStatus: FilingStatus;
}

interface SimulatorPanelProps {
  values: SimulatorValues;
  onChange: (next: Partial<SimulatorValues>) => void;
  onRequestDossier: () => void;
}

export default function SimulatorPanel({ values, onChange, onRequestDossier }: SimulatorPanelProps) {
  return (
    <section className="card-surface p-6">
      <h2 className="text-[28px] font-semibold">Planning Inputs</h2>
      <p className="mt-2 text-[18px] text-[var(--color-muted)]">
        Charting is intentionally disabled in this lightweight mode. Adjust values and request your
        summary dossier.
      </p>

      <div className="mt-6 grid gap-6">
        <SliderField
          label="Current Age"
          value={String(values.age)}
          min={25}
          max={85}
          step={1}
          onChange={(next) => onChange({ age: next })}
          sliderValue={values.age}
        />
        <SliderField
          label="Estimated Household Income"
          value={toCurrency(values.annualIncome)}
          min={20000}
          max={500000}
          step={5000}
          onChange={(next) => onChange({ annualIncome: next })}
          sliderValue={values.annualIncome}
        />
      </div>

      <Button
        onClick={onRequestDossier}
        className="mt-6 h-14 w-full bg-[var(--color-navy)] text-[18px] text-[var(--color-paper)]"
      >
        Get Christian&apos;s Help with My Plan
      </Button>
    </section>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  sliderValue,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  sliderValue: number;
  onChange: (next: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[18px]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[sliderValue]}
        onValueChange={(values) => onChange(values[0] ?? sliderValue)}
      />
    </div>
  );
}
