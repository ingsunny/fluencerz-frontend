"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videos = ["/influencer1.mp4", "/influencer2.mp4"];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current
                .play()
                .catch((error) => console.log("Autoplay prevented:", error));
        }
    }, [currentVideoIndex]);

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white font-sans px-4 py-8">
            <div className="relative bg-gradient-to-r from-gray-100 to-indigo-100 w-full max-w-7xl h-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-[75vh] rounded-3xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-12 p-4 sm:p-6 lg:p-12">
                <div className="max-w-md text-gray-800 text-center sm:text-left">
                    <div className="text-indigo-500 text-sm sm:text-base mb-2">🔍 Discover</div>
                    <h1 className="text-indigo-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-5 break-words">
                        Bringing Stories to Life,<br className="hidden sm:block" /> Frame by Frame.
                    </h1>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 lg:mb-5">
                        At Fluencerz, we believe every brand deserves a story that connects, engages, and inspires.
                        From high-end commercial shoots to dynamic content creation for social media, our in-house production team crafts visually stunning experiences that resonate with your audience.
                    </p>
                    <a href="/influencers" className="text-indigo-500 font-bold no-underline text-xs sm:text-sm md:text-base">
                        START FINDING INFLUENCERS TODAY ➚
                    </a>
                </div>

                {/* iPhone Frame */}
                <div className="relative w-[180px] h-[340px] sm:w-[220px] sm:h-[415px] md:w-[280px] md:h-[530px] lg:w-[370px] lg:h-[700px]">
                    <svg
                        viewBox="0 0 370 700"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <rect rx="40" ry="40" width="370" height="700" fill="black" />
                        <circle cx="185" cy="20" r="6" fill="gray" />
                        <foreignObject x="10" y="40" width="350" height="620">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                onEnded={handleVideoEnd}
                                loop={false}
                                className="w-full h-full object-cover rounded-[30px]"
                            >
                                <source src={videos[currentVideoIndex]} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </foreignObject>
                    </svg>
                </div>
            </div>
        </div>
    );
}