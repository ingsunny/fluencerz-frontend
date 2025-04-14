'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import InfluencerCard from '@/components/InfluencerCard';
import AuthPopup from '@/components/AuthPopup';
import { Search, Filter, Loader2 } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4 overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Top Influencers</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with influencers who align with your brand’s vision and goals.
          </p>
        </motion.div>

        {/* Filter Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-12"
        >
          <form
            onSubmit={handleFilterSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="search"
                  placeholder="Enter name..."
                  value={filters.search}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niche
              </label>
              <select
                name="niche"
                value={filters.niche}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
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
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
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
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
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
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition"
              >
                <Filter size={20} />
                Apply Filters
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Influencer Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : influencers.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 text-lg"
            >
              No influencers found. Try adjusting your filters.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </motion.div>
      </div>

      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col items-center">
      <div className="h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="mt-6 h-10 w-full bg-gray-200 rounded-lg"></div>
    </div>
  );
}