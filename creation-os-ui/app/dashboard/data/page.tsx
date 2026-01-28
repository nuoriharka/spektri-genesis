"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DataSourcesPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Datalähteet" description="Yhdistä ja hallinnoi datalähteitä" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Database className="h-5 w-5 mr-2"/>Lähteet</CardTitle>
            <CardDescription>Lista datalähteistä tulossa</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Ei datalähteitä"
              description="Lisää ensimmäinen datalähde ja aloita."
              action={(
                <Link href="/dashboard/integrations"><Button size="sm" variant="primary">Avaa integraatiot</Button></Link>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
