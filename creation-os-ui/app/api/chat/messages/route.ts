import { NextResponse } from 'next/server'
import { appendLog, loadChatHistory, loadOperations } from '@/lib/store'

export const runtime = 'nodejs'

export async function GET() {
  const messages = await loadChatHistory()
  return NextResponse.json({ messages })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const content = typeof body?.content === 'string' ? body.content.trim() : ''
  if (!content) return NextResponse.json({ ok: false }, { status: 400 })

  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const pending = {
    id: `${opId}-pending`,
    tool: 'chat_message',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    type: 'CHAT_MESSAGE',
    correlationId
  } as const

  await appendLog('operations.json', pending)
  const ops = await loadOperations()
  if (!ops.length || ops[ops.length - 1]?.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  try {
    const entry = { timestamp: now, role: 'user', content } as const
    await appendLog('chat_history.json', entry)
    const messages = await loadChatHistory()
    const last = messages[messages.length - 1]
    const ok = !!last && last.timestamp === entry.timestamp && last.content === entry.content
    if (!ok) {
      throw new Error('CHAT_LOG_FAILED')
    }

    const done = {
      id: `${opId}-final`,
      tool: 'chat_message',
      source: 'UI',
      status: 'OK',
      startedAt: now,
      endedAt: new Date().toISOString(),
      type: 'CHAT_MESSAGE',
      correlationId,
      parentOpId: pending.id
    } as const
    await appendLog('operations.json', done)
    const opsFinal = await loadOperations()
    if (!opsFinal.length || opsFinal[opsFinal.length - 1]?.id !== done.id) {
      throw new Error('OP_LOG_FAILED')
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const failed = {
      id: `${opId}-final`,
      tool: 'chat_message',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: new Date().toISOString(),
      error: { reason: error instanceof Error ? error.message : 'CHAT_MESSAGE_FAILED' },
      type: 'CHAT_MESSAGE',
      correlationId,
      parentOpId: pending.id
    } as const
    await appendLog('operations.json', failed)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
