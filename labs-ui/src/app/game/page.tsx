"use client"

import React from 'react'
import { GenesisResonance } from '@/components/GenesisResonance'

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight">THE_GAME</h1>
        <p className="mt-2 text-sm text-zinc-400">Live state derived from 3-6-9 validation.</p>
        <div className="mt-10">
          <GenesisResonance />
        </div>
      </div>
    </div>
  )
}
