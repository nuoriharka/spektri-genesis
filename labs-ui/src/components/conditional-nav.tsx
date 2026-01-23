"use client"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"

export function ConditionalNav() {
  const pathname = usePathname()
  if (pathname === "/") return null
  return <Navigation />
}
