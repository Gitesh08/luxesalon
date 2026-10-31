"use client";

import { useEffect } from "react";
import { useStore } from "@/store";

export function useStorageHydration() {
  const isHydrated = useStore((state) => state.isHydrated);
  const hydrateFromStorage = useStore((state) => state.hydrateFromStorage);

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  return isHydrated;
}
