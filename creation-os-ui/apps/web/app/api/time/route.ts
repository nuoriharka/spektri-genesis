export const runtime = "edge"

export async function GET() {
  return new Response(new Date().toISOString(), { headers: { "content-type": "text/plain" } })
}
