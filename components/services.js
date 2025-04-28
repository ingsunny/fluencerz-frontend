import React from 'react';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            Fastest-growing Influencer Marketing agency in India, connecting brands with relevant influencers through our AI-driven Data.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* YouTube Influencer Marketing */}
          <div className="text-center bg-white bg-opacity-90 rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:rotate-2 animate-slide-up">
            <div className="relative inline-block transform hover:scale-105 transition-transform duration-300">
              {/* SVG Border */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="none">
                <rect x="5" y="5" width="290" height="290" rx="15" fill="none" stroke="url(#youtubeGradient)" strokeWidth="5" />
                <defs>
                  <linearGradient id="youtubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff0000' }} />
                    <stop offset="100%" style={{ stopColor: '#ff6f61' }} />
                  </linearGradient>
                </defs>
              </svg>
              {/* Image with 3D Effect */}
              <div className="relative w-[300px] h-[300px] transform hover:rotate-3 hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/youtube1.png"
                  alt="YouTube Influencer Marketing"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              YouTube Influencer Marketing
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Want top industry YouTubers to talk about your product? Let’s discuss on how we can make it happen.
            </p>
          </div>

          {/* Telegram Influencer Marketing */}
          <div className="text-center bg-white bg-opacity-90 rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:rotate-2 animate-slide-up delay-200">
            <div className="relative inline-block transform hover:scale-105 transition-transform duration-300">
              {/* SVG Border */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="none">
                <rect x="5" y="5" width="290" height="290" rx="15" fill="none" stroke="url(#telegramGradient)" strokeWidth="5" />
                <defs>
                  <linearGradient id="telegramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0088cc' }} />
                    <stop offset="100%" style={{ stopColor: '#61c0ff' }} />
                  </linearGradient>
                </defs>
              </svg>
              {/* Image with 3D Effect */}
              <div className="relative w-[300px] h-[300px] transform hover:rotate-3 hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/telegram.png"
                  alt="Telegram Influencer Marketing"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Telegram Influencer Marketing
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Telegram groups bring together people with similar interests. Learn how to get the most out of it in order to fulfill your brand’s goals.
            </p>
          </div>

          {/* Instagram Influencer Marketing */}
          <div className="text-center bg-white bg-opacity-90 rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:rotate-2 animate-slide-up delay-400">
            <div className="relative inline-block transform hover:scale-105 transition-transform duration-300">
              {/* SVG Border */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="none">
                <rect x="5" y="5" width="290" height="290" rx="15" fill="none" stroke="url(#instagramGradient)" strokeWidth="5" />
                <defs>
                  <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#d81b60' }} />
                    <stop offset="100%" style={{ stopColor: '#ff61a6' }} />
                  </linearGradient>
                </defs>
              </svg>
              {/* Image with 3D Effect */}
              <div className="relative w-[300px] h-[300px] transform hover:rotate-3 hover:shadow-2xl transition-all duration-300">
                <Image
                  src="/content.png"
                  alt="Instagram Influencer Marketing"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 bg-gradient-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
              Instagram Influencer Marketing
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Feature your items in viral Instagram reels, feeds, and stories of trending Instagram influencers to increase brand awareness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animation Keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
  .animate-slide-up {
    animation: slideUp 0.8s ease-out;
  }
  .delay-200 {
    animation-delay: 0.2s;
  }
  .delay-400 {
    animation-delay: 0.4s;
  }
`;

export default Services;