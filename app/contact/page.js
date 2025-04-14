'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Users, Headphones, Instagram, Twitter, Linkedin, MapPin } from 'lucide-react';
import Header from '@/components/Header';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    setFormStatus('Thank you for reaching out! We’ll get back to you within 24–48 hours.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 5000); // Clear message after 5 seconds
  };

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
              Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We’d love to hear from you! Whether you’re a brand, an influencer, or just curious, we’re here to help.
            </p>
          </motion.div>

          {/* Contact Info Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
            >
              <Mail className="text-blue-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">General Inquiries</h3>
                <p className="text-gray-600">Have a question? Email us at:</p>
                <a
                  href="mailto:ops@appmontize.co.in"
                  className="text-blue-600 hover:underline"
                >
                  support@fluencerz.com
                </a>
                <p className="text-gray-600 mt-1">Response within 24–48 hours.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
            >
              <Users className="text-purple-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">Partnerships & Collaborations</h3>
                <p className="text-gray-600">Brands and agencies, reach out at:</p>
                <a
                  href="mailto:aditya@appmontize.co.in"
                  className="text-purple-600 hover:underline"
                >
                  aditya@appmontize.co.in
                </a>
                <p className="text-gray-600 mt-1">Let’s find your perfect influencer match.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
            >
              <Headphones className="text-pink-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">Technical Support</h3>
                <p className="text-gray-600">Facing platform issues? Contact:</p>
                <a
                  href="mailto:abhishek@appmontize.co.in"
                  className="text-pink-600 hover:underline"
                >
                  abhishek@appmontize.co.in
                </a>
                <p className="text-gray-600 mt-1">We’re ready to assist you.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Let’s Build Something Powerful Together
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="How can we help you?"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Send Message
              </motion.button>
              {formStatus && (
                <p className="text-center text-green-600 mt-4">{formStatus}</p>
              )}
            </form>
          </motion.div>

          {/* Social Media & Office */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Follow Us */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-4">
                Stay connected for updates, influencer spotlights, and success stories.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com/fluencerz_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Instagram size={20} /> @fluencerz_official
                </a>
                <a
                  href="https://twitter.com/fluencerzHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Twitter size={20} /> @fluencerzHQ
                </a>
                <a
                  href="https://linkedin.com/company/fluencerz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Linkedin size={20} /> Fluencerz
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Office</h3>
              <div className="flex items-start gap-2">
                <MapPin className="text-purple-600" size={20} />
                <p className="text-gray-600">
                  Appmontize Media Pvt. Ltd.<br />
                  6th Floor, Best Business Park,<br />
                  Pitampura, Netaji Subhash Place,<br />
                  India – 110034
                </p>
              </div>
            </div>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              We’re Just a Message Away
            </h2>
            <p className="max-w-3xl mx-auto">
              At Fluencerz, communication is key to building impactful collaborations. Reach out anytime — let’s create something amazing together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}