import { NextResponse } from 'next/server'
import { appendLog, loadChatHistory } from '@/lib/store'

export const runtime = 'nodejs'

export async function GET() {
  const messages = await loadChatHistory()
  return NextResponse.json({ messages })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const content = typeof body?.content === 'string' ? body.content.trim() : ''
  if (!content) return NextResponse.json({ ok: false }, { status: 400 })

  const entry = { timestamp: new Date().toISOString(), role: 'user', content } as const
  await appendLog('chat_history.json', entry)

  const messages = await loadChatHistory()
  const last = messages[messages.length - 1]
  const ok = !!last && last.timestamp === entry.timestamp && last.content === entry.content

  return NextResponse.json({ ok })
}
