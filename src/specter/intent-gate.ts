/**
 * 🚧 SPEKTRE INTENT GATE
 *
 * Validates that vault intent is present and stable before ignition.
 * Protocol: 1 = 1. Integrity over execution.
 *
 * Logic:
 * 1) Read genesis/.specter/vault-index.json
 * 2) Verify priority manifests exist and are flagged as primary
 * 3) Recompute hashes to confirm stability
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as tf from '@tensorflow/tfjs';

type VaultIndexEntry = {
  path: string;
  hash: string;
  priority: 'primary' | 'standard';
};

type VaultIndex = {
  root: string;
  totalFiles: number;
  priorityManifests: string[];
  entries: VaultIndexEntry[];
};

type IntentBaseline = {
  manifest: string;
  score: number;
  hash: string;
};

const REQUIRED_MANIFESTS = [
  'Teatterin_purku.md',
  'Ideaaliuniversumin emulaatio.md'
];

const BASELINE_FILE = 'intent-baseline.json';

export function scoreIntent(text: string): number {
  const keys = ['state', 'protocol', 'execution', 'invariant', 'layer'];
  const counts = keys.map((k) => (text.match(new RegExp(`\\b${k}\\b`, 'gi')) || []).length);
  const v = tf.tensor1d(counts, 'float32');
  const norm = tf.norm(v).dataSync()[0] || 1;
  const score = v.div(norm).sum().dataSync()[0];
  v.dispose();
  return score;
}

function resolveSpecterRoot(): string {
  const cwd = process.cwd();
  if (path.basename(cwd) === 'genesis') {
    return path.resolve(cwd, '..');
  }
  return cwd;
}

async function hashFile(filePath: string): Promise<string> {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function loadVaultIndex(): Promise<VaultIndex> {
  const root = resolveSpecterRoot();
  const indexPath = path.join(root, 'genesis', '.specter', 'vault-index.json');
  const raw = await fs.readFile(indexPath, 'utf-8');
  return JSON.parse(raw) as VaultIndex;
}

async function loadBaseline(): Promise<IntentBaseline | null> {
  try {
    const root = resolveSpecterRoot();
    const baselinePath = path.join(root, 'genesis', '.specter', BASELINE_FILE);
    const raw = await fs.readFile(baselinePath, 'utf-8');
    return JSON.parse(raw) as IntentBaseline;
  } catch {
    return null;
  }
}

async function saveBaseline(baseline: IntentBaseline): Promise<void> {
  const root = resolveSpecterRoot();
  const dir = path.join(root, 'genesis', '.specter');
  await fs.mkdir(dir, { recursive: true });
  const baselinePath = path.join(dir, BASELINE_FILE);
  await fs.writeFile(baselinePath, JSON.stringify(baseline, null, 2), 'utf-8');
}

function findManifestEntry(index: VaultIndex, name: string): VaultIndexEntry | undefined {
  return index.entries.find((entry) => path.basename(entry.path) === name);
}

export async function validateIntent(): Promise<boolean> {
  try {
    const index = await loadVaultIndex();

    for (const manifest of REQUIRED_MANIFESTS) {
      const entry = findManifestEntry(index, manifest);
      if (!entry) {
        console.error(`🚨 INTENT GATE FAILED: Missing manifest ${manifest}`);
        return false;
      }

      if (entry.priority !== 'primary') {
        console.error(`🚨 INTENT GATE FAILED: ${manifest} not marked as primary`);
        return false;
      }

      if (!index.priorityManifests?.some((p) => path.basename(p) === manifest)) {
        console.error(`🚨 INTENT GATE FAILED: ${manifest} not in priority list`);
        return false;
      }

      const actualHash = await hashFile(entry.path);
      if (actualHash !== entry.hash) {
        console.error(`🚨 INTENT GATE FAILED: Hash mismatch for ${manifest}`);
        return false;
      }

      if (manifest === 'Teatterin_purku.md') {
        const text = await fs.readFile(entry.path, 'utf-8');
        const score = scoreIntent(text);
        const baseline = await loadBaseline();

        if (!baseline) {
          await saveBaseline({ manifest, score, hash: entry.hash });
        } else if (baseline.hash !== entry.hash || Math.abs(score - baseline.score) > 1e-6) {
          console.error('🚨 INTENT GATE FAILED: Intent score or hash deviated');
          return false;
        }
      }
    }

    console.log('✅ INTENT GATE PASSED: Priority manifests stable and verified');
    return true;
  } catch (error) {
    console.error('🚨 INTENT GATE FAILED: Unable to validate intent', error);
    return false;
  }
}
