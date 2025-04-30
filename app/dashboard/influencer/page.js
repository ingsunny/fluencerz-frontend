'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';

export default function InfluencerDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/influencer/overview', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.data);
      } catch (err) {
        console.error('Error fetching overview:', err);
      }
    };

    fetchOverview();
  }, []);

  if (!stats)
    return (
      <InfluencerLayout>
        <div className="flex items-center justify-center h-full w-full">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-gray-500 text-base sm:text-lg">Loading...</p>
        </div>
      </InfluencerLayout>
    );

  return (
    <InfluencerLayout>
      <div className="space-y-6 sm:space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            {/* <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Dashboard Overview
            </h2> */}
            <Link
              href="/"
              className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              aria-label="Visit FluencerZ main site"
            >
              Visit FluencerZ
            </Link>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userType');
              window.location.href = '/';
            }}
            className="text-base font-medium text-red-600 hover:text-red-800 hover:underline transition-colors duration-200 px-4 py-2 rounded-md hover:bg-red-50 w-fit"
            aria-label="Log out"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard label="Total Requests" value={stats.requests.total} />
          <StatCard label="Pending Requests" value={stats.requests.pending} />
          <StatCard label="Approved Requests" value={stats.requests.approved} />
          <StatCard label="Rejected Requests" value={stats.requests.rejected} />
          <StatCard label="Active Campaigns" value={stats.campaigns.in_progress} />
          <StatCard label="Completed Campaigns" value={stats.campaigns.completed} />
          <StatCard label="Avg. Rating" value={stats.rating} />
        </div>
      </div>
    </InfluencerLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full">
      <h4 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-2">
        {label}
      </h4>
      <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {value}
      </p>
    </div>
  );
}