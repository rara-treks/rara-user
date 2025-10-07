"use client";

import React, { useState, useEffect } from "react";
import CustomDropdown from "./NavData/CustomDropdown";
import NavItem from "./NavData/NavItem";
import { DropdownItem } from "./NavData/type";

// Type definitions for API response
interface Price {
  product_id: number;
  number_of_people: number;
  original_price_usd: string;
  discounted_price_usd: string;
}

interface Tag {
  id: number;
  name: string;
  description: string;
  display_order: string;
  zoom_level: string;
  slug: string;
  latitude: string;
  longitude: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

interface Product {
  id: number;
  name: string;
  tagline: string;
  slug: string;
  type: string;
  display_order: string;
  latitude: number;
  longitude: number;
  location: string;
  average_rating: string | null;
  total_rating: string | null;
  wishlist: number;
  featuredImage: string;
  featuredImages: string[];
  tags: Tag[];
  prices: Price[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    trek: Product[];
    tour: Product[];
    activities: Product[];
  };
}

// Navigation item structure
interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  slug?: string;
  dropdownItems?: DropdownItem[];
}

const NavigationMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [navigationData, setNavigationData] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Transform API products into dropdown items
  const transformProductsToDropdownItems = (
    products: Product[]
  ): DropdownItem[] => {
    return products.map((product) => ({
      id: product.id.toString(),
      label: product.name,
      description:
        product.tagline || `Explore ${product.name} in ${product.location}`,
      slug: `/${product.type}/${product.slug}`,
      image: product.featuredImage,
    }));
  };

  const generateNavigationData = (
    apiResponse: ApiResponse
  ): NavigationItem[] => {
    const { trek, tour, activities } = apiResponse.data;

    return [
      {
        id: "trekking",
        label: "Trekking",
        icon: "PersonSimpleHike",
        slug: "/trek",
        dropdownItems: transformProductsToDropdownItems(trek),
      },
      {
        id: "tour",
        label: "Tour",
        icon: "Jeep",
        slug: "/tour",
        dropdownItems: transformProductsToDropdownItems(tour),
      },
      {
        id: "activities",
        label: "Activities",
        icon: "Mountains",
        slug: "/activities",
        dropdownItems: transformProductsToDropdownItems(activities),
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
  };

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/homepage/product/list");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setApiData(data);

        // Generate navigation data from API response
        const generatedNavData = generateNavigationData(data);
        setNavigationData(generatedNavData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleItemClick = (item: DropdownItem) => {
    setActiveDropdown(null);
  };

  const handleDirectNavigation = (slug: string) => {
    setActiveDropdown(null);
  };

  return (
    <div className="w-full flex justify-center gap-24 pb-6 bg-[#F2F5F0] items-center py-6">
      {navigationData.map((navItem) => {
        const isActive = activeDropdown === navItem.id;
        const hasDropdown =
          navItem.dropdownItems && navItem.dropdownItems.length > 0;

        return (
          <CustomDropdown
            key={navItem.id}
            items={navItem.dropdownItems}
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
            onDirectClick={() =>
              navItem.slug && handleDirectNavigation(navItem.slug)
            }
          />
        );
      })}
    </div>
  );
};

export default NavigationMenu;
