import { AdaptiveSoul } from './adaptiveSoul';

export class AdaptiveSoulWithTime extends AdaptiveSoul {
  private timePerceptionFactor: number = 1.0;

  updateTimePerception(collectiveFrequency: number) {
    // Ajan subjektiivinen kulema riippuu globaalista taajuudesta
    this.timePerceptionFactor = collectiveFrequency / 7.83;
  }

  processExperience(duration: number) {
    // Subjektiivinen aika
    const subjectiveDuration = duration * this.timePerceptionFactor;
    // Kokemusprosessi (stub)
    return subjectiveDuration;
  }
}
