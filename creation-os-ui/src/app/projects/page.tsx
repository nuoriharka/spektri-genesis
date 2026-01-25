import { findActiveProject, loadActions, loadOperations, loadPlans, loadProjects } from '@/lib/store'
import CreateProjectModal from '@/components/projects/CreateProjectModal'

const formatTime = (timestamp: string | null) =>
  timestamp ? new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '—'

const allDepsDone = (action: any, map: Map<string, any>) =>
  (action.dependsOn || []).every((dep: string) => map.get(dep)?.status === 'DONE')

export default async function ProjectsPage() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  const plans = await loadPlans()
  const actions = await loadActions()
  const operations = await loadOperations()
  const actionMap = new Map(actions.filter((action) => action.id).map((action) => [action.id as string, action]))
  const nextAction = actions.find((action) => action.id && action.status === 'QUEUED' && allDepsDone(action, actionMap) && (!active || action.projectId === active.id))
  const lastOperation = active ? [...operations].reverse().find((op) => op.projectId === active.id) : null
  const health = lastOperation?.status === 'ERROR' ? 'DEGRADED' : lastOperation?.status === 'PENDING' ? 'DEGRADED' : 'OK'

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">Projects</h1>
          <div className="flex items-center gap-3">
            {active ? (
              <form action="/api/plans/execute-next" method="post">
                <button className="rounded-md border border-[#111] px-4 py-2 text-xs text-zinc-300 hover:text-white">
                  Execute Next Step
                </button>
              </form>
            ) : null}
            <CreateProjectModal />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#111] bg-black p-4">
            <div className="text-[11px] text-zinc-500">Next Executable Action</div>
            <div className="mt-2 text-sm text-zinc-300">{nextAction ? `${nextAction.actionKind || nextAction.verb} · ${nextAction.target}` : '—'}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-4">
            <div className="text-[11px] text-zinc-500">Last Operation</div>
            <div className="mt-2 text-sm text-zinc-300">{lastOperation ? `${lastOperation.status} · ${lastOperation.tool}` : '—'}</div>
          </div>
          <div className="rounded-lg border border-[#111] bg-black p-4">
            <div className="text-[11px] text-zinc-500">Health</div>
            <div className="mt-2 text-sm text-zinc-300">{active ? health : '—'}</div>
          </div>
        </div>
        <div className="mt-8 border border-[#111]">
          <div className="grid grid-cols-3 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>Plan</div>
            <div>Status</div>
            <div>Steps</div>
          </div>
          {plans.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No plans.</div>
          ) : (
            plans.map((plan) => {
              const planActions = actions.filter((action) => action.planId === plan.id).sort((a, b) => (a.stepIndex ?? 0) - (b.stepIndex ?? 0))
              const done = planActions.filter((action) => action.status === 'DONE').length
              const error = planActions.find((action) => action.status === 'ERROR')
              return (
                <div key={plan.id} className="border-b border-[#111]">
                  <div className="grid grid-cols-3 px-4 py-3 text-sm">
                    <div className="text-zinc-200">{plan.title}</div>
                    <div className="text-zinc-500">{plan.status}</div>
                    <div className="text-zinc-500">{done}/{plan.steps.length}</div>
                  </div>
                  <div className="px-4 pb-3 text-xs text-zinc-500 space-y-1">
                    {planActions.map((action) => (
                      <div key={action.id}>
                        {action.stepIndex !== undefined ? action.stepIndex + 1 : '-'} · {action.verb} · {action.status}
                      </div>
                    ))}
                    {error?.error?.reason && (
                      <a href="/operations" className="inline-block text-zinc-500 hover:text-zinc-300">
                        Replay last error
                      </a>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div className="mt-8 border border-[#111]">
          <div className="grid grid-cols-4 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>Name</div>
            <div>State</div>
            <div>Assets</div>
            <div>Last Action</div>
          </div>
          {projects.length === 0 ? (
            <div className="px-4 py-6 text-sm text-zinc-500">No projects.</div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="grid grid-cols-4 px-4 py-3 border-b border-[#111] text-sm">
                <div className="text-zinc-200">{project.name}</div>
                <div className="text-zinc-500">{project.state}</div>
                <div className="text-zinc-500">{project.assets.length}</div>
                <div className="text-zinc-500">
                  {project.lastAction ? `${project.lastAction} · ${formatTime(project.lastCommitAt)}` : '—'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
