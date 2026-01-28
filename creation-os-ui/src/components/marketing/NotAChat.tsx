"use client";
import Container from "@/components/layout/Container";
import copy from "@/content/copy.fi.json";
import Image from "next/image";

const vendors = [
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Anthropic", logo: "/logos/anthropic.svg" },
  { name: "Google", logo: "/logos/google-gemini.svg" }
];

export default function NotAChat(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">{copy.notAChat.title}</h2>
          <p className="mt-3 text-white/80">{copy.notAChat.desc}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.notAChatItems.map((it)=> (
            <div key={it.t} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-medium text-white">{it.t}</h3>
              <p className="mt-2 text-white/70">{it.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Mallien ja palveluiden tuki">
            {vendors.map(v => (
              <span key={v.name} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                <Image src={v.logo} alt={v.name} width={18} height={18} />
                <span className="text-sm">{v.name}</span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
