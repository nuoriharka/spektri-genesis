"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function LeftChat() {
  const [msg, setMsg] = React.useState("")
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto rounded-md border bg-card p-2 text-sm">
        <p className="text-muted-foreground">Chat tulee tähän…</p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Textarea value={msg} onChange={(e)=> setMsg(e.target.value)} placeholder="Kirjoita viesti…" />
        <Button onClick={()=> setMsg("")}>Lähetä</Button>
      </div>
    </div>
  )
}
