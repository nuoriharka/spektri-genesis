"use client"

import React from 'react'
import { GenesisResonance } from '@/components/GenesisResonance'

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">System</h1>
        <div className="mt-10">
          <GenesisResonance />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Integrations</div>
            <div className="mt-3 text-sm text-zinc-500">None</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Environment</div>
            <div className="mt-3 text-sm text-zinc-500">Local</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6 md:col-span-2">
            <div className="text-[11px] text-zinc-500">Logs</div>
            <div className="mt-3 text-sm text-zinc-500">No logs.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
