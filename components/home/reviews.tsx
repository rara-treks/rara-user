import React from "react";
import TextWithBrandmark from "../text-with-brandmark";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductReview } from "@/types/product.types";
import ReviewCard2 from "../product/reviews/review-card-2";
import TripadvisorRating from "../tripadvisor-rating";
import BookingComRating from "../booking-com-rating";

interface Props {
  data: ProductReview[];
}

function Reviews({ data }: Props) {
  if (data.length === 0) return null;
  return (
    <section>
      <div className="container">
        <TextWithBrandmark type="h2" size={70} className="justify-center">
          Reviews
        </TextWithBrandmark>
        <div className="flex gap-4 justify-center mt-5">
          <TripadvisorRating />
          <BookingComRating />
        </div>
        <div className="mt-10 overflow-hidden -mx-5">
          <Carousel
            className="overflow-visible *:overflow-visible pr-14 lg:pr-24 cursor-grab select-none"
            opts={{
              skipSnaps: true,
            }}
          >
            <CarouselContent className="pb-1">
              {data.map((review) => (
                <CarouselItem className="sm:basis-1/2 lg:basis-1/3 pt-10 pl-6" key={review.id}>
                  <ReviewCard2
                    name={review.user_name}
                    productName={review.product_name}
                    rating={Number(review.overall_rating ?? 0)}
                    review={review.public_review}
                    countryCode={review.user_country}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
