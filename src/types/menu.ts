import { z } from "zod";

export const MenuItemSchema = z.object({
  id: z.string(),
  category: z.string(), // "Haircut", "Hair Color", "Hair Treatment", "Bridal", "Styling"
  name: z.string(),
  description: z.string(),
  duration: z.number(), // minutes
  price: z.number(), // INR
  popular: z.boolean().optional(),
});
export type MenuItem = z.infer<typeof MenuItemSchema>;
