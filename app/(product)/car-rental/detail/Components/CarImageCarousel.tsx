"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarImageCarouselProps {
  images: string[];
}

export default function CarImageCarousel({ images }: CarImageCarouselProps) {
  return (
    <div className="w-full  mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Car view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
      </Carousel>
    </div>
  );
}
