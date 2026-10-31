"use client";

import React, { useState } from "react";
import { User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface StepDetailsProps {
  name: string;
  phone: string;
  isOtpVerified: boolean;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onVerifyOtp: (verified: boolean) => void;
}

export function StepDetails({
  name,
  phone,
  isOtpVerified,
  onNameChange,
  onPhoneChange,
  onVerifyOtp,
}: StepDetailsProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const DEMO_OTP = "8824";

  const handleSendOtp = () => {
    if (phone.trim().length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === DEMO_OTP || otpCode === "1234") {
      onVerifyOtp(true);
    } else {
      alert("Invalid code. Please enter the demo code: 8824");
    }
  };

  const handleAutoFillOtp = () => {
    setOtpCode(DEMO_OTP);
    onVerifyOtp(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--ink)]">
          4. Guest Information & Verification
        </h3>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
          We guarantee privacy. A live token is linked to your contact for digital queue sync.
        </p>
      </div>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--ink-muted)] font-medium mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[var(--ink-muted)] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Shalini Roy"
              className="w-full bg-[var(--surface)] border border-[var(--color-border)] pl-10 pr-4 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--ink-muted)] font-medium mb-1.5">
            Indian Mobile Number (SMS Token Delivery)
          </label>
          <div className="flex gap-2">
            <span
              className="bg-[var(--surface)] border border-[var(--color-border)] px-3.5 py-3 text-sm font-mono text-[var(--ink-muted)] shrink-0 flex items-center"
              style={{ borderRadius: 0 }}
            >
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="98765 43210"
              maxLength={12}
              className="w-full bg-[var(--surface)] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--ink)] font-mono focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
            {!isOtpVerified && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSendOtp}
                disabled={phone.trim().length < 10}
                className="shrink-0 text-xs px-4"
              >
                {otpSent ? "Resend" : "Send OTP"}
              </Button>
            )}
          </div>
        </div>

        {otpSent && !isOtpVerified && (
          <div
            className="p-4 bg-[var(--surface)] border border-[var(--color-border)] mt-4 space-y-3"
            style={{ borderRadius: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[var(--ink-muted)] font-medium">
                Enter 4-Digit Security Code
              </span>
              <button
                type="button"
                onClick={handleAutoFillOtp}
                className="text-[11px] text-[var(--color-gold)] underline font-medium hover:text-[var(--color-black)] cursor-pointer"
              >
                Autofill Demo Code ({DEMO_OTP})
              </button>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="8824"
                maxLength={4}
                className="w-32 tracking-[0.4em] font-mono text-center text-lg bg-[var(--ground)] border border-[var(--color-border)] py-2 text-[var(--ink)] focus:outline-none focus:border-[var(--color-gold)]"
                style={{ borderRadius: 0 }}
              />
              <Button
                type="button"
                size="sm"
                variant="accent"
                onClick={handleVerify}
                className="text-xs px-5"
              >
                Verify Code
              </Button>
            </div>
          </div>
        )}

        {isOtpVerified && (
          <div className="flex items-center gap-2.5 p-3.5 bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Identity verified successfully. Token ready to be generated.</span>
          </div>
        )}
      </div>
    </div>
  );
}
