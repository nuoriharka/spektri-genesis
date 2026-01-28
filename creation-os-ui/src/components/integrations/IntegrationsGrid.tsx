import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const INTEGRATIONS = [
  "Google Drive","Gmail","Slack","Notion","HubSpot","Salesforce","Stripe","Shopify","Zapier","Make","Jira","Linear","Github","Gitlab","BigQuery","Snowflake","Postgres","MySQL","S3","Azure","GCS","OneDrive","Sharepoint","Zendesk","Intercom","Twilio"
] as const

export default function IntegrationsGrid(){
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {INTEGRATIONS.map((name) => (
            <div key={name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center text-sm text-white/80">
              {name}
            </div>
          ))}
          <Card className="border-dashed border-white/20 bg-black/20">
            <CardHeader>
              <CardTitle className="text-white text-base">Puuttuuko jokin?</CardTitle>
              <CardDescription className="text-white/70">Pyydä integraatiota – teemme sen ensin.</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="/contact" className="inline-flex rounded-xl bg-[var(--brand)] px-3 py-2 text-white">Lähetä pyyntö</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
