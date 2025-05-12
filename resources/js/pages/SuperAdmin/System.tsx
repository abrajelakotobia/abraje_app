import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AdminList from '@/components/AdminList';

import { PageProps } from '@/types';

interface DashboardPageProps extends PageProps {
  admins?: { id: number; name: string; email: string; phone: string; created_at: string }[]; // Define Admin type inline or import it
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'SuperAdmin',
    href: '/dashboard/superadmin', // Updated path
  },
];

export default function Dashboard() {
  const { props } = usePage<DashboardPageProps>();
  const { admins = [] } = props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard SuperAdmin" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-auto">
        {/* Stats section */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[1, 2, 3].map((_, index) => (
            <article
              key={`stats-card14{index}`}
              aria-label={`Statistic card ${index + 1}`}
              className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
            >
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </article>
          ))}
        </div>

        {/* Admins list section */}
        <section
          aria-label="Administrators list"
          className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border min-h-[40vh] p-4 bg-background"
        >
          <AdminList 
            admins={Array.isArray(admins) ? admins : []} 
            handleDelete={(id: number) => {
              console.log(`Delete admin with id: ${id}`);
              // Add your delete logic here
            }} 
          />
        </section>
      </div>
    </AppLayout>
  );
}
