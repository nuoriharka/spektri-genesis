import Image from "next/image";
const features = [
  {
    title: "Kustannus & vaikutus",
    text: "Seuraa kustannusta/ajoa, onnistumisprosenttia ja säästettyä aikaa.",
    img: "/images/sections/features-4-performance.png"
  },
  {
    title: "Integraatiot",
    text: "OAuth Googleen, Microsoftiin, CRM:iin ja verkkokauppoihin.",
    img: "/images/sections/features-3-integrations.png"
  },
];

export default function Features8() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 [font-family:var(--font-display-active)] data-[theme=designer]:tracking-[0.08em] data-[theme=designer]:uppercase">Ominaisuudet</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {features.map(({ title, text, img }) => (
            <div key={title} className="rounded-[var(--radius)] border border-white/10 bg-[var(--panel)] p-6 flex flex-col gap-4 shadow-lg data-[theme=designer]:border-[#E5E5E5] data-[theme=designer]:bg-white data-[theme=designer]:shadow-none">
              <h3 className="text-lg font-semibold mb-2 [font-family:var(--font-display-active)]">{title}</h3>
              <p className="text-[color:var(--muted)]">{text}</p>
              <Image src={img} alt={title} width={600} height={400} className="rounded-[var(--radius)] w-full data-[theme=designer]:grayscale data-[theme=designer]:contrast-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
