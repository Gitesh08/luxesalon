"use client";

import React from "react";
import { formatTokenDisplay } from "@/lib/token";
import { TokenStatus } from "@/types/queue";

export interface TokenBadgeProps {
  tokenId: string;
  status?: TokenStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TokenBadge({
  tokenId,
  status,
  size = "md",
  className = "",
}: TokenBadgeProps) {
  const display = formatTokenDisplay(tokenId);

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs tracking-wider",
    md: "px-3.5 py-1.5 text-sm tracking-widest",
    lg: "px-5 py-2.5 text-lg font-serif tracking-widest",
  };

  const statusStyles: Record<TokenStatus, string> = {
    waiting: "bg-[var(--surface)] text-[var(--ink)] border-[var(--color-border)]",
    called: "bg-[var(--color-gold)] text-[var(--color-black)] border-[var(--color-gold)] font-bold animate-pulse",
    checked_in: "bg-[#2D6A4F] text-[#F5F0E8] border-[#2D6A4F] font-semibold",
    checked_out: "bg-[var(--color-border)]/50 text-[var(--color-muted)] border-transparent line-through",
    standby: "bg-[#B5451B] text-[#F5F0E8] border-[#B5451B] font-semibold",
    no_show: "bg-[#8B1A1A]/20 text-[#8B1A1A] border-[#8B1A1A]/40 line-through",
  };

  const colorClass = status
    ? statusStyles[status]
    : "bg-[var(--color-gold)]/15 text-[var(--color-gold)] border-[var(--color-gold)]";

  return (
    <span
      className={`inline-flex items-center justify-center font-mono uppercase border ${sizeClasses[size]} ${colorClass} ${className}`}
      style={{ borderRadius: 0 }}
    >
      {display}
    </span>
  );
}
