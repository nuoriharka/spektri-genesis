"use client"

import React from 'react'
import { GenesisResonance } from '@/components/GenesisResonance'

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Operations</h1>
        <div className="mt-10">
          <GenesisResonance />
        </div>
      </div>
    </div>
  )
}
