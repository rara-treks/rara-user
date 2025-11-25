"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TestimonialCard from "./TestimonialCard";
import type { CarouselApi } from "@/components/ui/carousel";

interface MobileCarouselProps {
  testimonials: {
    id: number;
    user_name: string;
    product_name: string;
    overall_rating: number;
    public_review: string;
  }[];
}

const MobileCarousel = ({ testimonials }: MobileCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 basis-full">
              <TestimonialCard
                name={testimonial.user_name}
                trek={testimonial.product_name}
                rating={testimonial.overall_rating}
                review={testimonial.public_review}
                className="w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileCarousel;
