import { Token } from "@/types/queue";

/**
 * Generate next token in format "A-001", "A-002", etc.
 * Formatted for display as "#A-001".
 */
export function generateNextTokenId(existingTokens: Token[]): string {
  const prefix = "A";
  if (existingTokens.length === 0) {
    return `${prefix}-001`;
  }

  const numbers = existingTokens
    .map((t) => {
      const match = t.id.match(/[A-Z]-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = (maxNum + 1).toString().padStart(3, "0");
  return `${prefix}-${nextNum}`;
}

export function formatTokenDisplay(tokenId: string): string {
  return tokenId.startsWith("#") ? tokenId : `#${tokenId}`;
}
