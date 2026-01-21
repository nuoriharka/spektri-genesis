import { scoreIntent } from './intent-gate';

export type Packet = { id: string; payload: string; source: 'mock' | 'local' };
export type Verdict = { status: 'accepted' | 'discarded'; score: number; reason?: string };

export class TruthScorePipeline {
  constructor(private threshold = 0.8) {}

  process(packet: Packet): Verdict {
    const score = scoreIntent(packet.payload);
    if (score < this.threshold) {
      return { status: 'discarded', score, reason: 'truth_score_below_threshold' };
    }
    return { status: 'accepted', score };
  }
}
