import { getNormalizedOperations, type NormalizedOperation, loadOperations } from '@/lib/store'
import OutcomeBadge from '@/components/OutcomeBadge'

const actions = ['Create', 'Build', 'Deploy', 'Publish']

type OpsFilters = {
  status?: string
  tool?: string
  range?: string
}

const applyFilters = (operations: NormalizedOperation[], filters: OpsFilters) => {
  const now = Date.now()
  const rangeMs = filters.range ? Number(filters.range) * 60 * 1000 : null
  return operations.filter((op) => {
    if (filters.status && filters.status !== 'all' && op.status !== filters.status) return false
    if (filters.tool && filters.tool !== 'all' && op.tool !== filters.tool) return false
    if (rangeMs) {
      const t = new Date(op.tsStart).getTime()
      if (Number.isFinite(t) && now - t > rangeMs) return false
    }
    return true
  })
}

export default async function OperationsPage({ searchParams }: { searchParams: OpsFilters }) {
  const operations = await loadOperations()
  const normalized = await getNormalizedOperations()
  const filtered = applyFilters(normalized, searchParams)
  const tools = Array.from(new Set(normalized.map((op) => op.tool)))

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, op) => {
    const key = op.projectId || 'unlinked'
    if (!acc[key]) acc[key] = []
    acc[key].push(op)
    return acc
  }, {})

  const lastError = normalized.find((op) => op.status === 'ERROR')
  const lastDegraded = normalized.find((op) => (op.error?.reason || '').toLowerCase().includes('degraded'))

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Operations</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Status</label>
            <select name="status" defaultValue={searchParams.status || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              <option value="PENDING">Pending</option>
              <option value="OK">OK</option>
              <option value="ERROR">Error</option>
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Type</label>
            <select name="tool" defaultValue={searchParams.tool || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              {tools.map((tool) => (
                <option key={tool} value={tool}>{tool}</option>
              ))}
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Range</label>
            <select name="range" defaultValue={searchParams.range || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              <option value="60">Last 60m</option>
              <option value="360">Last 6h</option>
              <option value="1440">Last 24h</option>
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {actions.map((action) => (
            <form key={action} action="/api/operations/execute" method="post">
              <input type="hidden" name="action" value={action} />
              <button className="flex w-full items-center justify-between rounded-lg border border-[#111] bg-black px-5 py-4 text-sm text-zinc-300 hover:text-white">
                <span>{action}</span>
                <span className="text-zinc-600">Run</span>
              </button>
            </form>
          ))}
        </div>
        <div className="mt-8 border border-[#111]" data-scroll-target="operations">
          <div className="border-b border-[#111] px-4 py-3 text-[11px] text-zinc-500">Last Incident</div>
          <div className="grid grid-cols-2 gap-4 px-4 py-4 text-xs text-zinc-400">
            <div>Most recent ERROR: {lastError ? `${lastError.id} · ${lastError.error?.reason || 'Unknown'}` : '—'}</div>
            <div>Most recent DEGRADED: {lastDegraded ? `${lastDegraded.id} · ${lastDegraded.error?.reason || 'Unknown'}` : '—'}</div>
          </div>
        </div>
        <div className="mt-6 border border-[#111]" data-scroll-target="operations">
          <div className="grid grid-cols-6 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>ID</div>
            <div>Type</div>
            <div>Project</div>
            <div>Origin</div>
            <div>Status</div>
            <div>Time</div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No operations.</div>
          ) : (
            Object.entries(grouped).map(([projectId, ops]) => (
              <div key={projectId}>
                <div className="px-4 py-2 text-[11px] text-zinc-500 border-b border-[#111]">
                  Project: {projectId === 'unlinked' ? 'Unlinked' : projectId}
                </div>
                {ops.map((op) => (
                  <div key={op.id} className="border-b border-[#111] px-4 py-3 text-sm">
                    <div className="grid grid-cols-6">
                      <div className="text-zinc-200">{op.id}</div>
                      <div className="text-zinc-500">{op.type}</div>
                      <div className="text-zinc-500">{op.projectId || '—'}</div>
                      <div className="text-zinc-500">
                        {op.actionId ? (
                          <a
                            href={`/actions?actionId=${op.actionId}#action-${op.actionId}`}
                            className="font-mono text-[11px] text-zinc-400 hover:text-zinc-200"
                          >
                            Origin: {op.actionId}
                          </a>
                        ) : (
                          <span className="text-[11px] text-zinc-500">Origin: System</span>
                        )}
                      </div>
                      <div className="text-zinc-500">
                        <OutcomeBadge status={op.status} />
                      </div>
                      <div className="text-zinc-500">
                        {op.tsStart}{op.tsFinal ? ` → ${op.tsFinal}` : ''}
                      </div>
                    </div>
                    <details className="mt-2 text-xs text-zinc-500">
                      <summary className="cursor-pointer">Details</summary>
                      <div className="mt-2 space-y-1">
                        <div>Error: {op.error?.reason || '—'}</div>
                        <div>Action: {op.actionId || '—'}</div>
                        <div>Project: {op.projectId || '—'}</div>
                        <div>Meta: {op.details || '—'}</div>
                        <div>Pending: {op.pendingId || '—'}</div>
                        <div>Final: {op.finalId || '—'}</div>
                      </div>
                      <div className="mt-3 space-y-1">
                        {op.pendingId ? (
                          <div>
                            PENDING RAW: {operations.find((raw) => raw.id === op.pendingId)?.status || '—'}
                          </div>
                        ) : null}
                        {op.finalId ? (
                          <div>
                            FINAL RAW: {operations.find((raw) => raw.id === op.finalId)?.status || '—'}
                          </div>
                        ) : null}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
