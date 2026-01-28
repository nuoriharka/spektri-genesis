"use client";
import Container from "@/components/layout/Container";
import BorderBeam from "@/components/visual/BorderBeam";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { track } from "@/lib/analytics";
import copy from "@/content/copy.fi.json";
import VideoLoop from "@/components/ui/VideoLoop";

export default function EndCta(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12">
          <VideoLoop srcMp4="/videos/dark-saas-duo.mp4" className="absolute inset-0 opacity-20 -z-10" label="CTA ambient" />
          <BorderBeam />
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">{copy.endCta.title}</h2>
            <p className="mt-3 text-white/80">{copy.endCta.desc}</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryCta href="/app" event="end_cta_primary">{copy.endCta.primary}</PrimaryCta>
              <button
                onClick={() => { track('end_cta_demo'); document.getElementById('simrun-dialog')?.classList.remove('hidden'); }}
                className="inline-flex items-center rounded-2xl px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-medium backdrop-blur transition"
              >{copy.endCta.secondary}</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
