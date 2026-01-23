import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            {/* Jos sinulla on svg-logotype, käytä sitä */}
            <Image src="/logos/spektri-wordmark.svg" alt="Spektri.Labs" width={120} height={28} />
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Spektri.Labs</span>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <a href="/features">Ominaisuudet</a>
            <a href="/pricing">Hinnoittelu</a>
            <a href="/docs">Dokumentaatio</a>
            <a href="/status">Järjestelmän tila</a>
            <a href="/privacy">Tietosuoja</a>
            <a href="/terms">Ehdot</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
