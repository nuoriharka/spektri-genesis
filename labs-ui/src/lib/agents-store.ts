import { promises as fs } from 'fs'
import path from 'path'

export type Agent = {
  id: string
  name: string
  category?: string
  description?: string
  instructions?: string
  status?: 'active' | 'paused' | 'error'
  type?: string
  tasksCompleted?: number
  accuracy?: number
  lastRun?: string
}

const dataFile = path.join(process.cwd(), 'data', 'agents.json')
let memory: Agent[] | null = null

function isVercel() {
  return process.env.VERCEL === '1'
}

export async function readAgents(): Promise<Agent[]> {
  if (isVercel()) {
    if (!memory) memory = []
    return memory
  }
  try {
    const raw = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(raw) as Agent[]
  } catch (err: any) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

export async function writeAgents(agents: Agent[]): Promise<void> {
  if (isVercel()) {
    memory = agents
    return
  }
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  await fs.writeFile(dataFile, JSON.stringify(agents, null, 2), 'utf8')
}

export function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function getAgentById(id: string): Promise<Agent | undefined> {
  const list = await readAgents()
  return list.find((a) => a.id === id)
}

export async function upsertAgent(agent: Agent): Promise<Agent> {
  const list = await readAgents()
  const idx = list.findIndex((a) => a.id === agent.id)
  if (idx >= 0) list[idx] = agent
  else list.push(agent)
  await writeAgents(list)
  return agent
}

export async function deleteAgent(id: string): Promise<boolean> {
  const list = await readAgents()
  const next = list.filter((a) => a.id !== id)
  const changed = next.length !== list.length
  if (changed) await writeAgents(next)
  return changed
}
