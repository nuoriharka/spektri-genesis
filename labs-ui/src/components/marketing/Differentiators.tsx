import Container from "@/components/layout/Container";
import copy from "@/content/copy.fi.json";

export default function Differentiators(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">{copy.diff.title}</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {copy.diff.items.map((x)=> (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{x.t}</h3>
              <p className="mt-2 text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
