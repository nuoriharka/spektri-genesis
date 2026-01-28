"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type Template = {
  id: string
  name: string
  description?: string
  category?: string
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="text-base">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{template.category}</span>
        <Link href={`/dashboard/agents/new?template=${encodeURIComponent(template.id)}`}>
          <Button size="sm">Käytä pohjaa</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
