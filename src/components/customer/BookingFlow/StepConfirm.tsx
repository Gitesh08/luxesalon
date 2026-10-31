"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Button } from "@/components/ui/Button";
import { Booking } from "@/types/booking";

export interface StepConfirmProps {
  booking: Booking;
  onReset: () => void;
  onTrackQueue: () => void;
}

export function StepConfirm({
  booking,
  onReset,
  onTrackQueue,
}: StepConfirmProps) {
  return (
    <div className="text-center py-6">
      {/* Appointment Card Visual */}
      <div
        className="max-w-lg mx-auto bg-[var(--surface)] border-2 border-[var(--color-gold)] p-8 sm:p-10 shadow-2xl relative text-left"
        style={{ borderRadius: 0 }}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-6 mb-6">
          <div>
            <span className="font-serif text-2xl tracking-tight font-medium text-[var(--ink)] block">
              LUXESALON
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              Official Appointment Card
            </span>
          </div>

          <TokenBadge tokenId={booking.token} status="waiting" size="lg" />
        </div>

        {/* Card Content */}
        <div className="space-y-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] block">
              Reserved For
            </span>
            <span className="font-serif text-2xl font-normal text-[var(--ink)]">
              {booking.customerName}
            </span>
            <span className="text-xs text-[var(--ink-muted)] block font-mono">
              +91 {booking.phone}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--color-border)]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] block">
                Date & Hour
              </span>
              <span className="text-sm font-medium text-[var(--ink)] block">
                {booking.date}
              </span>
              <span className="text-xs text-[var(--color-gold)] font-mono">
                {booking.time}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] block">
                Atelier Service
              </span>
              <span className="text-sm font-medium text-[var(--ink)] block">
                {booking.service}
              </span>
              <span className="text-xs text-[var(--ink-muted)] font-serif">
                ₹{booking.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="accent"
            onClick={onTrackQueue}
            className="flex-1 py-3 text-xs tracking-widest flex items-center justify-center gap-1.5"
          >
            <span>Track in Live Queue</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={onReset}
            className="py-3 text-xs tracking-widest"
          >
            New Reservation
          </Button>
        </div>
      </div>
    </div>
  );
}
