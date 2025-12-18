"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AvailabilityBanner from "./AvailabilityBanner";
import ImageCarousel from "./imageCarousel";
import PriceSection from "./PriceSection";
import TrekDetails from "./TrekDetails";
import { useRouter } from "next/navigation";
import { RelatedCircuit } from "@/components/ProductDetail/type";

const RelatedTrekCard = (product: RelatedCircuit) => {
  const router = useRouter();

  // Handle images - RelatedCircuit might have a different structure
  const images = product.featuredImage?.url
    ? [
      product.featuredImage.url,
      ...(product.featuredImages?.map((img) => img.url) || []),
    ]
    : product.featuredImages?.map((img) => img.url) || [];

  // Handle pricing for RelatedCircuit
  const lowestPrice =
    product.prices && product.prices.length > 0
      ? product.prices.reduce((min, price) => {
        const currentPrice = parseFloat(price.original_price_usd);
        return currentPrice < min ? currentPrice : min;
      }, parseFloat(product.prices[0]?.original_price_usd || "0"))
      : 0;

  const hasDiscount =
    product.prices && product.prices.length > 0
      ? product.prices.some(
        (price) => parseFloat(price.discounted_price_usd || "0") > 0
      )
      : false;

  const discountedPrice =
    hasDiscount && product.prices
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

  const handleCardClick = () => {
    let routeType = "";
    switch (product.type?.toLowerCase()) {
      case "trek":
        routeType = "trek";
        break;
      case "tour":
        routeType = "tour";
        break;
      case "activity":
        routeType = "activities";
        break;
      default:
        routeType = product.type?.toLowerCase() || "trek";
    }

    const slugParts = product.slug?.split("/") || [];
    const cleanSlug = slugParts[slugParts.length - 1] || product.id;

    const route = `/${routeType}/${cleanSlug}`;
    router.push(route);
  };

  return (
    <div className="mx-auto">
      <Card className=" overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 relative">
         {/* Gradient border wrapper */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-[#086032] via-[#7A7E77] to-[#DDE4D7] p-[1px]">
          <div className="w-full h-full bg-white rounded-[32px]"></div>
        </div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          <ImageCarousel
            images={images}
            alt={product.name || "Product"}
            rating={4.5}
            discount={discountPercentage > 0 ? `${discountPercentage}` : ""}
          />

          <CardContent
            className="p-2 space-y-2 w-full cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="py-3 px-2 flex flex-col items-start justify-start w-full">
              <h2 className="text-lg leading-tight font-bold text-gray-900 mb-3 line-clamp-2">
                {product.name || "Unnamed Product"}
              </h2>

              <div className="flex items-center justify-between w-full">
                <TrekDetails
                  duration={`${product.overview?.duration || "N/A"} days`}
                  minPeople={`${product.overview?.group_size || "N/A"}`}
                  difficulty={product.overview?.trip_grade || "Moderate"}
                />
                <PriceSection
                  currentPrice={discountedPrice || lowestPrice.toString()}
                  originalPrice={hasDiscount ? lowestPrice.toString() : ""}
                  currency="USD"
                />
              </div>
            </div>

            <AvailabilityBanner
              availableSeats={`${product.overview?.group_size || "N/A"} seats`}
              date={product.overview?.best_time || "Year round"}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default RelatedTrekCard;
