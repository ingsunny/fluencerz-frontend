'use client';

import { motion } from 'framer-motion';
import { Shield, Info, Lock, Users, ExternalLink, Mail } from 'lucide-react';
import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
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
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Privacy Policy – <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Effective Date: [14/04/2025]
            </p>
            <p className="mt-2 text-gray-600">
              At Fluencerz, your privacy is our top priority. This Privacy Policy outlines how we collect, use, store, and protect your personal data.
            </p>
          </motion.div>

          {/* Section 1: Information We Collect */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="text-blue-600" size={24} />
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect the following types of information:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">a. Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Name, email address, phone number, profile image</li>
                  <li>Brand or influencer profile details</li>
                  <li>Payment information (for paid services)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">b. Usage Data</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>IP address, browser type, operating system</li>
                  <li>Pages visited, time spent on site, interactions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">c. Cookies & Tracking Technologies</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Session cookies, preferences, and analytics tools</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 2: How We Use Your Information */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-purple-600" size={24} />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use your data to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Provide and improve our services</li>
              <li>Match brands with suitable influencers</li>
              <li>Share influencer profile information with interested brands for potential collaborations</li>
              <li>Communicate updates and promotional offers</li>
              <li>Ensure platform security and fraud prevention</li>
              <li>Fulfill legal obligations and respond to requests</li>
            </ul>
          </motion.div>

          {/* Section 3: Sharing of Information */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ExternalLink className="text-pink-600" size={24} />
              3. Sharing of Information
            </h2>
            <p className="text-gray-700 mb-4">
              We never sell your personal data. We only share information:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>With trusted third-party service providers (hosting, analytics, payment processing)</li>
              <li>With other users when a collaboration request is initiated or when a brand searches for influencers based on campaign requirements</li>
              <li>When required by law or to protect rights and safety</li>
            </ul>
            <p className="text-gray-600 italic bg-gray-100 p-4 rounded-lg">
              <strong>Note:</strong> Influencer profiles (including name, bio, social metrics, and contact email if opted-in) may be shared with brands during the discovery or collaboration process. Influencers have control over what information is visible to brands.
            </p>
          </motion.div>

          {/* Section 4: Data Security */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="text-blue-600" size={24} />
              4. Data Security
            </h2>
            <p className="text-gray-700">
              We implement advanced security measures, including encryption, access control, and secure hosting, to protect your data from unauthorized access, alteration, or disclosure.
            </p>
          </motion.div>

          {/* Section 5: Your Rights */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-purple-600" size={24} />
              5. Your Rights
            </h2>
            <p className="text-gray-700 mb-2">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of promotional communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700">
              To exercise your rights, please email: <a href="mailto:privacy@fluencerz.com" className="text-blue-600 hover:underline">privacy@fluencerz.com</a>
            </p>
          </motion.div>

          {/* Section 6: Third-Party Links */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ExternalLink className="text-pink-600" size={24} />
              6. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our platform may contain links to external websites. We are not responsible for the privacy practices or content of third-party sites.
            </p>
          </motion.div>

          {/* Section 7: Children's Privacy */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" size={24} />
              7. Children's Privacy
            </h2>
            <p className="text-gray-700">
              Fluencerz is not intended for use by individuals under the age of 13. We do not knowingly collect data from children.
            </p>
          </motion.div>

          {/* Section 8: Changes to This Policy */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="text-purple-600" size={24} />
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform or sending an email.
            </p>
          </motion.div>

          {/* Section 9: Contact Us */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-pink-600" size={24} />
              9. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions or concerns regarding this policy or your data, please reach out to us at:
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Email:</strong> <a href="mailto:privacy@fluencerz.com" className="text-blue-600 hover:underline">privacy@fluencerz.com</a><br />
              <strong>Address:</strong> Appmontize Media Pvt. Ltd., Best Business Park, Pitampura, Netaji Subhash Place, New Delhi 110034, India.
            </p>
          </motion.div>

          {/* Consent Statement */}
          <motion.div variants={itemVariants} className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <p className="text-lg">
              By using Fluencerz, you consent to the practices described in this Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}