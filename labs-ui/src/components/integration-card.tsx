"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type Integration = {
  id: string
  name: string
  description?: string
  installed?: boolean
}

export function IntegrationCard({ integration, onAction }: { integration: Integration; onAction?: (integration: Integration) => void }) {
  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="text-base">{integration.name}</CardTitle>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {integration.installed ? "Asennettu" : "Ei asennettu"}
        </span>
        <Button size="sm" variant={integration.installed ? "outline" : "primary"} onClick={() => onAction?.(integration)} aria-label={integration.installed ? `${integration.name} auki` : `Asenna ${integration.name}`}>
          {integration.installed ? "Avaa" : "Asenna"}
        </Button>
      </CardContent>
    </Card>
  )
}
