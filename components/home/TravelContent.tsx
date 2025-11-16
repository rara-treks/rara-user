"use client";
import React, { useState, useEffect } from "react";
import TourCarousel from "./TourCarousel";
import { Product, ApiResponse } from "@/types/prod";
import ProductSkeleton from "../productSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MainTourComponent = () => {
  const [trekData, setTrekData] = useState<Product[]>([]);
  const [tourData, setTourData] = useState<Product[]>([]);
  const [activityData, setActivityData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (type: string): Promise<Product[]> => {
    try {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.code === 0 && result.data && Array.isArray(result.data)) {
        return result.data;
      } else {
        return [];
      }
    } catch (error) {
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
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[200px]">
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
    <div className="w-full">
      <Tabs defaultValue="treks" className="w-full">
        <TabsList className="w-fit gap-2 bg-transparent p-0 border-b-2 border-gray-300">
          <TabsTrigger
            value="treks"
            className="px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 border-transparent text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
          >
            Trek
          </TabsTrigger>
          <TabsTrigger
            value="tours"
            className="px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 border-transparent text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
          >
            Tour
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 border-transparent text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
          >
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="treks" className="mt-6">
          <TourCarousel title="Trek" data={trekData} />
        </TabsContent>

        <TabsContent value="tours" className="mt-6">
          <TourCarousel title="Tour" data={tourData} />
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <TourCarousel title="Activity" data={activityData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainTourComponent;
