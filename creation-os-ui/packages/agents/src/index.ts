// Minimal multi-LLM router: fallback + hedging
import fs from 'fs'
import path from 'path'

export type ProviderId = 'openai' | 'anthropic' | 'local'

type Policy = {
  providers: { name: ProviderId; models: string[] }[]
  routing: { default: string[]; fallback: boolean; hedgeAfterMs: number; timeoutMs: number }
  limits: { maxTokens: number; temperature: number }
}

export type GenerateOpts = { system?: string; temperature?: number; maxTokens?: number }

function readPolicy(): Policy {
  const p = path.join(process.cwd(), '.creation-os', 'model-policy.json')
  const raw = fs.readFileSync(p, 'utf-8')
  return JSON.parse(raw)
}

async function callProvider(spec: string, prompt: string, opts: GenerateOpts) {
  // Stubbed providers for demo. Replace with SDK calls.
  const [provider, model] = spec.split(':')
  const baseDelay = provider === 'openai' ? 300 : provider === 'anthropic' ? 450 : 600
  await new Promise((r) => setTimeout(r, baseDelay + Math.random() * 200))
  if (Math.random() < 0.05 && provider !== 'local') throw new Error(`${provider} transient error`)
  return `[${provider}/${model}] ${prompt.slice(0, 24)}…`
}

function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    let rejected = 0
    const total = promises.length
    if (total === 0) return reject(new Error('No promises'))
    promises.forEach((p) => {
      p.then(resolve).catch(() => {
        rejected++
        if (rejected === total) reject(new Error('All promises were rejected'))
      })
    })
  })
}

export async function generate(prompt: string, userOpts: GenerateOpts = {}) {
  const policy = readPolicy()
  const route = policy.routing.default
  const timeoutMs = policy.routing.timeoutMs
  const hedgeAfter = policy.routing.hedgeAfterMs
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const first = route[0]
    const hedges = route.slice(1)
    const firstPromise = callProvider(first, prompt, userOpts)
    const hedgePromise = new Promise<string>((resolve, reject) => {
      const t = setTimeout(async () => {
        // race hedges (first fulfilled)
        promiseAny(hedges.map((h) => callProvider(h, prompt, userOpts))).then(resolve).catch(reject)
      }, hedgeAfter)
      ;(firstPromise as Promise<string>)
        .then((v) => {
          clearTimeout(t)
          resolve(v)
        })
        .catch((e) => {
          clearTimeout(t)
          if (policy.routing.fallback && hedges.length) {
            promiseAny(hedges.map((h) => callProvider(h, prompt, userOpts))).then(resolve).catch(reject)
          } else {
            reject(e)
          }
        })
    })
    return await hedgePromise
  } finally {
    clearTimeout(timeout)
  }
}
