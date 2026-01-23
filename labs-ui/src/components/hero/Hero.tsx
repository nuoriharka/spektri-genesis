import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative mx-auto max-w-7xl px-4 md:px-6 py-20">
      <p className="mb-3 inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider">
        Spektri Labs
      </p>
      <h1 className="text-balance text-4xl md:text-6xl font-semibold">
        Yksi alusta. Rajaton potentiaali.
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Conversational no-code, multi-agent orkestrointi ja integraatiot – ilman kitkaa.
      </p>
      <div className="mt-8 flex gap-3">
        <Link 
          href="#one-platform" 
          className="inline-flex h-11 items-center rounded-full bg-white px-5 font-medium text-black hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          Aloita
        </Link>
        <Link 
          href="#integrations-3" 
          className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Katso integraatiot
        </Link>
      </div>
    </section>
  );
}
