import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Logo } from '@/components/brand/Logo'

export function Header() {
  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="container flex h-16 max-w-screen-2xl items-center rounded-2xl border border-border/40 bg-background/80 shadow-lg shadow-background/10 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
          <span className="hidden font-bold sm:inline-block">
            Spektri.Labs
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/docs"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Dokumentaatio
          </Link>
          <Link
            href="/#features"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Ominaisuudet
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Tietoa
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <Button variant="secondary" asChild>
            <Link href="/login">Kirjaudu</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Aloita ilmaiseksi</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
