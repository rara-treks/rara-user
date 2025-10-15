"use client";
import React from "react";
import { IconSearch, IconX, IconArrowLeft } from "@tabler/icons-react";
import { useSearch } from "@/lib/hooks/use-search";
import SearchResultsGrid from "./search-results-grid";

interface MobileSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearchPopup: React.FC<MobileSearchPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const { query, setQuery, results, isLoading, error, clearSearch } =
    useSearch();

  const handleClose = () => {
    clearSearch();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 pointer-events-none">
        <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl pointer-events-auto animate-slideUp max-h-[90vh] flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <IconArrowLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Search</h2>
            </div>

            <div className="flex items-center border border-gray-300 rounded-full h-11 px-4 gap-3 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
              <IconSearch size={20} className="text-gray-400 flex-shrink-0" />
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
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <IconX size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {query || isLoading || error ? (
              <SearchResultsGrid
                results={results}
                isLoading={isLoading}
                error={error}
                gridCols="2"
                onResultClick={handleClose}
              />
            ) : (
              <div className="p-8 text-center">
                <IconSearch size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-sm text-gray-500">
                  Start typing to search for destinations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default MobileSearchPopup;
