import { NextResponse } from 'next/server'
import { appendLog, loadOperations } from '@/lib/store'

export const runtime = 'nodejs'

const IDENTITY = 'Lauri Elias Rainio'
const GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || ''
  let action = 'Operation'
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}))
    if (typeof body?.action === 'string') action = body.action
  } else {
    const form = await request.formData()
    const value = form.get('action')
    if (typeof value === 'string') action = value
  }
  const now = new Date().toISOString()
  const baseId = `op-${Date.now()}`
  let status: 'OK' | 'ERROR' = 'ERROR'
  let error: string | undefined

  const pending = {
    id: `${baseId}-pending`,
    tool: 'gateway',
    source: 'UI',
    status: 'PENDING',
    startedAt: now
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
      body: JSON.stringify({ action })
    })
    status = response.ok ? 'OK' : 'ERROR'
    if (!response.ok) error = `Gateway ${response.status}`
  } catch {
    status = 'ERROR'
    error = 'Gateway unreachable'
  }

  const finalEntry = {
    id: `${baseId}-final`,
    tool: 'gateway',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: now,
    error
  } as const
  await appendLog('operations.json', finalEntry)
  const finalLog = await loadOperations()
  const finalTail = finalLog[finalLog.length - 1]
  if (!finalTail || finalTail.id !== finalEntry.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ status })
}
