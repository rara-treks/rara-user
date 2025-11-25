"use client";

import TestimonialCarousel, { TestimonialData } from "./TestimonialCarousel";

interface TestimonialGridProps {
  testimonials: TestimonialData[];
  className?: string;
}

export default function TestimonialGrid({
  testimonials,
  className = "",
}: TestimonialGridProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <TestimonialCarousel testimonials={testimonials} className={className}/>
    </div>
  );
}
