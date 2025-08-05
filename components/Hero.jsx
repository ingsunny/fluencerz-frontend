"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AuthPopup from "./AuthPopup";
import { Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [userType, setUserType] = useState("brand");
  const [displayText, setDisplayText] = useState("");
  const fullText = "Influencer Magic";
  const [index, setIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleAuthOpen = (type, mode) => {
    setUserType(type);
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      }, 150); // Adjust speed of typing here
      return () => clearTimeout(timer);
    }
  }, [index, fullText]);

  // landing form =>

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const phone =
      e.target.countryCode.value + " " + e.target.phone.value.trim();
    const company = e.target.company.value.trim();

    if (!name || !email || !phone || !company) {
      alert("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    const formData = { name, email, phone, company };

    try {
      const res = await axios.post("/api/landing-mail", formData);
      if (res.data.success) {
        router.push("/thankyou");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-[76rem] flex flex-col lg:flex-row items-center justify-around py-24 mt-18 gap-12 lg:gap-0">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full  text-center lg:text-left space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white">
            <span className="bg-clip-text bg-gradient-to-r text-transparent from-white to-gray-300">
              Connect Brands
            </span>{" "}
            with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 inline-block">
              {displayText}
              <span className="animate-blink text-white">_</span>
            </span>
          </h1>
          <p className="text-base md:text-xl text-white font-medium">
            Empower your brand through seamless influencer collaborations. Craft
            impactful campaigns effortlessly.
          </p>
          <div className="flex flex-col justify-center lg:justify-start sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base"
            >
              <Users size={18} />
              <Link href="/auth">Join as Brand</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-shadow text-sm sm:text-base"
            >
              <Sparkles size={18} />
              <Link href="/auth">Join as Influencer</Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Form */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8 text-white max-w-md mx-auto md:mx-0">
          <h2 className="text-2xl font-bold mb-4">Get Early Access</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={30}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={30}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <div className="flex gap-2">
                <select
                  id="countryCode"
                  name="countryCode"
                  className="w-1/4 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/40 text-black"
                  required
                >
                  <option value="">Select Code</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+965">+965 (Kuwait)</option>
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={15}
                  className="w-3/4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="8392893243"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                name="company"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex. AppMontize Pvt Ltd"
                required
              />
            </div>
            {isLoading ? (
              <button
                type="submit"
                disabled
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Sending Request...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Request Invite
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Auth Popup */}
      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        initialUserType={userType}
      />
    </section>
  );
}
