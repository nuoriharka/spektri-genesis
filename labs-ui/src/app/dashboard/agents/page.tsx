"use client"

import useSWR from "swr"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatNumber } from "@/lib/format"
import { useMemo } from "react"
import Link from "next/link"
import { InlineHint } from "@/components/inline-hint"
import { StatusBadge } from "@/components/status-badge"
import { EmptyState } from "@/components/empty-state"
import { AgentsGrid } from "@/components/agents/AgentsGrid"
import { AgentsTable } from "@/components/agents/AgentsTable"
import { 
  Bot, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  Pause, 
  Settings, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap
} from "lucide-react"

type Agent = {
  id: string
  name: string
  description?: string
  status?: "active" | "paused" | "error"
  type?: string
  tasksCompleted?: number
  accuracy?: number
  lastRun?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// using shared StatusBadge

export default function AgentsPage() {
  const formatInt = useMemo(() => new Intl.NumberFormat("fi-FI"), [])
  const { data, error, isLoading, mutate } = useSWR<Agent[]>("/api/agents", fetcher)
    // TODO: Add metadata override for agents list to use a placeholder OG image
    const ogImage = "/path/to/placeholder/image.jpg"; // Placeholder OG image path
  const agents = data ?? []
  const router = useRouter()
  const sp = useSearchParams()
  const view = (sp.get("view") as "list" | "grid") || "grid"
  function setView(v: "list" | "grid") {
    const params = new URLSearchParams(Array.from(sp.entries()))
    params.set("view", v)
    router.push(`/dashboard/agents?${params.toString()}`)
  }
  return (
    <DashboardLayout>
  <div className="page-wrap">
        <PageHeader title="Agentit" description="Hallitse ja seuraa tekoälyagenttejasi">
          <Link href="/dashboard/agents/new">
            <Button variant="primary" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Uusi agentti
            </Button>
          </Link>
        </PageHeader>

        <InlineHint
          action={(
            <Link href="/dashboard/templates">
              <Button size="sm" variant="outline">Avaa pohjat</Button>
            </Link>
          )}
        >
          Vinkki: Aloita nopeammin valmiista pohjista.
        </InlineHint>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktiivisia agentteja
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                +1 viime kuukaudesta
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Suoritettuja tehtäviä
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,916</div>
              <p className="text-xs text-muted-foreground">
                +20.1% viime kuukaudesta
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Keskimääräinen tarkkuus
              </CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95.0%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% viime kuukaudesta
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-premium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Säästetty aikaa
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247h</div>
              <p className="text-xs text-muted-foreground">
                +19% viime kuukaudesta
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter + View toggle */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Hae agentteja..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Suodata
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <Button variant={view === 'grid' ? 'primary' : 'outline'} size="sm" onClick={()=> setView('grid')}>Grid</Button>
            <Button variant={view === 'list' ? 'primary' : 'outline'} size="sm" onClick={()=> setView('list')}>Lista</Button>
          </div>
        </div>

        {/* Agents list/grid */}
        {isLoading && (<Card className="p-6">Ladataan agentteja…</Card>)}
        {error && (<Card className="p-6 text-destructive">Virhe ladattaessa agentteja</Card>)}
        {!isLoading && !error && (
          view === 'grid' ? (
            <AgentsGrid agents={agents as any} />
          ) : (
            <AgentsTable />
          )
        )}

        {/* Empty State */}
        {!isLoading && !error && agents.length === 0 && (
          <EmptyState
            title="Ei agentteja vielä"
            description="Aloita luomalla ensimmäinen tekoälyagenttisi"
            icon={<Bot className="h-12 w-12" />}
            action={(
              <Link href="/dashboard/agents/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Luo ensimmäinen agentti
                </Button>
              </Link>
            )}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
