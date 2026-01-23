"use client";

import Link from "next/link";

export default function MarketingNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Spektri.Labs
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/ominaisuudet" className="opacity-80 hover:opacity-100">Ominaisuudet</Link>
          <Link href="/hinnoittelu" className="opacity-80 hover:opacity-100">Hinnoittelu</Link>
          <Link href="/docs" className="opacity-80 hover:opacity-100">Dokumentaatio</Link>
          <Link
            href="/app"
            className="rounded-xl bg-white/10 px-4 py-2 font-medium hover:bg-white/15 ring-1 ring-white/10"
          >
            Kirjaudu
          </Link>
        </div>
      </nav>
    </header>
  );
}
