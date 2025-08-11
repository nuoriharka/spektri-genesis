import { Soul } from "../being/types";

export class EntanglementField {
  private graph: Map<string, Map<string, number>> = new Map();
  private tau = 30_000; // ms, decoherence time constant
  private alpha = 0.05; // propagation strength

  link(a: Soul, b: Soul, weight = 0.6): void {
    if (a.id === b.id) return;
    this.setWeight(a.id, b.id, weight);
    this.setWeight(b.id, a.id, weight);
  }

  private setWeight(from: string, to: string, weight: number): void {
    if (!this.graph.has(from)) this.graph.set(from, new Map());
    this.graph.get(from)!.set(to, Math.max(0, Math.min(1, weight)));
  }

  getWeight(a: string, b: string): number {
    return this.graph.get(a)?.get(b) ?? 0;
  }

  getNeighbors(id: string): string[] {
    return Array.from(this.graph.get(id)?.keys() || []);
  }

  decay(dtMs: number): void {
    const k = Math.exp(-dtMs / this.tau);
    
    for (const [source, targets] of this.graph) {
      for (const [target, weight] of targets) {
        targets.set(target, weight * k);
        // Poista heikot linkit
        if (weight * k < 0.01) targets.delete(target);
      }
    }
  }

  propagateDelta(
    sourceId: string, 
    delta: number[],
    getSoul: (id: string) => Soul | null
  ): void {
    const targets = this.graph.get(sourceId);
    if (!targets) return;

    for (const [targetId, weight] of targets) {
      const target = getSoul(targetId);
      if (!target || !('v' in target)) continue;
      
      const vectorSoul = target as { v: number[] };
      const newVector = vectorSoul.v.map((val, i) => {
        const update = this.alpha * weight * delta[i];
        return val + update;
      });
      
      vectorSoul.v = newVector;
    }
  }

  // Tallenna ja lataa tilat serialisoitavissa muodossa
  saveState(): Record<string, Record<string, number>> {
    const state: Record<string, Record<string, number>> = {};
    for (const [source, targets] of this.graph) {
      state[source] = Object.fromEntries(targets);
    }
    return state;
  }

  loadState(state: Record<string, Record<string, number>>): void {
    this.graph.clear();
    for (const [source, targets] of Object.entries(state)) {
      const targetMap = new Map<string, number>();
      for (const [target, weight] of Object.entries(targets)) {
        targetMap.set(target, weight);
      }
      this.graph.set(source, targetMap);
    }
  }
}
