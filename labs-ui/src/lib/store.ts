import fs from 'node:fs/promises'
import path from 'node:path'

const dataDir = path.resolve(process.cwd(), '../data')

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
  planId?: string
  stepIndex?: number
  dependsOn?: string[]
  status?: 'QUEUED' | 'RUNNING' | 'DONE' | 'ERROR' | 'SKIPPED'
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
  error?: string
}

export type Asset = {
  id: string
  name: string
  type: 'Code' | 'Media' | 'Document' | 'Artifact'
  updatedAt: string
  location: string
}

export type PlanStep = {
  id: string
  title: string
  actionKind: 'CREATE' | 'BUILD' | 'DEPLOY' | 'PUBLISH'
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

const readJson = async <T>(file: string, fallback: T): Promise<T> => {
  try {
    const payload = await fs.readFile(path.join(dataDir, file), 'utf-8')
    return JSON.parse(payload) as T
  } catch {
    return fallback
  }
}

export const writeJson = async (file: string, data: unknown) => {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2))
}

export const appendLog = async <T>(file: string, entry: T) => {
  const list = await readJson<T[]>(file, [])
  list.push(entry)
  await writeJson(file, list)
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
