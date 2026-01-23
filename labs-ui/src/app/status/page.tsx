export const dynamic = 'force-dynamic'
import { GenesisResonance } from "@/components/GenesisResonance"

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Status</h1>
        <div className="mt-10">
          <GenesisResonance />
        </div>
      </div>
    </div>
  )
}
