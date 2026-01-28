import { NextResponse } from 'next/server'
import { computeHealth } from '@/lib/health'

export const runtime = 'nodejs'

export async function GET() {
  const health = await computeHealth()
  return NextResponse.json(health)
}
