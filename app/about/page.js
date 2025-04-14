'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Sparkles, Heart, Lightbulb, Eye } from 'lucide-react';
import Header from '@/components/Header';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
    <Header/>
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4 overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by Appmontize, we’re reshaping influencer marketing with authentic connections and innovative solutions.
            </p>
          </motion.div>

          {/* Who We Are */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
              <p className="text-gray-700">
                Fluencerz is an innovative influencer collaboration platform created by the forward-thinking team at Appmontize. Our dynamic and diverse group of marketing experts, technology enthusiasts, and creative strategists have joined forces with one core aim: to simplify and amplify influencer marketing. Leveraging our collective experience and insights, we’ve built a platform that removes barriers, enhances communication, and facilitates meaningful interactions between brands and influencers.
              </p>
            </div>
            <div className="md:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/team.jpg" // Replace with actual image
                  alt="Fluencerz Team"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700">
              Fluencerz was born out of a need we saw in the market—a streamlined, efficient way for brands and influencers to discover each other and collaborate seamlessly. Understanding the complexities and challenges of traditional influencer marketing, we set out to create a solution that would enable authentic relationships, measurable outcomes, and enhanced visibility. Our journey has been driven by continuous innovation, a commitment to excellence, and a deep understanding of the digital marketing landscape.
            </p>
          </motion.div>

          {/* What We Do */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">What We Do</h2>
              <p className="text-gray-700">
                Our platform bridges the gap between ambitious brands and influential voices, making influencer marketing accessible, efficient, and highly effective. We provide brands with advanced search tools, insightful analytics, and intuitive management solutions to ensure each influencer partnership is not only successful but optimized for the best possible results. For influencers, Fluencerz offers increased visibility, reliable collaboration opportunities, and streamlined processes to manage campaigns with ease and professionalism.
              </p>
            </div>
            <div className="md:w-1/2">
              <motion.div whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/platform.jpg" // Replace with actual image
                  alt="Fluencerz Platform"
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div variants={itemVariants} className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="max-w-3xl mx-auto">
              At Fluencerz, our mission is clear and impactful: to revolutionize the influencer marketing industry by empowering genuine, valuable partnerships. We aim to provide unmatched support, cutting-edge tools, and insightful analytics that allow brands to effortlessly identify and engage with influencers who genuinely connect with their audience, thus maximizing reach and impact.
            </p>
          </motion.div>

          {/* Our Core Values */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <Heart className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Authenticity</h3>
                  <p className="text-gray-600">Genuine connections built on trust and mutual respect.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <Lightbulb className="text-purple-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Innovation</h3>
                  <p className="text-gray-600">Pushing boundaries with cutting-edge solutions.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <Eye className="text-pink-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Transparency</h3>
                  <p className="text-gray-600">Clear communication and honest interactions.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <Users className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Collaboration</h3>
                  <p className="text-gray-600">Driving success through teamwork and partnership.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <Sparkles className="text-purple-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Customer Centricity</h3>
                  <p className="text-gray-600">Designed for ease of use and comprehensive support.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Why Choose Fluencerz */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Choose Fluencerz?</h2>
            <p className="text-gray-700">
              Choosing Fluencerz means embracing a smarter, more efficient approach to influencer marketing. Brands enjoy easy access to high-quality influencers perfectly aligned with their niche, goals, and values. Influencers benefit from clear, organized campaign management and valuable opportunities to grow their personal brand. Our comprehensive analytics offer invaluable insights to optimize and refine future campaigns, ensuring continuous growth and improvement.
            </p>
          </motion.div>

          {/* Our Commitment */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Commitment to You</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At Fluencerz, we are committed to providing an exceptional user experience, driven by advanced technology, personalized support, and ongoing innovation. We continuously listen to user feedback, adapting and enhancing our platform to better meet the evolving needs of our vibrant community of brands and influencers.
            </p>
          </motion.div>

          {/* Join the Community */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Fluencerz Community</h2>
            <p className="max-w-3xl mx-auto mb-6">
              Whether you’re a brand aiming to elevate your visibility or an influencer looking to expand your impact, Fluencerz is the perfect place to foster meaningful collaborations. Join us today and become part of a thriving community dedicated to authentic connections and remarkable results.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}