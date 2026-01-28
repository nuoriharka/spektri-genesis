import { NextResponse } from 'next/server'
import { appendLog, loadActions, loadChatHistory, loadOperations, loadProjects } from '@/lib/store'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const content = typeof body?.content === 'string' ? body.content.trim() : ''
  if (!content) return NextResponse.json({ ok: false }, { status: 400 })

  const projects = await loadProjects()
  const active = projects.find((project) => project.state === 'Active')
  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const pending = {
    id: `${opId}-pending`,
    tool: 'chat_commit',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    projectId: active?.id || null,
    type: 'CHAT_COMMIT',
    correlationId
  } as const

  await appendLog('operations.json', pending)
  const ops = await loadOperations()
  const last = ops[ops.length - 1]
  if (!last || last.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    const actionId = `action-${Date.now()}`
    await appendLog('actions.json', {
      id: actionId,
      timestamp: now,
      verb: 'Committed idea',
      target: active?.name || 'No active project',
      projectId: active?.id || null
    })
    const actions = await loadActions()
    const actionWritten = actions.some((action) => action.id === actionId)
    if (!actionWritten) {
      throw new Error('ACTION_LOG_FAILED')
    }

    await appendLog('chat_history.json', {
      timestamp: now,
      role: 'user',
      content
    })
    const history = await loadChatHistory()
    const historyTail = history[history.length - 1]
    if (!historyTail || historyTail.timestamp !== now) {
      throw new Error('CHAT_LOG_FAILED')
    }

    const done = {
      id: `${opId}-final`,
      tool: 'chat_commit',
      source: 'UI',
      status: 'OK',
      startedAt: now,
      endedAt: new Date().toISOString(),
      projectId: active?.id || null,
      type: 'CHAT_COMMIT',
      correlationId,
      parentOpId: pending.id
    } as const
    await appendLog('operations.json', done)
    const opsFinal = await loadOperations()
    const opsTail = opsFinal[opsFinal.length - 1]
    if (!opsTail || opsTail.id !== done.id) {
      throw new Error('Operation log failed')
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const failed = {
      id: `${opId}-final`,
      tool: 'chat_commit',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: new Date().toISOString(),
      error: { reason: error instanceof Error ? error.message : 'COMMIT_FAILED' },
      projectId: active?.id || null,
      type: 'CHAT_COMMIT',
      correlationId,
      parentOpId: pending.id
    } as const
    await appendLog('operations.json', failed)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
