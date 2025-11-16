"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Journey = () => {
  const [bgImageLoaded, setbgImageLoaded] = useState(false);

  const journeyItems = [
    {
      icon: "/assets/icons/journey.svg",
      title: "Culture Journey",
      alt: "Culture Journey Icon",
      slug: "tour",
    },
    {
      icon: "/assets/icons/trekking.svg",
      title: "Trekking Trials",
      alt: "Trekking Icon",
      slug: "trek",
    },
    {
      icon: "/assets/icons/mountain.svg",
      title: "Mountain Expeditions",
      alt: "Mountain Icon",
      slug: "trek",
    },
    {
      icon: "/assets/icons/life.svg",
      title: "Wildlife & Nature",
      alt: "Wildlife Icon",
      slug: "activities",
    },
    {
      icon: "/assets/icons/adventure.svg",
      title: "Adventure Journey",
      alt: "Adventure Icon",
      slug: "activities",
    },
    {
      icon: "/assets/icons/scenic.svg",
      title: "Scenic Flights",
      alt: "Scenic Flights Icon",
      slug: "tour",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full relative min-h-[350px] md:min-h-[300px]">
        {/* Loading placeholder */}
        {!bgImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
        )}

        {/* Background Image */}
        <Image
          src="/assets/mountain.png"
          alt="Mountain Journey Background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${
            bgImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setbgImageLoaded(true)}
        />

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 z-10">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full max-w-7xl px-8 xl:px-16">
            {journeyItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.slug}`}
                className="flex flex-col items-center justify-center gap-3 group transform transition-all duration-300 hover:scale-110"
                prefetch={false}
              >
                <div className="flex rounded-full p-3 bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-white font-bold text-lg xl:text-xl text-center drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 w-full max-w-4xl px-8">
            {journeyItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.slug}`}
                className="flex flex-col mb-4 items-center justify-center gap-2 group transform transition-all duration-300 hover:scale-105"
                prefetch={false}
              >
                <div className="flex rounded-full p-2 bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-white font-bold text-sm text-center drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="grid md:hidden grid-cols-2 gap-4 w-full max-w-sm px-6">
            {journeyItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item.slug}`}
                className="flex flex-col items-center mb-4 justify-center gap-1 group transform transition-all duration-300 hover:scale-105 active:scale-95"
                prefetch={false}
              >
                <div className="flex rounded-full p-2 bg-white shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-white font-semibold text-xs text-center drop-shadow-md leading-tight group-hover:text-yellow-200 transition-colors duration-300">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
