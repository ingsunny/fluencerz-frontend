'use client';
import { useEffect, useState } from 'react';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandDashboardPage() {
  const [stats, setStats] = useState(null);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStats = async () => {
      const res = await api.get('/brand/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    };

    const fetchInfluencers = async () => {
      const res = await api.get('/brand/influencers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInfluencers(res.data);
    };

    fetchStats();
    fetchInfluencers();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <BrandLayout>
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card label="Total Requests" value={stats.requests.total} />
        <Card label="Approved" value={stats.requests.approved} />
        <Card label="Pending" value={stats.requests.pending} />
        <Card label="Rejected" value={stats.requests.rejected} />
        <Card label="Ongoing Campaigns" value={stats.campaigns.in_progress} />
        <Card label="Completed Campaigns" value={stats.campaigns.completed} />
      </div>

      {/* 🔓 Logout */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          window.location.href = '/';
        }}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>

      {/* 🎯 Influencer Showcase */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Explore Influencers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <div key={influencer.id} className="bg-white p-4 rounded shadow">
              <img
                src={
                  influencer.profile_image
                    ? `https://api.fluencerz.com${influencer.profile_image}`
                    : '/default-avatar.png'
                }
                alt={influencer.full_name}
                className="h-24 w-24 rounded-full object-cover mx-auto mb-3 border"
              />
              <h3 className="text-lg font-semibold">{influencer.full_name}</h3>
              <p className="text-sm text-gray-500">Niche: {influencer.niche}</p>
              <p className="text-sm text-gray-500">Total Followers: {influencer.followers_count}</p>

              {/* 🌐 Platform List */}
              {influencer.social_platforms && (() => {
                try {
                  const platforms = JSON.parse(influencer.social_platforms);
                  return (
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      {platforms.map((platform, index) => (
                        <p key={index}>
                          {platform.platform}: <strong>{platform.followers}</strong> followers
                        </p>
                      ))}
                    </div>
                  );
                } catch (e) {
                  return <p className="text-xs text-red-500">Invalid platform data</p>;
                }
              })()}

              <button
                onClick={() => sendRequest(influencer.id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </BrandLayout>
  );

  async function sendRequest(influencerId) {
    const token = localStorage.getItem('token');
    const message = prompt("Enter your message to the influencer:");
    if (!message) return;

    try {
      await api.post(
        '/collab/send',
        {
          influencer_id: influencerId,
          request_message: message
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Request sent successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to send request.');
    }
  }
}

function Card({ label, value }) {
  return (
    <div className="bg-white p-4 shadow rounded text-center">
      <h4 className="text-gray-500 text-sm">{label}</h4>
      <p className="text-2xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
