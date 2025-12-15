"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Product {
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
  products: Product[];
}

interface CustomDropdownProps {
  items?: Category[];
  trigger: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: (product: Product) => void;
  hasDropdown: boolean;
  slug?: string;
  onDirectClick?: () => void;
  productType?: string; // 'trek', 'tour', or 'activities'
  onMouseEnterContent?: () => void;
  onMouseLeaveContent?: () => void;
}

const CustomDropdown = ({
  items = [],
  trigger,
  isOpen,
  onToggle,
  onItemClick,
  hasDropdown,
  slug,
  onDirectClick,
  productType = "trek",
  onMouseEnterContent,
  onMouseLeaveContent,
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setSelectedCategory(items[0]);
    }
  }, [isOpen, items]);

  const handleCategoryHover = (category: Category) => {
    setSelectedCategory(category);
  };

  if (!hasDropdown) {
    return (
      <div
        onClick={onDirectClick}
        className="cursor-pointer transition-colors duration-200"
      >
        {trigger}
      </div>
    );
  }

  const selectedProducts = selectedCategory?.products || [];

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #9ca3af;
    }
  `;

  return (
    <div className="relative" ref={dropdownRef}>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <DropdownMenu open={isOpen} onOpenChange={() => { }} modal={false}>
        <DropdownMenuTrigger asChild>
          <div
            className="cursor-pointer transition-colors duration-200"
          >
            {trigger}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="p-0 min-w-[700px] max-w-[900px] animate-in fade-in-0 zoom-in-95 duration-200"
          align="start"
          side="bottom"
          sideOffset={8}
          onMouseEnter={onMouseEnterContent}
          onMouseLeave={onMouseLeaveContent}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 flex">
            {/* Sidebar - Categories */}
            <div className="w-64 bg-gray-50 rounded-l-lg">
              <div className="max-h-[400px] overflow-y-auto scroll-smooth custom-scrollbar">
                {items.map((category) => (
                  <div
                    key={category.id}
                    onMouseEnter={() => handleCategoryHover(category)}
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ease-out flex items-center justify-between group ${selectedCategory?.id === category.id
                      ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                      : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    <span className="font-medium text-md">{category.name}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-all duration-200 ${selectedCategory?.id === category.id
                        ? "text-green-500 translate-x-0.5"
                        : "text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5"
                        }`}
                    />
                  </div>
                ))}
              </div>
              {slug && (
                <Link href={slug}>
                  <Button
                    variant="outline"
                    className="bg-transparent border-none shadow-none hover:bg-green-100 rounded-none w-full rounded-bl-lg text-sm text-gray-600 flex items-center justify-start py-3 mt-2 transition-all duration-200"
                    onClick={() => onToggle()}
                  >
                    View All
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Content Area - Products List */}
            <div className="flex-1 p-6">
              {selectedProducts.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-opacity duration-200">
                    {selectedCategory?.name}
                  </h3>
                  <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto scroll-smooth custom-scrollbar pr-2">
                    {selectedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${productType}/${product.slug}`}
                        onClick={() => onItemClick(product)}
                        className="group block"
                      >
                        <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all duration-200 ease-out hover:-translate-y-0.5">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                              {product.name}
                            </h4>
                          </div>
                          {product.featured_image && (
                            <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={product.featured_image.url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                              />
                            </div>
                          )}
                          <ChevronRight
                            size={18}
                            className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>No products available</p>
                </div>
              )}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomDropdown;

