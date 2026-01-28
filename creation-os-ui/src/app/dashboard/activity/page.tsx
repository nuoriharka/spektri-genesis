"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Tapahtumat" description="Viimeaikainen toiminta" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="h-5 w-5 mr-2"/>Lokit</CardTitle>
            <CardDescription>Listaus tapahtumista tulossa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Placeholder activity list
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
