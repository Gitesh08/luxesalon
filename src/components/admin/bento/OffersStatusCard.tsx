"use client";

import React from "react";
import { Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { useOffers } from "@/hooks/useOffers";

export function OffersStatusCard() {
  const { offers, toggleOffer } = useOffers();

  return (
    <div
      className="bg-[#222220] border border-[#2F2F2A] p-6 flex flex-col justify-between"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between border-b border-[#2F2F2A] pb-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-[#8A8A7A] font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          Active Campaigns
        </span>
        <span className="text-xs font-mono text-[var(--color-gold)]">
          {offers.filter((o) => o.active).length} Active
        </span>
      </div>

      <div className="space-y-2.5 my-auto">
        {offers.slice(0, 3).map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between gap-2 p-2 bg-[#1A1A1A] border border-[#2F2F2A]"
          >
            <div className="truncate pr-2">
              <span className="text-xs text-[#F0EBE1] font-medium block truncate">
                {offer.title}
              </span>
              <span className="text-[10px] uppercase font-mono text-[#8A8A7A]">
                {offer.displayType}
              </span>
            </div>

            <button
              onClick={() => toggleOffer(offer.id)}
              className="text-[#8A8A7A] hover:text-[var(--color-gold)] cursor-pointer transition-colors shrink-0"
              title={offer.active ? "Turn Off" : "Turn On"}
            >
              {offer.active ? (
                <ToggleRight className="w-6 h-6 text-[var(--color-gold)]" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-[#55554D]" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#2F2F2A] text-[11px] text-[#8A8A7A]">
        Syncs to customer view within 200ms
      </div>
    </div>
  );
}
