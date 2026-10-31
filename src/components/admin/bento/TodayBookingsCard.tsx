"use client";

import React from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { formatDate } from "@/lib/time";

export function TodayBookingsCard() {
  const { bookings } = useBookings();
  const today = new Date();
  const todayStr = formatDate(today);
  const dayNum = today.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = today.toLocaleDateString("en-IN", { month: "short" });
  const customToday = `${dayNum} ${month} ${today.getFullYear()}`;

  const todayBookings = bookings.filter(
    (b) =>
      b.date === customToday ||
      b.date.includes(todayStr) ||
      b.date.includes("24 Oct")
  );
  const completedCount = todayBookings.filter((b) => b.status === "completed").length;

  return (
    <div
      className="bg-[#222220] border border-[#2F2F2A] p-6 flex flex-col justify-between"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between border-b border-[#2F2F2A] pb-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-[#8A8A7A] font-medium flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          Today&apos;s Bookings
        </span>
        <span className="text-xs font-mono text-[#F0EBE1]">
          {todayBookings.length} Total
        </span>
      </div>

      <div className="my-auto py-2">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl text-[#F0EBE1] font-normal">
            {todayBookings.length}
          </span>
          <span className="text-xs text-[#8A8A7A]">scheduled</span>
        </div>
        <p className="text-xs text-[#8A8A7A] mt-2">
          {completedCount} completed · {todayBookings.length - completedCount} pending
        </p>
      </div>

      <div className="pt-3 border-t border-[#2F2F2A] flex items-center gap-2 text-xs text-[#2D6A4F]">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Atelier operating at optimal pace</span>
      </div>
    </div>
  );
}
