"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Bot, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Zap, 
  Activity,
  FileText,
  Database,
  Globe,
  CreditCard,
  Bell,
  Search,
  PlusCircle,
  BarChart3,
  Brain,
  Workflow
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Agents",
    href: "/dashboard/agents",
    icon: Bot,
    count: 12,
  },
  {
    name: "Workflows",
    href: "/dashboard/workflows", 
    icon: Workflow,
    count: 8,
  },
  {
    name: "Runs",
    href: "/dashboard/runs",
    icon: Activity,
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: FileText,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: Brain,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
    count: 4,
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
    icon: Globe,
  },
  {
    name: "Activity",
    href: "/dashboard/activity",
    icon: Activity,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    name: "Data Sources",
    href: "/dashboard/data",
    icon: Database,
  },
]

const secondaryNavigation = [
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
  <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Spektri Labs</h1>
            <p className="text-xs text-slate-500">Agent Platform</p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search agents, workflows..."
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {/* Create New */}
      <div className="px-4 pb-4">
        <Link href="/dashboard/agents/new">
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 pb-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 border-l-2 border-slate-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center">
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"
                    )}
                  />
                  {item.name}
                </div>
                {item.count && (
                  <Badge variant="secondary" className="text-xs">
                    {item.count}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Account
          </h3>
          <div className="mt-2 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                        ? "bg-slate-100 text-slate-900 border-l-2 border-slate-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-[10px] font-medium">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-slate-500 truncate">
              john@spektrilabs.com
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
