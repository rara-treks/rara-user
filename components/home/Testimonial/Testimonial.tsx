"use client";

import { useEffect, useState } from "react";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialBackground from "./TestimonialBackground";
import TestimonialGrid from "./TestimonialGrid";
import MobileTestimonial from "./MobileTestimonial";

interface TestimonialProps {
  className?: string;
  onReadAllClick?: () => void;
}

interface TestimonialData {
  id: number;
  user_name: string;
  product_name: string;
  overall_rating: number;
  public_review: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    id: number;
    public_review: string;
    overall_rating: string;
    created_at: string;
    product_name: string;
    user_name: string;
    user_country: string | null;
  }[];
}

export default function Testimonial({
  className = "",
  onReadAllClick,
}: TestimonialProps) {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/product/homepage/review");

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const result: ApiResponse = await response.json();

        if (result.code === 0 && result.data) {
          // Transform API data to match component requirements
          const transformedData: TestimonialData[] = result.data.map(
            (item) => ({
              id: item.id,
              user_name: item.user_name,
              product_name: item.product_name,
              overall_rating: parseFloat(item.overall_rating),
              public_review: item.public_review,
            })
          );

          setTestimonials(transformedData);
        } else {
          throw new Error(result.message || "Failed to fetch testimonials");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  if (isLoading) {
    return (
      <div
        className={`w-full flex items-center justify-center h-64 ${className}`}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71B344]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`w-full flex items-center justify-center h-64 ${className}`}
      >
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex items-start h-full overflow-hidden justify-start ${className}`}
    >
      <div className="w-full h-full hidden lg:flex flex-col items-start justify-start relative gap-12">
        {/* Content Overlay */}
        <div className="w-full h-full container z-2 pt-12 flex flex-col items-start justify-start ">
          {/* Header Section */}
          <TestimonialHeader />

          {/* Testimonial Grid with Scrolling Columns */}
          <TestimonialGrid testimonials={testimonials} className="w-full h-full"/>
        </div>
      </div>

      <div className="block lg:hidden">
        <MobileTestimonial testimonials={testimonials} />
      </div>
    </div>
  );
}
