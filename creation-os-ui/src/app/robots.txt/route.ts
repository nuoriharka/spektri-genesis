// Using default Node.js runtime for broader compatibility

export function GET(request: Request) {
  const { origin } = new URL(request.url)
  const lines = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${origin}/sitemap.xml`,
  ]
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain" },
  })
}
