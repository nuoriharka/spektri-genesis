"use client"

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">Genesis Interface</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Minimal control surface for Ledger, THE_GAME, and live resonance.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/genesis"
            className="rounded-lg border border-[#111] bg-black px-5 py-6 text-sm text-zinc-200 hover:text-white"
          >
            Genesis
          </Link>
          <Link
            href="/game"
            className="rounded-lg border border-[#111] bg-black px-5 py-6 text-sm text-zinc-200 hover:text-white"
          >
            THE_GAME
          </Link>
          <Link
            href="/ledger"
            className="rounded-lg border border-[#111] bg-black px-5 py-6 text-sm text-zinc-200 hover:text-white"
          >
            Ledger
          </Link>
        </div>
      </div>
    </div>
  )
}
