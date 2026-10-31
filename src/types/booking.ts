import { z } from "zod";

export const BookingStatusSchema = z.enum([
  "confirmed",
  "checked_in",
  "completed",
  "cancelled",
  "no_show",
]);
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

export const BookingSchema = z.object({
  id: z.string(),
  token: z.string(), // e.g. "A-042"
  customerName: z.string(),
  phone: z.string(),
  service: z.string(),
  category: z.string(),
  date: z.string(), // "2026-10-24" or "24 Oct 2026"
  time: z.string(), // "2:30 PM"
  status: BookingStatusSchema,
  price: z.number(),
  createdAt: z.string(),
});
export type Booking = z.infer<typeof BookingSchema>;

export const BookingInputSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string(),
  category: z.string(),
  date: z.string(),
  time: z.string(),
  price: z.number(),
});
export type BookingInput = z.infer<typeof BookingInputSchema>;
