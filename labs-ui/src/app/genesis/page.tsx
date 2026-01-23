"use client"

import React from 'react'
import { GenesisResonance } from '@/components/GenesisResonance'

export default function GenesisPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-[#00FF00]">SPECTER v1.1 — GENESIS</h1>
        <p className="mt-2 text-sm text-[#00FF00]">Architect: Lauri Elias Rainio</p>
        <div className="mt-10">
          <GenesisResonance />
        </div>
      </div>
    </div>
  )
}
