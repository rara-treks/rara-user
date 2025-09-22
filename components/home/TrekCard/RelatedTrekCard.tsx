"use client";

import React, { useState, useEffect } from "react";
import TrekCard from "@/components/home/TrekCard/RelatedTrekCard";
import { Product } from "@/types/prod";
import { Card, CardContent } from "@/components/ui/card";

interface ApiResponse {
  data: {
    data: Product[];
  };
  products?: Product[];
}

interface ProductListProps {
  productType?: string;
}

// Skeleton component that matches TrekCard layout
const TrekCardSkeleton = () => {
  return (
    <div className="mx-auto">
      <Card className="p-2 overflow-hidden shadow-md bg-white border-0 relative animate-pulse">
        {/* Gradient border wrapper */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#71B344] via-[#7A7E77] to-[#DDE4D7] p-[1px]">
          <div className="w-full h-full bg-white rounded-lg"></div>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Image skeleton */}
          <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-2">
            <div className="absolute top-2 left-2 w-16 h-6 bg-gray-300 rounded"></div>
            <div className="absolute top-2 right-2 w-12 h-6 bg-gray-300 rounded"></div>
          </div>

          <CardContent className="p-2 space-y-2 w-full">
            <div className="flex flex-col items-start justify-start w-full">
              {/* Title skeleton */}
              <div className="w-full mb-3 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>

              <div className="flex items-center justify-between w-full">
                {/* Trek details skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-14"></div>
                </div>

                {/* Price skeleton */}
                <div className="text-right space-y-1">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>

            {/* Availability banner skeleton */}
            <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

const ProductList = ({ productType = "trek" }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/productList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: productType,
          page: page,
          per_page: 15,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log("Fetched data:", data.data);

      // Handle different possible response structures
      const productData = data.data?.data || data.products || [];
      setProducts(productData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productType, page]);

  const handleNextPage = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = (): void => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  // Transform product data to match RelatedTrekCard expected format
  const transformProductData = (product: Product) => {
    return {
      ...product,
      featuredImage: product.featuredImage
        ? {
            url: product.featuredImage.url || product.featuredImage,
            alt: product.name,
          }
        : null,
      featuredImages: product.featuredImages || [],
      type: product.type || "trek",      
      prices: product.prices || [],
    };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Loading state with skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <TrekCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <TrekCard key={product.id} {...transformProductData(product)} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={products.length < 15}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
