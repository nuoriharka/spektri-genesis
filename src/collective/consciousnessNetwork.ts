import { AdaptiveSoul } from "../being/adaptiveSoul";
import { Soul } from "../being/types";
import { trustEngine } from "../being";

export class CollectiveConsciousness {
  private souls: AdaptiveSoul[] = [];
  private resonanceMatrix: number[][] = [];
  public globalFrequency = 7.83;

  addSoul(soul: AdaptiveSoul) { this.souls.push(soul); this.updateResonanceMatrix(); }
  removeSoul(id: string) { this.souls = this.souls.filter(s=>s.id!==id); this.updateResonanceMatrix(); }
  getSouls() { return this.souls.slice(); }

  private updateResonanceMatrix(maxPairs = 2000) {
    // sparsi arvio: satunnaisnäytteenä maxPairs paria
    const n = this.souls.length;
    this.resonanceMatrix = Array.from({length:n},()=>Array(n).fill(0));
    const pairs: [number,number][] = [];
    for (let i=0;i<n;i++) for (let j=i+1;j<n;j++) pairs.push([i,j]);
    for (const [i,j] of pairs.sort(()=>Math.random()-0.5).slice(0,maxPairs)) {
      const r = trustEngine(this.souls[i], this.souls[j]) ?? 0;
      this.resonanceMatrix[i][j] = this.resonanceMatrix[j][i] = r;
    }
    this.calculateGlobalFrequency();
  }

  private calculateGlobalFrequency() {
    let sum=0, count=0;
    for (let i=0;i<this.resonanceMatrix.length;i++)
      for (let j=i+1;j<this.resonanceMatrix.length;j++)
        if (this.resonanceMatrix[i][j]>0){ sum+=this.resonanceMatrix[i][j]; count++; }
    const avg = count? sum/count : 0;
    this.globalFrequency = 7.83 * (0.9 + 0.2 * avg);
  }

  collectiveMeditation(diversityBoost = 0.05) {
    const target = this.globalFrequency;
    const freqs = this.souls.map(s => s.frequency());
    const diversity = this.calculateDiversity(freqs);
    this.souls.forEach(s => {
      // Lisää diversiteettiboosti, jotta konvergenssia ei tapahdu liian nopeasti
      s.adaptBasedOnExperience({ 
        otherSoulId:"collective", 
        resonance: 0.8 + diversity * diversityBoost, 
        energyReceived: 0.05, 
        timestamp: new Date()
      });
    });
    this.globalFrequency += Math.sqrt(this.souls.length)*0.05;
  }

  private calculateDiversity(frequencies: number[]): number {
    if (frequencies.length < 2) return 1;
    const mean = frequencies.reduce((a,b)=>a+b,0)/frequencies.length;
    const variance = frequencies.reduce((a,b)=>a+(b-mean)**2,0)/frequencies.length;
    return Math.min(1, variance * 10); // Normalisoi
  }
}
