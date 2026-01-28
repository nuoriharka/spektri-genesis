"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Dokumentit" description="Hallinnoi dokumentteja" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2"/>Kirjasto</CardTitle>
            <CardDescription>Dokumenttikirjasto tulossa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Placeholder document library
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
