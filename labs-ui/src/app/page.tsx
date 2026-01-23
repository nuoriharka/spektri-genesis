"use client"

import React from 'react'

export default function Home() {
  const [health, setHealth] = React.useState<'OK' | 'DEGRADED'>('DEGRADED')

  React.useEffect(() => {
    let active = true
    const tick = async () => {
      try {
        const res = await fetch('/api/resonance', { cache: 'no-store' })
        const json = await res.json()
        if (active) setHealth(json.coherence >= 1 ? 'OK' : 'DEGRADED')
      } catch {
        if (active) setHealth('DEGRADED')
      }
    }
    tick()
    const id = setInterval(tick, 2000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-[0.08em]">Dashboard</h1>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Active Project</div>
            <div className="mt-2 text-sm text-zinc-300">None</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Recent Actions</div>
            <div className="mt-2 text-sm text-zinc-300">None</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Running Operations</div>
            <div className="mt-2 text-sm text-zinc-300">None</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">System Health</div>
            <div className="mt-2 text-3xl font-semibold font-mono text-white">{health}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
