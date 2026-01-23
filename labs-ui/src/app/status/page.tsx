export const dynamic = 'force-dynamic'
import fs from 'node:fs/promises'
import path from 'node:path'

const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

const checkGateway = async () => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 800)
  try {
    const response = await fetch(gatewayUrl, { method: 'GET', signal: controller.signal })
    clearTimeout(timer)
    return response.ok
  } catch {
    clearTimeout(timer)
    return false
  }
}

const checkDegraded = async () => {
  try {
    const payload = await fs.readFile(path.resolve(process.cwd(), '../data/ledger.json'), 'utf-8')
    return payload.length === 0
  } catch {
    return true
  }
}

export default async function StatusPage() {
  const online = await checkGateway()
  const degraded = await checkDegraded()
  const lastIncident = '—'

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-[0.08em]">Status</h1>
        <div className="mt-8 border border-[#111]">
          <div className="grid grid-cols-3 text-[11px] text-zinc-500 px-4 py-3 border-b border-[#111]">
            <div>System</div>
            <div>Degraded Services</div>
            <div>Last Incident</div>
          </div>
          <div className="grid grid-cols-3 px-4 py-4 text-sm">
            <div className="text-zinc-200">{online ? 'Online' : 'Offline'}</div>
            <div className="text-zinc-500">{degraded ? 'Yes' : 'No'}</div>
            <div className="text-zinc-500">{lastIncident}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
