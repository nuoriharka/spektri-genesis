import { NextResponse } from 'next/server'
import { appendLog, findActiveProject, loadActions, loadAssets, loadOperations, loadPlans, loadProjects, writeJson } from '@/lib/store'

export const runtime = 'nodejs'

const IDENTITY = 'Lauri Elias Rainio'
const GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

const allDepsDone = (action: any, map: Map<string, any>) =>
  (action.dependsOn || []).every((dep: string) => map.get(dep)?.status === 'DONE')

export async function POST() {
  const now = new Date().toISOString()
  const opId = `op-${Date.now()}`
  const correlationId = `corr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const actions = await loadActions()
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  const actionMap = new Map(actions.filter((action) => action.id).map((action) => [action.id as string, action]))
  const next = actions.find(
    (action) =>
      action.id &&
      action.status === 'QUEUED' &&
      allDepsDone(action, actionMap) &&
      (!active || action.projectId === active.id)
  )

  await appendLog('operations.json', {
    id: `${opId}-pending`,
    tool: 'plan',
    source: 'UI',
    status: 'PENDING',
    startedAt: now,
    actionId: next?.id,
    projectId: next?.projectId ?? null,
    correlationId,
    type: 'GATEWAY_PLAN_EXECUTE'
  })
  const ops = await loadOperations()
  const pendingTail = ops[ops.length - 1]
  if (!pendingTail || pendingTail.id !== `${opId}-pending`) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (!next) {
    await appendLog('operations.json', {
      id: `${opId}-final`,
      tool: 'plan',
      source: 'UI',
      status: 'ERROR',
      startedAt: now,
      endedAt: now,
      error: { reason: 'NO_EXECUTABLE_ACTION' },
      correlationId,
      parentOpId: `${opId}-pending`,
      type: 'GATEWAY_PLAN_EXECUTE'
    })
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const updatedActions = actions.map((action) =>
    action.id === next.id
      ? {
          ...action,
          status: 'RUNNING',
          operationIds: [...(action.operationIds || []), `${opId}-pending`]
        }
      : action
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
      error: { reason: 'ACTION_NOT_RUNNING' },
      correlationId,
      parentOpId: `${opId}-pending`,
      type: 'GATEWAY_PLAN_EXECUTE'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  let status: 'OK' | 'ERROR' = 'ERROR'
  let reason: { reason: string; details?: string } | undefined
  try {
    const response = await fetch(`${GATEWAY}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identity': IDENTITY,
        'X-Responsibility-Accepted': 'true'
      },
      body: JSON.stringify({ action: next.actionKind || next.verb, payload: next.payload || next.target })
    })
    status = response.ok ? 'OK' : 'ERROR'
    if (!response.ok) {
      const reasonCode = response.status >= 500 ? 'GATEWAY_5XX' : 'GATEWAY_4XX'
      reason = { reason: reasonCode, details: `status:${response.status}` }
    }
  } catch {
    status = 'ERROR'
    reason = { reason: 'GATEWAY_NETWORK' }
  }

  const finalActions = updatedActions.map((action) =>
    action.id === next.id
      ? {
          ...action,
          status: status === 'OK' ? 'DONE' : 'ERROR',
          result: status === 'OK' ? 'Completed' : undefined,
          error: status === 'ERROR'
            ? { reason: reason?.reason || 'GATEWAY_UNKNOWN', details: reason?.details }
            : undefined,
          operationIds: [...(action.operationIds || []), `${opId}-final`]
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
      error: { reason: 'ACTION_NOT_FINALIZED' },
      correlationId,
      parentOpId: `${opId}-pending`,
      type: 'GATEWAY_PLAN_EXECUTE'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (status === 'OK' && ['BUILD', 'DEPLOY', 'PUBLISH'].includes(next.verb || next.actionKind || '')) {
    const assets = await loadAssets()
    const asset = {
      id: `asset-${Date.now()}`,
      name: `${next.actionKind || next.verb} artifact`,
      type: 'Artifact',
      updatedAt: now,
      location: `/outputs/${String(next.actionKind || next.verb).toLowerCase()}-${Date.now()}`,
      projectId: next.projectId ?? null,
      actionId: next.id
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
        error: { reason: 'ASSET_WRITE_FAILED' },
        correlationId,
        parentOpId: `${opId}-pending`,
        type: 'GATEWAY_PLAN_EXECUTE'
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
      error: { reason: 'PLAN_UPDATE_FAILED' },
      correlationId,
      parentOpId: `${opId}-pending`,
      type: 'GATEWAY_PLAN_EXECUTE'
    })
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  if (active) {
    const updatedProjects = projects.map((project) =>
      project.id === active.id
        ? {
            ...project,
            lastCommitAt: now,
            lastAction: `${next.actionKind || next.verb} ${status === 'OK' ? 'completed' : 'failed'}`
          }
        : project
    )
    await writeJson('projects.json', updatedProjects)
    const projectsCheck = await loadProjects()
    const projectTail = projectsCheck.find((project) => project.id === active.id)
    if (!projectTail || projectTail.lastCommitAt !== now) {
      await appendLog('operations.json', {
        id: `${opId}-final`,
        tool: 'plan',
        source: 'UI',
        status: 'ERROR',
        startedAt: now,
        endedAt: now,
        error: { reason: 'PROJECT_UPDATE_FAILED' },
        actionId: next.id,
        projectId: next.projectId ?? null,
        correlationId,
        parentOpId: `${opId}-pending`,
        type: 'GATEWAY_PLAN_EXECUTE'
      })
      return NextResponse.json({ ok: false }, { status: 500 })
    }
  }

  await appendLog('operations.json', {
    id: `${opId}-final`,
    tool: 'plan',
    source: 'UI',
    status,
    startedAt: now,
    endedAt: now,
    error: status === 'ERROR' ? reason : undefined,
    actionId: next.id,
    projectId: next.projectId ?? null,
    correlationId,
    parentOpId: `${opId}-pending`,
    type: 'GATEWAY_PLAN_EXECUTE'
  })

  return NextResponse.json({ ok: status === 'OK' })
}
