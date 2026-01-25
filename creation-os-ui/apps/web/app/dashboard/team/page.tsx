"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function TeamPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Tiimi" description="Käyttäjät ja roolit" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="h-5 w-5 mr-2"/>Jäsenet</CardTitle>
            <CardDescription>Lisää tiimin hallinta myöhemmin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Placeholder table
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
