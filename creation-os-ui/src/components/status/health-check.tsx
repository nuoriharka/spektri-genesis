"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ApiHealth = {
	ok: boolean
	app?: string
	origin?: string
	node?: string
	time?: string
	[key: string]: any
}

type VersionInfo = {
	ok: boolean
	name?: string
	version?: string
	node?: string
	time?: string
}

type CheckState<T> = {
	loading: boolean
	error?: string
	data?: T
	ms?: number
}

function useFetchJson<T = any>(url: string, deps: React.DependencyList = []) {
	const [state, setState] = React.useState<CheckState<T>>({ loading: true })

	const fetchOnce = React.useCallback(async () => {
		setState({ loading: true })
		const t0 = performance.now()
		try {
			const res = await fetch(url, { cache: "no-store" })
			const json = (await res.json()) as T
			const ms = Math.max(0, Math.round(performance.now() - t0))
			if (!res.ok) {
				setState({ loading: false, error: `HTTP ${res.status}`, data: json as any, ms })
			} else {
				setState({ loading: false, data: json, ms })
			}
		} catch (err: any) {
			const ms = Math.max(0, Math.round(performance.now() - t0))
			setState({ loading: false, error: err?.message || "Network error", ms })
		}
	}, [url])

	React.useEffect(() => {
		fetchOnce()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	return { ...state, refresh: fetchOnce }
}

export function HealthCheck() {
	const [tick, setTick] = React.useState(0)
	const health = useFetchJson<ApiHealth>("/api/health", [tick])
	const version = useFetchJson<VersionInfo>("/api/version", [tick])

	// auto-refresh every 30s
	React.useEffect(() => {
		const id = setInterval(() => setTick((n) => n + 1), 30_000)
		return () => clearInterval(id)
	}, [])

	const overallOk = (health.data?.ok ?? false) && (version.data?.ok ?? false)

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						API Health
						{health.loading ? (
							<Badge variant="secondary">Tarkistetaan…</Badge>
						) : health.error || !health.data?.ok ? (
							<Badge variant="destructive">Virhe</Badge>
						) : (
							<Badge>OK</Badge>
						)}
					</CardTitle>
					<CardDescription>
						Pingiä mitataan ilman välimuistia. Päivittyy 30 sek välein.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2 text-sm text-muted-foreground">
					<div className="flex items-center justify-between">
						<span>Endpoint</span>
						<a className="underline" href="/api/health">/api/health</a>
					</div>
					<div className="flex items-center justify-between">
						<span>Viive</span>
						<span>{health.ms != null ? `${health.ms} ms` : "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Node</span>
						<span>{health.data?.node || "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Aika</span>
						<span>{health.data?.time || "—"}</span>
					</div>
					{health.error ? (
						<div className="text-destructive">{health.error}</div>
					) : null}
					<div className="pt-2">
						<Button size="sm" variant="outline" onClick={() => setTick((n) => n + 1)}>
							Päivitä
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						Versio
						{version.loading ? (
							<Badge variant="secondary">Ladataan…</Badge>
						) : version.error || !version.data?.ok ? (
							<Badge variant="destructive">Virhe</Badge>
						) : (
							<Badge>OK</Badge>
						)}
					</CardTitle>
					<CardDescription>Rakenteen metadata palvelimelta</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2 text-sm text-muted-foreground">
					<div className="flex items-center justify-between">
						<span>Endpoint</span>
						<a className="underline" href="/api/version">/api/version</a>
					</div>
					<div className="flex items-center justify-between">
						<span>Sovellus</span>
						<span>{version.data?.name || "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Versio</span>
						<span>{version.data?.version || "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Node</span>
						<span>{version.data?.node || "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Aika</span>
						<span>{version.data?.time || "—"}</span>
					</div>
					{version.error ? (
						<div className="text-destructive">{version.error}</div>
					) : null}
					<div className="pt-2">
						<Button size="sm" variant="outline" onClick={() => setTick((n) => n + 1)}>
							Päivitä
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						Kokonaistila
						{health.loading || version.loading ? (
							<Badge variant="secondary">Päivitetään…</Badge>
						) : overallOk ? (
							<Badge>Operatiivinen</Badge>
						) : (
							<Badge variant="destructive">Häiriöitä</Badge>
						)}
					</CardTitle>
					<CardDescription>Yhdistelmä API-terveydestä ja versiopalvelusta</CardDescription>
				</CardHeader>
				<CardContent className="text-sm text-muted-foreground">
					{overallOk ? (
						<p>Kaikki järjestelmät toimivat odotetusti.</p>
					) : (
						<p>Osassa palveluista on ongelmia. Tarkista tiedot yllä.</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default HealthCheck

