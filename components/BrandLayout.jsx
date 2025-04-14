'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRoleGuard } from '@/middleware/useRoleGuard';

export default function BrandLayout({ children }) {
  useRoleGuard('brand');

  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard/brand' },
    { label: 'Requests', href: '/dashboard/brand/requests' },
    { label: 'Influencers', href: '/dashboard/brand/influencers' },
    {label: 'Campaigns', href: '/dashboard/brand/campaigns'},
    {lable: 'Ratings', href: '/dashboard/brand/ratings'},
    { label: 'Settings', href: '/dashboard/brand/settings' }
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 font-bold text-blue-600">Brand Panel</div>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded ${
                pathname === item.href ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
