export const dynamic = 'force-dynamic'
import { computeHealth } from '@/lib/health'

export default async function StatusPage() {
  const health = await computeHealth()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">System Status</h1>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Current Status</div>
            <div className="mt-3 text-sm text-zinc-300">{health.status}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Reason</div>
            <div className="mt-3 text-sm text-zinc-300">{health.reason}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Last Incident</div>
            <div className="mt-3 text-sm text-zinc-300">{health.lastIncident || '—'}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Last Successful Execution</div>
            <div className="mt-3 text-sm text-zinc-300">{health.lastSuccess || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
