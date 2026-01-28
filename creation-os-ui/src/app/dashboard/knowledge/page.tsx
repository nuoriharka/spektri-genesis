"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function KnowledgePage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Tietopohja" description="Hallinnoi tietolähteitä ja dokumentteja" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Brain className="h-5 w-5 mr-2"/>Sisällöt</CardTitle>
            <CardDescription>Lisää tietolähteitä myöhemmin</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Ei tietolähteitä"
              description="Aloita yhdistämällä datalähde tai lisää dokumentteja."
              action={(
                <Link href="/dashboard/data"><Button size="sm">Yhdistä datalähde</Button></Link>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
