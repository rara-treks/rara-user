"use client";


import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ReviewCard from "./ReviewCard";
import { Review } from "./types";

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  return (
    <div className="w-full md:hidden">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem
              key={review.id || index}
              className="pl-2 md:pl-4 basis-[85%]"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
