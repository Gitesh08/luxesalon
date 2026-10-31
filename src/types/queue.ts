import { z } from "zod";

export const TokenStatusSchema = z.enum([
  "waiting",
  "called",
  "checked_in",
  "checked_out",
  "no_show",
  "standby",
]);
export type TokenStatus = z.infer<typeof TokenStatusSchema>;

export const ServiceCategorySchema = z.enum([
  "haircut",
  "color",
  "treatment",
  "bridal",
  "styling",
  "other",
]);
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

export const TokenSchema = z.object({
  id: z.string(), // e.g. "A-001"
  bookingId: z.string(),
  customerName: z.string(),
  phone: z.string().optional(),
  service: z.string(),
  category: ServiceCategorySchema,
  status: TokenStatusSchema,
  createdAt: z.string(),
  calledAt: z.string().optional(),
  checkedInAt: z.string().optional(),
  checkedOutAt: z.string().optional(),
});
export type Token = z.infer<typeof TokenSchema>;

export const QueueStateSchema = z.object({
  currentToken: z.string().nullable(),
  tokens: z.array(TokenSchema),
  date: z.string(), // ISO date string (YYYY-MM-DD)
});
export type QueueState = z.infer<typeof QueueStateSchema>;
