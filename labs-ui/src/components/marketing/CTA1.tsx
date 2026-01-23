import Link from "next/link";

export default function CTA1() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(109,106,255,.15),rgba(34,211,238,.08),transparent_60%)]" />
      <div className="container mx-auto px-6 text-center">
        <h3 className="mx-auto mb-3 max-w-2xl text-3xl font-semibold tracking-tight">
          Valmiina vapauttamaan potentiaalisi?
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-white/80">
          Liity edelläkävijöihin. Ensimmäinen digitaalinen työntekijäsi odottaa — ilmainen ikuisesti.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/signup" className="rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white ring-1 ring-brand/30 hover:brightness-110 hover:scale-105 transition-transform">
            Aloita ilmaiseksi
          </Link>
          <Link href="/demo" className="rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10">
            Katso demo
          </Link>
        </div>
      </div>
    </section>
  );
}
