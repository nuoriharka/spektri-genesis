import { getNormalizedOperations, loadActions, loadOperations, loadProjects } from '@/lib/store'
import OutcomeBadge from '@/components/OutcomeBadge'

type ActionFilters = {
  status?: string
  project?: string
  kind?: string
  actionId?: string
}

const redactPayload = (payload?: string) => {
  if (!payload) return '—'
  if (payload.includes('ghp_')) return '[REDACTED]'
  if (payload.toLowerCase().includes('token')) return '[REDACTED]'
  return payload.length > 240 ? `${payload.slice(0, 240)}…` : payload
}

const applyFilters = (actions: Awaited<ReturnType<typeof loadActions>>, filters: ActionFilters) =>
  actions
    .filter((action) => {
      if (filters.status && filters.status !== 'all' && action.status !== filters.status) return false
      if (filters.project && filters.project !== 'all' && action.projectId !== filters.project) return false
      if (filters.kind && filters.kind !== 'all' && action.actionKind !== filters.kind) return false
      return true
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

export default async function ActionsPage({ searchParams }: { searchParams: ActionFilters }) {
  const actions = await loadActions()
  const operations = await loadOperations()
  const normalizedOperations = await getNormalizedOperations()
  const projects = await loadProjects()
  const filtered = applyFilters(actions, searchParams)
  const selectedActionId = typeof searchParams.actionId === 'string' ? searchParams.actionId : ''
  const kinds = Array.from(new Set(actions.map((action) => action.actionKind).filter(Boolean)))
  const projectIds = Array.from(
    new Set(actions.map((action) => action.projectId).filter((id): id is string => Boolean(id)))
  )
  const canExecute = projectIds.length > 0

  const findOperationIds = (actionId?: string) =>
    operations.filter((op) => op.actionId === actionId).map((op) => op.id)
  const findCorrelationIds = (actionId?: string, opIds: string[] = []) => {
    const matches = operations.filter(
      (op) => (actionId && op.actionId === actionId) || opIds.includes(op.id)
    )
    return Array.from(
      new Set(matches.map((op) => op.correlationId).filter((id): id is string => Boolean(id)))
    )
  }
  const findParentCorrelationIds = (opIds: string[] = []) => {
    const matches = operations.filter((op) => op.parentOpId && opIds.includes(op.parentOpId))
    return Array.from(
      new Set(matches.map((op) => op.correlationId).filter((id): id is string => Boolean(id)))
    )
  }

  const findLinkedNormalized = (actionId?: string, opIds: string[] = [], correlations: string[] = []) =>
    normalizedOperations.filter((op) => {
      if (actionId && op.actionId === actionId) return true
      if (op.correlationId && correlations.includes(op.correlationId)) return true
      if (op.pendingId && opIds.includes(op.pendingId)) return true
      if (op.finalId && opIds.includes(op.finalId)) return true
      return false
    })

  const resolveOutcome = (linkedOps: ReturnType<typeof findLinkedNormalized>) => {
    const finals = linkedOps.filter((op) => op.status === 'OK' || op.status === 'ERROR')
    if (finals.length > 0) {
      const latest = finals.sort((a, b) =>
        new Date(b.tsFinal || b.tsStart).getTime() - new Date(a.tsFinal || a.tsStart).getTime()
      )[0]
      return latest.status
    }
    if (linkedOps.some((op) => op.status === 'PENDING')) return 'PENDING'
    return 'PENDING'
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Actions</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Status</label>
            <select name="status" defaultValue={searchParams.status || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              <option value="QUEUED">Queued</option>
              <option value="RUNNING">Running</option>
              <option value="DONE">Done</option>
              <option value="ERROR">Error</option>
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Project</label>
            <select name="project" defaultValue={searchParams.project || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              {projectIds.map((id) => {
                const name = projects.find((project) => project.id === id)?.name || id
                return (
                  <option key={id} value={id}>{name}</option>
                )
              })}
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
          <form className="flex items-center gap-2 text-xs text-zinc-500" method="get">
            <label className="min-w-[70px]">Kind</label>
            <select name="kind" defaultValue={searchParams.kind || 'all'} className="h-8 flex-1 border border-[#111] bg-black px-2 text-zinc-200">
              <option value="all">All</option>
              {kinds.map((kind) => (
                <option key={kind} value={kind}>{kind}</option>
              ))}
            </select>
            <button className="h-8 border border-[#111] px-3 text-xs text-zinc-300">Apply</button>
          </form>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <form action="/api/plans/execute-next" method="post">
            <button
              className="h-9 border border-[#111] px-3 text-xs text-zinc-300 hover:text-white disabled:text-zinc-600"
              disabled={!canExecute}
              title={canExecute ? 'Execute next step' : 'Needs project'}
            >
              Execute Next Step
            </button>
          </form>
        </div>

        <div className="mt-8 border border-[#111]" data-scroll-target="actions">
          <div className="border-b border-[#111] px-4 py-3 text-[11px] text-zinc-500">
            Actions
          </div>
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No actions.</div>
          ) : (
            filtered.map((action) => {
              const linkedOps = action.operationIds?.length ? action.operationIds : findOperationIds(action.id)
              const correlations = [
                ...findCorrelationIds(action.id, linkedOps),
                ...findParentCorrelationIds(linkedOps)
              ]
              const linkedNormalized = findLinkedNormalized(action.id, linkedOps, correlations)
              const outcome = resolveOutcome(linkedNormalized)
              const latestError = linkedNormalized
                .filter((op) => op.status === 'ERROR')
                .sort((a, b) => new Date(b.tsFinal || b.tsStart).getTime() - new Date(a.tsFinal || a.tsStart).getTime())[0]
              const isOpen = Boolean(selectedActionId && action.id === selectedActionId)
              return (
                <details
                  key={`${action.timestamp}-${action.id || action.verb}`}
                  className="border-b border-[#111] px-4 py-3 text-sm"
                  open={isOpen}
                >
                  <summary
                    id={action.id ? `action-${action.id}` : undefined}
                    className="cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-zinc-200">{action.actionKind || action.verb}</div>
                      <OutcomeBadge status={outcome} />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                      <div>{action.timestamp}</div>
                      <div>{action.projectId || '—'}</div>
                    </div>
                  </summary>
                  <div className="mt-3 rounded-md border border-[#111] p-4 text-xs text-zinc-500">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Action</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>ID: {action.id || '—'}</div>
                      <div>Kind: {action.actionKind || action.verb}</div>
                      <div>Status: <OutcomeBadge status={outcome} /></div>
                      <div>Created At: {action.timestamp}</div>
                      <div>Project: {action.projectId || '—'}</div>
                      <div>Target: {action.target}</div>
                    </div>
                    <details className="mt-3">
                      <summary className="cursor-pointer">Payload</summary>
                      <div className="mt-2">Payload: {redactPayload(action.payload)}</div>
                    </details>

                    <div className="my-4 border-t border-[#111]" />

                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Operations</div>
                    {linkedNormalized.length === 0 ? (
                      <div className="mt-2">No linked operations.</div>
                    ) : (
                      <div className="mt-2 max-h-64 space-y-2 overflow-y-auto pr-1">
                        {linkedNormalized.map((op) => (
                          <div key={op.id} className="flex items-center justify-between border border-[#111] px-3 py-2">
                            <div className="text-zinc-400">
                              {op.type} · {op.tsStart}
                            </div>
                            <div className="flex items-center gap-2">
                              <OutcomeBadge status={op.status} />
                              <span className="text-zinc-600">{op.error?.reason || '—'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="my-4 border-t border-[#111]" />

                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Outcome</div>
                    <div className="mt-2 flex items-center gap-2">
                      <OutcomeBadge status={outcome} />
                      <span className="text-zinc-600">
                        {outcome === 'ERROR' ? latestError?.error?.reason || '—' : '—'}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1 text-[11px] text-zinc-600">
                      <div>Operation IDs: {linkedOps.length ? linkedOps.join(', ') : '—'}</div>
                      <div>Correlation IDs: {correlations.length ? correlations.join(', ') : '—'}</div>
                      <div>Plan: {action.planId || '—'}</div>
                    </div>
                  </div>
                </details>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
