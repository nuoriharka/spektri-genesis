import { QuantumRNG } from 'qiskit.js';

export async function getQuantumRandom(): Promise<number> {
  const qrng = new QuantumRNG();
  return await qrng.generateRandomNumber();
}
