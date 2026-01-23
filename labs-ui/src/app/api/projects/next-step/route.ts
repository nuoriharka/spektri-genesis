import { NextResponse } from 'next/server'
import { appendLog, findActiveProject, loadProjects, nextPhase, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

const IDENTITY = 'Lauri Elias Rainio'
const GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function POST() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  if (!active) {
    return NextResponse.redirect(new URL('/projects', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'), 303)
  }

  const now = new Date().toISOString()
  const payload = { action: 'execute_next_step', projectId: active.id, phase: active.phase }

  let status: 'Completed' | 'Failed' = 'Failed'
  let error: string | undefined
  try {
    const response = await fetch(`${GATEWAY}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identity': IDENTITY,
        'X-Responsibility-Accepted': 'true'
      },
      body: JSON.stringify(payload)
    })
    status = response.ok ? 'Completed' : 'Failed'
    if (!response.ok) error = `Gateway ${response.status}`
  } catch {
    status = 'Failed'
    error = 'Gateway unreachable'
  }

  const updated = projects.map((project) => {
    if (project.id !== active.id) return project
    const phase = nextPhase(project.phase)
    return {
      ...project,
      phase,
      lastCommitAt: now,
      lastAction: status === 'Completed' ? `Advanced to ${phase}` : 'Execution failed'
    }
  })

  await writeJson('projects.json', updated)
  await appendLog('actions.json', {
    timestamp: now,
    verb: status === 'Completed' ? 'Executed next step' : 'Execution failed',
    target: active.name
  })
  await appendLog('operations.json', {
    id: `op-${Date.now()}`,
    tool: 'gateway',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: now,
    error
  })

  return NextResponse.redirect(new URL('/projects', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'), 303)
}
