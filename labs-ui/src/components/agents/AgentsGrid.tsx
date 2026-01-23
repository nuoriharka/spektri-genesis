"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/status-badge"
import { MoreVertical } from "lucide-react"

export type AgentLite = {
  id: string
  name: string
  description?: string
  status?: "active" | "paused" | "error"
  type?: string
  tasksCompleted?: number
  accuracy?: number
  lastRun?: string
}

export function AgentsGrid({ agents }: { agents: AgentLite[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id} className="relative group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="text-xs font-medium bg-muted">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-base">{agent.name}</CardTitle>
                  <CardDescription className="text-sm">{agent.description}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={agent.status || "active"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tyyppi</span>
                <Badge variant="outline">{agent.type || "-"}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tarkkuus</span>
                  <span className="font-medium">{(agent.accuracy ?? 0)}%</span>
                </div>
                <Progress value={agent.accuracy ?? 0} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tehtäviä</span>
                <span className="font-medium">{agent.tasksCompleted ?? 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Viimeksi</span>
                <span className="font-medium">{agent.lastRun || "-"}</span>
              </div>
              <div className="pt-2">
                <Link href={`/dashboard/agents/${agent.id}`}>
                  <Button className="w-full" size="sm">
                    Näytä yksityiskohdat
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
