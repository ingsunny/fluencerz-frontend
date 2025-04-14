'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AuthPopup from './AuthPopup';
import { Play, Users, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('brand');

  const handleAuthOpen = (type, mode) => {
    setUserType(type);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between py-24 gap-12">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left space-y-6 max-w-xl w-full"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Connect Brands
            </span>{' '}
            with<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              Influencer Magic
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-700 font-medium">
            Empower your brand through seamless influencer collaborations. Craft impactful campaigns effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAuthOpen('brand', 'register')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto"
            >
              <Users size={18} />
              Join as Brand
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleAuthOpen('influencer', 'register')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto"
            >
              <Sparkles size={18} />
              Join as Influencer
            </motion.button>
          </div>
          {/* Watch How It Works Button (Commented Out) */}
          {/* <button
            onClick={() => alert('Watch demo video')}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors mt-4 mx-auto md:mx-0"
          >
            <Play size={24} />
            Watch How It Works
          </button> */}
        </motion.div>

        {/* Right Side Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative w-full max-w-md h-auto md:h-[500px] flex flex-col md:flex-row md:gap-0">
            <motion.div
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-xl shadow-xl overflow-hidden border-4 border-white mb-4 md:mb-0 md:absolute md:top-0 md:left-0"
              style={{ zIndex: 2 }}
            >
              <Image
                src="/brand.svg"
                alt="Brand Dashboard"
                width={400}
                height={250}
                className="object-cover w-full h-auto"
                priority
              />
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="relative bg-white rounded-xl shadow-xl overflow-hidden border-4 border-white md:absolute md:bottom-0 md:right-[-200px]"
              style={{ zIndex: 1 }}
            >
              <Image
                src="/influencer1.jpg"
                alt="Influencer Profile"
                width={350}
                height={220}
                className="object-cover w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Auth Popup */}
      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        initialUserType={userType}
      />
    </section>
  );
}