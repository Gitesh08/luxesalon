"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium uppercase tracking-[0.05em] transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };

  const variantStyles = {
    primary:
      "bg-[var(--color-black)] text-[var(--color-cream)] hover:bg-[#262626] border border-[var(--color-black)]",
    accent:
      "bg-[var(--color-gold)] text-[var(--color-black)] hover:bg-[var(--color-gold-light)] border border-[var(--color-gold)] font-semibold",
    outline:
      "bg-transparent text-[var(--ink)] border border-[var(--color-border)] hover:border-[var(--color-black)] hover:bg-[var(--color-black)] hover:text-[var(--color-cream)]",
    ghost:
      "bg-transparent text-[var(--ink)] hover:bg-[var(--color-border)]/30 border border-transparent",
    danger:
      "bg-[#8B1A1A] text-white hover:bg-[#a62424] border border-[#8B1A1A]",
  };

  return (
    <button
      className={twMerge(
        clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
      )}
      style={{ borderRadius: 0 }}
      {...props}
    >
      {children}
    </button>
  );
}
