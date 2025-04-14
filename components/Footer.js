'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate newsletter subscription (replace with actual API call)
    setFormStatus('Thank you for subscribing!');
    setEmail('');
    setTimeout(() => setFormStatus(''), 5000);
  };

  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms-of-service' },
  ];

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: 'https://www.instagram.com/fluencerz_official/',
      label: 'Instagram',
    },
    {
      icon: <Twitter size={20} />,
      href: 'https://x.com/fluencerzHQ',
      label: 'Twitter',
    },
    {
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/company/fluencerz',
      label: 'LinkedIn',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Fluencerz</h3>
          <p className="text-gray-200">
            Connecting brands and influencers for impactful collaborations. Powered by Appmontize Media Pvt. Ltd.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-gray-200 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Stay Connected</h4>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="p-2 rounded-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-white border-sky-100"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="p-2 bg-white text-purple-600 rounded-lg flex items-center"
            >
              <Mail size={20} />
            </motion.button>
          </form>
          {formStatus && <p className="text-green-200">{formStatus}</p>}
          <div className="flex gap-4 mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-gray-200">
        <p>&copy; {new Date().getFullYear()} Appmontize Media Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}