"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Laskutus" description="Tilaukset ja maksut" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><CreditCard className="h-5 w-5 mr-2"/>Tilaustasot</CardTitle>
            <CardDescription>Valitse sopiva paketti, Stripe-integraatio lisätään myöhemmin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[{
                name: "Basic", price: "€0", desc: "Käynnistä pienesti", features: ["1 tiimi", "500 pyyntöä/kk", "Sähköpostituki"], cta: "Aloita ilmaiseksi"
              },{
                name: "Pro", price: "€29", desc: "Kasvaville tiimeille", features: ["Rajoittamaton tiimit", "100k pyyntöä/kk", "Priorisoitu tuki"], cta: "Kokeile 14 päivää"
              },{
                name: "Business", price: "€99", desc: "Tuotantoon", features: ["SSO & RBAC", "SLA & tuki", "Oma ympäristö"], cta: "Ota yhteyttä"
              }].map((plan) => (
                <div key={plan.name} className="rounded-lg border p-6 bg-card">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.desc}</p>
                    </div>
                    <div className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/kk</span></div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success"/>{f}</li>
                    ))}
                  </ul>
                  <Button
                    variant={
                      plan.name === "Pro" ? "primary" : "secondary"
                    }
                    className="mt-6 w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
