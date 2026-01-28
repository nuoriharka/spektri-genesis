import { NextRequest } from 'next/server'
import { getWorkflowById, upsertWorkflow, deleteWorkflow } from '@/lib/workflows-store'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const wf = await getWorkflowById(params.id)
  if (!wf) return new Response('Not found', { status: 404 })
  return Response.json(wf)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const wf = await upsertWorkflow({ id: params.id, ...body })
  return Response.json(wf)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = await deleteWorkflow(params.id)
  return new Response(null, { status: ok ? 204 : 404 })
}
