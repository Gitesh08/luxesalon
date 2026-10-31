"use client";

import React from "react";

export interface StepDateProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function StepDate({ selectedDate, onSelect }: StepDateProps) {
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
    const dayNum = d.toLocaleDateString("en-IN", { day: "2-digit" });
    const month = d.toLocaleDateString("en-IN", { month: "short" });
    const fullDate = `${dayNum} ${month} ${d.getFullYear()}`;
    const isToday = i === 0;

    return {
      dayName,
      dayNum,
      month,
      fullDate,
      isToday,
    };
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--ink)]">
          2. Select Reservation Date
        </h3>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
          Bookings open for the next 7 calendar days with real-time seat tracking.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {dates.map((item) => {
          const isSelected = selectedDate === item.fullDate;
          return (
            <button
              key={item.fullDate}
              type="button"
              onClick={() => onSelect(item.fullDate)}
              className={`p-4 border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[110px] ${
                isSelected
                  ? "bg-[var(--color-black)] text-[var(--color-cream)] border-[var(--color-black)]"
                  : "bg-[var(--surface)] text-[var(--ink)] border-[var(--color-border)] hover:border-[var(--color-black)]"
              }`}
              style={{ borderRadius: 0 }}
            >
              <span
                className={`text-[10px] uppercase tracking-widest ${
                  isSelected ? "text-[var(--color-gold)]" : "text-[var(--ink-muted)]"
                }`}
              >
                {item.isToday ? "Today" : item.dayName}
              </span>
              <span className="font-serif text-3xl font-normal my-1">
                {item.dayNum}
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider ${
                  isSelected ? "text-[#E0D9CC]" : "text-[var(--ink-muted)]"
                }`}
              >
                {item.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
