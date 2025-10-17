"use client";

import React, { useEffect, useRef, useState } from "react";

const GoogleMapEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Intersection Observer for lazy loading
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
        rootMargin: "50px", // Start loading 50px before it comes into view
      }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={iframeRef}
      className="w-full h-[450px] rounded-2xl overflow-hidden"
    >
      {isInView ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9763321470155!2d85.30694087492347!3d27.71801702502186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fbea7fee3b%3A0x30a630e6fa209247!2sRara%20Treks%20Tours%20%26%20Travels%20(P.)%20Ltd!5e0!3m2!1sen!2snp!4v1756461778515!5m2!1sen!2snp"
          width="100%"
          height="450"
          loading="lazy"
          title="Rara Treks Tours & Travels Location"
          className="w-full h-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{
            filter: "grayscale(0%)",
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default GoogleMapEmbed;
