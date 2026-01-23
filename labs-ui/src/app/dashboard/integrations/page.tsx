import dynamic from 'next/dynamic'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'

const IntegrationsView = dynamic(() => import('@/components/dashboard/integrations-view'), {
  ssr: false,
  loading: () => (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Integraatiot" description="Yhdistä ulkoiset palvelut" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    </DashboardLayout>
  ),
})

export default function IntegrationsPage() {
  return <IntegrationsView />
}

