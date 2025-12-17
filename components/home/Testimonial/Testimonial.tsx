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
      <div className={`w-full flex items-start h-full overflow-hidden justify-start ${className}`}>
        {/* Desktop Skeleton */}
        <div className="w-full h-full hidden lg:flex flex-col items-start justify-start relative gap-12">
          <div className="w-full h-full container z-2 pt-12 flex flex-col items-start justify-start">
            {/* Header Skeleton */}
            <div className="flex flex-col items-start gap-2 mb-8">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-80 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Testimonial Grid Skeleton */}
            <div className="grid grid-cols-3 gap-6 w-full">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="bg-[#1E2F22]/20 flex flex-col gap-4 items-start justify-start p-8 rounded-[32px] w-full">
                  <div className="flex items-start gap-3 justify-start w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse flex-shrink-0"></div>
                    <div className="flex flex-col items-start justify-start gap-2 flex-1">
                      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-3 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="block lg:hidden w-full px-4">
          <div className="flex flex-col gap-4 mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2].map((index) => (
              <div key={index} className="bg-[#1E2F22]/20 flex flex-col gap-4 items-start justify-start p-6 rounded-[24px] w-full">
                <div className="flex items-start gap-3 justify-start w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse flex-shrink-0"></div>
                  <div className="flex flex-col items-start justify-start gap-2 flex-1">
                    <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-3 w-28 bg-gray-300 rounded animate-pulse"></div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 w-2/3 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
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
          <TestimonialGrid testimonials={testimonials} className="w-full h-full" />
        </div>
      </div>

      <div className="block lg:hidden">
        <MobileTestimonial testimonials={testimonials} />
      </div>
    </div>
  );
}
