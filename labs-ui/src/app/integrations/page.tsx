import { Metadata } from "next"
import Container from "@/components/layout/Container"
import IntegrationsGrid from "@/components/integrations/IntegrationsGrid"

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect your tools in one click.",
  openGraph: { title: "Integrations — Spektri", description: "Connect your tools in one click.", images: ["/images/og/og-home.webp"] },
}

export default function IntegrationsPage(){
  return (
    <main id="main" className="pb-24">
      <Container>
        <section className="py-10">
          <h1 className="text-3xl font-semibold text-white tracking-tight">Integrations</h1>
          <p className="text-white/70 mt-2 max-w-2xl">OAuth to your favorite tools. New integrations land weekly.</p>
        </section>
      </Container>
      <IntegrationsGrid />
    </main>
  )
}
