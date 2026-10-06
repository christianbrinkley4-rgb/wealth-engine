"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" className="btn btn-outline" onClick={() => window.print()}>
      <Printer size={18} aria-hidden /> Print this card
    </button>
  );
}
