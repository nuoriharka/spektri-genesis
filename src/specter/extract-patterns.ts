import { promises as fs } from 'node:fs';
import path from 'node:path';

type PatternEntry = {
  pattern: string;
  reason: string;
  density: number;
  replacement: string;
  flags: string;
};

const DEFAULT_PATTERNS: PatternEntry[] = [
  {
    pattern: 'jyräh(tä|tää)',
    reason: 'Emotional Manipulation / Theater',
    density: 0.85,
    replacement: 'ilmaisee mielipiteensä',
    flags: 'i'
  },
  {
    pattern: 'shokki.*',
    reason: 'Sensationalist Trigger',
    density: 0.9,
    replacement: 'rakenteellinen muutos',
    flags: 'i'
  },
  {
    pattern: 'katso\\s+kuvat',
    reason: 'Clickbait Structure',
    density: 0.75,
    replacement: 'katso lähde',
    flags: 'i'
  },
  {
    pattern: 'vau!',
    reason: 'Synthesized Awe',
    density: 0.65,
    replacement: 'havainto',
    flags: 'i'
  }
];

function resolveRoot(): string {
  const cwd = process.cwd();
  return path.basename(cwd) === 'genesis' ? path.resolve(cwd, '..') : cwd;
}

async function loadSql(): Promise<string> {
  const root = resolveRoot();
  const candidates = [
    path.join(root, 'genesis', 'THE_SILVER_VAULT.sql'),
    path.join(root, 'genesis', 'genesis', 'THE_SILVER_VAULT.sql')
  ];
  for (const candidate of candidates) {
    try {
      return await fs.readFile(candidate, 'utf-8');
    } catch {
      continue;
    }
  }
  throw new Error('THE_SILVER_VAULT.sql not found');
}

function extractPatterns(sql: string): PatternEntry[] {
  const matches = [];
  const insertRe =
    /INSERT\s+INTO\s+Theater_Patterns\s*\(([^)]+)\)\s*VALUES\s*\(([^;]+)\);/gi;
  let match = insertRe.exec(sql);
  while (match) {
    const rawValues = match[2].match(/'[^']*'|[^,]+/g) || [];
    const values = rawValues.map((v) => v.trim().replace(/^'|'$/g, ''));
    const [pattern, reason, densityRaw, replacement, flags] = values;
    const density = Number(densityRaw);
    if (pattern && reason && replacement) {
      matches.push({
        pattern,
        reason,
        density: Number.isFinite(density) ? density : 0.8,
        replacement,
        flags: flags || 'i'
      });
    }
    match = insertRe.exec(sql);
  }
  return matches.length ? matches : DEFAULT_PATTERNS;
}

export async function extractSilverVaultPatterns(): Promise<void> {
  const sql = await loadSql();
  const patterns = extractPatterns(sql);
  const root = resolveRoot();
  const outPath = path.join(root, 'specter-lens', 'silver-vault-patterns.json');
  await fs.writeFile(
    outPath,
    JSON.stringify({ source: 'THE_SILVER_VAULT.sql', patterns }, null, 2),
    'utf-8'
  );

  const top = [...patterns].sort((a, b) => b.density - a.density).slice(0, 5);
  console.log('🔎 THEATER HEATMAP (top 5 by density):');
  for (const entry of top) {
    console.log(`- ${entry.pattern} :: ${entry.reason} (${entry.density.toFixed(2)})`);
  }
}
