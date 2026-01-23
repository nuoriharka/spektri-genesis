import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      function send(event: string, data: string) {
        controller.enqueue(encoder.encode(`event: ${event}\n`))
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }
      const steps = [
        "Luodaan template",
        "Haetaan kuvat",
        "Sovitetaan design-tokenit",
        "Luodaan komponentit",
        "Generoidaan reitit",
        "Ajetaan testit (mock)",
        "Valmis preview",
      ]
      for (const s of steps) {
        send("log", s)
        await new Promise((r) => setTimeout(r, 350))
      }
      send("done", "ok")
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
