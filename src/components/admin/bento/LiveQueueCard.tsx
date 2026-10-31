"use client";

import React from "react";
import { Users, Clock, Play } from "lucide-react";
import { useQueue } from "@/hooks/useQueue";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Button } from "@/components/ui/Button";

export function LiveQueueCard() {
  const {
    currentlyServed,
    waitingQueue,
    totalWaiting,
    estimatedWaitMin,
    callToken,
  } = useQueue();

  const nextWaiting = waitingQueue[0];

  const handleCallNext = () => {
    if (nextWaiting) {
      callToken(nextWaiting.id);
    }
  };

  return (
    <div
      className="bg-[#222220] border border-[#2F2F2A] p-6 flex flex-col justify-between"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between border-b border-[#2F2F2A] pb-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-[#8A8A7A] font-medium flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          Live Salon Chair
        </span>
        <span className="text-xs font-mono text-[var(--color-gold)]">
          {totalWaiting} Waiting
        </span>
      </div>

      <div className="space-y-3">
        {currentlyServed ? (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A8A7A] block mb-1">
              Active Client
            </span>
            <div className="flex items-center gap-3">
              <TokenBadge
                tokenId={currentlyServed.id}
                status={currentlyServed.status}
                size="md"
              />
              <div>
                <span className="font-serif text-lg text-[#F0EBE1] font-medium block">
                  {currentlyServed.customerName}
                </span>
                <span className="text-xs text-[#8A8A7A]">
                  {currentlyServed.service}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-[#8A8A7A] italic py-2">
            No client currently in chair
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-[#8A8A7A] pt-2 border-t border-[#2F2F2A]">
          <Clock className="w-3.5 h-3.5 text-[var(--color-gold)]" />
          <span>Queue Backlog: ~{estimatedWaitMin} mins</span>
        </div>
      </div>

      <div className="pt-4 mt-2">
        <Button
          size="sm"
          variant="accent"
          onClick={handleCallNext}
          disabled={!nextWaiting}
          className="w-full text-xs py-2.5 flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Call Next ({nextWaiting ? `#${nextWaiting.id}` : "Empty"})</span>
        </Button>
      </div>
    </div>
  );
}
