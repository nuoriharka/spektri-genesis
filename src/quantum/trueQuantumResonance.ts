import { QuantumCircuit } from '@quantum/libquantum';

export async function calculateTrueQuantumResonance(
  soulA: any,
  soulB: any
): Promise<number> {
  const circuit = new QuantumCircuit(2);
  circuit.h(0); // Hadamard portti luo superposition
  circuit.cx(0, 1); // CNOT portti luo lomittumisen
  circuit.measure(0);
  circuit.measure(1);
  const results = await circuit.execute(1000);
  const sameState = results.filter((r: any) => r[0] === r[1]).length;
  return sameState / 1000;
}
