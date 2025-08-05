"use client";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import RateStars from "./rate-stars";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Review } from "@/lib/utils/server/get-user-booking-history";
import { IconLoader2 } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/context/react-query-context";
import { ServerError } from "@/types/index.types";

interface Props {
  data: Review | null;
  bookingId: number;
  reviewEligible: boolean;
}

function ReviewForm({ data, bookingId, reviewEligible }: Props) {
  const [cleanlinessRating, setCleanlinessRating] = useState(Number(data?.cleanliness));
  const [hospitalityRating, setHospitalityRating] = useState(Number(data?.hospitality));
  const [valueForMoneyRating, setValueForMoneyRating] = useState(Number(data?.value_for_money));
  const [communicationRating, setCommunicationRating] = useState(Number(data?.communication));
  const [publicReview, setPublicReview] = useState(data?.public_review ?? "");
  const [privateReview, setPrivateReview] = useState(data?.private_review ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!cleanlinessRating || !hospitalityRating || !valueForMoneyRating || !communicationRating) {
        toast.error("Please fill all the ratings");
        return;
      }
      setIsSubmitting(true);
      await axios.post("/api/profile/add-review", {
        booking_id: bookingId,
        cleanliness: cleanlinessRating,
        hospitality: hospitalityRating,
        value_for_money: valueForMoneyRating,
        communication: communicationRating,
        public_review: publicReview,
        private_review: privateReview,
      });
      await queryClient.invalidateQueries({
        queryKey: ["booking-history"],
      });
      toast.success("Review submitted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>;
      toast.error(axiosError.response?.data?.error ?? "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-4">
      <h3 className="font-semibold">Write your review</h3>
      <hr className="py-2" />
      <form className="grid lg:grid-cols-[1.1fr_2fr_2fr] gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div>
            <Label>Cleanliness</Label>
            <RateStars
              rating={cleanlinessRating}
              onRatingSelected={(rating) => setCleanlinessRating(rating)}
              disabled={!reviewEligible}
            />
          </div>
          <div>
            <Label>Hospitality</Label>
            <RateStars
              rating={hospitalityRating}
              onRatingSelected={(rating) => setHospitalityRating(rating)}
              disabled={!reviewEligible}
            />
          </div>
          <div>
            <Label>Value for money</Label>
            <RateStars
              rating={valueForMoneyRating}
              onRatingSelected={(rating) => setValueForMoneyRating(rating)}
              disabled={!reviewEligible}
            />
          </div>
          <div>
            <Label>Communication</Label>
            <RateStars
              rating={communicationRating}
              onRatingSelected={(rating) => setCommunicationRating(rating)}
              disabled={!reviewEligible}
            />
          </div>
        </div>
        <div>
          <Label>Public Review</Label>
          <Textarea
            rows={5}
            value={publicReview}
            onChange={(e) => setPublicReview(e.target.value)}
            required
            readOnly={!!data?.public_review}
          />
        </div>
        <div>
          <Label>Private Review (optional)</Label>
          <Textarea
            rows={5}
            value={privateReview}
            onChange={(e) => setPrivateReview(e.target.value)}
            readOnly={!!data?.private_review}
          />
          <Button
            type={reviewEligible ? "submit" : "button"}
            variant={reviewEligible ? "default" : "secondary"}
            className="w-full mt-5"
          >
            {reviewEligible ? (
              isSubmitting ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                "Submit"
              )
            ) : (
              "Thank your for the review"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ReviewForm;
