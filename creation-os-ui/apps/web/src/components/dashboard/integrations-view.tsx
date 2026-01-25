"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { IntegrationCard, Integration } from "@/components/integration-card"
import { useToast } from "@/components/ui/use-toast"

export default function IntegrationsView() {
  const { add } = useToast()
  const list: Integration[] = [
    { id: "slack", name: "Slack", description: "Ilmoitukset ja viestit", installed: true },
    { id: "github", name: "GitHub", description: "Repo-tapahtumat ja automaatiot" },
    { id: "notion", name: "Notion", description: "Dokumentit ja tietokannat" },
  ]
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Integraatiot" description="Yhdistä ulkoiset palvelut" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Globe className="h-5 w-5 mr-2"/>Käytettävissä olevat integraatiot</CardTitle>
            <CardDescription>Integraatioiden katalogi tulossa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((i) => (
                <IntegrationCard key={i.id} integration={i} onAction={(intg)=>add({ title: intg.installed ? "Avaus" : "Asennus aloitettu", description: intg.name })} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
