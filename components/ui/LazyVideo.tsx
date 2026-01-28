"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    priority?: boolean;
}

export const LazyVideo = ({
    src,
    className = "",
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    priority = false,
}: LazyVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // If priority is true, start as visible/loaded immediately
    const [isInView, setIsInView] = useState(priority);
    const [isLoaded, setIsLoaded] = useState(priority);

    useEffect(() => {
        if (priority) return; // Skip observer if priority

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
    }, [priority]);

    useEffect(() => {
        const video = videoRef.current;
        // If priority, we don't wait for 'isInView' from observer (it's already true), 
        // but we still want to ensure it plays
        if (!video || !isInView) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            if (autoPlay && video.paused) {
                video.play().catch(() => { });
            }
        };

        // If it's already ready to play (might happen with priority)
        if (video.readyState >= 3) {
            handleCanPlay();
        }

        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
    }, [isInView, autoPlay]);

    return (
        <div ref={containerRef} className={cn("relative", className)} aria-hidden="true" tabIndex={-1}>
            {/* Skeleton shown while video loads */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Video element - only rendered when in view (or priority) */}
            {isInView && (
                <video
                    ref={videoRef}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    playsInline={playsInline}
                    preload={priority ? "auto" : "none"}
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
