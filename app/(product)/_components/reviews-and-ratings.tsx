"use client";
import React, { useMemo } from "react";
import RatingSummaryCard from "../../../components/product/reviews/rating-summary-card";
import ReviewCard from "../../../components/product/reviews/review-card";
import { ProductReviewResponse } from "@/lib/utils/server/get-product-reviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Props {
  product: {
    id: number;
    slug: string;
  };
  initialData: ProductReviewResponse;
}

function ReviewsAndRatings({ product, initialData }: Props) {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["product-reviews", product.id, product.slug],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.post(
        `/api/product/detail/review/${product.slug}`,
        {},
        {
          params: {
            page: pageParam,
            per_page: 5,
          },
        }
      );

      return data.data as ProductReviewResponse;
    },
    initialData: {
      pageParams: [1],
      pages: [initialData],
    },
    getNextPageParam: (data) =>
      data.reviews.current_page === data.reviews.last_page ? undefined : data.reviews.current_page + 1,
    getPreviousPageParam: (data) => (data.reviews.current_page === 1 ? undefined : data.reviews.last_page - 1),
    initialPageParam: 1,
  });

  const combinedData = useMemo(() => data.pages.flatMap((page) => page), [data]);
  const reviews = useMemo(() => combinedData.flatMap((data) => data.reviews.data), [combinedData]);

  if (reviews.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Reviews & Ratings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RatingSummaryCard
          averageRating={combinedData[0].review_stats.average_rating}
          totalRatings={combinedData[0].review_stats.total_reviews}
          starRatings={combinedData[0].review_stats.rating_distribution}
        />
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.user.name}
            countryCode={review.user.country}
            rating={review.overall_rating}
            review={review.public_review}
            reply={review.reply_to_public_review}
          />
        ))}
      </div>
      {hasNextPage && (
        <Button
          className="w-fit mx-auto bg-primary-mustard text-white border-none"
          variant="outline"
          loading={isPending || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </section>
  );
}

export default ReviewsAndRatings;
