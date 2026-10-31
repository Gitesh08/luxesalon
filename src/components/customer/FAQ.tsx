"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the Live Token Queue system function?",
    answer:
      "When you book or check in at the atelier, you receive an immutable token (e.g., #A-042). Our system calculates your position against active chair durations in real time. You can arrive exactly when called rather than waiting in the reception suite.",
  },
  {
    question: "What occurs if I arrive past my scheduled slot?",
    answer:
      "Our concierge places you on Standby. Unlike traditional salons that cancel late clients, Standby inserts your token directly after the currently served chair, before the next waiting appointment.",
  },
  {
    question: "How far in advance should bridal appointments be arranged?",
    answer:
      "We recommend scheduling Imperial Bridal styling 4 to 8 weeks in advance. A complimentary consultation is included with every bridal package to customize drapery, hair accessories, and floral integration.",
  },
  {
    question: "What hair care philosophies guide your treatments?",
    answer:
      "We strictly utilize organic amino acid bond builders, botanical keratins, and cold jade stone scalp exfoliation. All formulas are free from formaldehyde, sulfates, and synthetic perfumes.",
  },
  {
    question: "Can I transfer or cancel my reservation?",
    answer:
      "Reservations may be modified up to 2 hours prior without penalty. Because each slot reserves a private master stylist, late cancellations are gracefully accommodated on our next open calendar cycle.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--ground)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 border-b border-[var(--color-border)] pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold block mb-2">
            Inquiries & Protocol
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[var(--ink)] leading-tight mb-4">
            Frequently Inquired
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)]">
            Essential protocols governing our private styling suites and digital
            queue architecture.
          </p>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)] group-hover:text-[var(--color-gold)] transition-colors">
                    {faq.question}
                  </span>
                  <span className="shrink-0 p-1 border border-[var(--color-border)] group-hover:border-[var(--color-black)] transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[var(--color-gold)]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[var(--ink-muted)]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <p className="text-sm sm:text-base text-[var(--ink-muted)] font-light leading-relaxed mt-4 max-w-2xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
