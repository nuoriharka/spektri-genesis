import type { Soul, Energy } from "./types";

// Sama logiikka, joka oli aiemmin being.ts:ssä
export function trustEngine(you: Soul, other: Soul): Energy | null {
  if (you.authenticity() && other.authenticity()) {
    const f1 = you.frequency();
    const f2 = other.frequency();
    const diff = Math.abs(f1 - f2);
    const resonance = 1 - diff / Math.max(f1, f2, 1);
    return resonance > 0.3 ? resonance : null;
  }
  return null;
}

export default trustEngine;
