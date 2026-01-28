import { NextResponse } from 'next/server'
import { appendLog, loadActions, loadOperations } from '@/lib/store'

export const runtime = 'nodejs'

const IDENTITY = 'Lauri Elias Rainio'
const GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'
const SAFE_KINDS = ['CREATE', 'BUILD', 'DEPLOY', 'PUBLISH', 'ANALYZE', 'CODE_GEN']

export async function POST(request: Request) {
  const form = await request.formData()
  const actionId = String(form.get('actionId') || '')
  const actions = await loadActions()
  const action = actions.find((entry) => entry.id === actionId)

  if (!action || !action.actionKind || !SAFE_KINDS.includes(action.actionKind)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  await appendLog('operations.json', {
    id: `${opId}-pending`,
    tool: 'action_retry',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    actionId,
    projectId: action.projectId ?? null,
    correlationId,
    type: 'GATEWAY_ACTION_RETRY'
  })
  const ops = await loadOperations()
  const pendingTail = ops[ops.length - 1]
  if (!pendingTail || pendingTail.id !== `${opId}-pending`) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  let status: 'OK' | 'ERROR' = 'ERROR'
  let error: { reason: string; details?: string } | undefined
  try {
    const response = await fetch(`${GATEWAY}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identity': IDENTITY,
        'X-Responsibility-Accepted': 'true'
      },
      body: JSON.stringify({ action: action.actionKind, payload: action.payload || action.target })
    })
    status = response.ok ? 'OK' : 'ERROR'
    if (!response.ok) {
      const reason = response.status >= 500 ? 'GATEWAY_5XX' : 'GATEWAY_4XX'
      error = { reason, details: `status:${response.status}` }
    }
  } catch {
    status = 'ERROR'
    error = { reason: 'GATEWAY_NETWORK' }
  }

  await appendLog('operations.json', {
    id: `${opId}-final`,
    tool: 'action_retry',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: new Date().toISOString(),
    error,
    actionId,
    projectId: action.projectId ?? null,
    correlationId,
    parentOpId: `${opId}-pending`,
    type: 'GATEWAY_ACTION_RETRY'
  })

  return NextResponse.json({ ok: status === 'OK' })
}
