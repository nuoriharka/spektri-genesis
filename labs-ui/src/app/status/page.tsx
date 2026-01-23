export const dynamic = 'force-dynamic'
import HealthCheck from "@/components/status/health-check"

export default function StatusPage() {
  return (
    <main id="main" className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sovelluksen tila</h1>
        <p className="text-sm text-muted-foreground mt-1">Reaaliaikainen näkymä palvelun tilaan.</p>
      </div>

      <HealthCheck />

      <div>
        <h2 className="text-lg font-medium mb-2">Hyödylliset linkit</h2>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>API: <a className="underline" href="/api/health">/api/health</a></li>
          <li>Versio: <a className="underline" href="/api/version">/api/version</a></li>
          <li>Robots: <a className="underline" href="/robots.txt">/robots.txt</a></li>
          <li>Sitemap: <a className="underline" href="/sitemap.xml">/sitemap.xml</a></li>
        </ul>
      </div>
    </main>
  )
}
