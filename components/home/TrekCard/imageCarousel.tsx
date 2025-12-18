import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  rating?: number;
  discount?: string;
}

const ImageCarousel = ({
  images,
  alt,
  rating,
  discount,
}: ImageCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initial state
    updateScrollState();

    // Listen for slide changes
    api.on("select", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
    };
  }, [api]);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-t-[32px]">
      <Carousel setApi={setApi} className="w-full h-full group">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-64">
                <Image
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:cursor-not-allowed"
          disabled={!canScrollPrev}
        />
        <CarouselNext
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 disabled:cursor-not-allowed"
          disabled={!canScrollNext}
        />
      </Carousel>

      {rating && (
        <Badge className="absolute top-3 left-3 bg-black/70 text-white hover:bg-black/70">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
          {rating}
        </Badge>
      )}

      {discount && (
        <div className="absolute bottom-1 left-1 rounded-full text-black ">
          <Image
            src="/assets/icons/stars.svg"
            alt="Discount Icon"
            width={50}
            height={50}
            className="inline-block mr-1"
          />
          <p className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {discount}% <br /> Off
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
