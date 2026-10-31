"use client";

import React from "react";
import { CalendarDays, Sparkles } from "lucide-react";

export function CalendarCard() {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" });
  const dayNum = today.getDate();
  const monthName = today.toLocaleDateString("en-IN", { month: "long" });
  const year = today.getFullYear();

  return (
    <div
      className="bg-[#222220] border border-[#2F2F2A] p-6 flex flex-col justify-between"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between border-b border-[#2F2F2A] pb-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-[#8A8A7A] font-medium flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          Atelier Date
        </span>
        <span className="text-xs font-mono text-[var(--color-gold)]">
          {dayName}
        </span>
      </div>

      <div className="my-auto py-2">
        <div className="font-serif text-5xl font-light text-[#F0EBE1]">
          {dayNum}
        </div>
        <div className="text-sm font-medium text-[#8A8A7A] mt-1">
          {monthName} {year}
        </div>
      </div>

      <div className="pt-3 border-t border-[#2F2F2A] flex items-center justify-between text-xs text-[#8A8A7A]">
        <span>Chamber: 5 Suites Active</span>
        <span className="text-[var(--color-gold)]">VIP On-Site</span>
      </div>
    </div>
  );
}
