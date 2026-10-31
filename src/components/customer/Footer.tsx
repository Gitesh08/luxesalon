"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-cream)] pt-16 pb-12 px-6 sm:px-12 lg:px-20 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Atelier Brand */}
          <div className="md:col-span-2 lg:col-span-5 space-y-4">
            <button
              onClick={scrollToTop}
              className="text-left group cursor-pointer focus:outline-none"
              aria-label="Scroll to top"
            >
              <span className="font-serif text-2xl sm:text-[28px] tracking-[0.06em] text-[#F5F0E8] group-hover:text-[var(--color-gold)] transition-colors font-medium block leading-tight">
                LUXESALON
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)] font-medium block mt-1.5">
                Haute Coiffure & Aesthetic Sanctuary
              </span>
            </button>
            <p className="text-xs text-[#8A8A7A] leading-relaxed max-w-sm pt-1 font-light">
              The premier hair atelier combining Michelin-grade craftsmanship,
              restorative botanical trichology, and synchronized live token
              reservations.
            </p>
          </div>

          {/* Atelier Hours */}
          <div className="md:col-span-1 lg:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block">
              Atelier Hours
            </span>
            <div className="text-xs text-[#E0D9CC] space-y-2 font-light">
              <div className="flex justify-between gap-4">
                <span>Tuesday – Friday</span>
                <span className="font-mono text-[#8A8A7A]">09:30 – 20:30</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday – Sunday</span>
                <span className="font-mono text-[#8A8A7A]">09:00 – 21:00</span>
              </div>
              <div className="flex justify-between gap-4 text-[#8A8A7A]">
                <span>Monday</span>
                <span>Atelier Closed</span>
              </div>
            </div>
          </div>

          {/* Residence & Contact */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block">
              Sanctuary Residence
            </span>
            <p className="text-xs text-[#E0D9CC] leading-relaxed font-light">
              Suite 401, The Imperial Pavilion <br />
              Crescent Promenade, Heritage Quarter <br />
              Mumbai 400001, India
            </p>
            <div className="pt-2 text-xs text-[#8A8A7A] space-y-1">
              <div>Private Concierge: +91 99999 99000</div>
              <div>Direct: concierge@luxesalon.in</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B5C]">
          <span>
            © 2024–2026 LuxeSalon Atelier · Designed in Paris & Mumbai
          </span>

          <div className="flex items-center gap-6">
            <span>Client State: Browser Encrypted (localStorage)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#E0D9CC] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
            >
              <span>Atelier Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
