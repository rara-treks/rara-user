import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductSkeleton from "./productSkeleton";

const DetailedSkeleton = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trek Title */}
        <div className="mb-8">
          <Skeleton className="bg-gray-300 h-6 w-80 mb-4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="bg-gray-300 h-4 w-24" />
            <Skeleton className="bg-gray-300 h-4 w-20" />
            <Skeleton className="bg-gray-300 h-4 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="bg-transparent p-4 shadow-none">
            <CardContent className="p-0">
              <div className="flex items-center gap-2">
                <Skeleton className="bg-gray-300 h-80 w-full md:w-4/5 rounded-tl-lg" />
                <div className="hidden md:grid grid-rows-1 w-1/5 gap-2">
                  <Skeleton className="bg-gray-300 h-[158px] w-full rounded-tr-lg" />
                  <Skeleton className="bg-gray-300 h-[158px] w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="grid grid-cols-1 gap-6 w-full md:w-[70%]">
              {/* Trip Overview */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Skeleton className="bg-gray-300 h-4 w-full" />
                    <Skeleton className="bg-gray-300 h-4 w-full" />
                    <Skeleton className="bg-gray-300 h-4 w-3/4" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="text-center p-4 bg-gray-50 rounded-lg"
                      >
                        <Skeleton className="bg-gray-300 h-6 w-12 mx-auto mb-2" />
                        <Skeleton className="bg-gray-300 h-4 w-16 mx-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Skeleton className="bg-gray-300 h-2 w-2 rounded-full mt-2 flex-shrink-0" />
                        <Skeleton
                          className="h-4 flex-1"
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Altitude Chart */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="bg-gray-300 h-64 w-full rounded-lg" />
                </CardContent>
              </Card>

              {/* Trek Itinerary */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-green-200 pl-6 relative"
                    >
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-green-500 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="bg-gray-300 h-5 w-48" />
                        <Skeleton className="bg-gray-300 h-4 w-32" />
                        <div className="space-y-2">
                          <Skeleton className="bg-gray-300 h-3 w-full" />
                          <Skeleton className="bg-gray-300 h-3 w-4/5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cost Detail */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="bg-gray-300 h-4 w-32" />
                      <Skeleton className="bg-gray-300 h-6 w-24" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="bg-gray-300 h-4 w-40" />
                      <Skeleton className="bg-gray-300 h-4 w-36" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="bg-gray-300 h-80 w-full rounded-lg" />
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-transparent p-4 shadow-none">
                <CardHeader>
                  <Skeleton className="bg-gray-300 h-6 w-16" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <Skeleton className="bg-gray-300 h-4 w-3/4 mb-2" />
                      <div className="space-y-2">
                        <Skeleton className="bg-gray-300 h-3 w-full" />
                        <Skeleton className="bg-gray-300 h-3 w-4/5" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6  w-[30%]">
              {/* Booking Card */}
              <Card className="sticky top-8 bg-transparent p-4 shadow-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <Skeleton className="bg-gray-300 h-8 w-24 mx-auto mb-2" />
                      <Skeleton className="bg-gray-300 h-4 w-32 mx-auto" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Skeleton className="bg-gray-300 h-4 w-20 mb-2" />
                        <Skeleton className="bg-gray-300 h-10 w-full" />
                      </div>
                      <div>
                        <Skeleton className="bg-gray-300 h-4 w-24 mb-2" />
                        <Skeleton className="bg-gray-300 h-10 w-full" />
                      </div>
                    </div>

                    <Skeleton className="bg-gray-300 h-12 w-full" />
                    <Skeleton className="bg-gray-300 h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Treks */}
          <div className="w-full">
            <ProductSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedSkeleton;
