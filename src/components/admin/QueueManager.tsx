"use client";

import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  LogOut,
  Clock,
  UserX,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import { useQueue } from "@/hooks/useQueue";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Token, ServiceCategory } from "@/types/queue";
import { SERVICE_CATEGORIES } from "@/constants/services";

export function QueueManager() {
  const {
    queue,
    callToken,
    checkIn,
    checkOut,
    markNoShow,
    standby,
    addWalkIn,
  } = useQueue();

  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [walkInName, setWalkInName] = useState("");
  const [walkInPhone, setWalkInPhone] = useState("");
  const [walkInService, setWalkInService] = useState("Architectural Precision Cut");
  const [walkInCategory, setWalkInCategory] = useState<ServiceCategory>("haircut");
  const [confirmNoShowId, setConfirmNoShowId] = useState<string | null>(null);

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;

    addWalkIn({
      customerName: walkInName,
      phone: walkInPhone || "+91 99999 00000",
      service: walkInService,
      category: walkInCategory,
    });

    setWalkInName("");
    setWalkInPhone("");
    setIsWalkInModalOpen(false);
  };

  const handleNoShowConfirm = (tokenId: string) => {
    if (confirmNoShowId === tokenId) {
      markNoShow(tokenId);
      setConfirmNoShowId(null);
    } else {
      setConfirmNoShowId(tokenId);
      setTimeout(() => setConfirmNoShowId(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Walk-in action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#2F2F2A] pb-4">
        <div>
          <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
            Live Queue Orchestrator
          </h2>
          <p className="text-xs text-[#8A8A7A]">
            Manage client states: Call, Check-In, Standby, Check-Out, and No-Show.
          </p>
        </div>

        <Button
          size="sm"
          variant="accent"
          onClick={() => setIsWalkInModalOpen(true)}
          className="flex items-center gap-2 text-xs py-2.5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Walk-In Guest</span>
        </Button>
      </div>

      {/* Main Table */}
      <div
        className="bg-[#222220] border border-[#2F2F2A] overflow-x-auto"
        style={{ borderRadius: 0 }}
      >
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2F2F2A] text-[#8A8A7A] uppercase tracking-wider bg-[#1E1E1C]">
              <th className="py-4 px-6 font-medium">Token</th>
              <th className="py-4 px-6 font-medium">Guest & Phone</th>
              <th className="py-4 px-6 font-medium">Service & Category</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Chair Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2F2F2A]">
            {queue.tokens.map((token) => {
              const isServing =
                token.status === "checked_in" || token.status === "called";
              const isDone =
                token.status === "checked_out" || token.status === "no_show";

              return (
                <tr
                  key={token.id}
                  className={`transition-colors ${
                    isServing
                      ? "bg-[var(--color-gold)]/10"
                      : isDone
                      ? "opacity-50"
                      : "hover:bg-[#282825]"
                  }`}
                >
                  <td className="py-4 px-6">
                    <TokenBadge
                      tokenId={token.id}
                      status={token.status}
                      size="md"
                    />
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-medium text-[#F0EBE1]">
                      {token.customerName}
                    </div>
                    <div className="text-[11px] text-[#8A8A7A] font-mono">
                      {token.phone ?? "N/A"}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-[#F0EBE1]">{token.service}</div>
                    <div className="text-[10px] text-[#8A8A7A] uppercase font-mono">
                      {token.category}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="capitalize text-xs font-mono text-[#F0EBE1]">
                      {token.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      {/* Call Action */}
                      {(token.status === "waiting" ||
                        token.status === "standby") && (
                        <button
                          onClick={() => callToken(token.id)}
                          className="px-2.5 py-1 bg-[var(--color-gold)] text-black font-semibold hover:bg-[var(--color-gold-light)] flex items-center gap-1 cursor-pointer transition-colors"
                          title="Call client to chair"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Call</span>
                        </button>
                      )}

                      {/* Check In Action */}
                      {(token.status === "called" ||
                        token.status === "waiting" ||
                        token.status === "standby") && (
                        <button
                          onClick={() => checkIn(token.id)}
                          className="px-2.5 py-1 bg-[#2D6A4F] text-white hover:bg-[#388463] flex items-center gap-1 cursor-pointer transition-colors"
                          title="Seat client in chair"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>In Chair</span>
                        </button>
                      )}

                      {/* Check Out Action */}
                      {token.status === "checked_in" && (
                        <button
                          onClick={() => checkOut(token.id)}
                          className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2F2F2A] text-[#F0EBE1] hover:bg-[#282825] flex items-center gap-1 cursor-pointer transition-colors"
                          title="Complete service"
                        >
                          <LogOut className="w-3 h-3 text-[var(--color-gold)]" />
                          <span>Check Out</span>
                        </button>
                      )}

                      {/* Standby Action (Inserts right after currently served!) */}
                      {(token.status === "waiting" ||
                        token.status === "called") && (
                        <button
                          onClick={() => standby(token.id)}
                          className="px-2.5 py-1 bg-[#B5451B] text-white hover:bg-[#cf5121] flex items-center gap-1 cursor-pointer transition-colors"
                          title="Guest arrived late — soft bump right after current"
                        >
                          <Clock className="w-3 h-3" />
                          <span>Standby</span>
                        </button>
                      )}

                      {/* No Show Action (Requires 1 confirm click) */}
                      {!isDone && (
                        <button
                          onClick={() => handleNoShowConfirm(token.id)}
                          className={`px-2 py-1 flex items-center gap-1 cursor-pointer transition-colors ${
                            confirmNoShowId === token.id
                              ? "bg-[#8B1A1A] text-white font-bold"
                              : "text-[#8A8A7A] hover:text-[#8B1A1A]"
                          }`}
                          title="Mark client as no-show"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          <span>
                            {confirmNoShowId === token.id ? "Confirm?" : "No Show"}
                          </span>
                        </button>
                      )}

                      {isDone && (
                        <span className="text-[11px] text-[#6B6B5C] italic">
                          Archived
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Walk-in Guest Creation Modal */}
      <Modal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        title="Register Walk-In Patron"
        className="bg-[#1A1A1A] text-[#F0EBE1] border-[#2F2F2A]"
      >
        <form onSubmit={handleWalkInSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Patron Name
            </label>
            <input
              type="text"
              value={walkInName}
              onChange={(e) => setWalkInName(e.target.value)}
              placeholder="e.g. Rohini Sen"
              required
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={walkInPhone}
              onChange={(e) => setWalkInPhone(e.target.value)}
              placeholder="+91 99999 12345"
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)] font-mono"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Requested Service
            </label>
            <input
              type="text"
              value={walkInService}
              onChange={(e) => setWalkInService(e.target.value)}
              required
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A8A7A] mb-1">
              Category (Calculates estimated duration)
            </label>
            <select
              value={walkInCategory}
              onChange={(e) =>
                setWalkInCategory(e.target.value as ServiceCategory)
              }
              className="w-full bg-[#121210] border border-[#2F2F2A] px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[var(--color-gold)]"
              style={{ borderRadius: 0 }}
            >
              <option value="haircut">Haircut (30m)</option>
              <option value="color">Hair Color (90m)</option>
              <option value="treatment">Hair Treatment (45m)</option>
              <option value="bridal">Bridal (120m)</option>
              <option value="styling">Styling (45m)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsWalkInModalOpen(false)}
              className="border-[#2F2F2A] text-[#8A8A7A]"
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent" size="sm">
              Issue Live Token
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
