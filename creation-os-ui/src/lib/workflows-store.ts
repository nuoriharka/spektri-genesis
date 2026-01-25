import { promises as fs } from 'fs'
import path from 'path'

export type Workflow = {
  id: string
  name: string
  description?: string
  status?: 'active' | 'paused'
  runs?: number
  lastRun?: string
}

const dataFile = path.join(process.cwd(), 'data', 'workflows.json')
let memory: Workflow[] | null = null

function isVercel() {
  return process.env.VERCEL === '1'
}

export async function readWorkflows(): Promise<Workflow[]> {
  if (isVercel()) {
    if (!memory) memory = []
    return memory
  }
  try {
    const raw = await fs.readFile(dataFile, 'utf8')
    return JSON.parse(raw) as Workflow[]
  } catch (err: any) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

export async function writeWorkflows(list: Workflow[]): Promise<void> {
  if (isVercel()) {
    memory = list
    return
  }
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), 'utf8')
}

export function generateWorkflowId() {
  return Math.random().toString(36).slice(2, 10)
}

export async function getWorkflowById(id: string): Promise<Workflow | undefined> {
  const list = await readWorkflows()
  return list.find((w) => w.id === id)
}

export async function upsertWorkflow(wf: Workflow): Promise<Workflow> {
  const list = await readWorkflows()
  const idx = list.findIndex((w) => w.id === wf.id)
  if (idx >= 0) list[idx] = wf
  else list.push(wf)
  await writeWorkflows(list)
  return wf
}

export async function deleteWorkflow(id: string): Promise<boolean> {
  const list = await readWorkflows()
  const next = list.filter((w) => w.id !== id)
  const changed = next.length !== list.length
  if (changed) await writeWorkflows(next)
  return changed
}
