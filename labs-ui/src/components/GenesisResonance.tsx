"use client"

import React from 'react'
import { cn } from '@/lib/utils'

type ResonancePayload = {
  hash: string
  phase: number
  coherence: number
  resonance: number
  score: number
}

const makeWave = (phase: number, coherence: number) => {
  const width = 320
  const height = 80
  const mid = height / 2
  const amp = 18 * Math.max(0.2, coherence || 0)
  const steps = 32
  const points: string[] = []
  for (let i = 0; i <= steps; i += 1) {
    const x = (width / steps) * i
    const base = Math.sin((i / steps) * Math.PI * 2 + phase * Math.PI * 2)
    const noise = (1 - coherence) * Math.sin((i + 1) * 3.1 + phase * 12)
    const y = mid + (base + noise) * amp
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return `M ${points.join(' L ')}`
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

  const t = Math.max(0, Math.min(1, 1 - data.coherence))
  const waveColor = data.coherence >= 1 ? '#00FF00' : `rgb(${Math.round(255 * t)}, ${Math.round(255 * (1 - t))}, 0)`
  const wave = makeWave(data.phase, data.coherence)

  return (
    <section className="w-full max-w-4xl mx-auto rounded-xl border border-[#111] bg-black p-8">
      <div className="text-xs tracking-tight text-zinc-400">Resonance</div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-[#111] p-6 text-zinc-200">
          <div className="text-[11px] text-zinc-500">Current Resonance</div>
          <div className="text-3xl font-semibold text-white">{data.resonance}</div>
        </div>
        <div className="rounded-lg border border-[#111] p-6 text-zinc-200">
          <div className="text-[11px] text-zinc-500">Architect Score</div>
          <div className="text-3xl font-semibold text-white">{data.score}</div>
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-[#111] p-6">
        <div className="text-[11px] text-zinc-500">Resonance Wave</div>
        <svg viewBox="0 0 320 80" className={cn("mt-4 h-20 w-full")}>
          <path d={wave} stroke={waveColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="mt-6 text-[11px] text-zinc-500">
        Ledger Hash: <span className="font-mono text-zinc-300">{data.hash}</span>
      </div>
    </section>
  )
}
