"use client";

import { useStore } from "@/store";

export function useMenu() {
  const menuItems = useStore((state) => state.menuItems);
  const updateMenuItem = useStore((state) => state.updateMenuItem);
  const addMenuItem = useStore((state) => state.addMenuItem);
  const deleteMenuItem = useStore((state) => state.deleteMenuItem);

  return {
    menuItems,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
  };
}
