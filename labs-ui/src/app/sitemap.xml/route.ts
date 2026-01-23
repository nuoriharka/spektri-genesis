// Using default Node.js runtime for broader compatibility

export function GET(request: Request) {
  const { origin } = new URL(request.url)
  const urls = ["/", "/components", "/examples", "/docs", "/dashboard", "/status"]
  const now = new Date().toISOString()
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `<url><loc>${origin}${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      )
      .join("\n")}
  </urlset>`
  return new Response(xml, { headers: { "content-type": "application/xml" } })
}
