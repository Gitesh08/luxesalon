"use client";

import { useEffect } from "react";
import { broadcast, BroadcastEvent } from "@/lib/broadcast";
import { useStore } from "@/store";

export function useBroadcast() {
  const hydrateFromStorage = useStore((state) => state.hydrateFromStorage);

  useEffect(() => {
    const unsubscribe = broadcast.subscribe((event: BroadcastEvent) => {
      // Re-hydrate store on any cross-tab event
      hydrateFromStorage();
    });

    return () => {
      unsubscribe();
    };
  }, [hydrateFromStorage]);
}
