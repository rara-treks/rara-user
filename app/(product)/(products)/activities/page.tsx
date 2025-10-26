"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/productSkeleton";
import { useEffect, useState } from "react";

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
  featuredImage:
    | string
    | {
        url: string;
      };
  featuredImages: Array<
    | string
    | {
        url: string;
      }
  >;
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

const ActivitiesProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchTrekData = async (page: number = 1) => {
    if (loading && hasInitialized) return; // Prevent concurrent calls

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/productList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "activities",
          page: page,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code === 0) {
        setProducts(data.data.data);
        setCurrentPage(data.data.current_page);
        setTotalPages(data.data.last_page);
        setHasInitialized(true);
      } else {
        throw new Error(data.message || "Failed to fetch data");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasInitialized) {
      fetchTrekData(1);
    }
  }, [hasInitialized]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
      setHasInitialized(false); // Allow new fetch
      fetchTrekData(page);
    }
  };

  const handleRetry = () => {
    setHasInitialized(false);
    setError(null);
    fetchTrekData(currentPage);
  };

  if (loading && !hasInitialized) {
    return (
      <div className="container mx-auto px-4 py-8 w-full">
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-red-800 font-semibold text-lg mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Activites</h1>
      </div>

      {/* Content */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Trek Adventures Found
            </h3>
            <p className="text-gray-500">
              Check back later for exciting trek opportunities!
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-[#71B344] text-white shadow-md"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActivitiesProductList;
