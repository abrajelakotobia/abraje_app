import {  usePage } from '@inertiajs/react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { BookOpen, Shield, Settings, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import type { PageProps } from '@/types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Products',
    href: '/posts',
    icon: LayoutGrid,
  },
  {
    title: 'My Booking',
    href: '/posts/create',
    icon: LayoutGrid,
  },
  {
    title: 'My Contact',
    href: '/contacts/create',
    icon: LayoutGrid,
  },
];

const adminNavItems: NavItem[] = [
  {
    title: 'Admin Panel',
    href: '/admin/users',
    icon: Shield,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

const superAdminNavItems: NavItem[] = [
  {
    title: 'System Controls',
    href: '/superadmin/system',
    icon: LayoutGrid,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Old Contacts',
    href: '/contacts',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { auth } = usePage<PageProps>().props;
  const userRole = auth?.user?.role ?? 'user';

  const getRoleBasedNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'superadmin':
        return [...mainNavItems, ...adminNavItems, ...superAdminNavItems];
      case 'admin':
        return [...mainNavItems, ...adminNavItems];
      default:
        return [...mainNavItems];
    }
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Utilisation directe de Link sans imbrication avec AppLogo */}
            <SidebarMenuButton
              size="lg"
              asChild
              onClick={() => window.location.href = '/'} // Navigation alternative
            >
              <div className="cursor-pointer">
                <AppLogo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={getRoleBasedNavItems()} />
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <NavFooter items={footerNavItems} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
