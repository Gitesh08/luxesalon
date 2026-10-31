"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useStore } from "@/store";
import { useStorageHydration } from "@/hooks/useLocalStorage";
import { useBroadcast } from "@/hooks/useBroadcast";
import { CustomerSite } from "@/components/customer/CustomerSite";
import { AdminShell } from "@/components/admin/AdminShell";
import { ViewToggle } from "@/components/toggle/ViewToggle";

export default function Home() {
  useStorageHydration();
  useBroadcast();
  const currentView = useStore((state) => state.currentView);
  const shouldReduce = useReducedMotion();

  return (
    <>
      <AnimatePresence mode="wait">
        {currentView === "customer" ? (
          <motion.div
            key="customer-view"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <CustomerSite />
          </motion.div>
        ) : (
          <motion.div
            key="admin-view"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AdminShell />
          </motion.div>
        )}
      </AnimatePresence>

      <ViewToggle />
    </>
  );
}
