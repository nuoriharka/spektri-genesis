import fs from 'node:fs/promises'
import path from 'node:path'
import { getNormalizedOperations } from '@/lib/store'

type HealthStatus = 'OK' | 'DEGRADED' | 'OFFLINE'

const gatewayUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'
const dataDir = path.resolve(process.cwd(), '../data')

const checkGateway = async (): Promise<boolean> => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 800)
  try {
    const res = await fetch(gatewayUrl, { method: 'GET', signal: controller.signal })
    clearTimeout(timer)
    return res.ok
  } catch {
    clearTimeout(timer)
    return false
  }
}

export const computeHealth = async () => {
  try {
    await fs.access(dataDir)
  } catch {
    return { status: 'OFFLINE' as HealthStatus, reason: 'file-store', lastIncident: new Date().toISOString(), lastSuccess: null }
  }

  const gatewayOk = await checkGateway()
  if (!gatewayOk) {
    return { status: 'OFFLINE' as HealthStatus, reason: 'gateway', lastIncident: new Date().toISOString(), lastSuccess: null }
  }

  const operations = await getNormalizedOperations()
  const lastError = operations.find((op) => op.status === 'ERROR')
  const lastOk = operations.find((op) => op.status === 'OK')

  const lastIncident = lastError ? (lastError.tsFinal || lastError.tsStart) : null
  const lastSuccess = lastOk ? (lastOk.tsFinal || lastOk.tsStart) : null

  if (lastError) {
    return {
      status: 'DEGRADED' as HealthStatus,
      reason: lastError.error?.reason || 'operation-error',
      lastIncident,
      lastSuccess
    }
  }

  return {
    status: 'OK' as HealthStatus,
    reason: 'nominal',
    lastIncident,
    lastSuccess
  }
}
