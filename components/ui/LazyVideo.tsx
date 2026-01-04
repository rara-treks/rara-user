"use client";

import React, { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
}

/**
 * LazyVideo - A performance-optimized video component
 * 
 * Features:
 * - Shows skeleton until video is loaded
 * - Uses Intersection Observer for lazy loading
 * - Defers video download until visible
 * - Reduces initial page load significantly
 */
export const LazyVideo = ({
    src,
    className = "",
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
}: LazyVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "100px",
                threshold: 0,
            }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isInView) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            if (autoPlay && video.paused) {
                video.play().catch(() => { });
            }
        };

        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
    }, [isInView, autoPlay]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Skeleton shown while video loads */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Video element - only rendered when in view */}
            {isInView && (
                <video
                    ref={videoRef}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    playsInline={playsInline}
                    preload="auto"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default LazyVideo;
