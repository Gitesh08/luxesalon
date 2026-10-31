"use client";

import React from "react";

export interface StepTimeProps {
  selectedTime: string;
  onSelect: (time: string) => void;
}

export function StepTime({ selectedTime, onSelect }: StepTimeProps) {
  const timeSlots = {
    Morning: ["09:30 AM", "10:30 AM", "11:30 AM"],
    Afternoon: ["01:00 PM", "02:15 PM", "03:30 PM", "04:30 PM"],
    Evening: ["05:30 PM", "06:30 PM", "07:30 PM"],
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--ink)]">
          3. Select Atelier Hour
        </h3>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
          Exclusive slots with dedicated personal master stylist allocation.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period}>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)] font-medium block mb-2.5">
              {period}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onSelect(slot)}
                    className={`py-3 px-4 border text-center transition-all cursor-pointer font-mono text-xs sm:text-sm ${
                      isSelected
                        ? "bg-[var(--color-black)] text-[var(--color-cream)] border-[var(--color-black)] font-bold"
                        : "bg-[var(--surface)] text-[var(--ink)] border-[var(--color-border)] hover:border-[var(--color-black)]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
