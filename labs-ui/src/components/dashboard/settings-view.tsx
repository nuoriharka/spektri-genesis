"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react"

export default function SettingsView() {
  const { add } = useToast()
  const [org, setOrg] = React.useState("Yritys Oy")
  const [domain, setDomain] = React.useState("spektri.fi")
  const [errors, setErrors] = React.useState<{ org?: string; domain?: string }>({})
  const validate = () => {
    const e: { org?: string; domain?: string } = {}
    if (!org || org.trim().length < 2) e.org = "Liian lyhyt"
    if (!domain) e.domain = "Pakollinen"
    else if (!/^[a-z0-9.-]+$/i.test(domain)) e.domain = "Virheellinen domain"
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    add({ title: "Tallennettu", description: `${org} · ${domain}` })
  }
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Asetukset" description="Sovelluksen asetukset" />

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Yleiset</TabsTrigger>
            <TabsTrigger value="security">Turvallisuus</TabsTrigger>
            <TabsTrigger value="billing">Laskutus</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center"><Settings className="h-5 w-5 mr-2"/>Yleiset asetukset</CardTitle>
                <CardDescription>Perusasetukset tuotteelle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="org">Organisaation nimi</Label>
                      <Input id="org" placeholder="Yritys Oy" value={org} onChange={(e)=> setOrg(e.target.value)} />
                      {errors.org && (
                        <p className="text-xs text-danger">{errors.org}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="domain">Verkkotunnus</Label>
                      <Input id="domain" placeholder="spektri.fi" value={domain} onChange={(e)=> setDomain(e.target.value)} />
                      {errors.domain && (
                        <p className="text-xs text-danger">{errors.domain}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="primary" type="submit">
                      Tallenna
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Turvallisuus</CardTitle>
                <CardDescription>Kaksivaiheinen tunnistus, API-avaimet</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Turvallisuusasetukset tulevat myöhemmin.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Laskutus</CardTitle>
                <CardDescription>Maksut ja tilaustaso</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Laskutusintegraatio lisätään myöhemmin.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
