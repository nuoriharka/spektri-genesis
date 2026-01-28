import dynamic from 'next/dynamic'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'

const NewAgentView = dynamic(() => import('@/components/dashboard/new-agent-view'), {
  ssr: false,
  loading: () => (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Luo uusi agentti" description="Valitse malli tai aloita tyhjästä" />
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </DashboardLayout>
  ),
})

export default function NewAgentPage() {
  return <NewAgentView />
}
