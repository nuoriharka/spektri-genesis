import Link from "next/link";

export default function Footer1() {
  return (
    <footer className="border-t border-white/10 bg-background py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-white/90" />
            <span className="text-sm font-semibold">Spektri.Labs</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-white/75">
            <Link href="/ominaisuudet" className="hover:text-white">Ominaisuudet</Link>
            <Link href="/docs" className="hover:text-white">Dokumentaatio</Link>
            <Link href="/hinnoittelu" className="hover:text-white">Hinnoittelu</Link>
            <Link href="/tietoturva" className="hover:text-white">Tietoturva</Link>
            <Link href="/status" className="hover:text-white">Status</Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Spektri.Labs UI — Kaikki oikeudet pidätetään.
        </div>
      </div>
    </footer>
  );
}
