import { ServiceCategory } from "@/types/queue";

export const SERVICE_CATEGORIES = [
  "Haircut",
  "Hair Color",
  "Hair Treatment",
  "Bridal",
  "Styling",
] as const;

export const AVG_DURATION: Record<ServiceCategory, number> = {
  haircut: 30,
  color: 90,
  treatment: 45,
  bridal: 120,
  styling: 45,
  other: 30,
};

export function mapCategoryToServiceCategory(cat: string): ServiceCategory {
  const normalized = cat.toLowerCase();
  if (normalized.includes("cut")) return "haircut";
  if (normalized.includes("color")) return "color";
  if (normalized.includes("treat")) return "treatment";
  if (normalized.includes("brid")) return "bridal";
  if (normalized.includes("styl")) return "styling";
  return "other";
}
