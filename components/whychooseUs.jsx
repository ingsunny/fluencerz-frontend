'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Brain, BarChart2, ShieldCheck, Globe } from 'lucide-react';

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const reasons = [
    {
      icon: <CheckCircle className="text-blue-600" size={24} />,
      title: 'Verified Influencers',
      description: 'All influencers are manually vetted for authenticity, ensuring genuine engagement.',
    },
    {
      icon: <Brain className="text-purple-600" size={24} />,
      title: 'Smart Matchmaking',
      description: 'AI-driven recommendations connect you with influencers matching your niche and audience.',
    },
    {
      icon: <BarChart2 className="text-pink-600" size={24} />,
      title: 'Performance Insights',
      description: 'Track real-time metrics like engagement, reach, and ROI with ease.',
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: 'Secure Collaborations',
      description: 'Safe, transparent agreements protect both brands and influencers.',
    },
    {
      icon: <Globe className="text-purple-600" size={24} />,
      title: 'Global Reach',
      description: 'Access influencers worldwide to amplify your brand across diverse markets.',
    },
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the power of seamless influencer marketing with our trusted platform.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Illustration */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
          >
            <Image
              src="/why-choose-us.jpg" // Replace with your illustration
              alt="Why Choose Fluencerz Illustration"
              width={700}
              height={400}
              className="object-contain rounded-2xl"
              priority
            />
          </motion.div>

          {/* Right Cards */}
          <motion.div
            variants={containerVariants}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{reason.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}