import { Token, TokenStatus } from "@/types/queue";

/**
 * Returns active tokens in their serving order:
 * 1. Currently active (called, checked_in)
 * 2. Standby tokens (placed immediately after currently served, before waiting)
 * 3. Waiting tokens (in FCFS order)
 */
export function getActiveQueue(tokens: Token[]): Token[] {
  const serving = tokens.filter(
    (t) => t.status === "checked_in" || t.status === "called"
  );
  const standby = tokens.filter((t) => t.status === "standby");
  const waiting = tokens.filter((t) => t.status === "waiting");

  return [...serving, ...standby, ...waiting];
}

export function getWaitingAndStandbyQueue(tokens: Token[]): Token[] {
  const standby = tokens.filter((t) => t.status === "standby");
  const waiting = tokens.filter((t) => t.status === "waiting");
  return [...standby, ...waiting];
}

export function getCompletedTokens(tokens: Token[]): Token[] {
  return tokens.filter(
    (t) => t.status === "checked_out" || t.status === "no_show"
  );
}

export function getCurrentlyServedToken(tokens: Token[]): Token | null {
  return (
    tokens.find((t) => t.status === "checked_in") ||
    tokens.find((t) => t.status === "called") ||
    null
  );
}

/**
 * State machine validator for token transitions:
 * WAITING -> CALLED -> CHECKED_IN -> CHECKED_OUT
 *                              ↘ NO_SHOW
 * WAITING -> STANDBY -> CALLED -> CHECKED_IN ...
 */
export function canTransition(current: TokenStatus, next: TokenStatus): boolean {
  if (current === next) return false;
  if (current === "checked_out" || current === "no_show") {
    // Terminal states cannot move backwards
    return false;
  }

  switch (next) {
    case "called":
      return current === "waiting" || current === "standby";
    case "checked_in":
      return (
        current === "called" || current === "waiting" || current === "standby"
      );
    case "checked_out":
      return current === "checked_in";
    case "standby":
      return current === "waiting" || current === "called";
    case "no_show":
      return (
        current === "waiting" || current === "called" || current === "standby"
      );
    default:
      return false;
  }
}
