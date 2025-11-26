"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AvailabilityBanner from "../home/TrekCard/AvailabilityBanner ";
import ImageCarousel from "../home/TrekCard/imageCarousel";
import PriceSection from "../home/TrekCard/PriceSection";
import TrekDetails from "../home/TrekCard/TrekDetails";

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
  average_rating: number | null;
  total_rating: number | null;
  wishlist: number;
  featuredImage:
    | string
    | {
        url: string;
      };
  featuredImages: Array<
    | string
    | {
        url: string;
      }
  >;
  tags: Array<{
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
  }>;
  prices: Array<{
    product_id: number;
    number_of_people: number;
    original_price_usd: string;
    discounted_price_usd: string;
  }>;
  overview: {
    product_id: number;
    duration: string;
    trip_grade: string;
    max_altitude: string;
    group_size: number;
    best_time: string;
    starts: string;
  };
}

const ProductCard: React.FC<Product> = (product) => {
  const router = useRouter();

  // Extract image URLs properly
  const getImageUrl = (img: string | { url: string }): string => {
    if (typeof img === "string") return img;
    return img?.url || "";
  };

  const images = [
    getImageUrl(product.featuredImage),
    ...(product.featuredImages?.map(getImageUrl) || []),
  ].filter(Boolean);

  // Price calculations
  const calculatePrices = () => {
    if (!product.prices?.length)
      return {
        lowestPrice: 0,
        hasDiscount: false,
        discountedPrice: null,
        discountPercentage: 0,
      };

    const lowestPrice = product.prices.reduce((min, price) => {
      const currentPrice = parseFloat(price.original_price_usd || "0");
      return currentPrice < min && currentPrice > 0 ? currentPrice : min;
    }, parseFloat(product.prices[0]?.original_price_usd || "0"));

    const hasDiscount = product.prices.some(
      (price) => parseFloat(price.discounted_price_usd || "0") > 0
    );

    const discountedPrice = hasDiscount
      ? product.prices.find(
          (price) => parseFloat(price.discounted_price_usd || "0") > 0
        )?.discounted_price_usd
      : null;

    const discountPercentage =
      hasDiscount && discountedPrice && lowestPrice > 0
        ? Math.round(
            ((lowestPrice - parseFloat(discountedPrice)) / lowestPrice) * 100
          )
        : 0;

    return { lowestPrice, hasDiscount, discountedPrice, discountPercentage };
  };

  const { lowestPrice, hasDiscount, discountedPrice, discountPercentage } =
    calculatePrices();

  // Navigation handler
  const handleCardClick = () => {
    const routeMap: { [key: string]: string } = {
      trek: "trek",
      tour: "tour",
      activity: "activities",
    };

    const routeType =
      routeMap[product.type?.toLowerCase()] ||
      product.type?.toLowerCase() ||
      "product";
    const slugParts = product.slug?.split("/") || [];
    const cleanSlug =
      slugParts[slugParts.length - 1] || product.id?.toString() || "";
    const route = `/${routeType}/${cleanSlug}`;

    router.push(route);
  };

  // Safe data extraction
  const safeData = {
    name: product.name || "Untitled Trek",
    rating: product.average_rating || 4.0,
    duration: product.overview?.duration
      ? `${product.overview.duration} days`
      : "Duration TBD",
    groupSize: product.overview?.group_size?.toString() || "TBD",
    difficulty: product.overview?.trip_grade || "Moderate",
    bestTime: product.overview?.best_time || "Year round",
    availableSeats: `${product.overview?.group_size || 0} seats`,
  };

  return (
    <Card className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 relative">
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-[#71B344] via-[#7A7E77] to-[#DDE4D7] p-[1px]">
        <div className="w-full h-full bg-white rounded-[32px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ImageCarousel
          images={images.length > 0 ? images : ["/assets/placeholder-trek.jpg"]}
          alt={safeData.name}
          rating={safeData.rating}
          discount={discountPercentage > 0 ? discountPercentage.toString() : ""}
        />

        <CardContent
          className="p-4 space-y-3 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#71B344] transition-colors">
              {safeData.name}
            </h2>

            <div className="flex items-center justify-between">
              <TrekDetails
                duration={safeData.duration}
                minPeople={safeData.groupSize}
                difficulty={safeData.difficulty}
              />
              <PriceSection
                currentPrice={discountedPrice || lowestPrice.toString()}
                originalPrice={hasDiscount ? lowestPrice.toString() : ""}
                currency="$"
              />
            </div>
          </div>

          <AvailabilityBanner
            availableSeats={safeData.availableSeats}
            date={safeData.bestTime}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
