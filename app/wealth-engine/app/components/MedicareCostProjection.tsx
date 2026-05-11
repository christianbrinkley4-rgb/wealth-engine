import React, { useState } from 'react';

const MedicareCostProjection = () => {
  const [income, setIncome] = useState<number | "">("");
  const [partBPremium, setPartBPremium] = useState<number | null>(null);
  const [partDPremium, setPartDPremium] = useState<number | null>(null);

  const calculatePremiums = () => {
    if (income === "") {
      setPartBPremium(null);
      setPartDPremium(null);
      return;
    }

    const incomeNumber = Number(income);

    // Medicare Part B Premium Calculation
    let partB = 164.90; // Standard premium for 2023
    if (incomeNumber > 97000) {
      partB += (incomeNumber - 97000) * 0.05; // Example increment for high earners
    }
    setPartBPremium(partB);

    // Medicare Part D Premium Calculation
    let partD = 33.06; // Base premium for 2023
    if (incomeNumber > 88000) {
      partD += (incomeNumber - 88000) * 0.01; // Example increment for high earners
    }
    setPartDPremium(partD);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
      <h2 className="text-xl font-bold mb-2">Medicare Cost Projection</h2>
      <p className="text-slate-400 text-sm mb-4">
        Enter your estimated income to calculate Medicare Part B and Part D premiums.
      </p>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Estimated Income"
        className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-4 mb-4"
      />
      <button
        onClick={calculatePremiums}
        className="w-full bg-sky-600 text-white font-bold py-2 rounded-xl hover:bg-sky-500 transition-all"
      >
        Calculate Premiums
      </button>
      {partBPremium !== null && (
        <p className="text-slate-400 text-sm mt-4">
          Estimated Medicare Part B Premium: ${partBPremium.toFixed(2)}
        </p>
      )}
      {partDPremium !== null && (
        <p className="text-slate-400 text-sm mt-2">
          Estimated Medicare Part D Premium: ${partDPremium.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default MedicareCostProjection;