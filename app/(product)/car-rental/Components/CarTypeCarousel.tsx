"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carTypes } from "./data";

const CarTypeCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-emerald-300 text-center">
        Our Services
      </h3>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {carTypes.map((type, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="text-center p-4">
                <span className="text-2xl font-bold text-white">{type}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-emerald-400 hover:text-emerald-300 border-emerald-400 hover:border-emerald-300" />
        <CarouselNext className="text-emerald-400 hover:text-emerald-300 border-emerald-400 hover:border-emerald-300" />
      </Carousel>

      <div className="flex justify-center mt-4 space-x-2">
        {carTypes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-emerald-400 w-6" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarTypeCarousel;