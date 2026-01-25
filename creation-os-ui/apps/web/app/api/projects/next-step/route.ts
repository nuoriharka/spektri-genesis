import { NextResponse } from 'next/server'
import { appendLog, findActiveProject, loadActions, loadOperations, loadProjects, nextPhase, writeJson } from '@/lib/store'

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
  let error: { reason: string; details?: string } | undefined
  const baseId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const pending = {
    id: `${baseId}-pending`,
    tool: 'gateway',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    projectId: active.id,
    correlationId,
    type: 'GATEWAY_NEXT_STEP'
  } as const
  await appendLog('operations.json', pending)
  const pendingLog = await loadOperations()
  const pendingTail = pendingLog[pendingLog.length - 1]
  if (!pendingTail || pendingTail.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
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
    if (!response.ok) {
      const reason = response.status >= 500 ? 'GATEWAY_5XX' : 'GATEWAY_4XX'
      error = { reason, details: `status:${response.status}` }
    }
  } catch {
    status = 'Failed'
    error = { reason: 'GATEWAY_NETWORK' }
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
  const check = await loadProjects()
  const updatedActive = check.find((project) => project.id === active.id)
  if (!updatedActive || updatedActive.phase === active.phase) {
    await appendLog('operations.json', {
      id: `op-${Date.now()}-final`,
      tool: 'gateway',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
        error: { reason: 'PROJECT_UPDATE_FAILED' },
        projectId: active.id,
        correlationId,
        parentOpId: pending.id,
        type: 'GATEWAY_NEXT_STEP'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  await appendLog('actions.json', {
    timestamp: now,
    verb: status === 'Completed' ? 'Executed next step' : 'Execution failed',
    target: active.name
  })
  const actions = await loadActions()
  const actionTail = actions[actions.length - 1]
  if (!actionTail || actionTail.timestamp !== now) {
    await appendLog('operations.json', {
      id: `op-${Date.now()}-final`,
      tool: 'gateway',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
        error: { reason: 'ACTION_LOG_FAILED' },
        projectId: active.id,
        correlationId,
        parentOpId: pending.id,
        type: 'GATEWAY_NEXT_STEP'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  await appendLog('operations.json', {
    id: `${baseId}-final`,
    tool: 'gateway',
    source: 'UI',
    status: status === 'Completed' ? 'OK' : 'ERROR',
    startedAt: now,
    endedAt: now,
    error,
    projectId: active.id,
    correlationId,
    parentOpId: pending.id,
    type: 'GATEWAY_NEXT_STEP'
  })
  const ops = await loadOperations()
  const opsTail = ops[ops.length - 1]
  if (!opsTail || opsTail.startedAt !== now) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/projects', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'), 303)
}
