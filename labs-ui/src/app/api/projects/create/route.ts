import { NextResponse } from 'next/server'
import { appendLog, loadProjects, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

export async function POST() {
  const projects = await loadProjects()
  const active = projects.find((project) => project.state === 'Active')
  const now = new Date().toISOString()
  const nextId = `project-${Date.now()}`
  const project = {
    id: nextId,
    name: `Project ${projects.length + 1}`,
    state: active ? 'Draft' : 'Active',
    phase: 'Design',
    lastCommitAt: null,
    lastAction: 'Created',
    assets: []
  } as const

  const updated = [...projects, project]
  await writeJson('projects.json', updated)
  await appendLog('actions.json', { timestamp: now, verb: 'Created project', target: project.name })

  return NextResponse.redirect(new URL('/projects', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'), 303)
}
