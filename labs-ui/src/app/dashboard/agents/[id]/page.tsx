"use client"

import useSWR from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import type { Agent } from "@/lib/agents-store"
import { ArrowLeft, Pause, Play, Trash2 } from "lucide-react"
import { LogsList } from "@/components/logs-list"
import { FlowCanvas } from "@/components/flow-canvas"
import { StatusBadge } from "@/components/status-badge"
import { useEffect, useMemo, useState } from "react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { add } = useToast()
  const { data, error, isLoading, mutate } = useSWR<Agent>(`/api/agents/${params.id}`, fetcher)
  const [draft, setDraft] = useState<Partial<Agent>>({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (data) setDraft({ ...data })
  }, [data])

  async function save() {
    if (!draft?.name?.trim()) {
  add({ title: "Nimi puuttuu", description: "Anna agentille nimi" })
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/agents/${params.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          description: draft.description,
          instructions: draft.instructions,
          category: draft.category,
          status: draft.status,
          type: draft.type,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const updated = (await res.json()) as Agent
      await mutate(updated, { revalidate: false })
  add({ title: "Tallennettu", description: updated.name })
    } catch (e: any) {
  add({ title: "Tallennus epäonnistui", description: String(e) })
    } finally {
      setSaving(false)
    }
  }

  async function toggleStatus() {
    const next = draft.status === "paused" ? "active" : "paused"
    setDraft((d) => ({ ...d, status: next }))
    await save()
  }

  async function remove() {
    if (!confirm("Poistetaanko tämä agentti?")) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/agents/${params.id}`, { method: "DELETE" })
      if (res.status !== 204) throw new Error(`HTTP ${res.status}`)
  add({ title: "Agentti poistettu" })
      router.push("/dashboard/agents")
    } catch (e: any) {
  add({ title: "Poisto epäonnistui", description: String(e) })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <DashboardLayout>
  <div className="page-wrap">
    <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
      <Breadcrumbs items={[{ label: "Agentit", href: "/dashboard/agents" }, { label: data?.name || "Agentti" }]} />
            <Link href="/dashboard/agents">
              <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Takaisin</Button>
            </Link>
      <h1 className="font-bold tracking-tight">{data?.name || "Agentti"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={toggleStatus} disabled={isLoading || saving}>
              {draft.status === "paused" ? (<><Play className="h-4 w-4 mr-2"/> Jatka</>) : (<><Pause className="h-4 w-4 mr-2"/> Pysäytä</>)}
            </Button>
            <Button variant="destructive" onClick={remove} disabled={deleting}><Trash2 className="h-4 w-4 mr-2"/>Poista</Button>
            <Button variant="primary" onClick={save} disabled={saving}>{saving?"Tallennetaan…":"Tallenna"}</Button>
          </div>
        </div>

        {isLoading && <Card className="p-6">Ladataan…</Card>}
        {error && <Card className="p-6 text-destructive">Virhe ladattaessa agenttia</Card>}
        {data && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Yleiskatsaus</TabsTrigger>
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="runs">Ajot</TabsTrigger>
              <TabsTrigger value="logs">Lokit</TabsTrigger>
              <TabsTrigger value="settings">Asetukset</TabsTrigger>
            </TabsList>

            <TabsContent value="builder">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Rakenna työnkulku</CardTitle>
                  <CardDescription>Vedä ja pudota solmuja, zoomaa ja järjestä</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FlowCanvas nodes={[{ id: "start", x: 60, y: 60, label: "Start" }, { id: "step1", x: 220, y: 160, label: "Step" }]} />
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() =>
                        add({
                          title: "Ajo käynnistetty",
                          description: draft.name || "Agentti",
                        })
                      }
                    >
                      Aja
                    </Button>
                    <Button variant="outline">Tallenna</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="md:col-span-2 card-premium">
                  <CardHeader>
                    <CardTitle>Perustiedot</CardTitle>
                    <CardDescription>Muokkaa agentin perustietoja</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nimi</Label>
                        <Input id="name" value={draft.name || ""} onChange={(e)=>setDraft((d)=>({...d, name:e.target.value}))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategoria</Label>
                        <Input id="category" value={draft.category || ""} onChange={(e)=>setDraft((d)=>({...d, category:e.target.value, type:e.target.value}))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Kuvaus</Label>
                      <Textarea id="description" value={draft.description || ""} onChange={(e)=>setDraft((d)=>({...d, description:e.target.value}))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Toimintaohjeet</Label>
                      <Textarea id="instructions" className="min-h-[120px]" value={draft.instructions || ""} onChange={(e)=>setDraft((d)=>({...d, instructions:e.target.value}))} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Tila ja mittarit</CardTitle>
                    <CardDescription>Yleiskuva</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tila</span>
                      <StatusBadge status={draft.status || "active"} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tarkkuus</span>
                        <span className="font-medium">{(draft.accuracy ?? data.accuracy ?? 95)}%</span>
                      </div>
                      <Progress value={draft.accuracy ?? data.accuracy ?? 95} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tehtäviä</span>
                      <span className="font-medium">{draft.tasksCompleted ?? data.tasksCompleted ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Viimeksi ajettu</span>
                      <span className="font-medium">{draft.lastRun || data.lastRun || "-"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="runs">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Ajohistoria</CardTitle>
                  <CardDescription>Viimeisimmät suoritukset</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Ajohistorian listaus tulee myöhemmin.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Lokit</CardTitle>
                  <CardDescription>Kehittäjille</CardDescription>
                </CardHeader>
                <CardContent>
                  <LogsList items={[{ id: 1, level: "info", message: "Agentti käynnistyi", time: "nyt" }]} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Lisäasetukset</CardTitle>
                  <CardDescription>Aseta ajoajastukset, rajoitukset, yms.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Asetuslomake tulee myöhemmin.</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="primary">
                      Aseta ajastus
                    </Button>
                    <Button size="sm" variant="outline">
                      Julkaise
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}
