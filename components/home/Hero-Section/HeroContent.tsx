import React, { useState, useEffect } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "./types";
import Link from "next/link";

interface HeroContentProps {
  hero: Hero;
}

export const HeroContent = ({ hero }: HeroContentProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload the video by setting src attribute
    video.src = "/assets/video/video.mp4";

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      console.error("Video loading error");
      setVideoError(true);
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      // Attempt to play once data is loaded
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video autoplay failed:", error);
          setVideoError(true);
        });
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="self-stretch h-[541px] overflow-hidden shrink-0 relative bg-gray-900">
      {/* Video element with optimized settings */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
          videoLoaded && !videoError ? "opacity-100" : "opacity-0"
        }`}
        controlsList="nodownload"
      />

      {/* Loading placeholder */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse" />
      )}

      {/* Fallback content overlay for error state */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-900" />
      )}

      {/* Content overlay */}
      <div className="relative h-full flex flex-col items-center justify-start pt-[190px] px-2 md:px-5 pb-[68px] gap-4 z-10">
        <h1 className="w-full text-[28px] md:text-3xl lg:text-[64px] text-center mb-2 lg:mb-6 leading-[150%] font-extrabold text-white drop-shadow-lg">
          {hero.title}
        </h1>
      </div>
      <div className="flex items-center gap-12 relative left-10 bottom-20">
        <Link href="#trips" aria-label="View available trips">
          <Button className="rounded-[22px] bg-[#71B344] flex flex-row items-center justify-center py-2 px-4 gap-2 text-base text-whitesmoke font-inter hover:bg-[#5fa035] active:bg-[#4a7828] transition-colors duration-200 cursor-pointer shadow-lg">
            <span className="leading-[150%]">{hero.buttonText}</span>
            <ChevronRightIcon
              className="text-white"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </Link>

        <Link href="#trips" aria-label="View available trips">
          <Button className="rounded-[22px] bg-[#71B344] flex flex-row items-center justify-center py-2 px-4 gap-2 text-base text-whitesmoke font-inter hover:bg-[#5fa035] active:bg-[#4a7828] transition-colors duration-200 cursor-pointer shadow-lg">
            <span className="leading-[150%]">{hero.buttonText}</span>
            <ChevronRightIcon
              className="text-white"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
