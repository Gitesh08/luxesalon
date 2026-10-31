import { z } from "zod";

export const OfferDisplayTypeSchema = z.enum(["modal", "banner", "both"]);
export type OfferDisplayType = z.infer<typeof OfferDisplayTypeSchema>;

export const OfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  badge: z.string().optional(), // e.g. "20% OFF", "FREE"
  active: z.boolean(),
  displayType: OfferDisplayTypeSchema,
  imageUrl: z.string().optional(),
});
export type Offer = z.infer<typeof OfferSchema>;
