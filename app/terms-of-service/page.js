'use client';

import { motion } from 'framer-motion';
import { FileText, UserCheck, Key, Globe, DollarSign, Copyright, Ban, Shield, Gavel, Mail, Users } from 'lucide-react';
import Header from '@/components/Header';

export default function TermsAndConditionsPage() {
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
              Terms & Conditions – <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Fluencerz</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Effective Date: [14/04/2025]
            </p>
            <p className="mt-2 text-gray-600">
              Welcome to Fluencerz, operated by Appmontize Media Pvt. Ltd. These Terms govern your access to and use of our platform and services.
            </p>
          </motion.div>

          {/* Section 1: Acceptance of Terms */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing or using Fluencerz, you confirm that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>. If you do not agree, you may not use the platform.
            </p>
          </motion.div>

          {/* Section 2: Eligibility */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <UserCheck className="text-purple-600" size={24} />
              2. Eligibility
            </h2>
            <p className="text-gray-700">
              You must be at least 18 years old to use the platform. By registering, you represent that you meet the age requirement and have the authority to enter into these Terms.
            </p>
          </motion.div>

          {/* Section 3: Account Registration */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Key className="text-pink-600" size={24} />
              3. Account Registration
            </h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and current information when registering.
            </p>
          </motion.div>

          {/* Section 4: Platform Use */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe className="text-blue-600" size={24} />
              4. Platform Use
            </h2>
            <p className="text-gray-700 mb-2">
              You agree to use Fluencerz only for lawful purposes. You may not:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Impersonate another person or entity</li>
              <li>Violate any applicable law or regulation</li>
              <li>Use the platform for spamming, harassment, or abusive behavior</li>
              <li>Upload content that is offensive, harmful, or infringes on intellectual property rights</li>
            </ul>
          </motion.div>

          {/* Section 5: Brand & Influencer Interactions */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-purple-600" size={24} />
              5. Brand & Influencer Interactions
            </h2>
            <p className="text-gray-700">
              Fluencerz facilitates connections between brands and influencers. We are not responsible for the outcomes of collaborations, payments, or fulfillment of any agreements made independently between users. However, we provide support to ensure a smooth experience.
            </p>
          </motion.div>

          {/* Section 6: Data Sharing */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-pink-600" size={24} />
              6. Data Sharing
            </h2>
            <p className="text-gray-700">
              By using Fluencerz, influencers consent to having their public profiles, including contact information (if opted-in), shared with brands for the purpose of collaboration. Brands must not misuse or resell influencer data.
            </p>
          </motion.div>

          {/* Section 7: Payments & Fees */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="text-blue-600" size={24} />
              7. Payments & Fees
            </h2>
            <p className="text-gray-700">
              Some features may require payment. All payments are securely processed. Refunds, if applicable, are subject to our refund policy. Non-payment may result in restricted access or termination of services.
            </p>
          </motion.div>

          {/* Section 8: Intellectual Property */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Copyright className="text-purple-600" size={24} />
              8. Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content on Fluencerz, including logos, design, and platform code, is the property of Appmontize Media Pvt. Ltd. Users retain rights to their uploaded content but grant us a license to display it on the platform for promotional and operational purposes.
            </p>
          </motion.div>

          {/* Section 9: Suspension & Termination */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Ban className="text-pink-600" size={24} />
              9. Suspension & Termination
            </h2>
            <p className="text-gray-700">
              We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or misuse the platform. You may also delete your account at any time.
            </p>
          </motion.div>

          {/* Section 10: Limitation of Liability */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" size={24} />
              10. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Fluencerz is provided on an "as-is" basis. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </motion.div>

          {/* Section 11: Changes to Terms */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="text-purple-600" size={24} />
              11. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page. Continued use of the platform after changes constitutes acceptance of the new Terms.
            </p>
          </motion.div>

          {/* Section 12: Governing Law */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gavel className="text-pink-600" size={24} />
              12. Governing Law
            </h2>
            <p className="text-gray-700">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in Noida, Uttar Pradesh.
            </p>
          </motion.div>

          {/* Section 13: Contact Us */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-blue-600" size={24} />
              13. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions regarding these Terms, please contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Email:</strong> <a href="mailto:support@fluencerz.com" className="text-blue-600 hover:underline">support@fluencerz.com</a><br />
              <strong>Address:</strong> Appmontize Media Pvt. Ltd., Best Business Park, Netaji Subhash Place, Pitampura, 11034, Delhi, India. 
            </p>
          </motion.div>

          {/* Consent Statement */}
          <motion.div variants={itemVariants} className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <p className="text-lg">
              By using Fluencerz, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}