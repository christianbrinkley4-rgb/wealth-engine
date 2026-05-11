"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import ReturnChart from "../components/ReturnChart";
import AgeInputForm from "../components/AgeInputForm";

export default function Home() {
  const [age, setAge] = useState<number | null>(null);

  const handleAgeSubmit = (inputAge: number) => {
    setAge(inputAge);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <DashboardHeader />
      <AgeInputForm onAgeSubmit={handleAgeSubmit} />
      {age !== null && <ReturnChart age={age} />}
    </main>
  );
}