export function GET(request: Request) {
  const { origin } = new URL(request.url)
  return Response.json({
    ok: true,
    app: 'creation-os-ui',
    origin,
    node: process.version,
    time: new Date().toISOString(),
  })
}
