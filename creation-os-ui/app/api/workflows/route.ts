import { NextRequest } from 'next/server'
import { readWorkflows, upsertWorkflow, generateWorkflowId } from '@/lib/workflows-store'

export async function GET() {
  const list = await readWorkflows()
  return Response.json(list)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id || generateWorkflowId()
  const wf = {
    id,
    name: String(body.name || 'Nimetön workflow'),
    description: body.description || '',
    status: body.status || 'active',
    runs: body.runs ?? 0,
    lastRun: body.lastRun || 'nyt',
  }
  const saved = await upsertWorkflow(wf)
  return new Response(JSON.stringify(saved), { status: 201, headers: { 'content-type': 'application/json' } })
}
