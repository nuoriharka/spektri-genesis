"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  variant?: "solid" | "underline"
  size?: "md" | "sm"
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "solid", size = "md", ...props }, ref) => {
  const base =
    "inline-flex items-center justify-start gap-1 text-slate-300 overflow-x-auto"
  const solid = "rounded-md border border-white/10 bg-white/5 p-1 backdrop-blur"
  const underline = "border-b border-white/10 pb-0.5"
  const h = size === "sm" ? "h-9" : "h-10"
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(base, h, variant === "solid" ? solid : underline, className)}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  variant?: "solid" | "underline"
  size?: "md" | "sm"
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = "solid", size = "md", ...props }, ref) => {
  const base =
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const sizing = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
  const solid =
    "rounded-sm data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm"
  const underline = cn(
    "rounded-none border-b-2 border-transparent text-slate-300",
    "data-[state=active]:border-cyan-300 data-[state=active]:text-white",
    "hover:text-white/90"
  )
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(base, sizing, variant === "solid" ? solid : underline, className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
