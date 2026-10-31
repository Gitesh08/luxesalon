"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQueue } from "@/hooks/useQueue";
import { IMAGES } from "@/constants/images";
import { fadeUp, staggerContainer, reducedMotionVariants } from "@/lib/animations";

export function Hero() {
  const { totalWaiting, estimatedWaitMin } = useQueue();
  const shouldReduce = useReducedMotion();
  const containerVariants = shouldReduce ? reducedMotionVariants : staggerContainer;
  const itemVariants = shouldReduce ? reducedMotionVariants : fadeUp;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-12 sm:py-16 overflow-hidden border-b border-[var(--color-border)]">
      {/* Background imagery with refined darkness */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.hero}
          alt="LuxeSalon Atelier Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Top Bar with Live Queue Badge */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#F5F0E8] font-medium block">
            LUXESALON
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
            Haute Coiffure & Aesthetic Sanctuary
          </span>
        </div>

        {/* Live Queue Badge */}
        <div className="flex items-center gap-3 bg-black/60 border border-[var(--color-gold)]/40 px-4 py-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-gold)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-gold)]" />
          </span>
          <div className="flex items-center gap-3 text-[#F5F0E8]">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              <span>{totalWaiting} in queue</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5 text-[#8A8A7A]">
              <Clock className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              <span>~{estimatedWaitMin} min wait</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Headline & Editorial Text */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 my-auto py-12 max-w-4xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold mb-4"
        >
          An Understated Ode to Architectural Beauty
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#F5F0E8] leading-[0.95] tracking-tight mb-6"
        >
          The Appointment <br />
          <span className="italic font-normal text-[var(--color-gold-light)]">
            Card.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-[#E0D9CC] leading-relaxed max-w-2xl font-light mb-10"
        >
          Bespoke hair design, regenerative trichology, and bridal couture
          crafted with Michelin-grade reverence. Real-time appointments with
          zero waiting ambiguity.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <Button
            variant="accent"
            size="lg"
            onClick={() => scrollToSection("booking-section")}
            className="tracking-widest"
          >
            Book Your Appointment
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("menu-section")}
            className="border-white/30 text-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#0D0D0D] tracking-widest"
          >
            Explore Service Menu
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero Footer Meta */}
      <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[#8A8A7A]">
        <span>Location: The Heritage Quarter · Private Suites Available</span>
        <button
          onClick={() => scrollToSection("menu-section")}
          className="flex items-center gap-2 hover:text-[#F5F0E8] transition-colors cursor-pointer group"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-[var(--color-gold)]" />
        </button>
      </div>
    </section>
  );
}
