"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useOffers } from "@/hooks/useOffers";

export function OfferBanner() {
  const { bannerOffers } = useOffers();

  if (bannerOffers.length === 0) return null;

  return (
    <aside
      aria-label="Promotions and Special Offers"
      className="bg-[var(--color-black)] text-[var(--color-cream)] border-b border-[#2A2A2A] py-2.5 px-4 overflow-hidden relative z-30"
    >
      <div className="flex items-center justify-center gap-6 text-xs sm:text-sm tracking-wide">
        {bannerOffers.map((offer) => (
          <div key={offer.id} className="flex items-center gap-2.5 shrink-0">
            {offer.badge && (
              <span className="bg-[var(--color-gold)] text-[var(--color-black)] font-semibold text-[10px] uppercase px-2 py-0.5 tracking-wider">
                {offer.badge}
              </span>
            )}
            <span className="font-medium text-[#FAFAF7]">{offer.title}:</span>
            <span className="text-[var(--color-muted)] hidden sm:inline">
              {offer.description}
            </span>
            <Sparkles className="w-3 h-3 text-[var(--color-gold)] ml-2 opacity-70" />
          </div>
        ))}
      </div>
    </aside>
  );
}
