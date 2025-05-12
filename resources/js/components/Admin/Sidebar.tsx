import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'grid' },
    { href: '/admin/users', label: 'Utilisateurs', icon: 'users' },
    { href: '/admin/settings', label: 'Paramètres', icon: 'settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
              route().current(item.href) && 'bg-gray-100 dark:bg-gray-700'
            )}
          >
            <span className="mr-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
