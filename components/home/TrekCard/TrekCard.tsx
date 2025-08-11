"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AvailabilityBanner from "./AvailabilityBanner ";
import ImageCarousel from "./imageCarousel";
import PriceSection from "./PriceSection";
import TrekDetails from "./TrekDetails";
import { TrekCardProps } from "@/types/home.types";

const TrekCard = (props: TrekCardProps) => {
  const {
    title = "",
    images = [],
    rating = 0,
    discount = "",
    duration = "",
    minPeople = "",
    difficulty = "",
    currentPrice = "",
    originalPrice = "",
    currency = "",
    availableSeats = "",
    availabilityDate = "",
    onBookNow,
    onViewDetails,
  } = props;

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      console.log("Book now clicked");
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      console.log("View details clicked");
    }
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
            alt={title}
            rating={rating}
            discount={discount}
          />

          <CardContent className="p-2 space-y-2 w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>

              <div className="flex items-center justify-between w-full">
                <TrekDetails
                  duration={duration}
                  minPeople={minPeople}
                  difficulty={difficulty}
                />
                <PriceSection
                  currentPrice={currentPrice}
                  originalPrice={originalPrice}
                  currency={currency}
                />
              </div>
            </div>

            <AvailabilityBanner
              availableSeats={availableSeats}
              date={availabilityDate}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default TrekCard;
