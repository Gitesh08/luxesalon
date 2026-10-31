"use client";

import React, { useState } from "react";
import { OfferBanner } from "./OfferBanner";
import { OfferSplash } from "./OfferSplash";
import { Hero } from "./Hero";
import { QueueTracker } from "./QueueTracker";
import { MenuSection } from "./MenuSection";
import { BookingFlow } from "./BookingFlow";
import { Gallery } from "./Gallery";
import { Reviews } from "./Reviews";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { MenuItem } from "@/types/menu";

export function CustomerSite() {
  const [selectedService, setSelectedService] = useState<MenuItem | null>(null);

  const handleSelectServiceFromMenu = (item: MenuItem) => {
    setSelectedService(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--ground)] text-[var(--ink)] selection:bg-[var(--color-gold)] selection:text-black">
      <OfferBanner />
      <OfferSplash />
      <Hero />
      <QueueTracker />
      <MenuSection onSelectService={handleSelectServiceFromMenu} />
      <BookingFlow preselectedService={selectedService} />
      <Gallery />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
}
