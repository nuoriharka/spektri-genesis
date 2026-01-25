import Image from "next/image";
export default function Content2() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 [font-family:var(--font-display-active)] data-[theme=designer]:tracking-[0.08em] data-[theme=designer]:uppercase">Agenttifarmit ja Mission Control</h2>
            <p className="mb-6 text-[color:var(--muted)]">Rakenna tiimi erikoistuneita agentteja ja hallitse prosesseja yhdestä näkymästä.</p>
          </div>
          <div>
            <Image src="/images/app/agents.png" alt="Agenttifarmit ja Mission Control" width={1200} height={900} className="w-full h-72 md:h-96 object-contain rounded-[var(--radius)] shadow-xl transition-transform duration-500 hover:scale-105 data-[theme=designer]:grayscale data-[theme=designer]:contrast-110" />
          </div>
        </div>
      </div>
    </section>
  );
}
