import { Identity4 } from "./multidimensionalSoul";

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

  frequency(): number { return this.freq; }
  authenticity(): boolean { return this._auth; }

  clone(): AdaptiveVectorSoul {
    return new AdaptiveVectorSoul(this.id, [...this.base], [...this.v], [...this.weights], this._auth, this.freq);
  }
}
