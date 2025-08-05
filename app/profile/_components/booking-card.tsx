"use client";
import { Button } from "@/components/ui/button";
import { StayAndReview } from "@/lib/utils/server/get-user-booking-history";
import { IconMapPin } from "@tabler/icons-react";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import ReviewForm from "./review-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface BaseProps {
  loading?: boolean;
}

interface LoadingProps extends BaseProps {
  loading: true;
}

interface NonLoadingProps extends BaseProps {
  data: StayAndReview;
}

type Props = LoadingProps | NonLoadingProps;

function BookingCard(props: Props) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (props.loading) {
    return <Skeleton className="w-full h-72 rounded-2xl" />;
  }

  const data = props.data;

  return (
    <div className="border rounded-2xl p-3">
      <article className="grid lg:grid-cols-2 lg:gap-5 relative">
        <div>
          <Image
            className="rounded-2xl aspect-video object-cover h-full bg-white"
            src={data.product.featured_image}
            alt={data.product.name}
            width={800}
            height={800}
          />
        </div>
        <div className="flex flex-col gap-2 p-2 lg:p-2 lg:px-0">
          <h2 className="lg:text-xl font-semibold">{data.product.name}</h2>
          <p className="test-sm lg:text-base">{data.product.tagline}</p>
          <h4 className="grid grid-cols-[20px_auto] gap-1 items-center truncate font-medium">
            <IconMapPin className="text-red-500" size={20} />
            {data.product.location}
          </h4>
          {data.from_date && data.to_date && (
            <p>
              Inquired for <br />
              <span className="font-semibold">
                {format(data.from_date, "dd/MM/yyyy")} to {format(data.to_date, "dd/MM/yyyy")} (
                {differenceInDays(data.to_date, data.from_date)} days)
              </span>
            </p>
          )}
          {data.status === "completed" && (
            <Button className="text-base mt-3" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Hide Review" : data.review_eligible ? "Write your review" : "View review"}
            </Button>
          )}
        </div>
        <Badge className="capitalize absolute top-4 left-0 rounded-none rounded-r-full text-sm">{data.status}</Badge>
      </article>
      {showReviewForm && data.status === "completed" && (
        <ReviewForm bookingId={data.booking_id} data={data.review} reviewEligible={data.review_eligible} />
      )}
    </div>
  );
}

export default BookingCard;
