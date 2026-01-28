import { NextRequest } from "next/server"

const runs = Array.from({ length: 20 }).map((_, i) => ({
  id: `${1000 + i}`,
  agent: ["Writer","Processor","Assistant"][i % 3],
  status: i % 5 === 0 ? "queued" : i % 3 === 0 ? "running" : i % 7 === 0 ? "error" : "success",
  startedAt: new Date(Date.now() - i * 3600_000).toISOString(),
  durationSec: i % 3 === 0 ? null : 10 + i,
  cost: Number((Math.random() * 0.2 + 0.01).toFixed(2)),
}))

export async function GET() { return Response.json(runs) }

export async function POST(req: NextRequest) {
  const { agent } = await req.json()
  const id = `${Date.now()}`
  const run = { id, agent: agent || "Unknown", status: "queued", startedAt: new Date().toISOString(), durationSec: null, cost: 0 }
  return new Response(JSON.stringify(run), { status: 201, headers: { 'content-type': 'application/json' } })
}
