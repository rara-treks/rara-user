"use client";
import React, { useState, useEffect } from "react";
import TourCarousel from "./TourCarousel";
import { Product, ApiResponse } from "@/types/prod";
import ProductSkeleton from "../productSkeleton";

const MainTourComponent = () => {
  const [trekData, setTrekData] = useState<Product[]>([]);
  const [tourData, setTourData] = useState<Product[]>([]);
  const [activityData, setActivityData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (type: string): Promise<Product[]> => {
    try {
      // Updated URL to include the full path
      const response = await fetch(
        `/api/product/homepage/product-list/${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! status: ${response.status}, response: ${errorText}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.code === 0 && result.data && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.log(
          `${type} API returned code: ${result.code}, message: ${result.message}`
        );
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [trekResult, tourResult, activityResult] = await Promise.all([
          fetchData("treks"),
          fetchData("tours"),
          fetchData("activities"),
        ]);

        setTrekData(trekResult);
        setTourData(tourResult);
        setActivityData(activityResult);

        if (
          trekResult.length === 0 &&
          tourResult.length === 0 &&
          activityResult.length === 0
        ) {
          setError("No data available for any category");
        }
      } catch (err) {
        console.error("Error in fetchAllData:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
       <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <TourCarousel title="Trek" data={trekData} />
      <TourCarousel title="Tour" data={tourData} />
      <TourCarousel title="Activity" data={activityData} />
    </div>
  );
};

export default MainTourComponent;
