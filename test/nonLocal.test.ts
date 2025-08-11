import { describe, it, expect, beforeEach } from 'vitest';
import { NonLocalConnection, EnergyReceiver } from '../src/quantum/spatialNonlocality';
import { Soul } from '../src/being/types';

class MockReceiver implements EnergyReceiver {
  received: [string, number][] = [];
  constructor(public id: string) {}
  receiveEnergy(e: number) { this.received.push([this.id, e]); }
  frequency(): number { return 1; }
  authenticity(): boolean { return true; }
}

describe('NonLocalConnection', () => {
  let conn: NonLocalConnection;
  let alice: EnergyReceiver;
  let bob: EnergyReceiver;
  
  beforeEach(() => {
    conn = new NonLocalConnection();
    alice = new MockReceiver('alice');
    bob = new MockReceiver('bob');
    conn.connect(alice, bob);
  });

  it('energian toimitus vain yhteydessä oleville', () => {
    const success = conn.send(alice, 'bob', 0.8);
    expect(success).toBe(true);
    expect(conn.send(alice, 'eve', 0.5)).toBe(false);
  });

  it('viestien käsittely järjestyksessä', () => {
    conn.send(alice, 'bob', 0.8);
    conn.send(alice, 'bob', 0.5);
    
    const received: [string, number][] = [];
    conn.deliver('bob', (sender, energy) => {
      received.push([sender, energy]);
    });
    
    expect(received).toEqual([['alice', 0.8], ['alice', 0.5]]);
  });
});
