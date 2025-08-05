"use client";
import React, { useEffect } from "react";
import axios from "axios";
import SearchFilters from "@/components/search/search-filters";
import useProductSearch from "@/lib/hooks/use-product-search";
import MapView from "@/components/search/map-view";
import ProductGrid from "@/components/search/product-grid";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product.types";
import CHNSafety from "@/components/chn-safety";
import useProductSearchTags from "@/lib/hooks/use-product-search-tags";
import { useMapView } from "@/lib/context/google-map-provider";
import { PaginatedResponse } from "@/types/index.types";
import SearchPagination from "@/components/search/search-pagination";
import { cn } from "@/lib/utils";
import SearchFiltersMobile from "@/components/search/search-filters.mobile";
import { searchContent } from "@/lib/data/search";

function SearchPage() {
  const { filter } = useProductSearch();
  const { bounds, reset } = useMapView();
  const { activeTag } = useProductSearchTags();
  const typeData = searchContent?.[filter.type as keyof typeof searchContent];

  const { data: products, isPending } = useQuery<PaginatedResponse<Product>>({
    queryKey: ["chn-search", filter, bounds],
    queryFn: async () => {
      const { data } = await axios.post<PaginatedResponse<Product>>(
        "/api/product/list",
        {
          filters: { ...filter, type: filter.type === "all" ? undefined : filter.type.slice(0, -1), bounds: bounds },
        },
        {
          params: {
            page: filter.page,
          },
        }
      );
      return data;
    },
    throwOnError: false,
  });

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.type]);

  return (
    <main>
      <div className="sticky top-20">
        <SearchFilters />
        <div className="grid md:grid-cols-[1.5fr_1fr]">
          <div
            className={cn(
              "relative z-10",
              "max-md:shadow-[1px_-10px_15px_5px_#0000003d]",
              "max-md:rounded-t-3xl bg-primary-light w-full",
              "order-2 md:order-1 max-md:-mt-4"
            )}
          >
            <SearchFiltersMobile className="p-6 pt-2 max-w-[100vw]" />
            <div className="px-6 md:p-8 !pb-0">
              <h4 className="font-bebas-neue text-3xl md:text-4xl">{activeTag?.name ?? typeData?.name}</h4>
              <p>{activeTag?.description ?? typeData?.description}</p>
            </div>
            <ProductGrid className="p-6 md:p-8 !pb-0" loading={isPending} products={products?.data.data} />
            <SearchPagination className="py-4" totalPages={products?.data.last_page ?? 1} />
          </div>
          <div className="h-[40vh] max-md:sticky max-md:top-0 md:h-full  order-1 md:order-2">
            <MapView key="search-map-view" places={products?.data.data} type={filter.type} />
          </div>
        </div>
        <CHNSafety />
      </div>
    </main>
  );
}

export default SearchPage;
