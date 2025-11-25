"use client";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import TrekCard from "./TrekCard/TrekCard";
import { TourCarouselProps } from "@/types/prod";
import { useRouter } from "next/navigation";

const TourCarousel = ({
  title1 = "",
  title = "",
  id = "",
  data,
}: TourCarouselProps) => {
  const router = useRouter();

  const getDisplayTitle = () => {
    switch (title.toLowerCase()) {
      case "trek":
        return "Treks";
      case "tour":
        return "Tours";
      case "activity":
        return "Activities";
      default:
        return title;
    }
  };

  const getSubtitle = () => {
    switch (id.toLowerCase()) {
      case "trek":
        return "Adventure awaits";
      case "tour":
        return "Discover Nepal";
      case "activity":
        return "A Thrilling experiences";
      default:
        return "Popular destination";
    }
  };

  // ✅ Path for redirect
  const getPath = () => {
    switch (title.toLowerCase()) {
      case "trek":
        return "/trek";
      case "tour":
        return "/tour";
      case "activity":
        return "/activities";
      default:
        return "/";
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full mx-auto py-8">
        <div className="text-center text-gray-500">
          No {title.toLowerCase()}s available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-8">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-1">
          <p className="text-xl lg:text-2xl font-satisfy">{getSubtitle()}</p>
          <h1 className="text-3xl lg:text-4xl flex items-center gap-2 font-bold text-gray-900">
            {title1} <p className="text-[#71B344]">{getDisplayTitle()}</p>
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-16 rounded-full bg-[#71B344] text-white cursor-pointer border-2 border-gray-300 hover:border-[#71B344] hover:bg-[#71B344] hover:text-white transition-all duration-300"
            onClick={() => {
              const prevButton = document.querySelector(
                `[data-carousel="prev-${title}"]`
              ) as HTMLButtonElement;
              prevButton?.click();
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-16 rounded-full bg-[#71B344] text-white cursor-pointer border-2 border-gray-300 hover:border-[#71B344] hover:bg-[#71B344] hover:text-white transition-all duration-300"
            onClick={() => {
              const nextButton = document.querySelector(
                `[data-carousel="next-${title}"]`
              ) as HTMLButtonElement;
              nextButton?.click();
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-2 md:-ml-4 pb-6 items-stretch">
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 sm:pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 snap-start flex"
            >
              <TrekCard {...product} className="h-full w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden" data-carousel={`prev-${title}`} />
        <CarouselNext className="hidden" data-carousel={`next-${title}`} />
      </Carousel>

      <div className="w-full flex items-center justify-center">
        <Button
          onClick={() => router.push(getPath())}
          className="flex items-center gap-1 border border-[#71B344] bg-white text-[#71B344] hover:bg-[#71B344] hover:text-white transition-all duration-300"
        >
          View All {getDisplayTitle()} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TourCarousel;