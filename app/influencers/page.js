'use client';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import InfluencerCard from '@/components/InfluencerCard';
import AuthPopup from '@/components/AuthPopup';
import Header from '@/components/Header';

export default function InfluencerMarketplace() {
  const [filters, setFilters] = useState({
    search: '',
    niche: '',
    minFollowers: '',
    maxFollowers: '',
    platforms: '',
    followers_by_country: '',
  });
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState(null);

  const niches = ['Fashion', 'Tech', 'Fitness', 'Travel', 'Food', 'Lifestyle'];
  const platformsList = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn'];

  useEffect(() => {
    setUserType(localStorage.getItem('userType'));
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/influencer/influencer-filter', {
        params: filters,
      });
      setInfluencers(res.data.data);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchInfluencers();
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-64 px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 font-poppins">
          Discover Top Influencers
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Connect with influencers who align with your brand and goals.
        </p>
      </div>

      <div className="max-w-5xl mx-auto -mt-8 px-4">
        <form
          onSubmit={handleFilterSubmit}
          className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Name
            </label>
            <input
              type="text"
              name="search"
              placeholder="Enter name..."
              value={filters.search}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niche
            </label>
            <select
              name="niche"
              value={filters.niche}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Niche</option>
              {niches.map((niche) => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platforms
            </label>
            <input
              type="text"
              name="platforms"
              placeholder="e.g., Instagram, YouTube"
              value={filters.platforms}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Followers
            </label>
            <input
              type="number"
              name="minFollowers"
              placeholder="1000"
              value={filters.minFollowers}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Followers
            </label>
            <input
              type="number"
              name="maxFollowers"
              placeholder="100000"
              value={filters.maxFollowers}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : influencers.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No influencers found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {influencers.map((influencer) => (
              <InfluencerCard
                key={influencer.id}
                influencer={influencer}
                userType={userType}
                onConnect={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
      <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
    </div>
  );
}