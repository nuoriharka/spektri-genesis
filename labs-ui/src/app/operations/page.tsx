"use client"

import React from 'react'

const actions = ['Create', 'Build', 'Deploy', 'Publish']

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Operations</h1>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {actions.map((action) => (
            <button
              key={action}
              className="flex items-center justify-between rounded-lg border border-[#111] bg-black px-5 py-4 text-sm text-zinc-300 hover:text-white"
            >
              <span>{action}</span>
              <span className="text-zinc-600">Run</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
