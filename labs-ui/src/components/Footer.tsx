"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Building2, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * FOOTER — Tailark footer-1 inspired
 * Place after <SectionCTA />. Dark theme.
 *
 * Assets:
 *  - /brands/spektri-logo.svg  (vaihda polku jos logosi on muualla)
 */

const nav = {
  alusta: [
    { label: "Agenttifarmit", href: "/#agenttifarmit" },
    { label: "Meta‑Agentti", href: "/#metaorkestroija" },
    { label: "Komentokeskus", href: "/#mission-control" },
    { label: "Idea → MVP", href: "/#idea-to-mvp" },
    { label: "Integrations", href: "/#integrations-3" },
  ],
  ratkaisut: [
    { label: "Automaatio", href: "/solutions/automation" },
    { label: "Sisällöntuotanto", href: "/solutions/content" },
    { label: "Asiakastuki", href: "/solutions/support" },
    { label: "Tutkimus", href: "/solutions/research" },
  ],
  resurssit: [
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Blogi", href: "/blog" },
    { label: "Yhteisö", href: "/community" },
  ],
  yritys: [
    { label: "Tietoa", href: "/about" },
    { label: "Yhteystiedot", href: "/contact" },
    { label: "Tietosuoja", href: "/privacy" },
    { label: "Käyttöehdot", href: "/terms" },
  ],
} as const;

function NavColumn({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-sm font-medium text-white">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-zinc-800 bg-black text-white">
      {/* Soft glow at top */}
      <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-[80%] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Top row: brand + subscribe */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/spektri-logomark-gradient.svg"
              alt="Spektri"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <div>
              <div className="text-lg font-semibold">Spektri Labs</div>
              <p className="text-sm text-zinc-400">Älyagenttien aikakauden käyttöliittymä</p>
            </div>
          </div>

          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // handle submit in app layer
            }}
          >
            <Input
              type="email"
              placeholder="Sähköpostisi päivityksiä varten"
              className="h-10 rounded-full border-zinc-800 bg-zinc-900/60 text-sm placeholder:text-zinc-500"
              aria-label="Tilaa uutiskirje"
              required
            />
            <Button type="submit" className="h-10 rounded-full">
              Tilaa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Links + contact */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 md:grid-cols-4">
            <NavColumn title="Alusta" items={nav.alusta} />
            <NavColumn title="Ratkaisut" items={nav.ratkaisut} />
            <NavColumn title="Resurssit" items={nav.resurssit} />
            <NavColumn title="Yritys" items={nav.yritys} />
          </div>

          {/* Contact card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950/80 to-zinc-900/60 p-5">
              <div className="text-sm font-medium">Ota yhteyttä</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-zinc-400"/> lauri@spektri.tech</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-zinc-400"/> +358406675099</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-zinc-400"/> Kustaankatu 8a A6, 00500 Helsinki</li>
                <li className="flex items-center gap-2"><Building2 className="h-4 w-4 text-zinc-400"/> Y‑tunnus 3137435‑5</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social + bottom */}
        <div className="mt-10 flex flex-col gap-5 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="text-zinc-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" className="text-zinc-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-zinc-400">
            <span>&copy; {year} Spektri Labs Oy. Kaikki oikeudet pidätetään.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Tietosuoja</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Käyttöehdot</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
