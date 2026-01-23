"use client"

import React from 'react'

type LedgerSnapshot = {
  hash: string
  resonance: number
  score: number
}

export default function AssetsPage() {
  const [data, setData] = React.useState<LedgerSnapshot>({ hash: '—', resonance: 0, score: 0 })

  React.useEffect(() => {
    let active = true
    const tick = async () => {
      try {
        const res = await fetch('/api/resonance', { cache: 'no-store' })
        const json = await res.json()
        if (active) setData({ hash: json.hash, resonance: json.resonance, score: json.score })
      } catch {}
    }
    tick()
    const id = setInterval(tick, 2000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Assets</h1>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">State Hash</div>
            <div className="mt-2 font-mono text-xs text-zinc-200 break-all">{data.hash}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Transitions</div>
            <div className="mt-2 text-3xl font-semibold text-white font-mono">{data.resonance}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
