"use client";

import React from "react";
import { MenuItem } from "@/types/menu";
import { useMenu } from "@/hooks/useMenu";
import { Check } from "lucide-react";

export interface StepServiceProps {
  selectedService: MenuItem | null;
  onSelect: (service: MenuItem) => void;
}

export function StepService({ selectedService, onSelect }: StepServiceProps) {
  const { menuItems } = useMenu();

  return (
    <div className="space-y-4">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--ink)]">
          1. Select Atelier Experience
        </h3>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
          Choose a tailored treatment or styling service for your visit.
        </p>
      </div>

      <div className="divide-y divide-[var(--color-border)] max-h-96 overflow-y-auto pr-2">
        {menuItems.map((item) => {
          const isSelected = selectedService?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`p-4 transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? "bg-[var(--color-black)] text-[var(--color-cream)]"
                  : "hover:bg-[var(--surface)] text-[var(--ink)]"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-medium">
                    {item.name}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 ${
                      isSelected
                        ? "bg-[var(--color-gold)] text-[var(--color-black)]"
                        : "bg-[var(--color-border)]/50 text-[var(--ink-muted)]"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isSelected ? "text-[#E0D9CC]" : "text-[var(--ink-muted)]"
                  }`}
                >
                  {item.duration} Mins · {item.description.slice(0, 75)}...
                </div>
              </div>

              <div className="text-right shrink-0 flex items-center gap-3">
                <span className="font-serif text-xl font-medium">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                {isSelected && (
                  <Check className="w-5 h-5 text-[var(--color-gold)]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
