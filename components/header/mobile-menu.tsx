"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Earth, Phone } from "lucide-react";
import {
  PersonSimpleHike,
  Jeep,
  Mountains,
  AirplaneTakeoff,
} from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

interface AboutNavItem {
  label: string;
  href: string;
}

const aboutNavItems: AboutNavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Why Travel With Us", href: "/about/why-travel-with-us" },
  { label: "Safety & Responsibility", href: "/about/safety-responsibility" },
  { label: "Meet Our Team", href: "/about/team" },
];

// Static navigation structure
const STATIC_NAVIGATION: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: PersonSimpleHike,
    slug: "/",
  },
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
  {
    id: "about",
    label: "About Us",
    icon: Earth,
    slug: "/about",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Phone,
    slug: "/contact",
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, onOpenChange }: MobileMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getProductType = (navId: string) => {
    return navId === "trekking" ? "trek" : navId;
  };

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle className="text-3xl text-[#086032]">Menu</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-20">
          {STATIC_NAVIGATION.map((item) => {
            const categories = dropdownData[item.id] || [];
            const hasDropdown = categories.length > 0;
            const isAboutSection = item.id === "about";

            return (
              <div key={item.id} className="border-b">
                {hasDropdown || isAboutSection ? (
                  <div>
                    <button
                      onClick={() =>
                        handleDropdownChange(
                          item.id,
                          activeDropdown !== item.id
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${activeDropdown === item.id ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {activeDropdown === item.id && (
                      <div className="bg-gray-50">
                        {isAboutSection ? (
                          // About Us dropdown
                          <>
                            {aboutNavItems.map((navItem, index) => (
                              <Link
                                key={index}
                                href={navItem.href}
                                onClick={handleLinkClick}
                              >
                                <div className="px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors border-b last:border-b-0">
                                  {navItem.label}
                                </div>
                              </Link>
                            ))}
                          </>
                        ) : (
                          // Products dropdown
                          <>
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className="border-b last:border-b-0"
                              >
                                <button
                                  onClick={() => toggleCategory(category.id)}
                                  className="w-full flex items-center justify-between px-6 py-2 hover:bg-gray-100 transition-colors"
                                >
                                  <span className="text-sm font-medium text-gray-900">
                                    {category.name}
                                  </span>
                                  <ChevronRight
                                    size={14}
                                    className={`transition-transform duration-200 ${expandedCategory === category.id
                                      ? "rotate-90"
                                      : ""
                                      }`}
                                  />
                                </button>

                                {expandedCategory === category.id && (
                                  <div className="bg-gray-100">
                                    {category.products.map((product) => (
                                      <Link
                                        key={product.id}
                                        href={`/${getProductType(item.id)}/${product.slug
                                          }`}
                                        onClick={handleLinkClick}
                                      >
                                        <div className="px-8 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                                          {product.name}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}

                            {item.slug && (
                              <Link href={item.slug} onClick={handleLinkClick}>
                                <div className="px-6 py-2 text-sm font-medium text-green-600 hover:bg-green-50 transition-colors flex items-center gap-1">
                                  View All
                                  <ChevronRight size={14} />
                                </div>
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.slug || "#"} onClick={handleLinkClick}>
                    <div className="px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                      {item.label}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
