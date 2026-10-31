"use client";

import { useStore } from "@/store";

export function useAdminAuth() {
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);
  const adminLogin = useStore((state) => state.adminLogin);
  const adminLogout = useStore((state) => state.adminLogout);

  return {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
  };
}
