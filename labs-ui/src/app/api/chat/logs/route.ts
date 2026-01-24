import { NextResponse } from 'next/server'
import { loadActions, loadOperations } from '@/lib/store'

export const runtime = 'nodejs'

const formatTime = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

export async function GET() {
  const actions = await loadActions()
  const operations = await loadOperations()
  const actionLines = actions.slice(-20).map((action) => `${formatTime(action.timestamp)} — ${action.verb} ${action.target}`)
  const opLines = operations.slice(-20).map((op) => `${op.id} — ${op.tool} — ${op.status}${op.error ? ` (${op.error})` : ''}`)
  return NextResponse.json({ actions: actionLines, operations: opLines })
}
