import { AVG_DURATION } from "@/constants/services";
import { Token } from "@/types/queue";

export function estimateWait(position: number, queue: Token[]): number {
  if (position <= 0) return 0;
  return queue
    .slice(0, position)
    .reduce((acc, t) => acc + (AVG_DURATION[t.category] ?? 30), 0);
}

export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (isNaN(date.getTime())) return String(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  return timeStr;
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
