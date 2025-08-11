const SCHUMANN_BASE = 7.83; // Perustaajuus

export class CosmicResonance {
  static getCurrentFrequency(): number {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const dailyVariation = Math.sin(utcHours * Math.PI / 12) * 0.5;
    const solarFlareEffect = Math.random() > 0.95 ? (Math.random() * 2) : 0;
    return SCHUMANN_BASE + dailyVariation + solarFlareEffect;
  }

  static compareToEarth(soul: { frequency(): number }): number {
    const earthFreq = this.getCurrentFrequency();
    const soulFreq = soul.frequency();
    const diff = Math.abs(earthFreq - soulFreq);
    return 1 - (diff / Math.max(earthFreq, soulFreq));
  }
}
