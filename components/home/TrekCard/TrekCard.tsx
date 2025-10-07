"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AvailabilityBanner from "./AvailabilityBanner ";
import ImageCarousel from "./imageCarousel";
import PriceSection from "./PriceSection";
import TrekDetails from "./TrekDetails";
import { useRouter } from "next/navigation";
import { Product } from "@/types/prod";

const TrekCard = (product: Product) => {
  const router = useRouter();

  const images = [
    product.featuredImage.url,
    ...product.featuredImages.map((img) => img.url),
  ];

  const lowestPrice = product.prices.reduce((min, price) => {
    const currentPrice = parseFloat(price.original_price_usd);
    return currentPrice < min ? currentPrice : min;
  }, parseFloat(product.prices[0]?.original_price_usd || "0"));

  const hasDiscount = product.prices.some(
    (price) => parseFloat(price.discounted_price_usd) > 0
  );

  const discountedPrice = hasDiscount
    ? product.prices.find((price) => parseFloat(price.discounted_price_usd) > 0)
        ?.discounted_price_usd
    : null;

  const discountPercentage =
    hasDiscount && discountedPrice
      ? Math.round(
          ((lowestPrice - parseFloat(discountedPrice)) / lowestPrice) * 100
        )
      : 0;

  const handleCardClick = () => {
    let routeType = "";
    switch (product.type.toLowerCase()) {
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
        routeType = product.type.toLowerCase();
    }

    const slugParts = product.slug.split("/");
    const cleanSlug = slugParts[slugParts.length - 1];

    const route = `/${routeType}/${cleanSlug}`;
    router.push(route);
  };

  return (
    <div className="mx-auto">
      <Card className="p-2 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 relative">
        {/* Gradient border wrapper */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#71B344] via-[#7A7E77] to-[#DDE4D7] p-[1px]">
          <div className="w-full h-full bg-white rounded-lg"></div>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          <ImageCarousel
            images={images}
            alt={product.name}
            rating={4.5} 
            discount={discountPercentage > 0 ? `${discountPercentage}` : ""}
          />

          <CardContent
            className="p-2 space-y-2 w-full cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="flex flex-col items-start justify-start w-full">
              <h2
                className="text-lg leading-tight font-bold text-gray-900 mb-3 line-clamp-2"
              >
                {product.name}
              </h2>

              <div className="flex items-center justify-between w-full">
                <TrekDetails
                  duration={`${product.overview.duration} days`}
                  minPeople={`${product.overview.group_size}`}
                  difficulty={product.overview.trip_grade}
                />
                <PriceSection
                  currentPrice={discountedPrice || lowestPrice.toString()}
                  originalPrice={hasDiscount ? lowestPrice.toString() : ""}
                  currency="USD"
                />
              </div>
            </div>

            <AvailabilityBanner
              availableSeats={`${product.overview.group_size} seats`}
              date={product.overview.best_time}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default TrekCard;
