"use client";

import React, { useState, useEffect } from "react";
import CustomDropdown from "./NavData/CustomDropdown";
import NavItem from "./NavData/NavItem";

// Type definitions for API response
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

// Navigation item structure
interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  slug?: string;
}

// Static navigation structure
const STATIC_NAVIGATION: NavigationItem[] = [
  // {
  //   id: "destination",
  //   label: "Destination",
  //   icon: "PersonSimpleHike",
  //   slug: "/trek",
  // },
  {
    id: "trekking",
    label: "Trekking",
    icon: "PersonSimpleHike",
    slug: "/trek",
  },
  {
    id: "tour",
    label: "Tour",
    icon: "Jeep",
    slug: "/tour",
  },
  {
    id: "activities",
    label: "Activities",
    icon: "Mountains",
    slug: "/activities",
  },
  {
    id: "departures",
    label: "Departures",
    icon: "AirplaneTakeoff",
    slug: "/departures",
  },
  {
    id: "car-rental",
    label: "Car Rental",
    icon: "Jeep",
    slug: "/car-rental",
  },
];

const NavigationMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownData, setDropdownData] = useState<Record<string, Category[]>>(
    {}
  );
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product/homepage/navbar/list");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        // Store raw categories - NO TRANSFORMATION
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

  const handleMouseEnter = (itemId: string) => {
    // Clear any pending timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    // Set a small delay before closing to allow moving between items smoothly
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDropdownToggle = (itemId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleItemClick = (product: Product) => {
    setActiveDropdown(null);
  };

  const handleDirectNavigation = (slug: string) => {
    setActiveDropdown(null);
  };

  return (
    <div className="w-full flex justify-center gap-4 pb-6 bg-[#F2F5F0] items-center py-6">
      {STATIC_NAVIGATION.map((navItem) => {
        const isActive = activeDropdown === navItem.id;
        const dropdownItems = dropdownData[navItem.id] || [];
        const hasDropdown = dropdownItems.length > 0;

        return (
          <div
            key={navItem.id}
            onMouseEnter={() => hasDropdown && handleMouseEnter(navItem.id)}
            onMouseLeave={handleMouseLeave}
          >
            <CustomDropdown
              items={dropdownItems}
              trigger={
                <NavItem
                  icon={navItem.icon}
                  label={navItem.label}
                  isActive={hasDropdown ? isActive : false}
                  hasDropdown={hasDropdown}
                  slug={navItem.slug}
                />
              }
              isOpen={isActive}
              onToggle={() => handleDropdownToggle(navItem.id)}
              onItemClick={handleItemClick}
              hasDropdown={!!hasDropdown}
              slug={navItem.slug}
              productType={navItem.id === "trekking" ? "trek" : navItem.id}
              onDirectClick={() =>
                navItem.slug && handleDirectNavigation(navItem.slug)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default NavigationMenu;
