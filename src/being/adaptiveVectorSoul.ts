import { Identity4 } from "./multidimensionalSoul";
import { Soul } from "./types";

export class AdaptiveVectorSoul {
  public v: number[];
  public base: number[];
  public weights: number[];
  public _auth: boolean;
  public freq: number;
  public id: string;

  constructor(id: string, base: number[], v: number[], weights: number[], authentic = true, freq = 7.83) {
    this.id = id;
    this.base = base;
    this.v = v;
    this.weights = weights;
    this._auth = authentic;
    this.freq = freq;
  }
  
  private timeFactor = 1.0;
  private timeFactorBounds = { min: 0.5, max: 1.5 };

  updateTimePerception(globalHz: number): void {
    const baseline = 7.83;
    const ratio = globalHz / baseline;
    const bounded = Math.max(
      this.timeFactorBounds.min, 
      Math.min(this.timeFactorBounds.max, ratio)
    );
    this.timeFactor = 0.8 * this.timeFactor + 0.2 * bounded;
  }

  processExperience(durationMs: number): number {
    return durationMs * this.timeFactor;
  }

  frequency(): number { return this.freq; }
  authenticity(): boolean { return this._auth; }

  clone(): AdaptiveVectorSoul {
    return new AdaptiveVectorSoul(this.id, [...this.base], [...this.v], [...this.weights], this._auth, this.freq);
  }
}
