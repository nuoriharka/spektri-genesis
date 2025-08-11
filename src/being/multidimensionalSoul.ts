import { AdaptiveVectorSoul } from "./adaptiveVectorSoul";

export type Identity4 = {
  cognitive: number;
  emotional: number;
  spiritual: number;
  ethical: number;
};

export function identityToVec(x: Identity4): number[] {
  return [x.cognitive, x.emotional, x.spiritual, x.ethical].map(clamp01);
}
const clamp01 = (v:number)=> Math.max(0, Math.min(1, v));

export class MultidimensionalSoul extends AdaptiveVectorSoul {
  constructor(
    id: string,
    identity: Identity4,
    weights: number[] = [1,1,1,1],
    freq = 7.83,
    authentic = true
  ){
    const base = identityToVec(identity);
    super(id, base, [...base], weights, authentic, freq);
  }
}
