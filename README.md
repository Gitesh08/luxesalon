# LuxeSalon — Salon Management & Customer Sanctuary Platform

> **Live Demo & Presentation Build**  
> Luxury salon operating system pairing a customer booking sanctuary with an executive operations cockpit.

---

## 💎 Key Features

- **"The Appointment Card" Aesthetic:** Bespoke luxury styling inspired by French letterpress stationery. Warm cream backgrounds, charcoal contrast, brushed gold (`#B8963E`) accents, sharp zero-radius edges, zero generic card grids.
- **Dual-View Architecture:** Customer View and Director Admin Suite running side-by-side.
- **Zero-Backend Real-Time Synchronization:** Sub-200ms reactive cross-tab sync powered by `localStorage` + `BroadcastChannel('luxesalon')`.
- **FCFS Queue Commander:** State-machine queue tracking with live wait estimation, Standby late-arrival handling, and walk-in generator.
- **Frictionless Booking Wizard:** 5-step intuitive flow with horizontal date rail, availability matrix, and simulated OTP verification.
- **Executive Bento Overview:** Live chamber occupancy, today's appointments, multi-period revenue analytics, and interactive calendar.
- **Live Menu & Offer Switchboard:** Real-time CMS updates reflecting instantly on customer screens.
- **100% Clean UI:** No watermarks or intrusive badges.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation & Run

```bash
cd luxesalon
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🔑 Demo Access Credentials

- **Customer View:** Unrestricted public client access
- **Admin View Toggle:** Click the floating pill in the bottom-right corner
  - **Director ID:** `admin`
  - **Password:** `demo2024`
- **Reset Demo Data:** Click the **"Reset Data"** button in the Admin top status bar or sidebar to restore the pristine 15-booking, 5-queue seed state at any time.

---

## 🎬 Walkthrough Recording Guide

For the full scene-by-scene presenter script, dual-window layout guidelines, and talk track, refer to:
[DEMO_WALKTHROUGH_SCRIPT.md](file:///C:/Users/GITESH/.gemini/antigravity/brain/f9cdd75b-8fee-41ba-a990-7b9ab06a15e8/DEMO_WALKTHROUGH_SCRIPT.md)
