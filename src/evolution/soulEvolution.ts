import { AdaptiveSoul } from '../being/adaptiveSoul';
import { CollectiveConsciousness } from '../collective/consciousnessNetwork';
import { SoulVisualizer } from '../viz/soulSpace';

interface EvolutionRequirements {
  minResonance?: number;
  minEncounters?: number;
  minAuthenticConnections?: number;
  collectiveAlignment?: number;
}

export class SoulEvolutionEngine {
  private evolutionStages = [
    'Materia',
    'Kasvi',
    'Eläin',
    'Ihminen',
    'Valaistunut',
    'Tähtitietoinen'
  ];

  evolveSoul(soul: AdaptiveSoul, collective: CollectiveConsciousness): void {
    const currentStage = this.getCurrentStage(soul);
    const nextStageIndex = this.evolutionStages.indexOf(currentStage) + 1;
    if (nextStageIndex < this.evolutionStages.length) {
      const requirements = this.getEvolutionRequirements(nextStageIndex);
      if (this.meetsRequirements(soul, collective, requirements)) {
        this.triggerEvolution(soul, nextStageIndex);
      }
    }
  }

  private getCurrentStage(soul: AdaptiveSoul): string {
    if (soul.frequency() < 100) return 'Materia';
    if (soul.frequency() < 200) return 'Kasvi';
    if (soul.frequency() < 400) return 'Eläin';
    if (soul.frequency() < 600) return 'Ihminen';
    if (soul.frequency() < 800) return 'Valaistunut';
    return 'Tähtitietoinen';
  }

  private getEvolutionRequirements(stageIndex: number): EvolutionRequirements {
    const requirements: Record<number, EvolutionRequirements> = {
      1: { minResonance: 0.3, minEncounters: 3 },
      2: { minResonance: 0.5, minEncounters: 10, minAuthenticConnections: 1 },
      3: { minResonance: 0.65, minEncounters: 25, minAuthenticConnections: 3 },
      4: { minResonance: 0.8, minEncounters: 50, minAuthenticConnections: 5, collectiveAlignment: 0.7 },
      5: { minResonance: 0.9, minEncounters: 100, minAuthenticConnections: 10, collectiveAlignment: 0.85 }
    };
    return requirements[stageIndex] || {};
  }

  private meetsRequirements(
    soul: AdaptiveSoul,
    collective: CollectiveConsciousness,
    requirements: EvolutionRequirements
  ): boolean {
    const stats = soul.memory.getStatistics();
    if (stats.avgResonance < (requirements.minResonance || 0)) return false;
    if (stats.totalEncounters < (requirements.minEncounters || 0)) return false;
    if (stats.authenticConnections < (requirements.minAuthenticConnections || 0)) return false;
    if (requirements.collectiveAlignment) {
      const alignment = Math.abs(collective.globalFrequency - soul.frequency()) / collective.globalFrequency;
      if (alignment > 1 - requirements.collectiveAlignment) return false;
    }
    return true;
  }

  private triggerEvolution(soul: AdaptiveSoul, stageIndex: number): void {
    const newStage = this.evolutionStages[stageIndex];
    console.log(`⚡ ${soul.id} kehittyy: ${this.getCurrentStage(soul)} → ${newStage}`);
    soul.authenticity = true;
    soul['learningRate'] *= 1.5;
    soul['baseFrequency'] *= 1.2;
    soul['currentFrequency'] = soul['baseFrequency'];
    SoulVisualizer.upgradeSoul?.(soul.id, stageIndex);
  }
}
