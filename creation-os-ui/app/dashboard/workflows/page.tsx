"use client"

import useSWR from "swr"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Workflow, MoreVertical, Play, Pause, Settings, Zap } from "lucide-react"
import { ChartCard } from "@/components/chart-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Workflow = {
	id: string
	name: string
	description?: string
	status?: 'active' | 'paused'
	runs?: number
	lastRun?: string
}

const fetcher = (url: string) => fetch(url).then((r)=>r.json())

export default function WorkflowsPage() {
		const { data, error, isLoading } = useSWR<Workflow[]>("/api/workflows", fetcher)
		const workflows = data ?? []
	return (
		<DashboardLayout>
			<div className="page-wrap">
				<PageHeader title="Työnkulut" description="Rakenna ja hallitse työnkulkuja">
					<Link href="/dashboard/workflows/new">
						<Button variant="primary">
							<Plus className="mr-2 h-4 w-4" /> Uusi workflow
						</Button>
					</Link>
				</PageHeader>

						{/* Filters + Chart */}
						<Tabs defaultValue="all" className="w-full">
							<div className="flex items-center justify-between">
								<TabsList variant="underline" size="sm">
									<TabsTrigger variant="underline" size="sm" value="all">Kaikki</TabsTrigger>
									<TabsTrigger variant="underline" size="sm" value="active">Aktiiviset</TabsTrigger>
									<TabsTrigger variant="underline" size="sm" value="paused">Pysäytetyt</TabsTrigger>
								</TabsList>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" size="sm">
											<Settings className="mr-2 h-4 w-4" /> Suodattimet
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Suodattimet</DialogTitle>
											<DialogDescription>Rajoita listaa tilan ja aktiviteetin mukaan.</DialogDescription>
										</DialogHeader>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">Näytä vain aktiiviset</span>
												<Switch defaultChecked />
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Minimi ajot / vrk</span>
												<Input type="number" defaultValue={10} className="h-9 w-24" />
											</div>
										</div>
										<DialogFooter>
											<Button variant="secondary">Tyhjennä</Button>
											<Button>Hyväksy</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
							<TabsContent value="all">
								<ChartCard
									title="Suorituskyky"
									description="Ajot viimeisen 14 päivän aikana"
									data={[12, 18, 16, 22, 28, 25, 30, 27, 33, 31, 36, 34, 38, 40]}
									labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]}
									className="bg-card card-premium"
									accentClassName="stroke-[hsl(var(--quantum-blue))]"
								/>
							</TabsContent>
							<TabsContent value="active">
								<ChartCard
									title="Aktiiviset ajot"
									description="Viikon trendi"
									data={[18, 20, 22, 24, 26, 28, 30]}
									labels={["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"]}
									className="bg-card card-premium"
									accentClassName="stroke-[hsl(var(--creation-os-violet))]"
								/>
							</TabsContent>
							<TabsContent value="paused">
								<ChartCard
									title="Pysäytetyt"
									description="Pysäytykset per päivä"
									data={[2, 1, 3, 0, 2, 1, 0]}
									labels={["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"]}
									className="bg-card card-premium"
									accentClassName="stroke-[hsl(var(--nova-gold))]"
								/>
							</TabsContent>
						</Tabs>

				{/* Grid */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{workflows.map((wf) => (
						<Card key={wf.id} className="group transition-shadow card-premium">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-base">{wf.name}</CardTitle>
										<CardDescription>{wf.description}</CardDescription>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-40">
											<DropdownMenuItem>
												<Settings className="mr-2 h-4 w-4" /> Muokkaa
											</DropdownMenuItem>
											{wf.status === "active" ? (
												<DropdownMenuItem>
													<Pause className="mr-2 h-4 w-4" /> Pysäytä
												</DropdownMenuItem>
											) : (
												<DropdownMenuItem>
													<Play className="mr-2 h-4 w-4" /> Käynnistä
												</DropdownMenuItem>
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Tila</span>
									<Badge variant={wf.status === "active" ? "default" : "secondary"}>
										{wf.status === "active" ? "Aktiivinen" : "Pysäytetty"}
									</Badge>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Ajokertoja</span>
									<span className="font-medium">{wf.runs}</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Viimeksi</span>
									<span className="font-medium">{wf.lastRun}</span>
								</div>

								<div className="flex gap-2 pt-2">
									{wf.status === "active" ? (
										<Button size="sm" variant="outline" className="flex-1">
											<Pause className="mr-2 h-4 w-4" /> Pysäytä
										</Button>
									) : (
										<Button size="sm" className="flex-1">
											<Play className="mr-2 h-4 w-4" /> Käynnistä
										</Button>
									)}
									<Button size="sm" variant="secondary">
										<Settings className="mr-2 h-4 w-4" /> Asetukset
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* CTA */}
				<Card className="border-dashed card-premium">
					<CardContent className="py-8 text-center">
						<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<Zap className="h-5 w-5 text-[hsl(var(--quantum-blue))]" />
						</div>
						<h3 className="text-lg font-medium">Luo seuraava workflow</h3>
						<p className="text-sm text-muted-foreground">Hyödynnä kirjastoamme ja aloita minuutissa.</p>
						<Link href="/dashboard/workflows/new">
							<Button className="mt-4">Aloita</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	)
}

