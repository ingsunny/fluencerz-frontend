'use client';

import { motion } from 'framer-motion';
import { Target, Users, Mail, BarChart2, HelpCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.6 } },
  };

  const steps = [
    {
      icon: <Target className="text-purple-600" size={40} />,
      title: 'Create Brand Campaign',
      description: 'Define your campaign goals, budget, and target audience to attract the right influencers.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: <Users className="text-red-600" size={40} />,
      title: 'Discover Influencers',
      description: 'Use our intelligent search tools to find verified influencers who align with your brand’s niche and values.',
      gradient: 'from-red-600 to-red-100',
    },
    {
      icon: <Mail className="text-blue-500" size={40} />,
      title: 'Send Request',
      description: 'Easily send collaboration requests to influencers and manage communication within the platform.',
      gradient: 'from-blue-500 to-blue-200',
    },
    {
      icon: <BarChart2 className="text-gray-800" size={40} />,
      title: 'Track Results',
      description: 'Monitor campaign performance with real-time analytics to measure reach, engagement, and ROI.',
      gradient: ['from-purple-600 to-pink-600', 'from-red-600 to-red-100', 'from-blue-500 to-blue-200'],
    },
  ];

  const faqs = [
    {
      question: 'Is it free to register?',
      answer: 'Yes, registering on Fluencerz is completely free for both brands and influencers. You only pay for premium features or specific campaign tools, if applicable.',
    },
    {
      question: 'How are collaborations tracked?',
      answer: 'Fluencerz provides a dashboard where you can monitor all collaboration activities, including requests sent, responses received, deliverables submitted, and campaign performance metrics like engagement and reach.',
    },
    {
      question: 'How to withdraw earnings?',
      answer: 'Influencers can withdraw earnings through secure payment methods like bank transfers or digital wallets, configured in your account settings. Payments are processed after campaign deliverables are approved by the brand.',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white py-16 px-4 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-red-600 to-blue-500">Fluencerz</span> Works
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, step-by-step guide to creating impactful influencer campaigns with Fluencerz.
            </p>
          </motion.div>

          {/* Step-by-Step Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateZ: 360, transition: { duration: 0.8, ease: 'easeInOut' } }}
                className={`bg-gradient-to-br ${Array.isArray(step.gradient) ? step.gradient[Math.floor(Date.now() / 3000) % step.gradient.length] : step.gradient} p-8 rounded-xl shadow-2xl flex flex-col items-center text-center`}
              >
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    className="bg-white/90 rounded-full p-4 shadow-inner"
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-shadow-sm" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>
                  {step.title}
                </h3>
                <p className="text-white leading-relaxed" style={{ textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.1)' }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQs Section */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 justify-center">
              <HelpCircle className="text-blue-500" size={24} />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}