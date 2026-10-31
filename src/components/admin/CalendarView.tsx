"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { TokenBadge } from "@/components/ui/TokenBadge";

export function CalendarView() {
  const { bookings } = useBookings();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const monthName = today.toLocaleDateString("en-IN", { month: "long" });
  const monthShort = today.toLocaleDateString("en-IN", { month: "short" });
  const year = today.getFullYear();

  // Days in current month
  const totalDays = new Date(year, today.getMonth() + 1, 0).getDate();
  const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Filter bookings for selected day
  const padDay = String(selectedDay).padStart(2, "0");
  const dayBookings = bookings.filter((b) => {
    return (
      b.date.includes(`${padDay} ${monthShort}`) ||
      b.date.includes(`${selectedDay} ${monthShort}`) ||
      b.date.includes(`${selectedDay} Oct`)
    );
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#2F2F2A] pb-4">
        <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
          Atelier Master Calendar
        </h2>
        <p className="text-xs text-[#8A8A7A]">
          {monthName} {year} schedule overview and suite occupancy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Grid (Spans 8 cols) */}
        <div
          className="lg:col-span-8 bg-[#222220] border border-[#2F2F2A] p-6"
          style={{ borderRadius: 0 }}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2F2F2A]">
            <span className="font-serif text-xl font-medium text-[#F0EBE1]">
              {monthName} {year}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--color-gold)]">
                Selected: {selectedDay} {monthShort} {year}
              </span>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] uppercase tracking-wider text-[#8A8A7A] font-mono">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for October 2026 starting on Thursday (4 leading empty days) */}
            <div className="h-16 bg-[#1A1A1A]/30 border border-transparent" />
            <div className="h-16 bg-[#1A1A1A]/30 border border-transparent" />
            <div className="h-16 bg-[#1A1A1A]/30 border border-transparent" />
            <div className="h-16 bg-[#1A1A1A]/30 border border-transparent" />

            {daysInMonth.map((day) => {
              const pDay = String(day).padStart(2, "0");
              const countForDay = bookings.filter((b) =>
                b.date.includes(`${pDay} ${monthShort}`) ||
                b.date.includes(`${day} ${monthShort}`) ||
                b.date.includes(`${day} Oct`)
              ).length;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-16 p-2 border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[var(--color-gold)] text-black border-[var(--color-gold)]"
                      : "bg-[#1A1A1A] text-[#F0EBE1] border-[#2F2F2A] hover:border-[#44443F]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <span className="font-mono text-xs">{day}</span>
                  {countForDay > 0 && (
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-black" : "bg-[var(--color-gold)]"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? "text-black" : "text-[#8A8A7A]"
                        }`}
                      >
                        {countForDay}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Schedule (Spans 4 cols) */}
        <div
          className="lg:col-span-4 bg-[#222220] border border-[#2F2F2A] p-6"
          style={{ borderRadius: 0 }}
        >
          <div className="border-b border-[#2F2F2A] pb-3 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] font-mono block">
              Agenda For Date
            </span>
            <h3 className="font-serif text-2xl text-[#F0EBE1]">
              {selectedDay} {monthShort} {year}
            </h3>
            <span className="text-xs text-[#8A8A7A]">
              {dayBookings.length} Scheduled Appointments
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {dayBookings.length === 0 ? (
              <p className="text-xs text-[#8A8A7A] italic py-6 text-center">
                No appointments scheduled on this date.
              </p>
            ) : (
              dayBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3 bg-[#1A1A1A] border border-[#2F2F2A] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <TokenBadge tokenId={b.token} size="sm" />
                    <span className="text-xs font-mono text-[var(--color-gold)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {b.time}
                    </span>
                  </div>
                  <div className="font-medium text-xs text-[#F0EBE1]">
                    {b.customerName}
                  </div>
                  <div className="text-[11px] text-[#8A8A7A] truncate">
                    {b.service}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
