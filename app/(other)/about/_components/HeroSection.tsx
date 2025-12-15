"use client";

import { ArrowRight, Mountain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  featuredImage?: string;
}

const HeroSection = ({ featuredImage }: HeroSectionProps) => {
  const backgroundImage = featuredImage || "/assets/2.png";

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Mountain landscape"
            fill
            priority
            className="object-cover"
          />
          {/* Subtle gradient overlay - only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content - positioned at bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-6 pb-12">
            <div className="max-w-2xl space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                <Mountain className="w-4 h-4 text-emerald-400" />
                <span className="text-white/90 text-sm">
                  Nepal's Trusted Trekking Company
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                About Our <span className="text-emerald-400">Journey</span>
              </h1>

              {/* Description */}
              <p className="text-white/85 text-lg leading-relaxed max-w-lg">
                Crafting extraordinary adventures that connect travelers with breathtaking destinations and vibrant cultures for over a decade.
              </p>

              {/* CTA Button */}
              <div className="flex gap-4 pt-2">
                <Link
                  href="/trek"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 group"
                >
                  Explore Our Trips
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Below hero, clean and minimal */}
      <div className="bg-white py-10 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">10+</p>
              <p className="text-gray-500 text-sm mt-1">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">5000+</p>
              <p className="text-gray-500 text-sm mt-1">Happy Trekkers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-gray-500 text-sm mt-1">Destinations</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
