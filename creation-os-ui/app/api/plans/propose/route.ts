import { NextResponse } from 'next/server'
import { findActiveProject, loadProjects, PlanStep } from '@/lib/store'

export const runtime = 'nodejs'

const supportedKinds = ['CREATE', 'BUILD', 'DEPLOY', 'PUBLISH'] as const

const buildSteps = (content: string): PlanStep[] => {
  const text = content.toLowerCase()
  const steps: PlanStep[] = []
  const push = (kind: PlanStep['actionKind'], title: string) => {
    steps.push({
      id: `step-${Date.now()}-${steps.length}`,
      title,
      actionKind: kind,
      payload: title
    })
  }
  if (text.includes('create') || text.includes('new')) push('CREATE', 'Create project')
  if (text.includes('build')) push('BUILD', 'Build')
  if (text.includes('deploy')) push('DEPLOY', 'Deploy')
  if (text.includes('publish')) push('PUBLISH', 'Publish')
  return steps.slice(0, 7)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const content = typeof body?.content === 'string' ? body.content.trim() : ''
  if (!content) return NextResponse.json({ ok: false }, { status: 400 })

  const projects = await loadProjects()
  const active = findActiveProject(projects)
  const steps = buildSteps(content)
  const executable = steps.length >= 3 && steps.length <= 7
  const missingDependencies = active ? [] : ['active project']
  const plan = {
    id: `plan-${Date.now()}`,
    projectId: active?.id || null,
    title: content,
    createdAt: new Date().toISOString(),
    steps: steps.map((step, index) => ({
      ...step,
      dependsOn: index === 0 ? [] : [steps[index - 1].id]
    })),
    status: 'DRAFT'
  } as const

  return NextResponse.json({
    plan,
    validation: {
      executable: executable && missingDependencies.length === 0,
      missingDependencies,
      unknownActions: steps.length === 0 ? supportedKinds : []
    },
    note: 'Nothing is committed yet.'
  })
}
