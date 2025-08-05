"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  useEffect(() => {
    // 🎉 Run confetti once on page load
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const images = [
    "https://images.pexels.com/photos/32319652/pexels-photo-32319652.jpeg",
    "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
    "https://images.pexels.com/photos/7564251/pexels-photo-7564251.jpeg",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600 px-4 pt-42 pb-28">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl text-white max-w-xl w-full p-8 text-center space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            🎉
            <br /> Thank You!
          </h1>
          <p className="text-lg font-medium">
            Fluencerz received your request. Our team will get in touch with you
            soon.
          </p>
          <img
            src={`${randomImage}?auto=compress&cs=tinysrgb&w=800`}
            alt="Influencer"
            className="rounded-2xl shadow-lg mx-auto w-full h-64 object-cover"
          />
          <p className="text-sm text-white/80 mt-2">
            Meanwhile, follow us on social media for updates and sneak peeks!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
