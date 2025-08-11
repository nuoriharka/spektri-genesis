import { AdaptiveVectorSoul } from "./adaptiveVectorSoul";

// Kosiniresonanssi × taajuusmodulaatio
export function trustEngineV2(a: AdaptiveVectorSoul, b: AdaptiveVectorSoul): number | null {
  if (!a.authenticity() || !b.authenticity()) return null;
  const dot = a.v.reduce((sum, v, i) => sum + v * b.v[i], 0);
  const normA = Math.sqrt(a.v.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.v.reduce((sum, v) => sum + v * v, 0));
  const cosine = dot / (normA * normB + 1e-8);
  const freqMod = 1 - Math.abs(a.frequency() - b.frequency()) / Math.max(a.frequency(), b.frequency(), 1);
  const resonance = 0.5 * cosine + 0.5 * freqMod;
  return resonance > 0.3 ? resonance : null;
}
