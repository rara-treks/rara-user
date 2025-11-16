"use client";

import MobileCarousel from "./MobileCarousel";
import TestimonialHeader from "./TestimonialHeader";

interface MobileTestimonialProps {
  className?: string;
  onReadAllClick?: () => void;
  testimonials: {
    id: number;
    user_name: string;
    product_name: string;
    overall_rating: number;
    public_review: string;
  }[];
  isLoading?: boolean;
  error?: string | null;
}

export default function MobileTestimonial({
  className = "",
  onReadAllClick,
  testimonials,
  isLoading = false,
  error = null,
}: MobileTestimonialProps) {
  const handleReadAllClick = () => {
    if (onReadAllClick) {
      onReadAllClick();
    } else {
      console.log("Read all reviews clicked");
    }
  };

  return (
    <div className="w-[100vw] flex items-start overflow-hidden justify-start">
      <div className="w-[100vw] relative flex flex-col items-start justify-end gap-12">
        {/* Content Overlay */}
        <div className="w-[100vw] z-2 flex flex-col items-start justify-start px-4">
          {/* Header Section */}
          <TestimonialHeader onReadAllClick={handleReadAllClick} />

          {isLoading ? (
            <div className="w-[100vw] flex items-center justify-center py-4">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="w-[100vw] flex items-center justify-center py-4">
              <p className="text-red-600">Error: {error}</p>
            </div>
          ) : (
            <MobileCarousel testimonials={testimonials} />
          )}
        </div>
      </div>
    </div>
  );
}
