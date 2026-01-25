import { NextRequest } from 'next/server'
import { readAgents, upsertAgent, generateId } from '@/lib/agents-store'

export async function GET() {
  const list = await readAgents()
  return Response.json(list)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id || generateId()
  const agent = {
    id,
    name: String(body.name || 'Nimetön agentti'),
    category: body.category || '',
    description: body.description || '',
    instructions: body.instructions || '',
    status: body.status || 'active',
    type: body.type || body.category || '',
    tasksCompleted: body.tasksCompleted ?? 0,
    accuracy: body.accuracy ?? 95,
    lastRun: body.lastRun || 'nyt',
  }
  const saved = await upsertAgent(agent)
  return new Response(JSON.stringify(saved), { status: 201, headers: { 'content-type': 'application/json' } })
}
