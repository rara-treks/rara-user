import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogSkeleton = () => (
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-32 py-12 animate-pulse">
    <div className="w-full flex flex-col gap-1">
      <Skeleton className="bg-gray-300 w-20 h-3" />
      <Skeleton className="bg-gray-300 w-full h-24" />
      <Skeleton className="bg-gray-300 w-full h-36" />
      <Skeleton className="bg-gray-300 w-32 h-4" />
      <Skeleton className="bg-gray-300 w-full h-96" />
      <div className="w-full flex gap-6 ">
        <Skeleton className="hidden md:flex bg-gray-300 w-[30%] h-80 rounded-lg" />
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="bg-gray-300 w-full h-96" />
          <Skeleton className="bg-gray-300 w-full h-96" />
        </div>
      </div>
    </div>
  </div>
);

export default BlogSkeleton;
