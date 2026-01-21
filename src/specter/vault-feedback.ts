/**
 * 🔁 SPEKTRE VAULT FEEDBACK LOOP
 *
 * Direct bridge between spektri_vault intent and localhost execution.
 * Scans all .md files, builds an index, validates against 1 = 1 invariant,
 * and writes a local snapshot for consistency checks.
 *
 * Protocol: No theater. Only executable truth.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { protocolBridge } from './bridge';
import { scoreIntent } from './intent-gate';
import { ARCHITECT_WILL } from '../core/architect-will';

type VaultIndexEntry = {
  path: string;
  hash: string;
  size: number;
  mtimeMs: number;
  priority: 'primary' | 'standard';
  intentScore: number;
};

type VaultIndex = {
  generatedAt: string;
  root: string;
  totalFiles: number;
  priorityManifests: string[];
  indexSignature: string;
  entries: VaultIndexEntry[];
};

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.specter'
]);

const DEFAULT_INTERVAL_MS = 5 * 60 * 1000; // 5 min (high-frequency mode)
const PRIORITY_MANIFESTS = new Set([
  'Teatterin_purku.md',
  'Ideaaliuniversumin emulaatio.md'
]);

function resolveSpecterRoot(): string {
  if (process.env.SPEKTRE_ROOT) {
    return process.env.SPEKTRE_ROOT;
  }

  const cwd = process.cwd();
  if (path.basename(cwd) === 'genesis') {
    return path.resolve(cwd, '..');
  }

  return cwd;
}

async function listMarkdownFiles(dir: string, entries: string[] = []): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      if (IGNORE_DIRS.has(dirent.name)) {
        continue;
      }
      await listMarkdownFiles(path.join(dir, dirent.name), entries);
    } else if (dirent.isFile() && dirent.name.toLowerCase().endsWith('.md')) {
      entries.push(path.join(dir, dirent.name));
    }
  }
  return entries;
}

async function hashFile(filePath: string): Promise<string> {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function signIndex(entries: VaultIndexEntry[], priorityManifests: string[]): string {
  const payload = entries.map((e) => e.hash).join('') + priorityManifests.join('|');
  return crypto.createHash('sha256').update(payload).digest('hex');
}

async function scanVaultFiles(root: string): Promise<VaultIndexEntry[]> {
  const protocolDir = path.join(root, 'protocol');
  const vaultDir = path.join(root, 'spektri_vault');
  const genesisDir = path.join(root, 'genesis');
  const rootEntries: string[] = [];

  const topLevel = await fs.readdir(root, { withFileTypes: true });
  for (const dirent of topLevel) {
    if (dirent.isFile() && dirent.name.toLowerCase().endsWith('.md')) {
      rootEntries.push(path.join(root, dirent.name));
    }
  }

  const protocolFiles = await listMarkdownFiles(protocolDir);
  const vaultFiles = await listMarkdownFiles(vaultDir);
  const genesisFiles = await listMarkdownFiles(genesisDir);
  const allFiles = [...rootEntries, ...protocolFiles, ...vaultFiles, ...genesisFiles];

  const entries: VaultIndexEntry[] = [];
  for (const filePath of allFiles) {
    try {
      const stat = await fs.stat(filePath);
      const baseName = path.basename(filePath);
      const content = await fs.readFile(filePath, 'utf-8');
      entries.push({
        path: filePath,
        hash: crypto.createHash('sha256').update(content).digest('hex'),
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        priority: PRIORITY_MANIFESTS.has(baseName) ? 'primary' : 'standard',
        intentScore: scoreIntent(content)
      });
    } catch (error) {
      console.error(`⚠️ VAULT INDEX SKIP: ${filePath}`, error);
    }
  }

  return entries;
}

export async function buildVaultIndex(): Promise<VaultIndex> {
  const root = resolveSpecterRoot();
  const entries = await scanVaultFiles(root);

  return {
    generatedAt: new Date().toISOString(),
    root,
    totalFiles: entries.length,
    priorityManifests: entries
      .filter((entry) => entry.priority === 'primary')
      .map((entry) => entry.path),
    indexSignature: signIndex(
      entries,
      entries
        .filter((entry) => entry.priority === 'primary')
        .map((entry) => entry.path)
    ),
    entries
  };
}

async function persistVaultIndex(index: VaultIndex): Promise<void> {
  const root = resolveSpecterRoot();
  const outputDir = path.join(root, 'genesis', '.specter');
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'vault-index.json');
  await fs.writeFile(outputPath, JSON.stringify(index, null, 2), 'utf-8');
}

function validateIndexWithProtocol(index: VaultIndex): boolean {
  const preState = protocolBridge.createState(
    {
      vaultIndex: index.totalFiles,
      generatedAt: index.generatedAt,
      priorityManifests: index.priorityManifests.length
    },
    1,
    ARCHITECT_WILL.identity,
    true
  );

  const postState = protocolBridge.createState(
    {
      vaultIndex: index.totalFiles,
      checksum: 'sha256',
      sealed: true,
      priorityManifests: index.priorityManifests.length
    },
    1,
    ARCHITECT_WILL.identity,
    true
  );

  const decision = protocolBridge.createDecision(
    preState,
    postState,
    ARCHITECT_WILL.identity,
    false
  );

  return protocolBridge.validateDecision(decision);
}

export async function runFeedbackLoopOnce(): Promise<void> {
  const index = await buildVaultIndex();

  if (!validateIndexWithProtocol(index)) {
    console.error('🚨 VAULT INDEX REJECTED: Protocol validation failed');
    return;
  }

  await persistVaultIndex(index);
  console.log(`✅ VAULT INDEX SYNCED: ${index.totalFiles} files`);
}

export function startFeedbackLoop(intervalMs: number = DEFAULT_INTERVAL_MS): void {
  const envInterval = process.env.SPEKTRE_FEEDBACK_INTERVAL_MS;
  const resolvedInterval =
    envInterval && !Number.isNaN(Number(envInterval))
      ? Number(envInterval)
      : intervalMs;

  runFeedbackLoopOnce().catch((error) => {
    console.error('🚨 VAULT FEEDBACK LOOP FAILED:', error);
  });

  setInterval(() => {
    runFeedbackLoopOnce().catch((error) => {
      console.error('🚨 VAULT FEEDBACK LOOP FAILED:', error);
    });
  }, resolvedInterval);
}
