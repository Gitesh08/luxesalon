"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { useStore } from "@/store";
import { AuthGate } from "@/components/admin/AuthGate";

export function ViewToggle() {
  const currentView = useStore((state) => state.currentView);
  const setView = useStore((state) => state.setView);
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated);
  const adminLogin = useStore((state) => state.adminLogin);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSelectView = (view: "customer" | "admin") => {
    if (view === "admin") {
      if (!isAdminAuthenticated) {
        setIsAuthOpen(true);
        return;
      }
      setView("admin");
    } else {
      setView("customer");
    }
  };

  const handleAuthSuccess = () => {
    adminLogin("admin", "demo2024");
    setIsAuthOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div
          className="flex items-center bg-[#0D0D0D] p-1.5 border border-[#333333] shadow-2xl backdrop-blur-md"
          style={{ borderRadius: 0 }}
        >
          <button
            type="button"
            onClick={() => handleSelectView("customer")}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer ${
              currentView === "customer"
                ? "text-[#0D0D0D]"
                : "text-[#8A8A7A] hover:text-[#FAFAF7]"
            }`}
          >
            {currentView === "customer" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-[#F5F0E8]"
                style={{ borderRadius: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Customer View
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectView("admin")}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer ${
              currentView === "admin"
                ? "text-[#0D0D0D]"
                : "text-[#8A8A7A] hover:text-[#FAFAF7]"
            }`}
          >
            {currentView === "admin" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-[var(--color-gold)]"
                style={{ borderRadius: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Portal
            </span>
          </button>
        </div>
      </div>

      <AuthGate
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
