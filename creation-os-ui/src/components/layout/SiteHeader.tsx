"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "/#features", label: "Ominaisuudet" },
    { href: "/#how-it-works", label: "Miten toimii" },
    { href: "/templates", label: "Mallit" },
    { href: "/pricing", label: "Hinnoittelu" },
    { href: "/docs", label: "Dokumentaatio" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/20">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)]" />
          <span className="text-sm font-semibold text-white">Creation OS</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-white/80 hover:text-white transition">
              {n.label}
            </Link>
          ))}
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/dashboard" className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition">
            Aloita
          </Link>
        </nav>
        <button
          className="md:hidden rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-white"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-3 grid gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-lg px-2 py-2 text-white/90 hover:bg-white/10" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/dashboard" className="block rounded-lg bg-[var(--brand)] px-3 py-2 text-center text-white hover:brightness-110 transition" onClick={() => setOpen(false)}>
              Aloita
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
