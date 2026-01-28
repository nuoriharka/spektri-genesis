import { NextResponse } from 'next/server'
import { appendLog, loadActions, loadOperations, loadPlans, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

const supportedKinds = ['CREATE', 'BUILD', 'DEPLOY', 'PUBLISH']

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const plan = body?.plan
  if (!plan || !Array.isArray(plan.steps)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (plan.steps.length < 1 || plan.steps.length > 7) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const pending = {
    id: `${opId}-pending`,
    tool: 'plan',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    projectId: plan.projectId ?? null,
    correlationId
  } as const
  await appendLog('operations.json', pending)
  const ops = await loadOperations()
  const pendingTail = ops[ops.length - 1]
  if (!pendingTail || pendingTail.id !== pending.id) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const normalizedSteps = plan.steps.map((step: any, index: number) => {
    const actionKind = String(step.actionKind || '').toUpperCase()
    if (!supportedKinds.includes(actionKind)) throw new Error('Unsupported action')
    return {
      id: step.id || `step-${Date.now()}-${index}`,
      title: step.title || actionKind,
      actionKind,
      payload: step.payload || step.title || actionKind,
      dependsOn: index === 0 ? [] : [plan.steps[index - 1].id || `step-${Date.now()}-${index - 1}`]
    }
  })

  const planEntry = {
    id: plan.id || `plan-${Date.now()}`,
    projectId: plan.projectId ?? null,
    title: plan.title || 'Plan',
    createdAt: plan.createdAt || now,
    steps: normalizedSteps,
    status: 'COMMITTED'
  } as const

  const plans = await loadPlans()
  await writeJson('plans.json', [...plans, planEntry])
  const plansCheck = await loadPlans()
  const planTail = plansCheck[plansCheck.length - 1]
  if (!planTail || planTail.id !== planEntry.id) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: { reason: 'PLAN_WRITE_FAILED' },
      projectId: planEntry.projectId,
      correlationId,
      parentOpId: pending.id
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  for (let i = 0; i < normalizedSteps.length; i += 1) {
    const step = normalizedSteps[i]
    await appendLog('actions.json', {
      id: step.id,
      timestamp: now,
      verb: step.actionKind,
      target: planEntry.title,
      projectId: planEntry.projectId,
      planId: planEntry.id,
      stepIndex: i,
      dependsOn: step.dependsOn || [],
      status: 'QUEUED',
      actionKind: step.actionKind,
      payload: step.payload
    })
  }
  const actions = await loadActions()
  const actionWritten = actions.some((action) => action.planId === planEntry.id)
  if (!actionWritten) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: { reason: 'ACTION_WRITE_FAILED' },
      projectId: planEntry.projectId,
      correlationId,
      parentOpId: pending.id
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  await appendLog('operations.json', {
    id: `${opId}-final`,
    tool: 'plan',
    source: 'UI',
    status: 'OK',
    startedAt: now,
    endedAt: now,
    projectId: planEntry.projectId,
    correlationId,
    parentOpId: pending.id
  })

  return NextResponse.json({ ok: true })
}
