import { NextResponse } from 'next/server'
import { appendLog, loadActions, loadOperations, loadProjects, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const projects = await loadProjects()
  const active = projects.find((project) => project.state === 'Active')
  const now = new Date().toISOString()
  const nextId = `project-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const form = await request.formData()
  const nameInput = String(form.get('name') || '').trim()
  const safeName = nameInput.length > 0 ? nameInput.slice(0, 60) : `Project ${projects.length + 1}`
  const project = {
    id: nextId,
    name: safeName,
    state: active ? 'Draft' : 'Active',
    phase: 'Design',
    lastCommitAt: null,
    lastAction: 'Created',
    assets: []
  } as const

  const opId = `op-${Date.now()}`
  await appendLog('operations.json', {
    id: `${opId}-pending`,
    tool: 'project_create',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    projectId: project.id,
    correlationId
  })
  const ops = await loadOperations()
  const pendingTail = ops[ops.length - 1]
  if (!pendingTail || pendingTail.id !== `${opId}-pending`) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const updated = [...projects, project]
  await writeJson('projects.json', updated)
  const check = await loadProjects()
  const tail = check[check.length - 1]
  if (!tail || tail.id !== project.id) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'project_create',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: { reason: 'PROJECT_WRITE_FAILED' },
      projectId: project.id,
      correlationId,
      parentOpId: `${opId}-pending`
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  const actionId = `action-${Date.now()}`
  await appendLog('actions.json', {
    id: actionId,
    timestamp: now,
    verb: 'Created project',
    target: project.name,
    projectId: project.id
  })
  const actions = await loadActions()
  const actionWritten = actions.some((action) => action.id === actionId)
  if (!actionWritten) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'project_create',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: { reason: 'ACTION_LOG_FAILED' },
      projectId: project.id,
      correlationId,
      parentOpId: `${opId}-pending`
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  await appendLog('operations.json', {
    id: `${opId}-final`,
    tool: 'project_create',
    source: 'UI',
    status: 'OK',
    startedAt: now,
    endedAt: now,
    projectId: project.id,
    correlationId,
    parentOpId: `${opId}-pending`
  })

  return NextResponse.redirect(new URL('/projects', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'), 303)
}
