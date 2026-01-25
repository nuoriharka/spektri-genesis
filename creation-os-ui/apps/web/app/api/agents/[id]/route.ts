import { NextRequest } from 'next/server'
import { getAgentById, upsertAgent, deleteAgent } from '@/lib/agents-store'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const agent = await getAgentById(params.id)
  if (!agent) return new Response('Not found', { status: 404 })
  return Response.json(agent)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const agent = await upsertAgent({ id: params.id, ...body })
  return Response.json(agent)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = await deleteAgent(params.id)
  return new Response(null, { status: ok ? 204 : 404 })
}
