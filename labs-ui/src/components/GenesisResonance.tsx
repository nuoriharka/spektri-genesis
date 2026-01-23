"use client"

import React from 'react'

type ResonancePayload = {
  hash: string
  phase: number
  coherence: number
  resonance: number
  score: number
}

export const GenesisResonance = () => {
  const [data, setData] = React.useState<ResonancePayload>({
    hash: '—',
    phase: 0,
    coherence: 0,
    resonance: 0,
    score: 0
  })

  React.useEffect(() => {
    let active = true
    const tick = async () => {
      try {
        const res = await fetch('/api/resonance', { cache: 'no-store' })
        const json = await res.json()
        if (active) setData(json)
      } catch {
        if (active) setData((prev) => ({ ...prev, coherence: 0 }))
      }
    }
    tick()
    const id = setInterval(tick, 2000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const health = data.coherence >= 1 ? 'OK' : 'DEGRADED'
  const healthColor = data.coherence >= 1 ? '#00FF00' : '#ffffff'

  return (
    <section className="w-full max-w-4xl mx-auto rounded-xl border border-[#111] bg-black p-8">
      <div className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">System Status</div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[#111] p-6 text-zinc-200">
          <div className="text-[11px] text-zinc-500">Health</div>
          <div className="text-3xl font-semibold font-mono" style={{ color: healthColor }}>{health}</div>
        </div>
        <div className="rounded-lg border border-[#111] p-6 text-zinc-200">
          <div className="text-[11px] text-zinc-500">Score</div>
          <div className="text-3xl font-semibold text-white font-mono">{data.score}</div>
        </div>
      </div>
      <div className="mt-6 text-[11px] text-zinc-500">
        Ledger Hash: <span className="font-mono text-zinc-300">{data.hash}</span>
      </div>
    </section>
  )
}
