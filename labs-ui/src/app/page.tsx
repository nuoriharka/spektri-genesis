import path from 'node:path'
import fs from 'node:fs/promises'
import { findActiveProject, loadActions, loadOperations, loadProjects, loadSystem } from '@/lib/store'

const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const checkGateway = async () => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 800)
  try {
    const response = await fetch(gatewayUrl, { method: 'GET', signal: controller.signal })
    clearTimeout(timer)
    return response.ok
  } catch {
    clearTimeout(timer)
    return false
  }
}

const checkTool = async () => {
  try {
    await fs.access(path.resolve(process.cwd(), '../src/engine/resonance_432/build/Release/resonance_432.node'))
    return true
  } catch {
    return false
  }
}

export default async function Home() {
  const projects = await loadProjects()
  const actions = await loadActions()
  const operations = await loadOperations()
  const system = await loadSystem()
  const active = findActiveProject(projects)
  const running = operations.filter((op) => op.status === 'PENDING')
  const recent = actions.slice(-5).reverse()
  const apiOnline = await checkGateway()
  const toolAvailable = await checkTool()
  const lastCheck = new Date().toISOString()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-[0.08em]">Dashboard</h1>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Active Project</div>
            {active ? (
              <div className="mt-3 space-y-1 text-sm text-zinc-300">
                <div className="text-white">{active.name}</div>
                <div>Phase: {active.phase}</div>
                <div>Last commit: {active.lastCommitAt ? formatTime(active.lastCommitAt) : '—'}</div>
              </div>
            ) : (
              <form action="/api/projects/create" method="post" className="mt-3">
                <button className="rounded-md border border-[#111] px-4 py-2 text-xs text-zinc-300 hover:text-white">
                  Create Project
                </button>
              </form>
            )}
              </div>
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">Recent Actions</div>
            <div className="mt-3 space-y-1 text-sm text-zinc-300">
              {recent.map((action) => (
                <div key={`${action.timestamp}-${action.verb}`}>
                  {formatTime(action.timestamp)} — {action.verb} {action.target}
                </div>
              ))}
            </div>
          </div>
          {running.length > 0 && (
            <div className="rounded-lg border border-[#111] bg-black p-6">
              <div className="text-[11px] text-zinc-500">Running Operations</div>
              <div className="mt-3 space-y-1 text-sm text-zinc-300">
                {running.map((op) => (
                  <div key={op.id}>
                    {op.id} — {op.tool} — {op.status}
        </div>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-lg border border-[#111] bg-black p-6">
            <div className="text-[11px] text-zinc-500">System Health</div>
            <div className="mt-3 space-y-1 text-sm text-zinc-300">
              <div>API Connectivity: {apiOnline ? 'Online' : 'Offline'}</div>
              <div>Tool Availability: {toolAvailable ? 'Available' : 'Unavailable'}</div>
              <div>Authentication: {system.auth}</div>
              <div>Environment: {system.environment}</div>
              <div>Last Check: {formatTime(lastCheck)}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
