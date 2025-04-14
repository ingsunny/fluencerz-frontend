'use client';
import { useState } from 'react';
import { useRoleGuard } from '@/middleware/useRoleGuard';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BriefcaseIcon,
  BellIcon,
  HeartIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function InfluencerLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useRoleGuard('influencer');
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard/influencer', icon: HomeIcon },
    { label: 'Campaigns', href: '/dashboard/influencer/campaigns', icon: BriefcaseIcon },
    { label: 'Notifications', href: '/dashboard/influencer/notifications', icon: BellIcon },
    { label: 'Last Collab', href: '/dashboard/influencer/last-collab', icon: HeartIcon },
    { label: 'Settings', href: '/dashboard/influencer/settings', icon: CogIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-600 transition-colors duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-lg rounded-r-2xl sticky top-0 h-screen overflow-y-auto transition-transform duration-300 lg:translate-x-0 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`}
      >
        {/* Logo/Title */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            I
          </div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Influencer Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (mobile)
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 px-6">
          <p className="text-sm text-gray-500">© 2025 Influencer Panel</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
}