import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      function send(ev: string, data: any) {
        controller.enqueue(encoder.encode(`event: ${ev}\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }
      send("TASK_UPDATE", { id: params.id, status: "running" })
      await new Promise((r) => setTimeout(r, 400))
      send("LOG", { time: new Date().toISOString(), message: "Aloitetaan ajo" })
      await new Promise((r) => setTimeout(r, 400))
      send("METRIC", { name: "progress", value: 0.3 })
      await new Promise((r) => setTimeout(r, 400))
      send("LOG", { time: new Date().toISOString(), message: "Vaihe 1 valmis" })
      await new Promise((r) => setTimeout(r, 400))
      send("METRIC", { name: "progress", value: 0.7 })
      await new Promise((r) => setTimeout(r, 400))
      send("DONE", { ok: true })
      controller.close()
    },
  })
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
