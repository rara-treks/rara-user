"use client";

import { useEffect, useState } from "react";
import TrekReviewDialog from "./ReviewPopup";
import ReviewList from "./Reviews/ReviewList";
import EmptyReviewState from "./Reviews/EmptyReviewState";
import ReviewCarousel from "./Reviews/ReviewCarousel";
import ReviewHeader from "./Reviews/ReviewHeader";
import { Review as ReviewType, ReviewData } from "./Reviews/types";

interface ReviewProps {
  data: {
    id: number;
    slug: string;
    title: string;
    average_rating: number;
    total_rating: number;
    total_comment: number;
  };
}

// Cache to store reviews data across component re-renders
const reviewsCache = new Map<
  string,
  {
    reviews: ReviewType[];
    title: string;
    timestamp: number;
  }
>();

const Review = ({ data }: ReviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract slug from the data prop
  const { slug } = data;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Check if reviews are already cached for this slug
        const cachedData = reviewsCache.get(slug);

        if (cachedData) {
        
          setReviews(cachedData.reviews);
          setTitle(cachedData.title);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);


        const response = await fetch(
          `/api/product/product/detail/review/${slug}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              slug: slug,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse = await response.json();

        // Extract data from the nested response structure
        const reviewData = apiResponse.data?.data;

        if (reviewData) {

          const productTitle = reviewData.product_name || "";
          setTitle(productTitle);

          // Transform API reviews to match your ReviewCard component expectations
          const transformedReviews =
            reviewData.reviews?.data?.map((review: any, index: number) => ({
              id: review.id,
              name: review.user?.name || "Guest",
              country: review.user?.country || null,
              email: review.user?.email,
              avatar: "/default-avatar.png", 
              trek: reviewData.product_name || "Trek",
              rating: Math.round(parseFloat(review.overall_rating)), 
              review: review.public_review || "No review provided",
              marginTop: index % 2 === 1 ? "mt-6" : "", 

              cleanliness: parseFloat(review.cleanliness),
              hospitality: parseFloat(review.hospitality),
              value_for_money: parseFloat(review.value_for_money),
              communication: parseFloat(review.communication),
              overall_rating: parseFloat(review.overall_rating),
              reply_to_public_review: review.reply_to_public_review,
              approved: review.approved,
              reviewed_at: review.reviewed_at,
            })) || [];

          setReviews(transformedReviews);

          // Cache the data for future use
          reviewsCache.set(slug, {
            reviews: transformedReviews,
            title: productTitle,
            timestamp: Date.now(),
          });
        } else {
          console.log("No review data found in response");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchReviews();
    } else {
      setError("No slug provided");
      setLoading(false);
    }
  }, [slug, data]);

  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log("Review submitted");
  };

  const handleWriteReviewClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-red-500">Error loading reviews: {error}</div>
      </div>
    );
  }

  // Empty state
  if (!reviews || reviews.length === 0) {
    return (
      <EmptyReviewState
        title={title}
        isDialogOpen={isDialogOpen}
        onWriteReviewClick={handleWriteReviewClick}
        onCloseDialog={handleCloseDialog}
        onSubmit={handleReviewSubmit}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-6">
      <ReviewHeader onWriteReviewClick={handleWriteReviewClick} />

      {/* Mobile Carousel */}
      <ReviewCarousel reviews={reviews} />

      {/* Desktop List */}
      <ReviewList reviews={reviews} />

      {/* Review Dialog */}
      <TrekReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        trekTitle={title}
        prodId= {data.id}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Review;