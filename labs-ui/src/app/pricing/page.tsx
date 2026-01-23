import { Metadata } from "next"
import Pricing from "@/components/marketing/Pricing"
import FAQ from "@/components/marketing/FAQ"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, fair pricing.",
  openGraph: { title: "Pricing — Spektri", description: "Simple, fair pricing.", images: ["/images/og/og-home.webp"] },
}

export default function PricingPage(){
  return (
    <main id="main" className="pb-24">
      <Pricing />
      <FAQ />
    </main>
  )
}
