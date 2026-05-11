"use client";

import { FormEvent, useState } from "react";

interface AgeInputFormProps {
  onAgeSubmit: (age: number) => void;
}

const AgeInputForm = ({ onAgeSubmit }: AgeInputFormProps) => {
  const [age, setAge] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (age) {
      onAgeSubmit(Number(age));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="block text-[18px] font-bold text-slate-500">
        Enter Your Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g. 30"
          className="mt-2 min-h-11 w-full rounded-lg border border-slate-800 bg-slate-900 p-3 text-[18px] text-white focus:border-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          required
          style={{ fontSize: "18px" }}
        />
      </label>
      <button
        type="submit"
        className="min-h-11 w-full rounded-lg bg-sky-600 py-3 text-[18px] font-bold text-white transition-all hover:bg-sky-500"
      >
        Continue →
      </button>
    </form>
  );
};

export default AgeInputForm;