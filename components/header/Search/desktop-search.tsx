"use client";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/lib/hooks/use-search";
import SearchResultsGrid from "./search-results-grid";

const DesktopSearch = () => {
  const { query, setQuery, results, isLoading, error, clearSearch } =
    useSearch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  }, [results]);

  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
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

      {isOpen && (query || isLoading || error) && (
        <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50 animate-fadeIn">
          <SearchResultsGrid
            results={results}
            isLoading={isLoading}
            error={error}
            gridCols="3"
            onResultClick={() => setIsOpen(false)}
          />
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

export default DesktopSearch;
