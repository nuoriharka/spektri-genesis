import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const nativePath = path.resolve(process.cwd(), '../src/engine/resonance_432/build/Release/resonance_432.node')

const loadNative = async () => {
  try {
    const mod = await import('module')
    const require = mod.createRequire(import.meta.url)
    return require(nativePath) as {
      getPhase: () => number
      calculateCoherence: (hash: string, resonance: number, score: number) => number
    }
  } catch {
    return null
  }
}

const ledgerPath = path.resolve(process.cwd(), '../data/ledger.json')

const hashInput = (input: string) =>
  crypto.createHash('sha256').update(input).digest('hex')

export async function GET() {
  const native = await loadNative()
  let payload = ''
  try {
    payload = await fs.readFile(ledgerPath, 'utf-8')
  } catch {}
  const hash = payload ? hashInput(payload) : '—'
  let resonance = 0
  let score = 0
  if (payload) {
    try {
      const parsed = JSON.parse(payload)
      resonance = Array.isArray(parsed.entries) ? parsed.entries.length : 0
      score = Array.isArray(parsed.entries) ? parsed.entries.length : 0
    } catch {}
  }

  const phase = native ? native.getPhase() : (Date.now() / 1000 * 432) % 1
  const coherence = native ? native.calculateCoherence(hash, resonance, score) : hash.length === 64 ? 1 : 0.4

  return NextResponse.json({ hash, phase, coherence, resonance, score })
}
