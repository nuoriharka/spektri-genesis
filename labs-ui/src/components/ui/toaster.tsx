"use client"

import * as React from "react"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast"

type ToastItem = {
  id: string
  title?: string
  description?: string
}

const ToastContext = React.createContext<{
  add: (t: Omit<ToastItem, "id">) => void
} | null>(null)

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])

  const add = React.useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setItems((prev) => [...prev, { id, ...t }])
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500)
  }, [])

  return (
    <ToastProvider>
      <ToastContext.Provider value={{ add }}>{children}</ToastContext.Provider>
      {items.map((t) => (
        <Toast key={t.id}>
          <div className="grid gap-1">
            {t.title ? <ToastTitle>{t.title}</ToastTitle> : null}
            {t.description ? <ToastDescription>{t.description}</ToastDescription> : null}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within <Toaster />")
  return ctx
}
