'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const cardVariants = {
    hidden: { x: '50vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { x: '-50vw', opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative min-h-screen py-16 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0088cc, #ff0000, #833ab4)' }}>
      {/* Minimal Gradient Shimmer Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ background: 'linear-gradient(135deg, rgba(0, 136, 204, 0.2), rgba(255, 0, 0, 0.2), rgba(131, 58, 180, 0.2))' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Influencer Nexus
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
            Connect with influencers in a sophisticated space.
          </p>
        </motion.div>

        {/* Filter Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-6 rounded-xl shadow-lg mb-12 border-2"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#e1306c' }} // Instagram pink
        >
          <form
            onSubmit={handleFilterSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-white">
                Search by Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e1306c]" size={20} />
                <input
                  type="text"
                  name="search"
                  placeholder="Enter name..."
                  value={filters.search}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:ring-2"
                  style={{
                    backgroundColor: '#2c2c2c',
                    borderColor: '#1877f2', // Facebook blue
                    color: '#ffffff',
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Niche
              </label>
              <select
                name="niche"
                value={filters.niche}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderColor: '#1877f2', // Facebook blue
                  color: '#ffffff',
                }}
              >
                <option value="">Select Niche</option>
                {niches.map((niche) => (
                  <option key={niche} value={niche} style={{ color: '#000000' }}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Platforms
              </label>
              <input
                type="text"
                name="platforms"
                placeholder="e.g., Instagram, YouTube"
                value={filters.platforms}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderColor: '#1877f2', // Facebook blue
                  color: '#ffffff',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Min Followers
              </label>
              <input
                type="number"
                name="minFollowers"
                placeholder="1000"
                value={filters.minFollowers}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderColor: '#1877f2', // Facebook blue
                  color: '#ffffff',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Max Followers
              </label>
              <input
                type="number"
                name="maxFollowers"
                placeholder="100000"
                value={filters.maxFollowers}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderColor: '#1877f2', // Facebook blue
                  color: '#ffffff',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Followers by Country
              </label>
              <input
                type="text"
                name="followers_by_country"
                placeholder="e.g., USA, India"
                value={filters.followers_by_country}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring-2"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderColor: '#1877f2', // Facebook blue
                  color: '#ffffff',
                }}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-center items-end">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(8, 136, 204, 0.6)' }} // Telegram blue shadow
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-1/2 py-2.5 rounded-lg flex items-center justify-center gap-2 text-white transition-all"
                style={{
                  background: 'linear-gradient(90deg, #0088cc, #ff0000, #833ab4, #1877f2)', // Telegram, YouTube, Instagram, Facebook
                }}
              >
                <Filter size={20} />
                Apply Filters
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Influencer Grid */}
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : influencers.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-lg text-white"
            >
              No influencers found. Try adjusting your filters.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencers.map((influencer) => (
                <motion.div
                  key={influencer.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-xl shadow-md p-4 border-2 transition-colors"
                  style={{
                    borderColor: '#1877f2', // Facebook blue
                    backgroundColor: '#2c2c2c',
                  }}
                >
                  <InfluencerCard
                    influencer={influencer}
                    userType={userType}
                    onConnect={() => {
                      setAuthMode('login');
                      setIsAuthOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
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
    <div
      className="rounded-xl p-4 shadow-md animate-pulse border-2"
      style={{
        backgroundColor: '#2c2c2c',
        borderColor: '#833ab4', // Instagram purple
      }}
    >
      <div className="h-32 w-32 mx-auto rounded-full bg-gray-700 mb-4"></div>
      <div className="h-5 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      <div className="mt-6 h-10 w-full bg-gray-700 rounded-lg mx-auto"></div>
    </div>
  );
}