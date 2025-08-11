import { Soul, Energy } from "../being/types";

export interface EnergyReceiver extends Soul {
  receiveEnergy(e: Energy): void;
}

export class NonLocalConnection {
  private graph = new Map<string, Set<string>>();
  private inbox = new Map<string, { sender: string; energy: Energy }[]>();

  connect(a: EnergyReceiver, b: EnergyReceiver): void {
    this.link(a.id, b.id);
    this.link(b.id, a.id);
  }

  private link(a: string, b: string): void {
    if (!this.graph.has(a)) this.graph.set(a, new Set());
    this.graph.get(a)!.add(b);
  }

  send(sender: EnergyReceiver, receiverId: string, energy: Energy): boolean {
    if (!this.graph.has(sender.id) || !this.graph.get(sender.id)!.has(receiverId)) {
      return false;
    }
    
    if (!this.inbox.has(receiverId)) {
      this.inbox.set(receiverId, []);
    }
    
    this.inbox.get(receiverId)!.push({
      sender: sender.id,
      energy: Math.max(0, Math.min(1, energy))
    });
    
    return true;
  }

  deliver(receiverId: string, process: (senderId: string, energy: Energy) => void): void {
    const queue = this.inbox.get(receiverId) || [];
    
    while (queue.length > 0) {
      const { sender, energy } = queue.shift()!;
      process(sender, energy);
    }
  }

  isConnected(a: string, b: string): boolean {
    return this.graph.get(a)?.has(b) || false;
  }
}
