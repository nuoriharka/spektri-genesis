export function GET(request: Request) {
  const { origin } = new URL(request.url)
  return Response.json({
    ok: true,
    app: 'spektri-labs-ui',
    origin,
    node: process.version,
    time: new Date().toISOString(),
  })
}
