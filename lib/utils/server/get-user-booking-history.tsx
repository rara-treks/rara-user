import server from "@/lib/server";
import { cookies } from "next/headers";

export interface Review {
  id: number;
  overall_rating: string;
  cleanliness: string;
  hospitality: string;
  value_for_money: string;
  communication: string;
  public_review: string;
  private_review: string;
  reply_to_public_review: string;
  review_date: string;
}

export interface ReviewProduct {
  id: number;
  name: string;
  tagline: string;
  location: string;
  average_rating: string;
  featured_image: string;
}

export interface StayAndReview {
  booking_id: number;
  product: ReviewProduct;
  from_date: string;
  to_date: string;
  status: string;
  review: Review | null;
  review_eligible: boolean;
}

export type BookingHistory = {
  stays_and_reviews: StayAndReview[];
  reviews_needed: number;
};

async function getUserBookingHistory(): Promise<BookingHistory | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { data } = await server.get(`/profile/get-booking-history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return null;
  }
}

export default getUserBookingHistory;
