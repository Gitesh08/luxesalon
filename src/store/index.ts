import { create } from "zustand";
import { z } from "zod";
import { STORAGE_KEYS, DEMO_CREDENTIALS } from "@/constants/demo";
import { broadcast } from "@/lib/broadcast";
import {
  SEED_QUEUE,
  SEED_OFFERS,
  SEED_MENU,
  SEED_BOOKINGS,
} from "@/lib/seed";
import { generateNextTokenId } from "@/lib/token";
import { getTodayDateString } from "@/lib/time";
import {
  QueueState,
  QueueStateSchema,
  Token,
  ServiceCategory,
} from "@/types/queue";
import {
  Booking,
  BookingInput,
  BookingSchema,
} from "@/types/booking";
import { MenuItem, MenuItemSchema } from "@/types/menu";
import { Offer, OfferSchema } from "@/types/offer";
import { AdminSession, AdminSessionSchema } from "@/types/admin";

interface LuxeSalonState {
  // View mode
  currentView: "customer" | "admin";
  setView: (view: "customer" | "admin") => void;

  // Tracked customer token in browser
  trackedTokenId: string | null;
  setTrackedTokenId: (tokenId: string | null) => void;

  // Queue
  queue: QueueState;
  callToken: (tokenId: string) => void;
  checkIn: (tokenId: string) => void;
  checkOut: (tokenId: string) => void;
  markNoShow: (tokenId: string) => void;
  standby: (tokenId: string) => void;
  addWalkIn: (params: {
    customerName: string;
    phone: string;
    service: string;
    category: ServiceCategory;
  }) => Token;

  // Bookings
  bookings: Booking[];
  addBooking: (input: BookingInput) => { booking: Booking; token: Token };

  // Menu
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (id: string) => void;

  // Offers
  offers: Offer[];
  toggleOffer: (id: string) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (id: string, pw: string) => boolean;
  adminLogout: () => void;

  // Hydration & sync
  isHydrated: boolean;
  hydrateFromStorage: () => void;
  resetDemoData: () => void;
}

// Helpers for safe storage operations with Zod
function readFromStorage<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T
): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : fallback;
  } catch (err) {
    console.warn(`Failed to read/parse ${key} from storage:`, err);
    return fallback;
  }
}

function writeToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to write ${key} to storage:`, err);
  }
}

function readSessionStorage<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T
): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

export const useStore = create<LuxeSalonState>((set, get) => ({
  currentView: "customer",
  setView: (view) => set({ currentView: view }),

  trackedTokenId: null,
  setTrackedTokenId: (tokenId) => {
    set({ trackedTokenId: tokenId });
    if (typeof window !== "undefined") {
      if (tokenId) {
        localStorage.setItem("luxesalon:tracked_token", tokenId);
      } else {
        localStorage.removeItem("luxesalon:tracked_token");
      }
    }
  },

  queue: SEED_QUEUE,
  bookings: SEED_BOOKINGS,
  menuItems: SEED_MENU,
  offers: SEED_OFFERS,
  isAdminAuthenticated: false,
  isHydrated: false,

  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;

    const today = getTodayDateString();
    const storedQueue = readFromStorage(
      STORAGE_KEYS.queue,
      QueueStateSchema,
      SEED_QUEUE
    );

    // Reset daily if date changed
    const effectiveQueue =
      storedQueue.date === today
        ? storedQueue
        : { ...SEED_QUEUE, date: today };

    const storedBookings = readFromStorage(
      STORAGE_KEYS.bookings,
      z.array(BookingSchema),
      SEED_BOOKINGS
    );

    const storedMenu = readFromStorage(
      STORAGE_KEYS.menu,
      z.array(MenuItemSchema),
      SEED_MENU
    );

    const storedOffers = readFromStorage(
      STORAGE_KEYS.offers,
      z.array(OfferSchema),
      SEED_OFFERS
    );

    const adminSession = readSessionStorage(
      STORAGE_KEYS.adminSession,
      AdminSessionSchema,
      { authenticated: false, timestamp: 0 }
    );

    const trackedToken = localStorage.getItem("luxesalon:tracked_token");

    set({
      queue: effectiveQueue,
      bookings: storedBookings,
      menuItems: storedMenu,
      offers: storedOffers,
      isAdminAuthenticated: adminSession.authenticated,
      trackedTokenId: trackedToken || (effectiveQueue.tokens[4]?.id ?? null), // Default track Kavita's waiting token for demo
      isHydrated: true,
    });
  },

  resetDemoData: () => {
    if (typeof window === "undefined") return;
    const today = getTodayDateString();
    const freshQueue: QueueState = {
      ...SEED_QUEUE,
      date: today,
    };
    writeToStorage(STORAGE_KEYS.queue, freshQueue);
    writeToStorage(STORAGE_KEYS.bookings, SEED_BOOKINGS);
    writeToStorage(STORAGE_KEYS.menu, SEED_MENU);
    writeToStorage(STORAGE_KEYS.offers, SEED_OFFERS);
    localStorage.removeItem("luxesalon:offer_seen");
    localStorage.removeItem("luxesalon:tracked_token");

    broadcast.post({ type: "QUEUE_UPDATE", payload: freshQueue });
    broadcast.post({ type: "BOOKINGS_UPDATE", payload: SEED_BOOKINGS });
    broadcast.post({ type: "MENU_UPDATE", payload: SEED_MENU });
    broadcast.post({ type: "OFFERS_UPDATE", payload: SEED_OFFERS });

    set({
      queue: freshQueue,
      bookings: SEED_BOOKINGS,
      menuItems: SEED_MENU,
      offers: SEED_OFFERS,
      trackedTokenId: freshQueue.tokens[4]?.id ?? null,
    });
  },

  callToken: (tokenId) => {
    const current = get().queue;
    const now = new Date().toISOString();
    const nextTokens = current.tokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: "called" as const, calledAt: now };
      }
      return t;
    });

    const nextState: QueueState = {
      ...current,
      currentToken: tokenId,
      tokens: nextTokens,
    };

    set({ queue: nextState });
    writeToStorage(STORAGE_KEYS.queue, nextState);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextState });
  },

  checkIn: (tokenId) => {
    const current = get().queue;
    const now = new Date().toISOString();
    const nextTokens = current.tokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: "checked_in" as const, checkedInAt: now };
      }
      return t;
    });

    const nextState: QueueState = {
      ...current,
      currentToken: tokenId,
      tokens: nextTokens,
    };

    set({ queue: nextState });
    writeToStorage(STORAGE_KEYS.queue, nextState);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextState });
  },

  checkOut: (tokenId) => {
    const current = get().queue;
    const now = new Date().toISOString();
    const nextTokens = current.tokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: "checked_out" as const, checkedOutAt: now };
      }
      return t;
    });

    // If the checked-out token was the currentToken, clear currentToken or set next
    const nextCurrent =
      current.currentToken === tokenId ? null : current.currentToken;

    const nextState: QueueState = {
      ...current,
      currentToken: nextCurrent,
      tokens: nextTokens,
    };

    set({ queue: nextState });
    writeToStorage(STORAGE_KEYS.queue, nextState);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextState });
  },

  markNoShow: (tokenId) => {
    const current = get().queue;
    const nextTokens = current.tokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: "no_show" as const };
      }
      return t;
    });

    const nextCurrent =
      current.currentToken === tokenId ? null : current.currentToken;

    const nextState: QueueState = {
      ...current,
      currentToken: nextCurrent,
      tokens: nextTokens,
    };

    set({ queue: nextState });
    writeToStorage(STORAGE_KEYS.queue, nextState);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextState });
  },

  standby: (tokenId) => {
    const current = get().queue;
    const nextTokens = current.tokens.map((t) => {
      if (t.id === tokenId) {
        return { ...t, status: "standby" as const };
      }
      return t;
    });

    const nextState: QueueState = {
      ...current,
      currentToken:
        current.currentToken === tokenId ? null : current.currentToken,
      tokens: nextTokens,
    };

    set({ queue: nextState });
    writeToStorage(STORAGE_KEYS.queue, nextState);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextState });
  },

  addWalkIn: ({ customerName, phone, service, category }) => {
    const current = get().queue;
    const tokenId = generateNextTokenId(current.tokens);
    const now = new Date().toISOString();

    const newToken: Token = {
      id: tokenId,
      bookingId: `walkin-${Date.now()}`,
      customerName,
      phone,
      service,
      category,
      status: "waiting",
      createdAt: now,
    };

    const nextQueue: QueueState = {
      ...current,
      tokens: [...current.tokens, newToken],
    };

    set({ queue: nextQueue, trackedTokenId: tokenId });
    writeToStorage(STORAGE_KEYS.queue, nextQueue);
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextQueue });

    return newToken;
  },

  addBooking: (input) => {
    const currentQueue = get().queue;
    const currentBookings = get().bookings;
    const tokenId = generateNextTokenId(currentQueue.tokens);
    const now = new Date().toISOString();
    const bookingId = `b-${Date.now().toString().slice(-4)}`;

    const newBooking: Booking = {
      id: bookingId,
      token: tokenId,
      customerName: input.customerName,
      phone: input.phone,
      service: input.service,
      category: input.category,
      date: input.date,
      time: input.time,
      status: "confirmed",
      price: input.price,
      createdAt: now,
    };

    // Category mapping for queue
    const lowerCat = input.category.toLowerCase();
    const categoryType: ServiceCategory = lowerCat.includes("cut")
      ? "haircut"
      : lowerCat.includes("color")
      ? "color"
      : lowerCat.includes("treat")
      ? "treatment"
      : lowerCat.includes("brid")
      ? "bridal"
      : lowerCat.includes("styl")
      ? "styling"
      : "other";

    const newToken: Token = {
      id: tokenId,
      bookingId,
      customerName: input.customerName,
      phone: input.phone,
      service: input.service,
      category: categoryType,
      status: "waiting",
      createdAt: now,
    };

    const nextBookings = [newBooking, ...currentBookings];
    const nextQueue: QueueState = {
      ...currentQueue,
      tokens: [...currentQueue.tokens, newToken],
    };

    set({
      bookings: nextBookings,
      queue: nextQueue,
      trackedTokenId: tokenId,
    });

    writeToStorage(STORAGE_KEYS.bookings, nextBookings);
    writeToStorage(STORAGE_KEYS.queue, nextQueue);
    localStorage.setItem("luxesalon:tracked_token", tokenId);

    broadcast.post({ type: "BOOKINGS_UPDATE", payload: nextBookings });
    broadcast.post({ type: "QUEUE_UPDATE", payload: nextQueue });

    return { booking: newBooking, token: newToken };
  },

  updateMenuItem: (id, updates) => {
    const current = get().menuItems;
    const next = current.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );

    set({ menuItems: next });
    writeToStorage(STORAGE_KEYS.menu, next);
    broadcast.post({ type: "MENU_UPDATE", payload: next });
  },

  addMenuItem: (item) => {
    const current = get().menuItems;
    const newItem: MenuItem = {
      id: `m-custom-${Date.now()}`,
      ...item,
    };
    const next = [...current, newItem];

    set({ menuItems: next });
    writeToStorage(STORAGE_KEYS.menu, next);
    broadcast.post({ type: "MENU_UPDATE", payload: next });
  },

  deleteMenuItem: (id) => {
    const current = get().menuItems;
    const next = current.filter((item) => item.id !== id);

    set({ menuItems: next });
    writeToStorage(STORAGE_KEYS.menu, next);
    broadcast.post({ type: "MENU_UPDATE", payload: next });
  },

  toggleOffer: (id) => {
    const current = get().offers;
    const next = current.map((offer) =>
      offer.id === id ? { ...offer, active: !offer.active } : offer
    );

    set({ offers: next });
    writeToStorage(STORAGE_KEYS.offers, next);
    broadcast.post({ type: "OFFERS_UPDATE", payload: next });
  },

  updateOffer: (id, updates) => {
    const current = get().offers;
    const next = current.map((offer) =>
      offer.id === id ? { ...offer, ...updates } : offer
    );

    set({ offers: next });
    writeToStorage(STORAGE_KEYS.offers, next);
    broadcast.post({ type: "OFFERS_UPDATE", payload: next });
  },

  adminLogin: (id, pw) => {
    if (
      id === DEMO_CREDENTIALS.id &&
      pw === DEMO_CREDENTIALS.password
    ) {
      const session: AdminSession = {
        authenticated: true,
        timestamp: Date.now(),
      };
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          STORAGE_KEYS.adminSession,
          JSON.stringify(session)
        );
      }
      set({ isAdminAuthenticated: true, currentView: "admin" });
      broadcast.post({ type: "ADMIN_SESSION_UPDATE", payload: session });
      return true;
    }
    return false;
  },

  adminLogout: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEYS.adminSession);
    }
    set({ isAdminAuthenticated: false, currentView: "customer" });
    broadcast.post({
      type: "ADMIN_SESSION_UPDATE",
      payload: { authenticated: false, timestamp: 0 },
    });
  },
}));
