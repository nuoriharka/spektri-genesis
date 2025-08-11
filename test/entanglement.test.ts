import { describe, it, expect, beforeEach } from 'vitest';
import { EntanglementField } from '../src/collective/entanglement';
import { Soul } from '../src/being/types';

class MockSoul implements Soul {
  constructor(public id: string) {}
  frequency(): number { return 1; }
  authenticity(): boolean { return true; }
}

describe('EntanglementField', () => {
  let field: EntanglementField;
  let soulA: Soul;
  let soulB: Soul;
  
  beforeEach(() => {
    field = new EntanglementField();
    soulA = new MockSoul('A');
    soulB = new MockSoul('B');
  });

  it('symmetrinen linkitys', () => {
    field.link(soulA, soulB, 0.7);
    expect(field.getWeight('A', 'B')).toBe(0.7);
    expect(field.getWeight('B', 'A')).toBe(0.7);
  });

  it('decoherence vähentää painoja', () => {
    field.link(soulA, soulB, 0.6);
    field.decay(30000); // 30s, tau=30k
    expect(field.getWeight('A', 'B')).toBeCloseTo(0.6 * Math.exp(-1), 2);
  });
});
