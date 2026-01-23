import dynamic from 'next/dynamic'
import { DashboardLayout } from '@/components/dashboard-layout'
import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'

const SettingsView = dynamic(() => import('@/components/dashboard/settings-view'), {
  ssr: false,
  loading: () => (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Asetukset" description="Sovelluksen asetukset" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </DashboardLayout>
  ),
})

export default function SettingsPage() {
  return <SettingsView />
}
