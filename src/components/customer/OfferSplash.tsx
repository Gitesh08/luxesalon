"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { useOffers } from "@/hooks/useOffers";
import { Button } from "@/components/ui/Button";
import { STORAGE_KEYS } from "@/constants/demo";

export function OfferSplash() {
  const { modalOffers } = useOffers();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEYS.offerSeen);
    if (!seen && modalOffers.length > 0) {
      // Show offer splash on first visit after a slight delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [modalOffers]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.offerSeen, "true");
    }
  };

  const handleClaim = () => {
    handleClose();
    const bookingEl = document.getElementById("booking-section");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featuredOffer = modalOffers[0];
  if (!featuredOffer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#0D0D0D] text-[#F5F0E8] border border-[var(--color-gold)]/40 shadow-2xl p-8 sm:p-10 z-10 text-center"
            style={{ borderRadius: 0 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#8A8A7A] hover:text-[#F5F0E8] p-1.5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-[var(--color-gold)]/10 border border-[var(--color-gold)] text-[var(--color-gold)]">
              <Gift className="w-6 h-6" />
            </div>

            {featuredOffer.badge && (
              <div className="mb-3">
                <span className="inline-block bg-[var(--color-gold)] text-[#0D0D0D] text-xs font-bold uppercase tracking-widest px-3 py-1">
                  {featuredOffer.badge}
                </span>
              </div>
            )}

            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F0E8] mb-3 leading-tight">
              {featuredOffer.title}
            </h3>

            <p className="text-sm sm:text-base text-[#8A8A7A] mb-8 leading-relaxed max-w-sm mx-auto">
              {featuredOffer.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="accent"
                onClick={handleClaim}
                className="py-3.5 px-6 tracking-widest text-xs"
              >
                Claim Privileged Invitation
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="py-3.5 px-6 tracking-widest text-xs text-[#8A8A7A] border-[#333333] hover:text-white hover:border-white"
              >
                Explore Atelier First
              </Button>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#55554D] mt-6">
              Complimentary on your premier reservation · Terms apply
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
