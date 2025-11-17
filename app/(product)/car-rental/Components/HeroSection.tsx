"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import RentalForm from "./RentalForm";

const carData = [
  {
    type: "Economy Cars",
    image: "/assets/car/tata.png",
    alt: "Economy Car",
  },
  {
    type: "Luxury Cars",
    image: "/assets/car/fortuner.png",
    alt: "Luxury Car",
  },
  {
    type: "SUVs",
    image: "/assets/car/scorpio.png",
    alt: "Luxury SUV",
  },
  {
    type: "Electric Cars",
    image: "/assets/car/jmev.png",
    alt: "Electric Car",
  },
];

const HeroSection = () => {
  const [currentCarType, setCurrentCarType] = useState<number>(0);

  // Auto-rotate car types
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarType((prev) => (prev + 1) % carData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextCarType = () => {
    setCurrentCarType((prev) => (prev + 1) % carData.length);
  };

  const prevCarType = () => {
    setCurrentCarType((prev) => (prev - 1 + carData.length) % carData.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden ">
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Text Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Brand Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-[#71B344]">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-semibold text-green-700">
                RARA-CAR
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Luxury Car
                <br />
                <span className="text-[#71B344] bg-clip-text">
                  Rental Nepal
                </span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Experience luxury and comfort with our premium fleet. From city
              drives to weekend getaways, we have the perfect vehicle for every
              journey across Nepal.
            </p>

            {/* Car Types Carousel */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Our Services
              </h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={prevCarType}
                  className="text-teal-600 hover:text-teal-500 transition-colors p-2 rounded-full hover:bg-white/50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-center flex-1">
                  <span className="text-xl font-semibold bg-gradient-to-r from-teal-700 to-green-700 bg-clip-text text-transparent">
                    {carData[currentCarType].type}
                  </span>
                </div>
                <button
                  onClick={nextCarType}
                  className="text-teal-600 hover:text-teal-500 transition-colors p-2 rounded-full hover:bg-white/50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {carData.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentCarType
                        ? "bg-[#71B344] w-8"
                        : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <RentalForm />
              <Link href="#learn-more">
                <Button className="border-2 border-[#71B344] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Car Images with Modern Layout */}
          <div className="relative h-full flex items-center justify-center lg:justify-end">
            {/* Main car container */}
            <div className="relative w-full max-w-2xl">
              {/* Background decorative elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-teal-500/20 rounded-full blur-lg"></div>
              </div>

              {/* Car images with dynamic transition */}
              <div className="relative space-y-8">
                {/* Front car with fade and slide transition */}
                <div className="relative transform hover:scale-105 transition-all duration-500">
                  <Image
                    key={currentCarType}
                    src={carData[currentCarType].image}
                    alt={carData[currentCarType].alt}
                    width={600}
                    height={400}
                    className="relative w-full h-full object-cover rounded-2xl animate-fadeInSlide"
                  />
                  <style>{`
                    @keyframes fadeInSlide {
                      from {
                        opacity: 0;
                        transform: translateY(10px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    .animate-fadeInSlide {
                      animation: fadeInSlide 0.5s ease-out;
                    }
                  `}</style>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-10 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-teal-600">10+</div>
                <div className="text-sm text-gray-600">Premium Cars</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
