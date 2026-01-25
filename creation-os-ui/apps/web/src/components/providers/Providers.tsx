"use client"

import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { QueryProvider } from "@/components/providers/QueryProvider"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryProvider>{children}</QueryProvider>
      <Toaster />
    </ThemeProvider>
  )
}
