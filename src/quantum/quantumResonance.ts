import { WaveFunction } from './waveFunction';

export function calculateQuantumResonance(
  waveFnA: WaveFunction,
  waveFnB: WaveFunction
): number {
  let overlap = 0;
  for (let i = 0; i < waveFnA.positions.length; i++) {
    const psiA = waveFnA.amplitudes[i];
    const psiB = waveFnB.amplitudes[i];
    overlap += psiA.conjugate().multiply(psiB).real;
  }
  const normA = waveFnA.normalizationConstant();
  const normB = waveFnB.normalizationConstant();
  return overlap / (normA * normB);
}
