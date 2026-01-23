import crypto from 'node:crypto';

export type Proposal = {
  id: string;
  action: string;
  payload: string;
  timestamp: number;
  status: 'pending' | 'anchored' | 'rejected';
};

export class ProposalQueue {
  private readonly proposals: Proposal[] = [];

  create(action: string, payload: string): Proposal {
    const timestamp = Date.now();
    const base = `${action}|${payload}|${timestamp}`;
    const id = crypto.createHash('sha256').update(base).digest('hex');
    const proposal: Proposal = { id, action, payload, timestamp, status: 'pending' };
    this.proposals.push(proposal);
    return proposal;
  }

  anchor(id: string): Proposal | null {
    const proposal = this.proposals.find((p) => p.id === id);
    if (!proposal) return null;
    proposal.status = 'anchored';
    return proposal;
  }

  reject(id: string): Proposal | null {
    const proposal = this.proposals.find((p) => p.id === id);
    if (!proposal) return null;
    proposal.status = 'rejected';
    return proposal;
  }

  pending() {
    return this.proposals.filter((p) => p.status === 'pending');
  }
}

export const proposals = new ProposalQueue();
