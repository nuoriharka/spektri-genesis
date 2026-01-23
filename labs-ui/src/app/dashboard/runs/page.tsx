"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RunStream } from "@/components/run-stream"
import { RunsTable } from "@/components/runs/RunsTable"

export default function RunsPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Ajot" description="Agenttien suoritukset ja virrat" />
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Viimeisimmät tapahtumat</CardTitle>
            <CardDescription>SSE-tyylinen stream demo</CardDescription>
          </CardHeader>
          <CardContent>
            <RunStream />
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Ajot</CardTitle>
            <CardDescription>Mock-data taulukkona</CardDescription>
          </CardHeader>
          <CardContent>
            <RunsTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
