"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { Booking } from "@/types/booking";
import { useBookings } from "@/hooks/useBookings";
import { useStore } from "@/store";
import { Button } from "@/components/ui/Button";
import { StepService } from "./StepService";
import { StepDate } from "./StepDate";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepConfirm } from "./StepConfirm";

export interface BookingFlowProps {
  preselectedService?: MenuItem | null;
}

export function BookingFlow({ preselectedService }: BookingFlowProps) {
  const { addBooking } = useBookings();
  const setTrackedTokenId = useStore((state) => state.setTrackedTokenId);
  const shouldReduce = useReducedMotion();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<MenuItem | null>(
    preselectedService ?? null
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Sync preselected service if passed
  React.useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate;
    if (step === 3) return !!selectedTime;
    if (step === 4)
      return (
        customerName.trim().length >= 2 &&
        phone.trim().length >= 10 &&
        isOtpVerified
      );
    return false;
  };

  const handleNext = () => {
    if (step === 4) {
      if (!selectedService) return;

      const { booking, token } = addBooking({
        customerName,
        phone,
        service: selectedService.name,
        category: selectedService.category,
        date: selectedDate,
        time: selectedTime,
        price: selectedService.price,
      });

      setCompletedBooking(booking);
      setTrackedTokenId(token.id);
      setStep(5);
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setCustomerName("");
    setPhone("");
    setIsOtpVerified(false);
    setCompletedBooking(null);
  };

  const handleTrackQueue = () => {
    const trackerEl = document.getElementById("queue-tracker");
    if (trackerEl) {
      trackerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stepsLabel = [
    "Experience",
    "Date",
    "Hour",
    "Guest Verification",
    "Appointment Card",
  ];

  return (
    <section
      id="booking-section"
      className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--surface)]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold block mb-2">
            Seamless Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[var(--ink)] leading-tight mb-4">
            Reserve Your Appointment
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-lg mx-auto">
            Synchronized live scheduling with instant queue token generation.
          </p>
        </div>

        {/* Step Progress Indicators */}
        {step < 5 && (
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6 mb-8 overflow-x-auto">
            {stepsLabel.slice(0, 4).map((label, index) => {
              const stepNumber = index + 1;
              const isCurrent = step === stepNumber;
              const isPast = step > stepNumber;

              return (
                <div
                  key={label}
                  className="flex items-center gap-2 shrink-0 px-2"
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center font-mono text-xs border ${
                      isCurrent
                        ? "bg-[var(--color-black)] text-[var(--color-cream)] border-[var(--color-black)] font-bold"
                        : isPast
                        ? "bg-[var(--color-gold)] text-[var(--color-black)] border-[var(--color-gold)]"
                        : "bg-[var(--ground)] text-[var(--ink-muted)] border-[var(--color-border)]"
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : stepNumber}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-wider hidden sm:inline ${
                      isCurrent
                        ? "font-semibold text-[var(--ink)]"
                        : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Wizard Step Content */}
        <div
          className="bg-[var(--ground)] border border-[var(--color-border)] p-6 sm:p-10"
          style={{ borderRadius: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <StepService
                  selectedService={selectedService}
                  onSelect={(item) => setSelectedService(item)}
                />
              )}

              {step === 2 && (
                <StepDate
                  selectedDate={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                />
              )}

              {step === 3 && (
                <StepTime
                  selectedTime={selectedTime}
                  onSelect={(time) => setSelectedTime(time)}
                />
              )}

              {step === 4 && (
                <StepDetails
                  name={customerName}
                  phone={phone}
                  isOtpVerified={isOtpVerified}
                  onNameChange={(v) => setCustomerName(v)}
                  onPhoneChange={(v) => setPhone(v)}
                  onVerifyOtp={(v) => setIsOtpVerified(v)}
                />
              )}

              {step === 5 && completedBooking && (
                <StepConfirm
                  booking={completedBooking}
                  onReset={handleReset}
                  onTrackQueue={handleTrackQueue}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Wizard Controls */}
          {step < 5 && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-[var(--color-border)]">
              {step > 1 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center gap-2 text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="accent"
                size="md"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 text-xs tracking-widest"
              >
                <span>
                  {step === 4 ? "Issue Appointment Token" : "Continue"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
