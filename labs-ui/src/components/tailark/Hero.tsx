"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Copy: selkeä & myyvä */}
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Spektri.Labs · Digitaalinen työvoimasi
            </span>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Sinulla on idea. <span className="text-primary">Me annamme sille armeijan.</span>
            </h1>
            <p className="text-muted-foreground">
              Muuta tavoitteesi tuloksiksi keskustelemalla. Ensimmäinen digitaalinen
              työntekijäsi on valmiina alle 60 sekunnissa.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/app"
                className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-primary-foreground shadow hover:opacity-90"
              >
                Aloita ilmaiseksi
              </a>
              <a
                href="/demo"
                className="inline-flex items-center rounded-xl border px-5 py-3 hover:bg-muted/50"
              >
                Katso 60 sekunnin demo
              </a>
            </div>
            <p className="text-xs text-muted-foreground">Ei luottokorttia, ei sitoumuksia.</p>
          </div>

          {/* Media: video + oikea posteri */}
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-border">
            <video
              className="h-full w-full object-cover"
              src="/videos/hero-video.mp4"
              poster="/photos/hero-video-poster.jpg"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
            />
          </div>
        </div>
      </div>
      {/* Hieno, mutta hillitty tausta */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]" />
    </section>
  );
}
