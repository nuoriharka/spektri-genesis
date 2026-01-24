import { NextResponse } from 'next/server'
import { appendLog, loadChatHistory, loadOperations, loadProjects } from '@/lib/store'

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
    status: 'Running',
    startedAt: now
  } as const

  await appendLog('operations.json', pending)
  const ops = await loadOperations()
  const last = ops[ops.length - 1]
  if (!last || last.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  await appendLog('actions.json', {
    timestamp: now,
    verb: 'Committed idea',
    target: active?.name || 'No active project'
  })

  await appendLog('chat_history.json', {
    timestamp: now,
    role: 'user',
    content
  })

  await loadChatHistory()

  const done = {
    id: `${opId}-done`,
    tool: 'commit',
    source: 'UI',
    status: 'Completed',
    startedAt: now,
    endedAt: new Date().toISOString()
  } as const

  await appendLog('operations.json', done)

  return NextResponse.json({ ok: true })
}
