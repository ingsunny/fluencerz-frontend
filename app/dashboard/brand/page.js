'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';
import InfluencerMarketplace from '@/components/InfluencerMarketplace';

export default function BrandDashboardPage() {
  const [stats, setStats] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStats = async () => {
      try {
        const res = await api.get('/brand/overview', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard stats. Please try again.');
      }
    };

    const fetchInfluencers = async () => {
      try {
        const res = await api.get('/brand/influencers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfluencers(res.data);
      } catch (err) {
        console.error('Error fetching influencers:', err);
        setError('Failed to load influencers. Please try again.');
      }
    };

    fetchStats();
    fetchInfluencers();
  }, []);

  if (error) {
    return (
      <BrandLayout>
        <div className="flex flex-col items-center justify-center h-full w-full gap-4">
          <p className="text-red-600 text-base sm:text-lg">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchStats();
              fetchInfluencers();
            }}
            className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </BrandLayout>
    );
  }

  if (!stats || !influencers.length) {
    return (
      <BrandLayout>
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
      </BrandLayout>
    );
  }

  return (
    <BrandLayout>
      <div className="space-y-6 sm:space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Dashboard Overview
            </h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <Card label="Total Requests" value={stats.requests.total} />
          <Card label="Approved Requests" value={stats.requests.approved} />
          <Card label="Pending Requests" value={stats.requests.pending} />
          <Card label="Rejected Requests" value={stats.requests.rejected} />
          <Card label="Ongoing Campaigns" value={stats.campaigns.in_progress} />
          <Card label="Completed Campaigns" value={stats.campaigns.completed} />
        </div>

        {/* Influencer Showcase */}
        <InfluencerMarketplace/>
        {/* <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Explore Influencers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {influencers.map((influencer) => (
              <div
                key={influencer.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={
                    influencer.profile_image
                      ? `https://api.fluencerz.com${influencer.profile_image}`
                      : '/default-avatar.png'
                  }
                  alt={influencer.full_name}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover mx-auto mb-3 border border-gray-200"
                />
                <h3 className="text-base sm:text-lg font-semibold text-center">
                  {influencer.full_name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Niche: {influencer.niche}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Total Followers: {influencer.followers_count.toLocaleString()}
                </p>

               
                {influencer.social_platforms && (
                  <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">
                    {(() => {
                      try {
                        const platforms = JSON.parse(influencer.social_platforms);
                        return platforms.map((platform, index) => (
                          <p key={index} className="text-center">
                            {platform.platform}: <strong>{platform.followers.toLocaleString()}</strong>{' '}
                            followers
                          </p>
                        ));
                      } catch (e) {
                        return (
                          <p className="text-xs text-red-500 text-center">Invalid platform data</p>
                        );
                      }
                    })()}
                  </div>
                )}

                <button
                  onClick={() => sendRequest(influencer.id)}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
                >
                  Send Request
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </BrandLayout>
  );
};
//   async function sendRequest(influencerId) {
//     const token = localStorage.getItem('token');
//     const message = prompt('Enter your message to the influencer:');
//     if (!message) return;

//     try {
//       await api.post(
//         '/collab/send',
//         {
//           influencer_id: influencerId,
//           request_message: message,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert('Request sent successfully!');
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request.');
//     }
//   }
// }

function Card({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h4 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-2">
        {label}
      </h4>
      <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {value}
      </p>
    </div>
  );
}