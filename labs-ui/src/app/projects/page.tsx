import { findActiveProject, loadProjects } from '@/lib/store'

const formatTime = (timestamp: string | null) =>
  timestamp ? new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '—'

export default async function ProjectsPage() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.08em]">Projects</h1>
          {active ? (
            <form action="/api/projects/next-step" method="post">
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
