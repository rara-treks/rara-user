"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";

export interface TestimonialData {
  id: number;
  user_name: string;
  product_name: string;
  overall_rating: number;
  public_review: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  className?: string;
}

export default function TestimonialCarousel({
  testimonials,
  className = "",
}: TestimonialCarouselProps) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle carousel auto-scroll on desktop
  useEffect(() => {
    if (!api || isMobile) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isMobile]);

  // Listen to carousel changes
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedIndex);
    });
  }, [api]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: isMobile ? "center" : "center",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full h-full"
      >
        <CarouselContent className={isMobile ? "-ml-2" : "-ml-4"}>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className={
                isMobile
                  ? "pl-2 basis-full"
                  : "pl-4 basis-full lg:basis-1/3 flex"
              }
            >
              <TestimonialCard
                name={testimonial.user_name}
                trek={testimonial.product_name}
                rating={testimonial.overall_rating}
                review={testimonial.public_review}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {!isMobile && (
          <>
            <CarouselPrevious className="hidden lg:flex -left-12" />
            <CarouselNext className="hidden lg:flex -right-12" />
          </>
        )}
      </Carousel>

      {/* Mobile dots indicator */}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === current ? "bg-black w-6" : "bg-gray-300 w-2"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
