export type RNG = () => number;

export class QuantumState<T> {
  private collapsed: T | null = null;
  private weights: number[];

  constructor(
    private states: T[],
    weights?: number[],
    private rng: RNG = Math.random
  ) {
    const total = weights?.reduce((sum, w) => sum + w, 0) || states.length;
    this.weights = weights 
      ? weights.map(w => w / total) 
      : Array(states.length).fill(1 / states.length);
  }

  collapse(): T {
    if (this.collapsed) return this.collapsed;
    
    const r = this.rng();
    let cumulative = 0;
    
    for (let i = 0; i < this.states.length; i++) {
      cumulative += this.weights[i];
      if (r <= cumulative) {
        this.collapsed = this.states[i];
        return this.collapsed;
      }
    }
    
    return this.states[0];
  }

  getSuperposition(): T[] {
    return [...this.states];
  }
}
