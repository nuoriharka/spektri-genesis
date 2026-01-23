import { loadOperations } from '@/lib/store'

export default async function OperationsPage() {
  const operations = await loadOperations()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Operations</h1>
        <div className="mt-8 border border-[#111]">
          <div className="grid grid-cols-5 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>ID</div>
            <div>Tool</div>
            <div>Source</div>
            <div>Status</div>
            <div>Time</div>
          </div>
          {operations.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No operations.</div>
          ) : (
            operations.map((op) => (
              <div key={op.id} className="grid grid-cols-5 px-4 py-3 border-b border-[#111] text-sm">
                <div className="text-zinc-200">{op.id}</div>
                <div className="text-zinc-500">{op.tool}</div>
                <div className="text-zinc-500">{op.source}</div>
                <div className="text-zinc-500">{op.status}</div>
                <div className="text-zinc-500">
                  {op.startedAt}{op.endedAt ? ` → ${op.endedAt}` : ''}
                </div>
                {op.status === 'Failed' && op.error && (
                  <div className="col-span-5 mt-1 text-xs text-zinc-500">{op.error}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
