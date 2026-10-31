"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DEMO_CREDENTIALS } from "@/constants/demo";
import { shakeAnimation } from "@/lib/animations";

export interface AuthGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthGate({ isOpen, onClose, onSuccess }: AuthGateProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      adminId.trim() === DEMO_CREDENTIALS.id &&
      password.trim() === DEMO_CREDENTIALS.password
    ) {
      setHasError(false);
      onSuccess();
    } else {
      setHasError(true);
      setErrorMessage("Invalid credentials. Please use demo credentials.");
      setTimeout(() => setHasError(false), 1200);
    }
  };

  const handleFillDemo = () => {
    setAdminId(DEMO_CREDENTIALS.id);
    setPassword(DEMO_CREDENTIALS.password);
    setHasError(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              hasError
                ? { opacity: 1, scale: 1, ...shakeAnimation }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#1A1A1A] text-[#F0EBE1] border border-[#2F2F2A] shadow-2xl z-10 p-8"
            style={{ borderRadius: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8A8A7A] hover:text-[#F0EBE1] transition-colors p-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--color-gold)]/20 border border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#F0EBE1]">
                  Salon Director Portal
                </h3>
                <p className="text-xs text-[#8A8A7A] uppercase tracking-wider">
                  Authentication Required
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#8A8A7A] mb-1.5 font-medium">
                  Administrator ID
                </label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full bg-[#121210] border border-[#2F2F2A] px-4 py-3 text-sm text-[#F0EBE1] placeholder-[#4A4A40] focus:outline-none focus:border-[var(--color-gold)]"
                  style={{ borderRadius: 0 }}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#8A8A7A] mb-1.5 font-medium">
                  Security Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo2024"
                  required
                  className="w-full bg-[#121210] border border-[#2F2F2A] px-4 py-3 text-sm text-[#F0EBE1] placeholder-[#4A4A40] focus:outline-none focus:border-[var(--color-gold)]"
                  style={{ borderRadius: 0 }}
                />
              </div>

              {hasError && (
                <div className="flex items-center gap-2 text-xs text-[#E5484D] bg-[#E5484D]/10 border border-[#E5484D]/30 p-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="accent"
                className="w-full py-3.5 tracking-widest"
              >
                Access Dashboard
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#2F2F2A] text-center">
              <p className="text-xs text-[#8A8A7A] mb-2">
                Demo Credentials:
              </p>
              <div
                onClick={handleFillDemo}
                className="inline-flex items-center gap-2 bg-[#222220] hover:bg-[#282825] border border-[#2F2F2A] px-3 py-1.5 cursor-pointer text-xs font-mono text-[var(--color-gold)] transition-colors"
              >
                <span>ID: admin</span>
                <span>·</span>
                <span>PW: demo2024</span>
                <span className="text-[10px] text-[#8A8A7A] ml-1">(click to fill)</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
