'use client';
import { useEffect, useState } from 'react';
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
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </InfluencerLayout>
    );

  return (
    <InfluencerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Dashboard Overview
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userType');
              window.location.href = '/';
            }}
            className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">{label}</h4>
      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {value}
      </p>
    </div>
  );
}