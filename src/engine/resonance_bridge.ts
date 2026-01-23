import path from 'node:path';
import { createRequire } from 'node:module';

let native: { getPhase: () => number; calculateCoherence: (hash: string, resonance: number, score: number) => number } | null = null;

const loadNative = async () => {
  if (native) return native;
  if (typeof process === 'undefined' || !process.versions?.node) return null;
  try {
    const require = createRequire(__filename);
    native = require(path.resolve(process.cwd(), 'src/engine/resonance_432/build/Release/resonance_432.node'));
    return native;
  } catch {
    return null;
  }
};

export const getPhase = async (): Promise<number> => {
  const loaded = await loadNative();
  if (loaded) return loaded.getPhase();
  const t = (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;
  const phase = (t * 432) % 1;
  return phase < 0 ? phase + 1 : phase;
};

export const calculateCoherence = async (
  hash: string,
  resonance: number,
  score: number
): Promise<number> => {
  const loaded = await loadNative();
  if (loaded) return loaded.calculateCoherence(hash, resonance, score);
  const hashOk = typeof hash === 'string' && hash.length === 64;
  const resonanceOk = resonance > 0;
  if (hashOk && resonanceOk) return 1;
  if (!hashOk) return 0.2;
  if (!resonanceOk) return 0.4;
  return 0.7;
};
