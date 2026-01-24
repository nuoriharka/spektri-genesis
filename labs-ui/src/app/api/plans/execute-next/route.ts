import { NextResponse } from 'next/server'
import { appendLog, loadActions, loadAssets, loadPlans, loadProjects, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

const IDENTITY = 'Lauri Elias Rainio'
const GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

const allDepsDone = (action: any, map: Map<string, any>) =>
  (action.dependsOn || []).every((dep: string) => map.get(dep)?.status === 'DONE')

export async function POST() {
  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`

  await appendLog('operations.json', {
    id: `${opId}-pending`,
    tool: 'plan',
    source: 'UI',
    status: 'PENDING',
    startedAt: now
  })

  const actions = await loadActions()
  const actionMap = new Map(actions.filter((action) => action.id).map((action) => [action.id as string, action]))
  const next = actions.find((action) => action.id && action.status === 'QUEUED' && allDepsDone(action, actionMap))

  if (!next) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: 'No executable action'
    })
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const updatedActions = actions.map((action) =>
    action.id === next.id ? { ...action, status: 'RUNNING' } : action
  )
  await writeJson('actions.json', updatedActions)
  const runningCheck = await loadActions()
  const running = runningCheck.find((action) => action.id === next.id)
  if (!running || running.status !== 'RUNNING') {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: 'Action state not set to RUNNING'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  let status: 'OK' | 'ERROR' = 'ERROR'
  let reason = ''
  try {
    const response = await fetch(`${GATEWAY}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identity': IDENTITY,
        'X-Responsibility-Accepted': 'true'
      },
      body: JSON.stringify({ action: next.verb, payload: next.target })
    })
    status = response.ok ? 'OK' : 'ERROR'
    if (!response.ok) reason = `Gateway ${response.status}`
  } catch {
    status = 'ERROR'
    reason = 'Gateway unreachable'
  }

  const finalActions = updatedActions.map((action) =>
    action.id === next.id
      ? {
          ...action,
          status: status === 'OK' ? 'DONE' : 'ERROR',
          result: status === 'OK' ? 'Completed' : undefined,
          error: status === 'ERROR' ? { reason } : undefined
        }
      : action
  )
  await writeJson('actions.json', finalActions)
  const doneCheck = await loadActions()
  const done = doneCheck.find((action) => action.id === next.id)
  if (!done || done.status !== (status === 'OK' ? 'DONE' : 'ERROR')) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: 'Action state not finalized'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (status === 'OK' && ['BUILD', 'DEPLOY', 'PUBLISH'].includes(next.verb)) {
    const assets = await loadAssets()
    const asset = {
      id: `asset-${Date.now()}`,
      name: `${next.verb} artifact`,
      type: 'Artifact',
      updatedAt: now,
      location: `/outputs/${next.verb.toLowerCase()}-${Date.now()}`
    }
    await writeJson('assets.json', [...assets, asset])
    const assetsCheck = await loadAssets()
    const assetTail = assetsCheck[assetsCheck.length - 1]
    if (!assetTail || assetTail.id !== asset.id) {
      await appendLog('operations.json', {
        id: `${opId}-final`,
        tool: 'plan',
        source: 'UI',
        status: 'ERROR',
        startedAt: now,
        endedAt: now,
        error: 'Asset write failed'
      })
      return NextResponse.json({ ok: false }, { status: 500 })
    }
  }

  const plans = await loadPlans()
  const updatedPlans = plans.map((plan) => {
    if (plan.id !== next.planId) return plan
    const stepsDone = finalActions.filter((action) => action.planId === plan.id && action.status === 'DONE').length
    const total = finalActions.filter((action) => action.planId === plan.id).length
    const nextStatus = status === 'ERROR' ? 'ERROR' : stepsDone === total ? 'DONE' : 'EXECUTING'
    return { ...plan, status: nextStatus }
  })
  await writeJson('plans.json', updatedPlans)
  const plansCheck = await loadPlans()
  const planTail = plansCheck.find((plan) => plan.id === next.planId)
  if (!planTail) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: 'Plan update failed'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  await appendLog('operations.json', {
    id: `${opId}-final`,
    tool: 'plan',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: now,
    error: status === 'ERROR' ? reason : undefined
  })

  return NextResponse.json({ ok: status === 'OK' })
}
