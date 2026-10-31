"use client";

import React, { useState } from "react";
import { Download, Search } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Button } from "@/components/ui/Button";

export function BookingsManager() {
  const { bookings } = useBookings();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.token.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = [
      "Booking ID",
      "Token",
      "Customer Name",
      "Phone",
      "Service",
      "Date",
      "Time",
      "Price (INR)",
      "Status",
    ];

    const rows = filtered.map((b) => [
      b.id,
      b.token,
      `"${b.customerName}"`,
      `"${b.phone}"`,
      `"${b.service}"`,
      b.date,
      b.time,
      b.price,
      b.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `luxesalon_bookings_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#2F2F2A] pb-4">
        <div>
          <h2 className="font-serif text-3xl font-light text-[#F0EBE1]">
            Bookings Ledger
          </h2>
          <p className="text-xs text-[#8A8A7A]">
            Audit, filter, and export patron reservations and ticket values.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleExportCSV}
          className="border-[#2F2F2A] text-[#F0EBE1] hover:bg-[#2F2F2A] flex items-center gap-2 text-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A8A7A] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, token (#A-001), phone, or service..."
            className="w-full bg-[#222220] border border-[#2F2F2A] pl-9 pr-4 py-2 text-xs text-[#F0EBE1] placeholder-[#55554D] focus:outline-none focus:border-[var(--color-gold)]"
            style={{ borderRadius: 0 }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "confirmed", "checked_in", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono border transition-colors cursor-pointer shrink-0 ${
                statusFilter === st
                  ? "bg-[var(--color-gold)] text-black border-[var(--color-gold)] font-bold"
                  : "bg-[#222220] text-[#8A8A7A] border-[#2F2F2A] hover:text-[#F0EBE1]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div
        className="bg-[#222220] border border-[#2F2F2A] overflow-x-auto"
        style={{ borderRadius: 0 }}
      >
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2F2F2A] text-[#8A8A7A] uppercase tracking-wider bg-[#1E1E1C]">
              <th className="py-3.5 px-6 font-medium">Token</th>
              <th className="py-3.5 px-6 font-medium">Guest</th>
              <th className="py-3.5 px-6 font-medium">Service</th>
              <th className="py-3.5 px-6 font-medium">Date & Time</th>
              <th className="py-3.5 px-6 font-medium">Investment</th>
              <th className="py-3.5 px-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2F2F2A]">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-[#8A8A7A] italic"
                >
                  No reservation records matched the criteria.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#282825] transition-colors">
                  <td className="py-3.5 px-6">
                    <TokenBadge tokenId={b.token} size="sm" />
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-medium text-[#F0EBE1]">
                      {b.customerName}
                    </div>
                    <div className="text-[11px] text-[#8A8A7A] font-mono">
                      {b.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-[#F0EBE1]">{b.service}</td>
                  <td className="py-3.5 px-6">
                    <div className="text-[#F0EBE1]">{b.date}</div>
                    <div className="text-[11px] text-[#8A8A7A] font-mono">
                      {b.time}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-serif text-sm text-[#F0EBE1]">
                    ₹{b.price.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="capitalize font-mono text-[11px] text-[var(--color-gold)]">
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
