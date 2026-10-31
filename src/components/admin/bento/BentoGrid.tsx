"use client";

import React from "react";
import { LiveQueueCard } from "./LiveQueueCard";
import { TodayBookingsCard } from "./TodayBookingsCard";
import { CalendarCard } from "./CalendarCard";
import { RevenueCard } from "./RevenueCard";
import { OffersStatusCard } from "./OffersStatusCard";

export function BentoGrid() {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#2F2F2A] pb-4">
        <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
          Atelier Overview
        </h2>
        <p className="text-xs text-[#8A8A7A]">
          Real-time metrics, active chair states, and revenue tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LiveQueueCard />
        <TodayBookingsCard />
        <RevenueCard />
        <CalendarCard />
        <OffersStatusCard />
      </div>
    </div>
  );
}
