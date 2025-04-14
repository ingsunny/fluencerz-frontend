'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AuthPopup from './AuthPopup';
import { MessageCircle, Loader2 } from 'lucide-react';
import api from '@/utils/api';

export default function InfluencerCard({ influencer, userType, onConnect }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      onConnect();
      return;
    }

    if (userType !== 'brand') {
      setError('Please create a brand account to connect as a brand.');
      setAuthMode('register');
      setIsAuthOpen(true);
      return;
    }

    const message = prompt('Enter your message for the influencer:');
    if (!message) return;

    setIsSending(true);
    setError('');

    try {
      await api.post(
        '/collab/send',
        { influencer_id: influencer.id, request_message: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Collaboration request sent successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex flex-col items-center"
    >
      <div className="relative mb-4">
        <Image
          src={
            influencer.profile_image
              ? `https://api.fluencerz.com${influencer.profile_image}`
              : '/default-avatar.png'
          }
          alt={influencer.full_name}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full object-cover border-4 border-blue-100"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 text-center">
        {influencer.full_name}
      </h3>
      <p className="text-sm text-gray-600 capitalize text-center">
        {influencer.niche}
      </p>
      <p className="text-sm text-gray-600 text-center">
        {influencer.followers_count.toLocaleString()} Followers
      </p>

      {influencer.social_platforms && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {JSON.parse(influencer.social_platforms).map((p, i) => (
            <span
              key={i}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {p.platform}: {parseInt(p.followers).toLocaleString()}
            </span>
          ))}
        </div>
      )}

      {influencer.followers_by_country && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {JSON.parse(influencer.followers_by_country).map((c, i) => (
            <span
              key={i}
              className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {c.country}: {c.percentage}%
            </span>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm text-center mt-3">{error}</p>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConnect}
        disabled={isSending}
        className={`mt-6 w-full py-2.5 rounded-full text-white flex items-center justify-center gap-2 transition-colors ${
          isSending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isSending ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <MessageCircle size={20} />
        )}
        {isSending ? 'Sending...' : 'Connect'}
      </motion.button>

      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setError('');
        }}
        initialMode={authMode}
        initialUserType="brand"
      />
    </motion.div>
  );
}