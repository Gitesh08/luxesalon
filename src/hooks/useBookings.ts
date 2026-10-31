"use client";

import { useStore } from "@/store";

export function useBookings() {
  const bookings = useStore((state) => state.bookings);
  const addBooking = useStore((state) => state.addBooking);

  return {
    bookings,
    addBooking,
  };
}
