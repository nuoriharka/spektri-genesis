import { GenesisResonance } from '@/components/GenesisResonance'
import { loadSystem } from '@/lib/store'

export default async function SystemPage() {
  const system = await loadSystem()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">System</h1>
          <a href="/chat" className="text-xs text-zinc-500 hover:text-zinc-200">Chat</a>
        </div>
        <div className="mt-10">
          <GenesisResonance />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Connected Tools</div>
            <div className="mt-3 text-sm text-zinc-500">{system.tools.length ? system.tools.join(', ') : 'None'}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Authentication</div>
            <div className="mt-3 text-sm text-zinc-500">{system.auth}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Environment</div>
            <div className="mt-3 text-sm text-zinc-500">{system.environment}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Last Check</div>
            <div className="mt-3 text-sm text-zinc-500">{system.lastCheck}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6 md:col-span-2">
            <div className="text-[11px] text-zinc-500">Logs</div>
            <div className="mt-3 text-sm text-zinc-500">Read-only</div>
          </div>
        </div>
      </div>
    </div>
  )
}
