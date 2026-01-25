"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMac, setIsMac] = React.useState(false)
  const showDemos = process.env.NEXT_PUBLIC_SHOW_DEMOS === "true"

  React.useEffect(() => {
    // Detect platform to show correct shortcut hint
    try {
      const platform = navigator?.platform || ""
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform))
    } catch {
      setIsMac(false)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Skip to content for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 z-[60] rounded bg-primary px-3 py-2 text-primary-foreground"
      >
        Siirry sisältöön
      </a>
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Creation OS</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/components" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Komponentit
            </Link>
            <Link href="/examples" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Esimerkit
            </Link>
            <Link href="/status" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Tila
            </Link>
            {showDemos ? (
              <>
                <Link href="/internal/components" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  (Sisäinen) Komponentit
                </Link>
                <Link href="/internal/examples" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  (Sisäinen) Esimerkit
                </Link>
              </>
            ) : null}
            <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dokumentaatio
            </Link>
          </nav>
        </div>
        
        <button 
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </button>

        {isOpen && (
          <div className="absolute top-14 left-0 right-0 border-b bg-background md:hidden">
            <div className="container flex flex-col space-y-3 p-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">Creation OS</span>
              </Link>
              <div className="flex flex-col space-y-3">
                <Link href="/components" className="text-muted-foreground">Komponentit</Link>
                <Link href="/examples" className="text-muted-foreground">Esimerkit</Link>
                <Link href="/status" className="text-muted-foreground">Tila</Link>
                {showDemos ? (
                  <>
                    <Link href="/internal/components" className="text-muted-foreground">(Sisäinen) Komponentit</Link>
                    <Link href="/internal/examples" className="text-muted-foreground">(Sisäinen) Esimerkit</Link>
                  </>
                ) : null}
        <Link href="/docs" className="text-muted-foreground">Dokumentaatio</Link>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">Hae komponentteja...</span>
              <span className="inline-flex lg:hidden">Haku...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                {isMac ? (
                  <>
                    <span className="text-xs">⌘</span>K
                  </>
                ) : (
                  <>
                    <span className="text-[10px]">Ctrl</span> K
                  </>
                )}
              </kbd>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
