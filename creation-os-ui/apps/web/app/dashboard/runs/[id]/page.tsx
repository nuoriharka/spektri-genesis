"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RunStream } from "@/components/run-stream"
import { LogsTimeline } from "@/components/runs/LogsTimeline"
import * as React from "react"

export default function RunDetailPage({ params }: { params: { id: string } }) {
  const [logs, setLogs] = React.useState([{ time: "nyt", type: "info" as const, message: "Run aloitettu" }])
  React.useEffect(() => {
    // connect to mock SSE route
    const url = `/api/runs/${params.id}/stream`
    const es = new EventSource(url)
    es.addEventListener("LOG", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data)
        setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), type: "info", message: data.message }])
      } catch {}
    })
    es.addEventListener("DONE", () => es.close())
    return () => es.close()
  }, [params.id])

  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title={`Ajo ${params.id}`} description="SSE stream + lokit" />

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Virta</CardTitle>
            <CardDescription>Mock-SSE</CardDescription>
          </CardHeader>
          <CardContent>
            <RunStream sseUrl={`/api/runs/${params.id}/stream`} />
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Lokit</CardTitle>
            <CardDescription>Tapahtumat aikajanalla</CardDescription>
          </CardHeader>
          <CardContent>
            <LogsTimeline items={logs} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
