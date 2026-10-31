"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  Sparkles,
  UtensilsCrossed,
  LogOut,
  Eye,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/store";
import { useQueue } from "@/hooks/useQueue";
import { BentoGrid } from "./bento/BentoGrid";
import { QueueManager } from "./QueueManager";
import { BookingsManager } from "./BookingsManager";
import { CalendarView } from "./CalendarView";
import { OfferManager } from "./OfferManager";
import { MenuManager } from "./MenuManager";

type AdminTab =
  | "overview"
  | "queue"
  | "bookings"
  | "calendar"
  | "offers"
  | "menu";

export function AdminShell() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminLogout = useStore((state) => state.adminLogout);
  const setView = useStore((state) => state.setView);
  const resetDemoData = useStore((state) => state.resetDemoData);
  const { totalWaiting, currentlyServed } = useQueue();

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "queue",
      label: "Queue Manager",
      icon: <Users className="w-4 h-4" />,
      badge: totalWaiting > 0 ? `${totalWaiting}` : undefined,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      id: "offers",
      label: "Offer Manager",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "menu",
      label: "Menu Manager",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F0EBE1] flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121210] border-b border-[#2F2F2A]">
        <div>
          <span className="font-serif text-lg font-medium text-[#F0EBE1]">
            LUXESALON
          </span>
          <span className="text-[10px] uppercase font-mono text-[var(--color-gold)] ml-2">
            Director
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-[#8A8A7A] hover:text-[#F0EBE1]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-[#121210] border-r border-[#2F2F2A] flex-shrink-0 flex flex-col justify-between p-6 z-20`}
      >
        <div>
          {/* Logo */}
          <div className="border-b border-[#2F2F2A] pb-6 mb-6">
            <span className="font-serif text-2xl tracking-tight text-[#F0EBE1] block font-light">
              LUXESALON
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-mono block mt-0.5">
              Director Dashboard
            </span>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-gold)] text-black font-semibold"
                      : "text-[#8A8A7A] hover:text-[#F0EBE1] hover:bg-[#1E1E1C]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 ${
                        isActive
                          ? "bg-black text-[var(--color-gold)]"
                          : "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 mt-6 border-t border-[#2F2F2A] space-y-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all queue, bookings, offers & menu data to initial demo state?")) {
                resetDemoData();
              }
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#8A8A7A] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[var(--color-gold)]" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => setView("customer")}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#8A8A7A] hover:text-[#F0EBE1] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Switch to Customer Site</span>
          </button>

          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#8B1A1A] hover:text-[#e04040] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>End Director Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-y-auto max-w-7xl">
        {/* Salon Live Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#222220] border border-[#2F2F2A] mb-8 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D6A4F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D6A4F]" />
            </span>
            <span className="text-[#F0EBE1] font-medium">
              Salon Live Status: Synchronized
            </span>
            <span className="text-[#8A8A7A]">·</span>
            <span className="text-[#8A8A7A]">
              Currently In Chair:{" "}
              <strong className="text-[var(--color-gold)] font-medium">
                {currentlyServed
                  ? `${currentlyServed.customerName} (#${currentlyServed.id})`
                  : "None"}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#8A8A7A] hidden md:inline">
              Cross-Tab Broadcast Active
            </span>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all queue, bookings, offers & menu data to initial demo state?")) {
                  resetDemoData();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#1E1E1C] border border-[#3F3F3A] text-[#C4C4B5] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors cursor-pointer"
              title="Re-inject original demo data across all views"
              style={{ borderRadius: 0 }}
            >
              <RotateCcw className="w-3 h-3 text-[var(--color-gold)]" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Active Tab View */}
        {activeTab === "overview" && <BentoGrid />}
        {activeTab === "queue" && <QueueManager />}
        {activeTab === "bookings" && <BookingsManager />}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "offers" && <OfferManager />}
        {activeTab === "menu" && <MenuManager />}
      </main>
    </div>
  );
}
