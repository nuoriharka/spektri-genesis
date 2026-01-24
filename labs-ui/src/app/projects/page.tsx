import { findActiveProject, loadActions, loadPlans, loadProjects } from '@/lib/store'

const formatTime = (timestamp: string | null) =>
  timestamp ? new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '—'

export default async function ProjectsPage() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  const plans = await loadPlans()
  const actions = await loadActions()

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">Projects</h1>
          {active ? (
            <form action="/api/plans/execute-next" method="post">
              <button className="rounded-md border border-[#111] px-4 py-2 text-xs text-zinc-300 hover:text-white">
                Execute Next Step
              </button>
            </form>
          ) : (
            <form action="/api/projects/create" method="post">
              <button className="rounded-md border border-[#111] px-4 py-2 text-xs text-zinc-300 hover:text-white">
                Create Project
              </button>
            </form>
          )}
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
