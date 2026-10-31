export const DEMO_CREDENTIALS = {
  id: "admin",
  password: "demo2024",
} as const;

export const STORAGE_KEYS = {
  queue: "luxesalon:queue",
  bookings: "luxesalon:bookings",
  menu: "luxesalon:menu",
  offers: "luxesalon:offers",
  adminSession: "luxesalon:admin_session",
  offerSeen: "luxesalon:offer_seen",
} as const;

export const BROADCAST_CHANNEL_NAME = "luxesalon";
