import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#111] bg-black">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-xs uppercase tracking-[0.2em] text-zinc-200">
          SPECTER
        </Link>
        <nav className="flex items-center gap-6 text-xs text-zinc-400">
          <Link href="/genesis" className="hover:text-zinc-200">Genesis</Link>
          <Link href="/game" className="hover:text-zinc-200">The Game</Link>
          <Link href="/ledger" className="hover:text-zinc-200">Ledger</Link>
        </nav>
      </div>
    </header>
  )
}
