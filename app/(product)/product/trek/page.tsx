"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  type: string;
  display_order: string;
  latitude: number;
  longitude: number;
  location: string;
  average_rating: number | null;
  total_rating: number | null;
  wishlist: number;
  featuredImage: string;
  featuredImages: string[];
  tags: Array<{
    id: number;
    name: string;
    description: string;
    display_order: string;
    zoom_level: string;
    slug: string;
    latitude: string;
    longitude: string;
    pivot: {
      product_id: number;
      tag_id: number;
    };
  }>;
  prices: Array<{
    product_id: number;
    number_of_people: number;
    original_price_usd: string;
    discounted_price_usd: string;
  }>;
  overview: {
    product_id: number;
    duration: string;
    trip_grade: string;
    max_altitude: string;
    group_size: number;
    best_time: string;
    starts: string;
  };
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

const TrekProductList = () => {
  const fetchTrekData = async () => {
    try {
      const response = await fetch("/api/productList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "trek",
          page: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log("Fetched trek data:", data);
    } catch (error) {
      console.error("Error fetching trek data:", error);
    }
  };

  useEffect(() => {
    fetchTrekData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Trek Data Fetcher</h1>
      <p className="text-gray-600 mt-2">Check console for fetched data</p>
    </div>
  );
};

export default TrekProductList;
