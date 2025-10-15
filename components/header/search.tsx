import { IconSearch, IconX } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";

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
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
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
        setIsOpen(data.data.length > 0);
      } else {
        setError("Failed to fetch results");
        setIsOpen(false);
      }
    } catch (err) {
      setError("An error occurred while searching");
      setResults([]);
      setIsOpen(false);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log("Selected:", result);
    setIsOpen(false);
    // Navigate or handle selection here
  };

  return (
    <div
      className="flex w-[600px] justify-center items-center relative"
      ref={dropdownRef}
    >
      <div className="w-full flex items-center border border-gray-300 rounded-full h-10 px-4 gap-3 bg-white focus-within:border-blue-500 focus-within:shadow-lg transition-all duration-200">
        <input
          type="text"
          placeholder="Choose your destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
        />

        {isLoading && (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin flex-shrink-0" />
        )}

        {query && !isLoading && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <IconX size={20} />
          </button>
        )}

        <IconSearch size={20} className="text-gray-400 flex-shrink-0" />
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50 animate-fadeIn">
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-3">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>

            <div className="grid grid-cols-3 gap-3">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200"
                >
                  <div className="relative w-full h-32 bg-gray-200 overflow-hidden">
                    <img
                      src={result.featured_image}
                      alt={result.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
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
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-red-200 p-4 z-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Search;
