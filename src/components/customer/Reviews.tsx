"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SEED_REVIEWS } from "@/lib/seed";

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = SEED_REVIEWS;
  const shouldReduce = useReducedMotion();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--surface)] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16 border-b border-[var(--color-border)] pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold block mb-2">
              Client Chronicles
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[var(--ink)] leading-tight">
              Words of Distinction
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
            <div className="flex text-[var(--color-gold)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-medium text-[var(--ink)] ml-1">4.9 / 5.0</span>
            <span>· 350+ Verified Patrons</span>
          </div>
        </div>

        {/* Carousel Container (NOT A CARD GRID) */}
        <div className="relative min-h-[280px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Quote className="w-10 h-10 text-[var(--color-gold)] opacity-40" />

              <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[var(--ink)] leading-snug tracking-tight">
                &ldquo;{currentReview.comment}&rdquo;
              </blockquote>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-medium text-[var(--ink)]">
                    {currentReview.author}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-medium">
                    {currentReview.role}
                  </div>
                </div>

                <span className="text-xs font-mono text-[var(--ink-muted)]">
                  {currentReview.date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons & Indicators */}
          <div className="flex items-center justify-between pt-12 mt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-[var(--color-black)]"
                      : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-muted)]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[var(--color-border)] hover:border-[var(--color-black)] hover:bg-[var(--color-black)] hover:text-[var(--color-cream)] flex items-center justify-center transition-colors cursor-pointer text-[var(--ink)]"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[var(--color-border)] hover:border-[var(--color-black)] hover:bg-[var(--color-black)] hover:text-[var(--color-cream)] flex items-center justify-center transition-colors cursor-pointer text-[var(--ink)]"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
