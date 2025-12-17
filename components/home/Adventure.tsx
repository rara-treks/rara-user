"use client";
import React, { useEffect, useState } from "react";
import AdventureGrid from "./AdventureGrid";

export interface FeaturedImage {
  id: number;
  url: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

export interface Price {
  product_id: number;
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

export interface Overview {
  id: number;
  product_id: number;
  duration: string;
  trip_grade: string;
  max_altitude: string;
  group_size: number;
  best_time: string;
  starts: string;
}

export interface Departure {
  id: number;
  product_id: number;
  departure_from: string;
  departure_to: string;
}

export interface Adventure {
  id: number;
  name: string;
  slug: string;
  type: string;
  short_description: string;
  status: string;
  is_occupied: boolean;
  display_homepage: boolean;
  display_order: string;
  wishlist: number;
  rating: string;
  earliest_departure: string;
  featuredImage: FeaturedImage;
  featuredImages: FeaturedImage[];
  tags: Tag[];
  prices: Price[];
  overview: Overview;
  departures: Departure[];
}

export interface ApiResponse {
  code: number;
  message: string;
  data: Adventure[];
}

const MainTourComponent = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await fetch("/api/product/homepage/adventure/list");

        if (!response.ok) {
          throw new Error("Failed to fetch adventures");
        }

        const data: ApiResponse = await response.json();

        // Add validation to ensure data.data exists and is an array
        if (data && Array.isArray(data.data)) {
          setAdventures(data.data);
        } else {
          console.error("Invalid data structure:", data);
          setAdventures([]); // Set empty array as fallback
        }
      } catch (error) {
        console.error("Error fetching adventures:", error);
        setError("Failed to load adventures");
        setAdventures([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  if (loading) {
    return (
      <div className="w-full md:container px-2 md:px-4">
        <div className="w-full mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="flex w-full items-end justify-between mb-8">
            <div className="flex flex-col gap-1">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="hidden lg:flex">
              <div className="h-10 w-44 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Adventure Cards Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex w-full">
                {/* Desktop Skeleton Card */}
                <div className="w-full hidden lg:flex gap-4 items-center justify-center h-full p-2 rounded-[32px] border border-[#dde4d7] bg-white">
                  {/* Image Skeleton */}
                  <div className="w-[255px] h-[230px] bg-gray-200 rounded-[28px] animate-pulse flex-shrink-0"></div>
                  {/* Content Skeleton */}
                  <div className="flex-1 w-full h-full flex flex-col items-start justify-start py-2 gap-5">
                    <div className="w-full flex flex-col gap-3">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-7 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex gap-3">
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 w-36 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile Skeleton Card */}
                <div className="w-full block lg:hidden">
                  <div className="flex flex-col gap-3 h-full p-4 rounded-2xl border border-[#dde4d7] bg-white w-full">
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-[30%] h-[90px] bg-gray-200 rounded-xl animate-pulse"></div>
                      <div className="flex w-[70%] flex-col gap-2">
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-start justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-10 w-full bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
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
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full md:container px-2 md:px-4">
      <AdventureGrid title="Adventures" data={adventures} className="w-full" />
    </div>
  );
};

export default MainTourComponent;
