"use client";

import React, { useState } from "react";
import { Clock, UserCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { useQueue } from "@/hooks/useQueue";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Button } from "@/components/ui/Button";

export function QueueTracker() {
  const {
    activeQueue,
    currentlyServed,
    trackedTokenId,
    setTrackedTokenId,
    estimatedWaitMin,
  } = useQueue();

  const [inputToken, setInputToken] = useState("");

  // Determine tracked token object
  const trackedToken = activeQueue.find((t) => t.id === trackedTokenId);

  // Position calculation
  const trackedPosition = trackedToken
    ? activeQueue.findIndex((t) => t.id === trackedToken.id)
    : -1;

  // People ahead
  const peopleAhead = trackedPosition > 0 ? trackedPosition : 0;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputToken.trim().toUpperCase().replace("#", "");
    if (clean) {
      setTrackedTokenId(clean);
      setInputToken("");
    }
  };

  return (
    <section
      id="queue-tracker"
      className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--surface)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-semibold block mb-2">
              Synchronized Salon Queue
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[var(--ink)] leading-tight">
              Live Token Tracker
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-md">
            All appointments receive a dedicated token. Track chair progression
            live with zero waiting in crowded lobbies.
          </p>
        </div>

        {/* Main Status Display Card */}
        <div
          className="border border-[var(--color-border)] bg-[var(--ground)] p-6 sm:p-10 mb-8"
          style={{ borderRadius: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[var(--color-border)]">
            {/* 1. Currently in Chair */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-medium block mb-2">
                Currently In Atelier Chair
              </span>
              <div className="flex items-center gap-3">
                {currentlyServed ? (
                  <>
                    <TokenBadge
                      tokenId={currentlyServed.id}
                      status={currentlyServed.status}
                      size="lg"
                    />
                    <div>
                      <div className="font-serif text-lg font-medium text-[var(--ink)]">
                        {currentlyServed.customerName}
                      </div>
                      <div className="text-xs text-[var(--ink-muted)]">
                        {currentlyServed.service}
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-[var(--ink-muted)] italic">
                    Chair sanitized & preparing for next client
                  </span>
                )}
              </div>
            </div>

            {/* 2. Your Token Status */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-medium block mb-2">
                Your Appointment Token
              </span>
              <div className="flex items-center gap-3">
                {trackedToken ? (
                  <>
                    <TokenBadge
                      tokenId={trackedToken.id}
                      status={trackedToken.status}
                      size="lg"
                    />
                    <div>
                      <div className="font-serif text-lg font-medium text-[var(--ink)]">
                        {trackedToken.customerName}
                      </div>
                      <div className="text-xs text-[var(--color-gold)] uppercase font-semibold">
                        {trackedToken.status === "called"
                          ? "✦ Called to Chair Now!"
                          : trackedToken.status === "standby"
                          ? "Standby (Next up)"
                          : "In Queue"}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-[var(--ink-muted)]">
                    No token tracked currently. Select one below or book a slot.
                  </div>
                )}
              </div>
            </div>

            {/* 3. Waiting & Estimate */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-medium block mb-2">
                Position & Expected Time
              </span>
              <div className="flex items-baseline gap-4">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[var(--ink)]">
                    {trackedToken ? peopleAhead : activeQueue.length}
                  </span>
                  <span className="text-xs text-[var(--ink-muted)] ml-1">
                    ahead of you
                  </span>
                </div>
                <span className="text-[var(--color-border)]">/</span>
                <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span>
                    ~{trackedToken ? estimatedWaitMin : 15} min wait
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Select Demo Tokens for seamless pair-programming test */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="text-[var(--ink-muted)] mr-1">
                Quick test with today&apos;s tokens:
              </span>
              {activeQueue.slice(0, 5).map((tok) => (
                <button
                  key={tok.id}
                  onClick={() => setTrackedTokenId(tok.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono border transition-colors cursor-pointer ${
                    trackedTokenId === tok.id
                      ? "bg-[var(--color-black)] text-[var(--color-cream)] border-[var(--color-black)] font-bold"
                      : "bg-[var(--surface)] text-[var(--ink)] border-[var(--color-border)] hover:border-[var(--color-black)]"
                  }`}
                >
                  #{tok.id} ({tok.customerName.split(" ")[0]})
                </button>
              ))}
            </div>

            <form
              onSubmit={handleLookup}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <input
                type="text"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="Enter token (e.g. A-004)"
                className="px-3 py-1.5 text-xs bg-[var(--surface)] border border-[var(--color-border)] text-[var(--ink)] focus:outline-none focus:border-[var(--color-gold)] w-full sm:w-44 font-mono"
                style={{ borderRadius: 0 }}
              />
              <Button type="submit" size="sm" variant="outline" className="px-3 shrink-0">
                Track
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
