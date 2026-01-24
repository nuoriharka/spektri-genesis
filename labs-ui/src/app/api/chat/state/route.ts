import { NextResponse } from 'next/server'
import { findActiveProject, loadProjects } from '@/lib/store'

export const runtime = 'nodejs'

export async function GET() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  return NextResponse.json({ active })
}
