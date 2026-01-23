"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Workflow } from "lucide-react"
import { FlowCanvas } from "@/components/flow-canvas"

export default function NewWorkflowPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function create() {
    if (!name.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, description, status: "active" }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const created = await res.json()
      router.push(`/dashboard/workflows`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/workflows">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2"/>Takaisin</Button>
          </Link>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Uusi työnkulku</h2>
          <p className="text-muted-foreground">Määrittele työnkulun nimi ja kuvaus</p>
        </div>
  <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center"><Workflow className="h-5 w-5 mr-2"/>Perustiedot</CardTitle>
            <CardDescription>Luo uusi workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nimi</Label>
              <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Esim. Liidien rikastus"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Kuvaus</Label>
              <Textarea id="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Kuvaa työnkulun tarkoitus"/>
            </div>
            <div className="flex gap-2">
              <Button className="btn-spektri" onClick={create} disabled={submitting || !name.trim()}>Luo</Button>
              <Button variant="outline" onClick={()=>router.push('/dashboard/workflows')}>Peruuta</Button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Visuaalinen kehys (demo)</p>
              <FlowCanvas nodes={[{ id: "n1", x: 60, y: 40, label: "Start" }, { id: "n2", x: 220, y: 140, label: "Step" }]} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
