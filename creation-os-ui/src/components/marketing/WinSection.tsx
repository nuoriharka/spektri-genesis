"use client"

import Container from "@/components/layout/Container"
import win from "@/content/win.fi.json"
import SimRun from "./SimRun"

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-semibold text-white">{title}</h2>
      {desc ? <p className="mt-3 text-white/80">{desc}</p> : null}
    </div>
  )
}

export default function WinSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="win-section">
      <Container>
        <div className="space-y-14">
          {/* Problems */}
          <div>
            <SectionTitle title="Miksi Creation OS voittaa" desc={win.nolockin_line} />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {win.problems.map((p) => (
                <div key={p.t} className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                  <p className="mt-2 text-white/75">{p.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audiences + Farm callout */}
          <div className="grid gap-6 md:grid-cols-3">
            {win.audiences.map((a) => (
              <div key={a.t} className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">{a.t}</h3>
                <p className="mt-2 text-white/75">{a.d}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-[var(--brand)]/15 to-[var(--brand2)]/15 p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/85 ring-1 ring-white/15">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden /> Farm-agentti
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">Rakenna agenttifarmi ilman lukittautumista</h3>
              <ul className="mt-2 text-white/85 list-disc pl-5">
                {win.pledge.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sim-Run */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">{win.faster_line}</h3>
              <p className="mt-2 text-white/75">Instant template -simulointi (mock-SSE).</p>
              <div className="mt-4">
                <SimRun />
              </div>
            </div>
            {/* Features */}
            <div className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Keskeiset ominaisuudet</h3>
              <ul className="mt-3 space-y-2">
                {win.features.map((f) => (
                  <li key={f.t} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <div className="text-white font-medium">{f.t}</div>
                    <div className="text-white/75 text-sm">{f.d}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div>
            <SectionTitle title="Vertailu" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {win.comparison.map((c) => (
                <div key={c.t} className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                  <ul className="mt-2 list-disc pl-5 text-white/80">
                    {c.points.map((pt: string) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Stories */}
          <div>
            <SectionTitle title="Tarinoita" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {win.stories.map((s) => (
                <div key={s.t} className="rounded-2xl border border-white/12 bg-black/30 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{s.t}</h3>
                  <p className="mt-2 text-white/75">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA (reuse content) */}
          <div className="text-center">
            <div className="inline-block rounded-3xl border border-white/10 bg-gradient-to-r from-[var(--brand)]/20 to-[var(--brand2)]/20 p-10">
              <h3 className="text-3xl font-semibold text-white">{win.final_cta.title}</h3>
              <p className="mt-3 text-white/80">{win.final_cta.desc}</p>
              <a href="/dashboard" className="inline-flex items-center rounded-2xl px-6 py-3 bg-[var(--brand)] hover:brightness-110 text-white font-medium transition mt-6">{win.final_cta.action}</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
