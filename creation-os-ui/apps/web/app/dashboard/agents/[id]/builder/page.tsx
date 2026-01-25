"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeftChat } from "@/components/builder/LeftChat"
import { RightVisual } from "@/components/builder/RightVisual"
import * as React from "react"

export default function AgentBuilderPage({ params }: { params: { id: string } }) {
  const [left, setLeft] = React.useState(50) // percent
  const dragging = React.useRef(false)
  const onDown = () => { dragging.current = true }
  const onUp = () => { dragging.current = false }
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const pct = Math.min(75, Math.max(25, ((e.clientX - rect.left) / rect.width) * 100))
    setLeft(pct)
  }
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title={`Builder · ${params.id}`} description="Split-view editor" />
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Rakenna</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-[420px] rounded-md border relative"
              onMouseMove={onMove}
              onMouseUp={onUp}
              onMouseLeave={onUp}
            >
              <div className="absolute inset-0 flex" style={{ pointerEvents: dragging.current ? "none" : "auto" }}>
                <div style={{ width: `${left}%` }} className="p-3 border-r bg-background/50">
                  <LeftChat />
                </div>
                <div style={{ width: `${100 - left}%` }} className="p-3">
                  <RightVisual />
                </div>
              </div>
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Muuta jaon kokoa"
                className="absolute top-0 bottom-0"
                style={{ left: `calc(${left}% - 4px)`, width: 8, cursor: "col-resize" }}
                onMouseDown={onDown}
              >
                <div className="h-full w-[2px] mx-auto bg-border" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
