import { useState, useEffect, useRef } from "react";

export interface SearchResult {
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

export const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        setResults([]);
      }
    } catch (err) {
      setError("An error occurred while searching");
      setResults([]);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError("");
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearSearch,
  };
};
