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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const steps = [
    {
      icon: <Target className="text-blue-600" size={40} />,
      title: 'Create Brand Campaign',
      description: 'Define your campaign goals, budget, and target audience to attract the right influencers.',
    },
    {
      icon: <Users className="text-purple-600" size={40} />,
      title: 'Discover Influencers',
      description: 'Use our intelligent search tools to find verified influencers who align with your brand’s niche and values.',
    },
    {
      icon: <Mail className="text-pink-600" size={40} />,
      title: 'Send Request',
      description: 'Easily send collaboration requests to influencers and manage communication within the platform.',
    },
    {
      icon: <BarChart2 className="text-blue-600" size={40} />,
      title: 'Track Results',
      description: 'Monitor campaign performance with real-time analytics to measure reach, engagement, and ROI.',
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
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4 overflow-hidden">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

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
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span> Works
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, step-by-step guide to creating impactful influencer campaigns with Fluencerz.
            </p>
          </motion.div>

          {/* Step-by-Step Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQs Section */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 justify-center">
              <HelpCircle className="text-purple-600" size={24} />
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