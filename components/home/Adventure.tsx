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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71B344]"></div>
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
