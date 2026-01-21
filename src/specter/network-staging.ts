import { promises as fs } from 'node:fs';
import path from 'node:path';
import { TruthScorePipeline } from './truth-pipeline';

type VaultIndex = { entries: { path: string }[] };

function resolveRoot(): string {
  const cwd = process.cwd();
  return path.basename(cwd) === 'genesis' ? path.resolve(cwd, '..') : cwd;
}

export function getNetStageConfig() {
  return {
    enabled: process.env.SPEKTRE_NET_ENABLED === 'true',
    simulate: process.env.SPEKTRE_NET_SIM === 'true',
    threshold: Number(process.env.SPEKTRE_TRUTH_THRESHOLD ?? '0.8')
  };
}

export async function runLocalSimulation(intentGateActive: boolean): Promise<void> {
  const cfg = getNetStageConfig();
  if (cfg.enabled && !intentGateActive) {
    throw new Error('INTENT_GATE_REQUIRED');
  }
  if (!cfg.simulate) return;

  const indexPath = path.join(resolveRoot(), 'genesis', '.specter', 'vault-index.json');
  const raw = await fs.readFile(indexPath, 'utf-8');
  const index = JSON.parse(raw) as VaultIndex;
  const pipeline = new TruthScorePipeline(cfg.threshold);

  let accepted = 0;
  let total = 0;
  for (const entry of index.entries.slice(0, 200)) {
    const verdict = pipeline.process({ id: entry.path, payload: entry.path, source: 'local' });
    if (verdict.status === 'accepted') accepted += 1;
    total += 1;
  }
  const strain = total === 0 ? 0 : 1 - accepted / total;
  console.log(`🫀 STRAINED INVARIANT: ${strain.toFixed(4)} (accepted=${accepted}/${total})`);
}
