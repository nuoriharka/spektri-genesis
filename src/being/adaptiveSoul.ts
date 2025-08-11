import { Soul, Hertz, ResonanceMemory, SoulEncounter } from "./types";

export class AdaptiveSoul implements Soul {
  public memory = new ResonanceMemory();
  private baseFrequency: number;
  private currentFreq: number;
  public learningRate = 0.05;

  constructor(public id: string, baseFreq: number, public _auth: boolean) {
    this.baseFrequency = baseFreq;
    this.currentFreq = baseFreq;
  }
  frequency(): Hertz { return this.currentFreq; }
  authenticity(): boolean { return this._auth; }

  // homeostaasi: paluu kohti basea
  private relax(k=0.02) {
    this.currentFreq += (this.baseFrequency - this.currentFreq) * k;
    // varmistetaan rajat myös hitaan liikkeen aikana
    if (this.currentFreq > 1000) this.currentFreq = 1000;
    if (this.currentFreq < 1) this.currentFreq = 1;
  }

  adaptBasedOnExperience(enc: SoulEncounter): void {
    const { resonance, energyReceived } = enc;
    if (resonance > 0.7) {
      const adj = this.learningRate * energyReceived;
      this.currentFreq = this.baseFrequency * (1 + adj);
    } else if (resonance < 0.3) {
      const protective = Math.random() > 0.5 ? 0.98 : 1.02;
      this.currentFreq *= protective;
    }
    this.relax(); // vedä kohti basea aina pienen askeleen
    this.currentFreq = Math.max(1, Math.min(1000, this.currentFreq));
    this.memory.push({ ...enc, timestamp: new Date() });
  }

  evolveAuthenticity(positiveEncounters: number): void {
    if (positiveEncounters > 5) { this._auth = true; this.learningRate = 0.08; }
  }

  clone(): AdaptiveSoul {
    const s = new AdaptiveSoul(this.id, this.baseFrequency, this._auth);
    s.learningRate = this.learningRate;
    return s;
  }
}
