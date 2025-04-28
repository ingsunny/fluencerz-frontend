'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  { number: '15M+', description: 'Content Reach' },
  { number: '70,000+', description: 'Influencer Community' },
  { number: '12+', description: 'Industries Covered' },
  { number: '50+', description: 'YouTube Live Sessions' },
  { number: '20+', description: 'Languages Supported' },
  { number: '7x', description: 'Return On Investment' },
];

export default function GrowthInNumbers() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Gradient Circles (Background Decorations) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-40 blur-3xl -translate-x-1/2 translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-40 blur-3xl translate-x-1/2 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
        >
          Growth In Numbers
        </motion.h2>
        <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-pink-600 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 flex flex-col items-center transform hover:-translate-y-2 hover:shadow-2xl hover:rotate-2 transition-all duration-300"
            >
              {/* SVG Border */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                <rect x="5" y="5" width="290" height="190" rx="15" fill="none" stroke="url(#statGradient)" strokeWidth="5" />
                <defs>
                  <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#d81b60' }} />
                    <stop offset="100%" style={{ stopColor: '#ff61a6' }} />
                  </linearGradient>
                </defs>
              </svg>
              <p className="text-4xl sm:text-5xl font-bold text-purple-700 mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-lg text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12"
        >
          <Link
            href="/auth"
            className="inline-block px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
          >
            Get Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}