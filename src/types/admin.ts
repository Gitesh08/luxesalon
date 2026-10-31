import { z } from "zod";

export const AdminSessionSchema = z.object({
  authenticated: z.boolean(),
  timestamp: z.number(),
});
export type AdminSession = z.infer<typeof AdminSessionSchema>;
