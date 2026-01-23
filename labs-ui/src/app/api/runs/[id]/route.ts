import { NextRequest } from "next/server"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const i = Number(params.id) || 0
  const run = {
    id: params.id,
    agent: ["Writer","Processor","Assistant"][i % 3],
    status: i % 5 === 0 ? "queued" : i % 3 === 0 ? "running" : i % 7 === 0 ? "error" : "success",
    startedAt: new Date(Date.now() - i * 3600_000).toISOString(),
    durationSec: i % 3 === 0 ? null : 10 + i,
    cost: Number((Math.random() * 0.2 + 0.01).toFixed(2)),
  }
  return Response.json(run)
}
