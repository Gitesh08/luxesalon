"use client";

import { useStore } from "@/store";

export function useOffers() {
  const offers = useStore((state) => state.offers);
  const toggleOffer = useStore((state) => state.toggleOffer);
  const updateOffer = useStore((state) => state.updateOffer);

  const activeOffers = offers.filter((o) => o.active);
  const modalOffers = activeOffers.filter(
    (o) => o.displayType === "modal" || o.displayType === "both"
  );
  const bannerOffers = activeOffers.filter(
    (o) => o.displayType === "banner" || o.displayType === "both"
  );

  return {
    offers,
    activeOffers,
    modalOffers,
    bannerOffers,
    toggleOffer,
    updateOffer,
  };
}
