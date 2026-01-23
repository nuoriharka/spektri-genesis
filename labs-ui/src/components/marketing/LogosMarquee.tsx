"use client"

import Container from "@/components/layout/Container"

const brands = ["Google","Microsoft","Slack","Notion","HubSpot","Zapier","Vercel","OpenAI","AWS","Stripe"]

function MonoLogo({ label }: { label: string }){
  return (
    <svg aria-label={label} role="img" width="96" height="28" viewBox="0 0 96 28" className="shrink-0 opacity-70">
      <rect x="0" y="6" width="96" height="16" rx="8" fill="currentColor" className="text-white/40" />
    </svg>
  )
}

export default function LogosMarquee(){
  return (
  <section className="border-y border-white/10 bg-black/20">
      <Container>
    <div className="overflow-hidden py-16 md:py-24">
          <div className="flex animate-[scroll_30s_linear_infinite] [--gap:3rem] gap-[var(--gap)] will-change-transform motion-reduce:animate-none">
            {[...brands, ...brands].map((n, i) => (
              <MonoLogo key={i} label={n} />
            ))}
          </div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}
