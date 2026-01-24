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

  const pending = {
    id: `${opId}-pending`,
    tool: 'commit',
    source: 'UI',
    status: 'PENDING',
    startedAt: now
  } as const

  await appendLog('operations.json', pending)
  const ops = await loadOperations()
  const last = ops[ops.length - 1]
  if (!last || last.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    await appendLog('actions.json', {
      timestamp: now,
      verb: 'Committed idea',
      target: active?.name || 'No active project'
    })
    const actions = await loadActions()
    const actionTail = actions[actions.length - 1]
    if (!actionTail || actionTail.timestamp !== now) {
      throw new Error('Action log failed')
    }

    await appendLog('chat_history.json', {
      timestamp: now,
      role: 'user',
      content
    })
    const history = await loadChatHistory()
    const historyTail = history[history.length - 1]
    if (!historyTail || historyTail.timestamp !== now) {
      throw new Error('Chat log failed')
    }

    const done = {
      id: `${opId}-final`,
      tool: 'commit',
      source: 'UI',
      status: 'OK',
      startedAt: now,
      endedAt: new Date().toISOString()
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
      tool: 'commit',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Commit failed'
    } as const
    await appendLog('operations.json', failed)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
