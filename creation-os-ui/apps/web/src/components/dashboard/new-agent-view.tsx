"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import type { Agent } from "@/lib/agents-store"
import { useToast } from "@/components/ui/use-toast"
import { 
  ArrowLeft,
  Bot,
  Sparkles,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Zap
} from "lucide-react"

// Agent templates
const templates = [
  {
    id: "customer-service",
    name: "Asiakaspalvelurobotti",
    description: "Vastaa asiakaskysymyksiin 24/7 ja ohjaa monimutkaisemmat tapaukset ihmiselle",
    icon: MessageSquare,
    category: "Asiakaspalvelu",
    color: "from-blue-500 to-cyan-500",
    features: ["Automaattiset vastaukset", "Kysymysten luokittelu", "Eskalointi"]
  },
  {
    id: "social-media",
    name: "Sosiaalisen median manageri",
    description: "Julkaisee sisältöä, vastaa kommentteihin ja analysoi engagement-lukuja",
    icon: Users,
    category: "Markkinointi",
    color: "from-purple-500 to-pink-500",
    features: ["Sisällön julkaisu", "Kommenttien moderointi", "Analytiikka"]
  },
  {
    id: "data-analyst",
    name: "Dataanalytiikka-agentti",
    description: "Analysoi myyntidataa, luo raportteja ja tunnistaa trendejä",
    icon: BarChart3,
    category: "Analytiikka",
    color: "from-emerald-500 to-teal-500",
    features: ["Automaattiset raportit", "Trendien tunnistus", "KPI-seuranta"]
  },
  {
    id: "email-marketing",
    name: "Sähköpostimarkkinoija",
    description: "Luo personoituja sähköpostikampanjoita ja seuraa niiden tehokkuutta",
    icon: Mail,
    category: "Markkinointi",
    color: "from-orange-500 to-red-500",
    features: ["Personointi", "A/B testaus", "Segmentointi"]
  },
  {
    id: "scheduler",
    name: "Kalenteriagentti",
    description: "Hallinnoi tapaamisia, lähettää muistutuksia ja koordinoi aikatauluja",
    icon: Calendar,
    category: "Tuottavuus",
    color: "from-indigo-500 to-purple-500",
    features: ["Automaattinen varaus", "Muistutukset", "Konfliktien hallinta"]
  },
  {
    id: "content-creator",
    name: "Sisällöntuottaja",
    description: "Luo blogi-artikkeleita, tuotekuvauksia ja markkinointisisältöä",
    icon: FileText,
    category: "Sisällöntuotanto",
    color: "from-yellow-500 to-orange-500",
    features: ["SEO-optimointi", "Brändiäänen ylläpito", "Monikielisyys"]
  }
]

export default function NewAgentView() {
  const router = useRouter()
  const { add } = useToast()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate() {
    if (!name.trim()) {
  add({ title: "Nimi puuttuu", description: "Anna agentille nimi" })
      return
    }
    setSubmitting(true)
    try {
      const payload: Partial<Agent> = {
        name: name.trim(),
        category: category.trim() || undefined,
        description: description.trim() || undefined,
        instructions: instructions.trim() || undefined,
        status: "active",
        type: category.trim() || undefined,
      }
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const created = (await res.json()) as Agent
  add({ title: "Agentti luotu", description: `${created.name}` })
      router.push(`/dashboard/agents/${created.id}`)
    } catch (e: any) {
  add({ title: "Luonti epäonnistui", description: String(e) })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/agents">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Takaisin
            </Button>
          </Link>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Luo uusi agentti</h2>
          <p className="text-muted-foreground">
            Valitse malli tai aloita tyhjästä luodaksesi oman tekoälyagentin
          </p>
        </div>

        {/* Quick Start Options */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Aloita tyhjästä</CardTitle>
              <CardDescription>
                Luo täysin mukautettu agentti alusta alkaen
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-2">
              <Button
                  variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  const el = document.getElementById("custom-agent-form");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <Bot className="mr-2 h-4 w-4" />
                Luo mukautettu agentti
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Käytä mallipohjaa</CardTitle>
              <CardDescription>
                Aloita valmiista mallista ja mukauta tarpeidesi mukaan
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-2">
              <Button variant="secondary" className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                Selaa mallipohjia
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Agent Templates */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Suositut mallipohjat</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-all hover:scale-105 card-premium">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm mt-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Ominaisuudet:</h4>
                        <div className="space-y-1">
                          {template.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                          variant="primary"
                        className="w-full"
                        size="sm"
                      >
                        Käytä tätä mallipohjaa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Custom Agent Form */}
  <Card id="custom-agent-form" className="card-premium">
          <CardHeader>
            <CardTitle>Tai luo mukautettu agentti</CardTitle>
            <CardDescription>
              Määrittele agentillesi nimi, kuvaus ja käyttötarkoitus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Agentin nimi</Label>
                <Input id="name" placeholder="Esim. Asiakaspalvelurobotti" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategoria</Label>
                <Input id="category" placeholder="Esim. Asiakaspalvelu" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Kuvaus</Label>
              <Textarea id="description" placeholder="Kerro mitä agenttisi tekee ja miten se auttaa liiketoimintaasi..." className="min-h-[100px]" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructions">Toimintaohjeet</Label>
              <Textarea id="instructions" placeholder="Anna agentillesi yksityiskohtaiset ohjeet siitä, miten sen tulisi toimia..." className="min-h-[120px]" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            </div>
            
            <div className="flex space-x-2">
              <Button
                  variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleCreate}
                disabled={submitting}
              >
                <Bot className="mr-2 h-4 w-4" />
                {submitting ? "Luodaan…" : "Luo agentti"}
              </Button>
              <Button variant="outline" size="lg">
                Esikatselu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
