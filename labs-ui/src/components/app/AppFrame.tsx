"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export function AppFrame({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
