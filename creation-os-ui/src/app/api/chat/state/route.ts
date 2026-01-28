import { NextResponse } from 'next/server'
import { findActiveProject, loadActions, loadOperations, loadProjects } from '@/lib/store'

export const runtime = 'nodejs'

export async function GET() {
  const projects = await loadProjects()
  const active = findActiveProject(projects)
  const actions = await loadActions()
  const operations = await loadOperations()
  return NextResponse.json({ active, actions, operations })
}
