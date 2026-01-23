import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export type LedgerEntry = {
  sequence: number;
  architectId: string;
  action: string;
  payload: string;
  timestamp: number;
  stateHash: string;
};

type LedgerResult = { ok: true; entry: LedgerEntry } | { ok: false; error: LedgerEntry };

export class MasterLedger {
  private readonly ledgerPath = path.join(process.cwd(), 'data', 'ledger.json');
  private readonly entries: LedgerEntry[] = [];
  private readonly errorLog: LedgerEntry[] = [];
  private sequence = 0;

  constructor() {
    this.load();
  }

  load() {
    try {
      if (!fs.existsSync(this.ledgerPath)) {
        fs.mkdirSync(path.dirname(this.ledgerPath), { recursive: true });
        fs.writeFileSync(this.ledgerPath, JSON.stringify({ entries: [], errors: [] }, null, 2));
      }
      const raw = fs.readFileSync(this.ledgerPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.entries)) this.entries.push(...parsed.entries);
      if (Array.isArray(parsed.errors)) this.errorLog.push(...parsed.errors);
      const last = this.entries[this.entries.length - 1]?.sequence ?? 0;
      const lastErr = this.errorLog[this.errorLog.length - 1]?.sequence ?? 0;
      this.sequence = Math.max(last, lastErr);
    } catch {
      this.sequence = 0;
    }
  }

  save() {
    const payload = { entries: this.entries, errors: this.errorLog };
    fs.writeFileSync(this.ledgerPath, JSON.stringify(payload, null, 2));
  }

  executeTransition(
    architectId: string,
    action: string,
    payload: string,
    responsibilityAccepted: boolean
  ): LedgerResult {
    const timestamp = Date.now();
    const sequence = ++this.sequence;
    const base = `${sequence}|${architectId}|${action}|${payload}|${timestamp}`;
    const stateHash = crypto.createHash('sha256').update(base).digest('hex');
    const entry: LedgerEntry = { sequence, architectId, action, payload, timestamp, stateHash };

    if (!responsibilityAccepted) {
      this.errorLog.push(entry);
      this.save();
      return { ok: false, error: entry };
    }

    this.entries.push(entry);
    this.save();
    return { ok: true, entry };
  }

  recordError(architectId: string, action: string, payload: string): LedgerEntry {
    const timestamp = Date.now();
    const sequence = ++this.sequence;
    const base = `${sequence}|${architectId}|${action}|${payload}|${timestamp}`;
    const stateHash = crypto.createHash('sha256').update(base).digest('hex');
    const entry: LedgerEntry = { sequence, architectId, action, payload, timestamp, stateHash };
    this.errorLog.push(entry);
    this.save();
    return entry;
  }

  snapshot() {
    return { entries: [...this.entries], errors: [...this.errorLog] };
  }
}

export const masterLedger = new MasterLedger();
