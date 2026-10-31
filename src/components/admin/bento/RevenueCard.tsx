"use client";

import React from "react";
import { TrendingUp, CreditCard } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function RevenueCard() {
  const { bookings } = useBookings();

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const avgTicket = bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

  return (
    <div
      className="bg-[#222220] border border-[#2F2F2A] p-6 flex flex-col justify-between"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between border-b border-[#2F2F2A] pb-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-[#8A8A7A] font-medium flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          Revenue Generated
        </span>
        <span className="text-xs font-mono text-[#2D6A4F] flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +18.4%
        </span>
      </div>

      <div className="my-auto py-2">
        <div className="font-serif text-4xl text-[#F0EBE1] font-light">
          <AnimatedNumber value={totalRevenue} prefix="₹" />
        </div>
        <div className="text-xs text-[#8A8A7A] mt-2">
          Average ticket: ₹{avgTicket.toLocaleString("en-IN")} / client
        </div>
      </div>

      <div className="pt-3 border-t border-[#2F2F2A] flex items-center justify-between text-xs text-[#8A8A7A]">
        <span>Gross Volume</span>
        <span className="text-[#F0EBE1] font-mono">100% Verified</span>
      </div>
    </div>
  );
}
