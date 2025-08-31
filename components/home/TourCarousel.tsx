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

  interface TrekCarouselProps {
    title?: string;
    data: any[];
  }

  const TourCarousel = ({
    title = "",
    data,
  }: TrekCarouselProps) => {
    return (
      <div className="w-full mx-auto py-8">
        {/* Header with title and navigation buttons */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl lg:text-2xl font-satisfy">
              Popular destination
            </p>
            <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
              Trending <p className="text-[#71B344]">{title}</p>
            </h1>
          </div>
          {/* Custom navigation buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-16 rounded-full bg-[#71B344] text-white cursor-pointer border-2 border-gray-300 hover:border-[#71B344] hover:bg-[#71B344] hover:text-white transition-all duration-300"
              onClick={() => {
                const prevButton = document.querySelector(
                  '[data-carousel="prev"]'
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
                  '[data-carousel="next"]'
                ) as HTMLButtonElement;
                nextButton?.click();
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-2 md:-ml-4 pb-6">
            {data.map((trek, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 snap-start"
              >
                <TrekCard {...trek} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Hidden default carousel buttons for programmatic access */}
          <CarouselPrevious className="hidden" data-carousel="prev" />
          <CarouselNext className="hidden" data-carousel="next" />
        </Carousel>

        <div className="w-full flex items-center justify-center">
          <Button className="flex items-center gap-1 border border-[#71B344]">
            View All <ArrowRight className="w-4 h-4"/>
          </Button>
        </div>
      </div>
    );
  };

  export default TourCarousel;
