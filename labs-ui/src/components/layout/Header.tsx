import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#111] bg-black">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-xs uppercase tracking-[0.28em] text-zinc-200">
          CREATION OS
        </Link>
        <nav className="flex items-center gap-5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-200">Dashboard</Link>
          <Link href="/projects" className="hover:text-zinc-200">Projects</Link>
          <Link href="/assets" className="hover:text-zinc-200">Assets</Link>
          <Link href="/operations" className="hover:text-zinc-200">Operations</Link>
          <Link href="/system" className="hover:text-zinc-200">System</Link>
        </nav>
      </div>
    </header>
  )
}
