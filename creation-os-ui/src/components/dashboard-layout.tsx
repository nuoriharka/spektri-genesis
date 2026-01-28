"use client"

import * as React from "react"
import RetroGrid from "@/components/visual/RetroGrid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Settings,
  Zap,
  Bell,
  Search,
  Menu,
  X,
  Sparkles,
  Activity,
  FileText,
  Globe,
  ChevronLeft,
  Command
} from "lucide-react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: Bot,
  },
  {
    title: "Runs",
    href: "/dashboard/runs",
    icon: Activity,
  },
  {
    title: "Templates",
    href: "/dashboard/templates",
    icon: FileText,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: Globe,
  },
  {
    title: "Workflows",
    href: "/dashboard/workflows",
    icon: Workflow,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [showCmd, setShowCmd] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Keyboard shortcuts: g d/a/r/t/i/s
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        const el = document.getElementById('cmdk-trigger')
        el?.click()
        return
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsCollapsed(v=>{
          const next = !v; try { localStorage.setItem('sidebar-collapsed', next? '1':'0') } catch {}
          return next
        })
        return
      }
      if (e.key.toLowerCase() === 'g') {
        const handler = (ev: KeyboardEvent) => {
          const map: Record<string, string> = { d: '/dashboard', a: '/dashboard/agents', r: '/dashboard/runs', t: '/dashboard/templates', i: '/dashboard/integrations', s: '/dashboard/settings' }
          const dest = map[ev.key.toLowerCase()]
          if (dest) {
            ev.preventDefault(); router.push(dest)
          }
          window.removeEventListener('keydown', handler)
        }
        window.addEventListener('keydown', handler, { once: true })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  // Restore theme and collapsed state
  React.useEffect(() => {
    try {
      const t = localStorage.getItem('theme')
      if (t === 'dark') document.documentElement.classList.add('dark')
      const c = localStorage.getItem('sidebar-collapsed')
      if (c === '1') setIsCollapsed(true)
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-card px-3 py-2 rounded-md border">Siirry sisältöön</a>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full transform bg-white/80 backdrop-blur-xl border-r border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50 transition-all duration-300 ease-in-out lg:translate-x-0 glass-card",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )} style={{ width: isCollapsed ? 80 : 256 }}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-xl font-bold text-gradient-primary">Creation OS</span>
                <span className="text-xs block text-muted-foreground">UI</span>
              </div>
            )}
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={()=> setIsCollapsed(v=>!v)} aria-label={isCollapsed?"Expand sidebar":"Collapse sidebar"}>
              <ChevronLeft className={cn("h-5 w-5 transition-transform", isCollapsed ? "rotate-180" : "rotate-0")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.title}
                href={item.href}
                title={isCollapsed ? item.title : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  active
                    ? "text-purple-700 dark:text-purple-300 bg-gradient-to-r from-purple-600/10 to-blue-600/10"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-purple-500 to-blue-500", active ? "opacity-100" : "opacity-0")} />
                <item.icon className={cn("h-5 w-5", active ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400")} />
                {!isCollapsed && <span>{item.title}</span>}
                {!isCollapsed && item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0.5">{item.badge}</Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Panel */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  John Doe
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  john@creationos.local
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="mt-2 text-xs text-muted-foreground">v0.1.0</div>
          )}
        </div>
      </aside>

      {/* Main Content */}
  <div className={cn("transition-[margin] duration-300 relative", isCollapsed ? "lg:ml-20" : "lg:ml-64") }>
        <RetroGrid />
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search agents, workflows..."
                  className="pl-10 pr-4 py-2 w-96 bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Ilmoitukset</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Agentti &quot;Content Writer&quot; suoritti ajon</DropdownMenuItem>
                  <DropdownMenuItem>Uusi integraatio: GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Sopimus päivitetty</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button id="cmdk-trigger" variant="outline" size="sm" className="hidden md:inline-flex" onClick={() => setShowCmd(true)}>
                <Command className="h-4 w-4 mr-2"/>Hakukomento (Ctrl/Cmd K)
              </Button>
              <Button variant="ghost" size="icon" aria-label="Vaihda teema" onClick={()=>{
                const root = document.documentElement
                const isDark = root.classList.toggle('dark')
                try { localStorage.setItem('theme', isDark ? 'dark' : 'light') } catch {}
              }}>
                <span className="sr-only">Vaihda teema</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </Button>
              <Link href="/docs" className="hidden md:inline text-sm text-muted-foreground hover:underline">Ohjeet</Link>
              <span className="text-xs text-muted-foreground hidden md:inline">{process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'}</span>
              
              <Link href="/dashboard/agents/new">
                <Button className="btn-creation-os">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Agent
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Command Palette */}
      <Cmdk open={showCmd} onOpenChange={setShowCmd} />
    </div>
  )
}

function Cmdk({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean)=>void }) {
  const router = useRouter()
  const [q, setQ] = React.useState("")
  const items = React.useMemo(()=>[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Agents", href: "/dashboard/agents" },
    { label: "Runs", href: "/dashboard/runs" },
    { label: "Templates", href: "/dashboard/templates" },
    { label: "Integrations", href: "/dashboard/integrations" },
    { label: "Settings", href: "/dashboard/settings" },
  { label: "Create Agent", href: "/dashboard/agents/new" },
  { label: "Open Templates", href: "/dashboard/templates" },
  { label: "Open Settings", href: "/dashboard/settings" },
  ], [])
  const filtered = items.filter(i=> i.label.toLowerCase().includes(q.toLowerCase()))
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 bg-black/40" onClick={()=>onOpenChange(false)}>
      <div className="w-full max-w-lg rounded-xl border bg-card shadow-xl" onClick={e=>e.stopPropagation()}>
        <div className="p-3 border-b">
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Hae toimintoja…" className="w-full bg-transparent outline-none" />
        </div>
        <div className="max-h-72 overflow-auto">
          {filtered.map((i)=> (
            <button key={i.href} className="w-full text-left px-4 py-2 hover:bg-muted" onClick={()=>{ router.push(i.href); onOpenChange(false) }}>
              {i.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-sm text-muted-foreground">Ei tuloksia</div>
          )}
        </div>
      </div>
    </div>
  )
}
