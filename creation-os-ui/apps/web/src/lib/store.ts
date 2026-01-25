import fs from 'node:fs/promises'
import path from 'node:path'

const dataDir = path.resolve(process.cwd(), '../../../genesis/data')

export type Project = {
  id: string
  name: string
  state: 'Draft' | 'Active' | 'Deployed' | 'Archived'
  phase: 'Design' | 'Code' | 'Deploy' | 'Publish'
  lastCommitAt: string | null
  lastAction: string | null
  assets: string[]
}

export type ActionLog = {
  id?: string
  timestamp: string
  verb: string
  target: string
  projectId?: string | null
  planId?: string
  stepIndex?: number
  dependsOn?: string[]
  status?: 'QUEUED' | 'RUNNING' | 'DONE' | 'ERROR' | 'SKIPPED'
  actionKind?: string
  payload?: string
  operationIds?: string[]
  result?: string
  error?: { reason: string; details?: string }
}

export type OperationLog = {
  id: string
  tool: string
  source: string
  status: 'PENDING' | 'OK' | 'ERROR'
  startedAt: string
  endedAt?: string
  ts?: string
  type?: string
  error?: { reason: string; details?: string }
  correlationId?: string
  parentOpId?: string
  actionId?: string
  projectId?: string | null
  details?: string
}

export type NormalizedOperation = {
  id: string
  pendingId?: string
  finalId?: string
  correlationId?: string
  type: string
  tool: string
  source: string
  status: OperationLog['status']
  tsStart: string
  tsFinal?: string
  error?: OperationLog['error'] | null
  actionId?: string
  projectId?: string | null
  details?: string
}

export type Asset = {
  id: string
  name: string
  type: 'Code' | 'Media' | 'Document' | 'Artifact'
  updatedAt: string
  location: string
  projectId?: string | null
  actionId?: string
  tags?: string[]
}

export type PlanStep = {
  id: string
  title: string
  actionKind: 'CREATE' | 'BUILD' | 'DEPLOY' | 'PUBLISH' | 'ANALYZE' | 'CODE_GEN'
  payload: string
  dependsOn?: string[]
}

export type Plan = {
  id: string
  projectId: string | null
  title: string
  createdAt: string
  steps: PlanStep[]
  status: 'DRAFT' | 'COMMITTED' | 'EXECUTING' | 'DONE' | 'ERROR'
}

export type ChatMessage = {
  timestamp: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type SystemInfo = {
  tools: string[]
  auth: 'Authenticated' | 'Unauthenticated'
  environment: 'Local' | 'Preview' | 'Production'
  lastCheck: string
}

const seedFiles: Record<string, unknown> = {
  'projects.json': [],
  'actions.json': [],
  'operations.json': [],
  'assets.json': [],
  'chat_history.json': [],
  'plans.json': [],
  'system.json': {
    tools: [],
    auth: 'Unauthenticated',
    environment: 'Local',
    lastCheck: new Date().toISOString()
  }
}

const requiredFiles = Object.keys(seedFiles)

const ensureSeedFile = async (file: string, fallback: unknown) => {
  if (!(file in seedFiles)) return
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(fallback, null, 2))
}

const readJson = async <T>(file: string, fallback: T): Promise<T> => {
  try {
    const payload = await fs.readFile(path.join(dataDir, file), 'utf-8')
    if (!payload.trim()) {
      await ensureSeedFile(file, file in seedFiles ? seedFiles[file] : fallback)
      return fallback
    }
    return JSON.parse(payload) as T
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      await ensureSeedFile(file, file in seedFiles ? seedFiles[file] : fallback)
      return fallback
    }
    throw error
  }
}

export const writeJson = async (file: string, data: unknown) => {
  await fs.mkdir(dataDir, { recursive: true })
  const fullPath = path.join(dataDir, file)
  if (file === 'operations.json') {
    const tempPath = path.join(dataDir, `.${file}.${process.pid}.${Date.now()}.tmp`)
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2))
    await fs.rename(tempPath, fullPath)
    return
  }
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2))
}

const normalizeOperation = (entry: any, lastTs?: number): OperationLog => {
  const startedAt = entry.startedAt || entry.ts || new Date().toISOString()
  const tool = entry.tool || entry.type || 'unknown'
  const status = entry.status || 'OK'
  const nowTs = new Date(startedAt).getTime()
  const safeTs = Number.isFinite(nowTs) ? new Date(Math.max(nowTs, lastTs || 0)).toISOString() : new Date().toISOString()
  const base: OperationLog = {
    ...entry,
    id: entry.id || `op-${Date.now()}`,
    tool,
    type: entry.type || tool,
    status,
    startedAt,
    ts: entry.ts || safeTs
  }
  if (status === 'ERROR') {
    if (!entry.error) {
      base.error = { reason: 'Unknown error' }
    } else if (typeof entry.error === 'string') {
      base.error = { reason: entry.error }
    } else if (!entry.error.reason) {
      base.error = { reason: 'Unknown error', details: entry.error.details }
    }
  }
  return base
}

export const appendLog = async <T>(file: string, entry: T) => {
  const list = await readJson<T[]>(file, [])
  if (file === 'operations.json') {
    const last = list[list.length - 1] as any
    const lastTs = last?.ts ? new Date(last.ts).getTime() : last?.startedAt ? new Date(last.startedAt).getTime() : 0
    const normalized = normalizeOperation(entry, lastTs)
    const validStatus = ['PENDING', 'OK', 'ERROR'].includes(normalized.status)
    const idExists = list.some((op: any) => op?.id === normalized.id)
    const normalizedTs = normalized.ts ? new Date(normalized.ts).getTime() : 0
    const monotonic = !lastTs || (Number.isFinite(normalizedTs) && normalizedTs >= lastTs)
    const errorOk = normalized.status !== 'ERROR' || !!normalized.error?.reason
    const isGatewayOp =
      normalized.tool === 'gateway' ||
      normalized.type === 'gateway' ||
      (typeof normalized.type === 'string' && normalized.type.startsWith('GATEWAY_'))
    const gatewayCorrelationOk = !isGatewayOp || !!normalized.correlationId
    if (!validStatus || idExists || !monotonic || !errorOk || !gatewayCorrelationOk) {
      const integrityReason = [
        !validStatus ? 'invalid-status' : null,
        idExists ? 'duplicate-id' : null,
        !monotonic ? 'non-monotonic-ts' : null,
        !errorOk ? 'missing-error-reason' : null,
        !gatewayCorrelationOk ? 'missing-correlation-id' : null
      ].filter(Boolean).join('|')
      const integrityOp = normalizeOperation({
        tool: 'ops_integrity',
        type: 'OPS_INTEGRITY_FAIL',
        status: 'ERROR',
        error: { reason: 'OPS_INTEGRITY_FAIL', details: integrityReason },
        startedAt: new Date(Math.max(Date.now(), lastTs || 0)).toISOString()
      }, lastTs)
      list.push(integrityOp as T)
      await writeJson(file, list)
      throw new Error('OPS_INTEGRITY_FAIL')
    }
    if (normalized.status === 'PENDING' && normalized.correlationId) {
      const existingPending = list.find((op: any) => op?.correlationId === normalized.correlationId && op?.status === 'PENDING') as any
      const hasFinal = list.some((op: any) => op?.correlationId === normalized.correlationId && op?.status !== 'PENDING')
      if (existingPending && !hasFinal) {
        const sweep = normalizeOperation({
          tool: 'ops_integrity',
          type: 'OP_FINALIZATION_MISSING',
          status: 'ERROR',
          correlationId: normalized.correlationId,
          parentOpId: existingPending?.id,
          error: { reason: 'OP_FINALIZATION_MISSING' },
          startedAt: new Date(Math.max(Date.now(), lastTs || 0)).toISOString()
        }, lastTs)
        list.push(sweep as T)
      }
    }
    if (normalized.status !== 'PENDING' && normalized.correlationId) {
      const hasPending = list.some((op: any) => op?.correlationId === normalized.correlationId && op?.status === 'PENDING')
      if (!hasPending) {
        const sweep = normalizeOperation({
          tool: 'ops_integrity',
          type: 'OPS_INTEGRITY_FAIL',
          status: 'ERROR',
          correlationId: normalized.correlationId,
          error: { reason: 'OPS_INTEGRITY_FAIL', details: 'missing-pending' },
          startedAt: new Date(Math.max(Date.now(), lastTs || 0)).toISOString()
        }, lastTs)
        list.push(sweep as T)
        await writeJson(file, list)
        throw new Error('OPS_INTEGRITY_FAIL')
      }
    }
    list.push(normalized as T)
  } else {
    list.push(entry)
  }
  await writeJson(file, list)
}

const appendOperationErrorDirect = async (reason: string, details: string) => {
  const file = path.join(dataDir, 'operations.json')
  const now = new Date().toISOString()
  let list: OperationLog[] = []
  try {
    const payload = await fs.readFile(file, 'utf-8')
    if (payload.trim()) {
      list = JSON.parse(payload) as OperationLog[]
    }
  } catch (error: any) {
    if (error?.code !== 'ENOENT') {
      const backup = path.join(dataDir, `operations.json.corrupt-${Date.now()}`)
      await fs.mkdir(dataDir, { recursive: true })
      await fs.copyFile(file, backup).catch(() => undefined)
    }
  }
  const last = list[list.length - 1]
  const lastTs = last?.ts ? new Date(last.ts).getTime() : last?.startedAt ? new Date(last.startedAt).getTime() : 0
  const entry = normalizeOperation({
    tool: 'state',
    type: reason,
    status: 'ERROR',
    error: { reason, details },
    startedAt: new Date(Math.max(Date.now(), lastTs || 0)).toISOString()
  }, lastTs)
  list.push(entry)
  await writeJson('operations.json', list)
}

export const initDataStore = async () => {
  await fs.mkdir(dataDir, { recursive: true })
  for (const file of requiredFiles) {
    const fullPath = path.join(dataDir, file)
    try {
      const payload = await fs.readFile(fullPath, 'utf-8')
      if (!payload.trim()) {
        await ensureSeedFile(file, seedFiles[file])
        continue
      }
      JSON.parse(payload)
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        await ensureSeedFile(file, seedFiles[file])
        continue
      }
      await appendOperationErrorDirect('STATE_CORRUPT_JSON', file)
      throw new Error('STATE_CORRUPT_JSON')
    }
  }
}

export const loadProjects = () => readJson<Project[]>('projects.json', [])
export const loadActions = () => readJson<ActionLog[]>('actions.json', [])
export const loadOperations = () => readJson<OperationLog[]>('operations.json', [])
export const loadAssets = () => readJson<Asset[]>('assets.json', [])
export const loadPlans = () => readJson<Plan[]>('plans.json', [])
export const loadSystem = () =>
  readJson<SystemInfo>('system.json', {
    tools: [],
    auth: 'Unauthenticated',
    environment: 'Local',
    lastCheck: new Date().toISOString()
  })

export const loadChatHistory = () => readJson<ChatMessage[]>('chat_history.json', [])

const opTs = (op: OperationLog) => op.ts || op.startedAt

const pickLatest = (ops: OperationLog[]) =>
  ops.reduce((latest, current) => (opTs(current) > opTs(latest) ? current : latest), ops[0])

export const getNormalizedOperations = async (): Promise<NormalizedOperation[]> => {
  const ops = await loadOperations()
  const pending = ops.filter((op) => op.status === 'PENDING')
  const finals = ops.filter((op) => op.status !== 'PENDING')
  const finalsByParent = new Map(finals.filter((op) => op.parentOpId).map((op) => [op.parentOpId as string, op]))
  const finalsByCorrelation = finals.reduce<Map<string, OperationLog[]>>((acc, op) => {
    if (!op.correlationId) return acc
    const list = acc.get(op.correlationId) || []
    list.push(op)
    acc.set(op.correlationId, list)
    return acc
  }, new Map())

  const matchedFinals = new Set<string>()
  const normalized: NormalizedOperation[] = pending.map((start) => {
    const byParent = finalsByParent.get(start.id)
    const byCorrelation = start.correlationId
      ? finalsByCorrelation.get(start.correlationId)
      : undefined
    const final = byParent || (byCorrelation ? pickLatest(byCorrelation) : undefined)
    if (final) matchedFinals.add(final.id)
    const baseType = final?.type || start.type || start.tool
    return {
      id: start.id,
      pendingId: start.id,
      finalId: final?.id,
      correlationId: start.correlationId || final?.correlationId,
      type: baseType || start.tool,
      tool: final?.tool || start.tool,
      source: final?.source || start.source,
      status: final?.status || start.status,
      tsStart: opTs(start),
      tsFinal: final ? opTs(final) : undefined,
      error: final?.error || null,
      actionId: final?.actionId || start.actionId,
      projectId: final?.projectId ?? start.projectId,
      details: final?.details || start.details
    }
  })

  finals.forEach((final) => {
    if (matchedFinals.has(final.id)) return
    const baseType = final.type || final.tool
    normalized.push({
      id: final.parentOpId || final.id,
      pendingId: final.parentOpId,
      finalId: final.id,
      correlationId: final.correlationId,
      type: baseType || final.tool,
      tool: final.tool,
      source: final.source,
      status: final.status,
      tsStart: opTs(final),
      tsFinal: opTs(final),
      error: final.error || null,
      actionId: final.actionId,
      projectId: final.projectId,
      details: final.details
    })
  })

  return normalized.sort((a, b) => (a.tsStart < b.tsStart ? 1 : -1))
}

export const getDanglingPending = async (thresholdMs = 30000): Promise<NormalizedOperation[]> => {
  const normalized = await getNormalizedOperations()
  const now = Date.now()
  return normalized.filter((op) => {
    if (op.status !== 'PENDING' || op.tsFinal) return false
    const ts = new Date(op.tsStart).getTime()
    return Number.isFinite(ts) && now - ts > thresholdMs
  })
}

export const findActiveProject = (projects: Project[]) =>
  projects.find((project) => project.state === 'Active')

export const nextPhase = (phase: Project['phase']): Project['phase'] => {
  switch (phase) {
    case 'Design':
      return 'Code'
    case 'Code':
      return 'Deploy'
    case 'Deploy':
      return 'Publish'
    default:
      return 'Publish'
  }
}
