import { BROADCAST_CHANNEL_NAME } from "@/constants/demo";

export type BroadcastEvent =
  | { type: "QUEUE_UPDATE"; payload: unknown }
  | { type: "BOOKINGS_UPDATE"; payload: unknown }
  | { type: "MENU_UPDATE"; payload: unknown }
  | { type: "OFFERS_UPDATE"; payload: unknown }
  | { type: "ADMIN_SESSION_UPDATE"; payload: unknown };

class SafeBroadcastChannel {
  private channel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        this.channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      } catch (err) {
        console.warn("BroadcastChannel initialization error:", err);
      }
    }
  }

  public post(event: BroadcastEvent): void {
    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch (err) {
        console.warn("BroadcastChannel postMessage failed:", err);
      }
    }
  }

  public subscribe(handler: (event: BroadcastEvent) => void): () => void {
    if (!this.channel) {
      return () => {};
    }

    const listener = (msgEvent: MessageEvent<BroadcastEvent>) => {
      try {
        handler(msgEvent.data);
      } catch (err) {
        console.error("Error processing broadcast event:", err);
      }
    };

    this.channel.addEventListener("message", listener);
    return () => {
      this.channel?.removeEventListener("message", listener);
    };
  }
}

export const broadcast = new SafeBroadcastChannel();
