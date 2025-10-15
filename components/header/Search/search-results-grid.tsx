import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/lib/hooks/use-search";

interface SearchResultsGridProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string;
  gridCols?: "2" | "3";
  onResultClick?: () => void;
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  results,
  isLoading,
  error,
  gridCols = "3",
  onResultClick,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-3">
        {results.length} result{results.length !== 1 ? "s" : ""} found
      </p>

      <div
        className={cn(
          "grid gap-3",
          gridCols === "2" && "grid-cols-2",
          gridCols === "3" && "grid-cols-3"
        )}
      >
        {results.map((result) => (
          <Link
            key={result.id}
            href={`/${result.type}/${result.slug}`}
            onClick={onResultClick}
            className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200"
          >
            <div className="relative w-full h-32 bg-gray-200 overflow-hidden">
              <img
                src={result.featured_image}
                alt={result.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                {result.type}
              </div>
            </div>

            <div className="p-3 text-left">
              <h3 className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {result.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {result.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsGrid;
