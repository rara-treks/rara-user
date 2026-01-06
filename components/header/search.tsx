"use client";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  type: string;
  tagline: string;
  featured_image: string;
}

interface SearchResponse {
  code: number;
  message: string;
  data: SearchResult[];
}

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSearchResults(query.trim());
    }, 800);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const fetchSearchResults = async (searchQuery: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/product/homepage/search/${encodeURIComponent(searchQuery)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data: SearchResponse = await response.json();

      if (data.code === 0) {
        setResults(data.data);
      } else {
        setError("Failed to fetch results");
      }
    } catch (err) {
      setError("An error occurred while searching");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleResultClick = (result: SearchResult) => {
    setIsDialogOpen(false);
    setQuery("");
    setResults([]);

    // Use window.location for navigation to ensure it works
    window.location.href = `/${result.type}/${result.slug}`;
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setQuery("");
    setResults([]);
    setError("");
  };

  return (
    <>
      {/* Search Icon Button */}
      <Button
        onClick={handleDialogOpen}
        className="px-12 border border-[#f2a135] bg-gray-200 active:bg-transparent focus:bg-transparent hover:shadow-none focus-visible:bg-transparent flex items-center gap-2 rounded-full transition-colors duration-200"
        title="Search"
        aria-label="Open search dialog"
      >
        <IconSearch size={20} className="text-gray-600" />
        <p className="text-md hidden xl:flex text-black">Search Here</p>
      </Button>

      {/* Search Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="w-full max-w-2xl top-20 left-1/2 -translate-x-1/2 translate-y-0">
          <DialogHeader>
            <DialogTitle>Search Destinations</DialogTitle>
          </DialogHeader>

          <div className="w-full space-y-6">
            {/* Search Input */}
            <div className="flex items-center border border-gray-300 rounded-full h-11 px-4 gap-3 bg-white focus-within:border-blue-500 focus-within:shadow-lg transition-all duration-200">
              <input
                type="text"
                placeholder="Choose your destination..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              />

              {isLoading && (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin flex-shrink-0" />
              )}

              {query && !isLoading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 hover:bg-transparent"
                  aria-label="Clear search"
                >
                  <IconX size={20} />
                </Button>
              )}

              <IconSearch size={20} className="text-gray-400 flex-shrink-0" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Results Count */}
            {query && results.length > 0 && (
              <p className="text-xs text-gray-500">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
            )}

            {/* Search Results */}
            {query && results.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                {results.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    onClick={() => handleResultClick(result)}
                    className="group h-auto p-0 flex flex-col bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200"
                  >
                    <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                      {result.featured_image &&
                        result.featured_image.trim() !== "" ? (
                        <img
                          src={result.featured_image}
                          alt={result.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 capitalize pointer-events-none">
                        {result.type}
                      </div>
                    </div>

                    <div className="p-3 text-left w-full">
                      <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {result.name}
                      </h3>
                      {result.tagline && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {result.tagline}
                        </p>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            ) : query && !isLoading && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 text-sm">
                  No destinations found for "{query}"
                </p>
              </div>
            ) : !query ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <IconSearch size={48} className="text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">
                  Start typing to search for destinations
                </p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Search;
