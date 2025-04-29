"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AuthPopup from './AuthPopup';
import { Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('brand');
  const [displayText, setDisplayText] = useState('');
  const fullText = "Influencer Magic";
  const [index, setIndex] = useState(0);

  const handleAuthOpen = (type, mode) => {
    setUserType(type);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      }, 150); // Adjust speed of typing here
      return () => clearTimeout(timer);
    }
  }, [index, fullText]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full flex flex-col items-center justify-center py-24 mt-12">
        {/* Centered Text Content with Gradient Border */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center space-y-6 w-full p-8 rounded-3xl"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-white w-full">
            <span className="bg-clip-text bg-gradient-to-r">
              Connect Brands
            </span>{' '}
            with<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 inline-block">
              {displayText}
              <span className="animate-blink text-white ">_</span>
            </span>
          </h1>
          <p className="text-base md:text-xl text-white font-medium">
            Empower your brand through seamless influencer collaborations. Craft impactful campaigns effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto"
            >
              <Users size={18} />
              <Link href="/auth">
                Join as Brand
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base w-full sm:w-auto"
            >
              <Sparkles size={18} />
              <Link href="/auth">
                Join as Influencer
              </Link>
            </motion.button>
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