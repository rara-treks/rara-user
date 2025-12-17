"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/productSkeleton";
import DepartureTable from "@/app/(product)/departures/Components/DepartureTable";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SimplifiedProduct, DepartureResponse } from "@/types/departure";
import { ChevronDown, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

// Category types from navbar API
interface CategoryProduct {
  id: number;
  name: string;
  slug: string;
  featured_image: {
    id: number;
    url: string;
  } | null;
}

interface Category {
  id: number;
  name: string;
  products: CategoryProduct[];
}

interface CategoryApiResponse {
  code: number;
  message: string;
  data: {
    data: {
      trek: Category[];
      activities: Category[];
      tour: Category[];
    };
  };
}

interface ProductListProps {
  type: string;
  title?: string;
}

// Category Sidebar Skeleton
const CategorySidebarSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Skeleton key={i} className="h-10 w-full bg-gray-200 rounded-lg" />
    ))}
  </div>
);

// Product List with Sidebar Skeleton
const ProductListSkeleton = () => (
  <div className="flex gap-8">
    {/* Sidebar Skeleton - Desktop */}
    <div className="hidden lg:block w-56 flex-shrink-0">
      <div className="space-y-3">
        <Skeleton className="h-7 w-32 bg-gray-300 mb-4" />
        <CategorySidebarSkeleton />
      </div>
    </div>

    {/* Products Skeleton */}
    <div className="flex-1">
      <ProductSkeleton count={6} />
    </div>
  </div>
);

// Separate component that uses useSearchParams
const ProductListContent = ({ type, title }: ProductListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Category state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Departure state
  const [departures, setDepartures] = useState<SimplifiedProduct[]>([]);
  const [departuresLoading, setDeparturesLoading] = useState(true);

  const getHeader = () => {
    const headerMap: Record<string, string> = {
      tour: "Tour Adventures",
      trek: "Trek Adventures",
      activities: "Activities",
    };
    return (
      title ||
      headerMap[type] ||
      `${type.charAt(0).toUpperCase() + type.slice(1)} Adventures`
    );
  };

  // Get departure title and message based on type
  const getDepartureConfig = () => {
    const configMap: Record<string, { title: string; message: string }> = {
      trek: {
        title: "Trek Departure Dates",
        message: "Choose your preferred departure month and trek",
      },
      tour: {
        title: "Tour Departure Dates",
        message: "Choose your preferred departure month and tour",
      },
      activities: {
        title: "Activities Departure Dates",
        message: "Choose your preferred departure month and activity",
      },
    };
    return (
      configMap[type] || {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Departure Dates`,
        message: `Choose your preferred departure month`,
      }
    );
  };

  // Fetch categories from navbar API
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await fetch("/api/product/homepage/navbar/list");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoryApiResponse = await response.json();

      // Map type to API key
      const typeKey = type === "trek" ? "trek" : type === "tour" ? "tour" : "activities";
      const categoryData = data.data.data[typeKey as keyof typeof data.data.data] || [];
      setCategories(categoryData);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/productList?type=${type}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log("fetched data is :::::::::::", data);

      if (data.code === 0) {
        setProducts(data.data.data);
        setAllProducts(data.data.data);
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

  // Fetch departures based on product type
  const fetchDepartures = async () => {
    try {
      setDeparturesLoading(true);
      const response = await fetch("/api/product/product/departure/lists");

      if (!response.ok) {
        console.error("Failed to fetch departures");
        return;
      }

      const data: DepartureResponse = await response.json();

      // Get departures based on the current product type
      const typeKey = type as keyof typeof data.data;
      const departureData = data.data[typeKey] || [];

      setDepartures(
        departureData.map((product: any) => ({
          id: product.id,
          name: product.name,
          departures: product.departures,
        }))
      );
    } catch (err) {
      console.error("Error fetching departures:", err);
    } finally {
      setDeparturesLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    setMobileFilterOpen(false);

    if (category) {
      // Filter products based on selected category's product slugs
      const categoryProductSlugs = category.products.map(p => p.slug);
      const filteredProducts = allProducts.filter(product =>
        categoryProductSlugs.includes(product.slug)
      );
      setProducts(filteredProducts);
    } else {
      // Show all products
      setProducts(allProducts);
    }
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    setCurrentPage(page);
    fetchData(page);
    fetchCategories();
  }, [searchParams, type]);

  // Fetch departures when type changes
  useEffect(() => {
    fetchDepartures();
  }, [type]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
      router.push(`?page=${page}`, { scroll: false });
      setSelectedCategory(null); // Reset category filter on page change
    }
  };

  const handleRetry = () => {
    router.push(`?page=1`, { scroll: false });
    setError(null);
  };

  if (loading && !hasInitialized) {
    return (
      <div className="container mx-auto px-4 py-8 w-full">
        {/* Header Skeleton */}
        <Skeleton className="h-10 w-64 bg-gray-300 mb-8" />
        <ProductListSkeleton />
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{getHeader()}</h1>
      </div>

      {/* Mobile Category Dropdown */}
      <div className="lg:hidden mb-6">
        <div className="relative">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left"
          >
            <span className="text-gray-700 font-medium">
              {selectedCategory ? selectedCategory.name : "All Categories"}
            </span>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {mobileFilterOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleCategorySelect(null)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${!selectedCategory
                  ? "bg-[#086032]/10 text-[#086032] font-medium"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors border-t border-gray-100 ${selectedCategory?.id === category.id
                    ? "bg-[#086032]/10 text-[#086032] font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {category.name}
                  <span className="text-gray-400 ml-2">({category.products.length})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-8">
        {/* Category Sidebar - Desktop */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Categories
            </h3>

            {categoriesLoading ? (
              <CategorySidebarSkeleton />
            ) : (
              <div className="space-y-1">
                {/* All Categories Option */}
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${!selectedCategory
                    ? "bg-[#086032] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  All Categories
                </button>

                {/* Category List */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${selectedCategory?.id === category.id
                      ? "bg-[#086032] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <span className="truncate">{category.name}</span>
                    <span className={`text-xs ml-2 ${selectedCategory?.id === category.id
                      ? "text-white/80"
                      : "text-gray-400"
                      }`}>
                      {category.products.length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Content */}
        <div className="flex-1 min-w-0">
          {/* Selected Category Header */}
          {selectedCategory && (
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <button
                  onClick={() => handleCategorySelect(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={14} />
                  Clear
                </button>
              </div>
            </div>
          )}

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
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-4">
                  {selectedCategory
                    ? `No products available in "${selectedCategory.name}" category.`
                    : "Check back later for exciting opportunities!"}
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className="px-4 py-2 bg-[#086032] text-white rounded-lg hover:bg-[#5a9636] transition-colors"
                  >
                    View All Products
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Pagination - Only show when not filtering by category */}
              {!selectedCategory && totalPages > 1 && (
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
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === pageNum
                              ? "bg-[#086032] text-white shadow-md"
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
      </div>

      {/* Departure Section */}
      {!departuresLoading && departures.length > 0 && (
        <div className="mt-12 bg-[#F5F5F5]">
          <DepartureTable
            title={getDepartureConfig().title}
            message={getDepartureConfig().message}
            products={departures}
          />
        </div>
      )}
    </div>
  );
};

// Main component with Suspense boundary
const ProductList = ({ type, title }: ProductListProps) => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 w-full">
          <Skeleton className="h-10 w-64 bg-gray-300 mb-8" />
          <ProductListSkeleton />
        </div>
      }
    >
      <ProductListContent type={type} title={title} />
    </Suspense>
  );
};

export default ProductList;
