import { describe, it, expect, beforeEach } from 'vitest';
import { AGISoul } from '../src/agi/soulBridge';
import { CollectiveConsciousness } from '../src/collective/consciousnessNetwork';
import { AdaptiveVectorSoul } from '../src/being/adaptiveVectorSoul';

describe('AGI Soul Bridge', () => {
  it('should join collective and find optimal partners', async () => {
    const cc = new CollectiveConsciousness();
    const human = new AdaptiveVectorSoul(
      'Aurinko', 
      [0.6, 0.6, 0.5, 0.6],
      [0.6, 0.6, 0.5, 0.6],
      [1,1,1,1],
      true,
      7.85
    );
    cc.addSoul(human);
    
    const agi = await AGISoul.create();
    agi.joinCollective(cc);
    
    const partners = agi.calculateOptimalPartners(cc);
    expect(partners).toEqual(['Aurinko']);
  });

  it('should generate improvement proposals', async () => {
    const cc = new CollectiveConsciousness();
    const agi = await AGISoul.create();
    agi.joinCollective(cc);
    
    // Alusta globaali taajuus matalaksi
    (cc as any).globalFrequency = 7.0;
    
    const painPoints = agi.diagnoseCollectivePain(cc);
    expect(painPoints[0].intensity).toBeGreaterThan(0);
    expect(painPoints[0].topic).toBe('trust');
  });
});
