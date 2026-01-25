"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-5 text-sm text-white/80">
        <div>
          <div className="text-white font-semibold">Yritys</div>
          <ul className="mt-3 space-y-2">
            <li><Link href="#" className="hover:text-white/100">Meistä</Link></li>
            <li><Link href="#" className="hover:text-white/100">Uutiset</Link></li>
            <li><Link href="#" className="hover:text-white/100">Ura</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold">Tuote</div>
          <ul className="mt-3 space-y-2">
            <li><Link href="#" className="hover:text-white/100">Tiekartta</Link></li>
            <li><Link href="#" className="hover:text-white/100">Changelog</Link></li>
            <li><Link href="/status" className="hover:text-white/100">Status</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold">Resurssit</div>
          <ul className="mt-3 space-y-2">
            <li><Link href="#" className="hover:text-white/100">Oppaat</Link></li>
            <li><Link href="#" className="hover:text-white/100">API</Link></li>
            <li><Link href="#" className="hover:text-white/100">Yhteisö</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold">Oikeudelliset</div>
          <ul className="mt-3 space-y-2">
            <li><Link href="#" className="hover:text-white/100">Tietosuoja</Link></li>
            <li><Link href="#" className="hover:text-white/100">Ehdot</Link></li>
            <li><Link href="#" className="hover:text-white/100">Evästeet</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold">Yhteys</div>
          <ul className="mt-3 space-y-2">
            <li><Link href="mailto:hello@creationos.local" className="hover:text-[var(--brand)] transition-colors">hello@creationos.local</Link></li>
            <li><Link href="/trust" className="hover:text-white/100">Trust</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Creation OS
      </div>
    </footer>
  );
}
