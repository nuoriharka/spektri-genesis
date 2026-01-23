import crypto from 'node:crypto';

export type LedgerEntry = {
  architectId: string;
  action: string;
  payload: string;
  timestamp: number;
  stateHash: string;
};

type LedgerResult = { ok: true; entry: LedgerEntry } | { ok: false; error: LedgerEntry };

export class MasterLedger {
  private readonly entries: LedgerEntry[] = [];
  private readonly errorLog: LedgerEntry[] = [];

  executeTransition(
    architectId: string,
    action: string,
    payload: string,
    responsibilityAccepted: boolean
  ): LedgerResult {
    const timestamp = Date.now();
    const base = `${architectId}|${action}|${payload}|${timestamp}`;
    const stateHash = crypto.createHash('sha256').update(base).digest('hex');
    const entry: LedgerEntry = { architectId, action, payload, timestamp, stateHash };

    if (!responsibilityAccepted) {
      this.errorLog.push(entry);
      return { ok: false, error: entry };
    }

    this.entries.push(entry);
    return { ok: true, entry };
  }

  recordError(architectId: string, action: string, payload: string): LedgerEntry {
    const timestamp = Date.now();
    const base = `${architectId}|${action}|${payload}|${timestamp}`;
    const stateHash = crypto.createHash('sha256').update(base).digest('hex');
    const entry: LedgerEntry = { architectId, action, payload, timestamp, stateHash };
    this.errorLog.push(entry);
    return entry;
  }

  snapshot() {
    return { entries: [...this.entries], errors: [...this.errorLog] };
  }
}

export const masterLedger = new MasterLedger();
