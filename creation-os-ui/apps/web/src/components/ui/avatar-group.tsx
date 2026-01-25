"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AvatarGroup({ members }: { members: { name: string; initials: string }[] }) {
  return (
    <div className="flex -space-x-2">
      {members.map((m) => (
        <Avatar key={m.name} className="h-7 w-7 ring-2 ring-background">
          <AvatarFallback className="text-[11px]">{m.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
