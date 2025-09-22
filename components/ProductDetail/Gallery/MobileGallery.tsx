"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MobileGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const MobileGallery = ({ images, onImageClick }: MobileGalleryProps) => {
  // Don't render if no images
  if (!images || images.length === 0) {
    return (
      <div className="block md:hidden w-full h-[300px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="block md:hidden w-full">
      <Carousel className="w-full">
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={500}
                  height={300}
                  className="object-cover cursor-pointer"
                  onClick={() => onImageClick(index)}
                  sizes="100vw"
                />
                {/* Image counter overlay */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {index + 1} / {images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default MobileGallery;
