"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { SERVICE_CATEGORIES } from "@/constants/services";
import { Button } from "@/components/ui/Button";
import { MenuItem } from "@/types/menu";

export interface MenuSectionProps {
  onSelectService?: (service: MenuItem) => void;
}

export function MenuSection({ onSelectService }: MenuSectionProps) {
  const { menuItems } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState<string>("Haircut");
  const shouldReduce = useReducedMotion();

  // Categories present in menu
  const availableCategories = Array.from(
    new Set(menuItems.map((m) => m.category))
  );
  const categories =
    availableCategories.length > 0 ? availableCategories : SERVICE_CATEGORIES;

  // Active items for selected category
  const filteredItems = menuItems.filter(
    (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleBookService = (service: MenuItem) => {
    if (onSelectService) {
      onSelectService(service);
    }
    const bookingEl = document.getElementById("booking-section");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="menu-section"
      className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--ground)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 border-b border-[var(--color-border)] pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold block mb-2">
            Atelier Repertoire
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[var(--ink)] leading-tight mb-4">
            The Service Menu
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl">
            An editorial anthology of precision hair design, restorative hair
            infusions, and bridal styling. All investments quoted in INR (₹)
            including bespoke consultation.
          </p>
        </div>

        {/* Book-like two-column layout: Spine tabs on left, Open page on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: The Spine (Category Selector) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] pb-6 lg:pb-0 lg:pr-8">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)] font-medium block mb-4">
              Chapters
            </span>
            <nav className="flex lg:flex-col flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected =
                  cat.toLowerCase() === selectedCategory.toLowerCase();
                const itemCount = menuItems.filter(
                  (m) => m.category.toLowerCase() === cat.toLowerCase()
                ).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative w-full text-left px-5 py-3.5 text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "bg-[var(--color-black)] text-[var(--color-cream)] font-medium"
                        : "bg-transparent text-[var(--ink)] hover:bg-[var(--surface)] border border-transparent"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block w-1.5 h-1.5 ${
                          isSelected
                            ? "bg-[var(--color-gold)]"
                            : "bg-[var(--color-border)] group-hover:bg-[var(--ink)]"
                        }`}
                      />
                      {cat}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected
                          ? "text-[var(--color-gold)]"
                          : "text-[var(--ink-muted)]"
                      }`}
                    >
                      ({itemCount.toString().padStart(2, "0")})
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:block mt-12 p-5 bg-[var(--surface)] border border-[var(--color-border)] text-xs text-[var(--ink-muted)] leading-relaxed">
              <p className="font-serif text-base text-[var(--ink)] mb-1">
                Consultation Note
              </p>
              Each appointment begins with a diagnostic texture assessment and
              complimentary artisanal beverage pairing.
            </div>
          </div>

          {/* Right: The Open Pages (Editorial List Layout - NO CARD GRIDS) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="divide-y divide-[var(--color-border)]"
              >
                {filteredItems.map((item) => (
                  <article
                    key={item.id}
                    className="py-7 first:pt-0 last:pb-0 group transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] group-hover:text-[var(--color-gold)] transition-colors">
                          {item.name}
                        </h3>
                        {item.popular && (
                          <span className="inline-flex items-center gap-1 bg-[var(--color-gold)] text-[var(--color-black)] text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider">
                            <Sparkles className="w-2.5 h-2.5" /> Popular
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[var(--ink-muted)] font-light leading-relaxed mb-4 max-w-2xl">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                        <span>{item.duration} Minutes Duration</span>
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBookService(item)}
                        className="group-hover:border-[var(--color-black)] group-hover:bg-[var(--color-black)] group-hover:text-[var(--color-cream)] text-[11px] py-2 px-4"
                      >
                        Reserve Service
                      </Button>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
