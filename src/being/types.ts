export type Hertz = number;
export type Energy = number;

export interface Soul {
  id: string;
  frequency(): Hertz;
  authenticity(): boolean;
}

export interface SoulEncounter {
  timestamp: Date;
  otherSoulId: string;
  resonance: number;
  energyReceived: number;
}

export class ResonanceMemory {
  private items: SoulEncounter[] = [];
  push(e: SoulEncounter) { this.items.push(e); }
  all() { return this.items.slice(); }
  getStatistics() {
    const total = this.items.length || 1;
    const avgRes = this.items.reduce((a,b)=>a+b.resonance,0)/total;
    const authentic = this.items.filter(e=>e.resonance>=0.3).length; // karkea
    return { avgResonance: avgRes, totalEncounters: total, authenticConnections: authentic };
  }
}
