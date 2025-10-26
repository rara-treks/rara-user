"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Type definitions
interface FeaturedImage {
  id: number;
  url: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  featured_image: FeaturedImage | null;
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

interface ApiResponseData {
  trek: Category[];
  activities: Category[];
  tour: Category[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    data: ApiResponseData;
  };
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  slug?: string;
}

const iconComponents = {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
};

// Static navigation structure matching desktop
const STATIC_NAVIGATION: NavigationItem[] = [
  {
    id: "trekking",
    label: "Trekking",
    icon: PersonSimpleHike,
    slug: "/trek",
  },
  {
    id: "tour",
    label: "Tour",
    icon: Jeep,
    slug: "/tour",
  },
  {
    id: "activities",
    label: "Activities",
    icon: Mountains,
    slug: "/activities",
  },
  {
    id: "departures",
    label: "Departures",
    icon: AirplaneTakeoff,
    slug: "/departures",
  },
  {
    id: "car-rental",
    label: "Car Rental",
    icon: Jeep,
    slug: "/car-rental",
  },
];

const MobileMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchMove, setTouchMove] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [dropdownData, setDropdownData] = useState<Record<string, Category[]>>(
    {}
  );
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product/homepage/navbar/list");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        setDropdownData({
          trekking: data.data.data.trek,
          tour: data.data.data.tour,
          activities: data.data.data.activities,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (itemId: string, isOpen: boolean) => {
    setActiveDropdown(isOpen ? itemId : null);
    if (!isOpen) {
      setExpandedCategory(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setTouchMove({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchMove({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });

    const deltaX = Math.abs(e.touches[0].clientX - touchStart.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStart.y);

    if (deltaX > deltaY && deltaX > 10) {
      setIsSwiping(true);
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSwiping) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getProductType = (navId: string) => {
    return navId === "trekking" ? "trek" : navId;
  };

  return (
    <div className="w-full px-4 py-2">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full max-w-sm mx-auto"
      >
        <CarouselContent>
          {STATIC_NAVIGATION.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeDropdown === item.id;
            const categories = dropdownData[item.id] || [];
            const hasDropdown = categories.length > 0;

            return (
              <CarouselItem key={item.id} className="basis-1/4">
                {hasDropdown ? (
                  <DropdownMenu
                    onOpenChange={(isOpen) =>
                      handleDropdownChange(item.id, isOpen)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <div
                        className="flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200 p-2"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onClick={handleClick}
                      >
                        <IconComponent
                          size={24}
                          weight="fill"
                          className={
                            isActive ? "text-green-600" : "!text-gray-700"
                          }
                        />
                        <span className="flex items-center text-center gap-1">
                          <p
                            className={`text-xs transition-colors text-center duration-200 font-medium ${
                              isActive ? "text-green-600" : "!text-gray-800"
                            }`}
                          >
                            {item.label}
                          </p>
                          <ChevronDown
                            className={`transition-all duration-200 ${
                              isActive
                                ? "rotate-180 text-green-600"
                                : "!text-gray-800"
                            }`}
                            size={12}
                          />
                        </span>
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="center"
                      className="w-72 max-h-96 overflow-y-auto"
                      side="bottom"
                    >
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="border-b last:border-b-0"
                        >
                          <div
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-50"
                          >
                            <span className="font-medium text-sm text-gray-900">
                              {category.name}
                            </span>
                            <ChevronRight
                              size={16}
                              className={`transition-transform duration-200 ${
                                expandedCategory === category.id
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </div>
                          {expandedCategory === category.id && (
                            <div className="bg-gray-50">
                              {category.products.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/${getProductType(item.id)}/${
                                    product.slug
                                  }`}
                                  onClick={() =>
                                    handleDropdownChange(item.id, false)
                                  }
                                >
                                  <DropdownMenuItem className="cursor-pointer px-6 py-2 text-sm text-gray-700">
                                    {product.name}
                                  </DropdownMenuItem>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {item.slug && (
                        <Link href={item.slug}>
                          <DropdownMenuItem
                            className="cursor-pointer font-medium text-sm text-green-600 hover:bg-green-50"
                            onClick={() => handleDropdownChange(item.id, false)}
                          >
                            View All
                            <ChevronRight size={14} className="ml-1" />
                          </DropdownMenuItem>
                        </Link>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.slug || "#"}>
                    <div className="flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200 p-2">
                      <IconComponent
                        size={24}
                        weight="fill"
                        className="!text-gray-700"
                      />
                      <p className="text-xs font-medium whitespace-nowrap !text-gray-800">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileMenu;
