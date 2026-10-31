"use client";

import React, { useState } from "react";
import { ToggleLeft, ToggleRight, Edit3, Check } from "lucide-react";
import { useOffers } from "@/hooks/useOffers";
import { Offer, OfferDisplayType } from "@/types/offer";
import { Button } from "@/components/ui/Button";

export function OfferManager() {
  const { offers, toggleOffer, updateOffer } = useOffers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBadge, setEditBadge] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDisplayType, setEditDisplayType] = useState<OfferDisplayType>("both");

  const startEdit = (offer: Offer) => {
    setEditingId(offer.id);
    setEditTitle(offer.title);
    setEditBadge(offer.badge ?? "");
    setEditDescription(offer.description);
    setEditDisplayType(offer.displayType);
  };

  const saveEdit = (id: string) => {
    updateOffer(id, {
      title: editTitle,
      badge: editBadge || undefined,
      description: editDescription,
      displayType: editDisplayType,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#2F2F2A] pb-4">
        <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
          Campaign & Offer Controller
        </h2>
        <p className="text-xs text-[#8A8A7A]">
          Configure invitations, banner tickers, and first-visit splash modals.
          Changes broadcast live across client tabs.
        </p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => {
          const isEditing = editingId === offer.id;

          return (
            <div
              key={offer.id}
              className={`p-6 border transition-colors ${
                offer.active
                  ? "bg-[#222220] border-[#2F2F2A]"
                  : "bg-[#1A1A1A] border-[#252522] opacity-75"
              }`}
              style={{ borderRadius: 0 }}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider text-[#8A8A7A] mb-1">
                        Offer Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
                        style={{ borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#8A8A7A] mb-1">
                        Badge (e.g. 20% OFF)
                      </label>
                      <input
                        type="text"
                        value={editBadge}
                        onChange={(e) => setEditBadge(e.target.value)}
                        className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)] uppercase"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8A7A] mb-1">
                      Description
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-xs text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8A7A]">
                        Placement:
                      </span>
                      {(["modal", "banner", "both"] as OfferDisplayType[]).map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setEditDisplayType(type)}
                            className={`px-2.5 py-1 text-[10px] font-mono uppercase border cursor-pointer ${
                              editDisplayType === type
                                ? "bg-[var(--color-gold)] text-black border-[var(--color-gold)] font-bold"
                                : "bg-[#121210] text-[#8A8A7A] border-[#2F2F2A]"
                            }`}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        className="text-xs py-1.5 px-3 border-[#2F2F2A] text-[#8A8A7A]"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={() => saveEdit(offer.id)}
                        className="text-xs py-1.5 px-4 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save & Broadcast</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2.5">
                      {offer.badge && (
                        <span className="bg-[var(--color-gold)] text-black text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider">
                          {offer.badge}
                        </span>
                      )}
                      <h4 className="font-serif text-xl font-medium text-[#F0EBE1]">
                        {offer.title}
                      </h4>
                      <span className="text-[10px] font-mono uppercase bg-[#1A1A1A] text-[#8A8A7A] border border-[#2F2F2A] px-2 py-0.5">
                        {offer.displayType}
                      </span>
                    </div>

                    <p className="text-xs text-[#8A8A7A] leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(offer)}
                      className="px-3 py-1.5 border border-[#2F2F2A] hover:border-[#8A8A7A] text-[#8A8A7A] hover:text-[#F0EBE1] text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleOffer(offer.id)}
                      className="flex items-center gap-2 text-xs font-mono cursor-pointer"
                      title={offer.active ? "Turn Off" : "Turn On"}
                    >
                      {offer.active ? (
                        <>
                          <span className="text-[var(--color-gold)]">Active</span>
                          <ToggleRight className="w-7 h-7 text-[var(--color-gold)]" />
                        </>
                      ) : (
                        <>
                          <span className="text-[#55554D]">Inactive</span>
                          <ToggleLeft className="w-7 h-7 text-[#55554D]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
