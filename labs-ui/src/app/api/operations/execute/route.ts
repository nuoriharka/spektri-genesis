import { NextResponse } from 'next/server'
import { appendLog } from '@/lib/store'

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
      body: JSON.stringify({ action })
    })
    status = response.ok ? 'Completed' : 'Failed'
    if (!response.ok) error = `Gateway ${response.status}`
  } catch {
    status = 'Failed'
    error = 'Gateway unreachable'
  }

  await appendLog('operations.json', {
    id: `op-${Date.now()}`,
    tool: 'gateway',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: now,
    error
  })

  return NextResponse.json({ status })
}
