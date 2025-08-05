import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface ProductReviewResponse {
  product_id: number;
  product_name: string;
  review_stats: ProductReviewStats;
  reviews: {
    data: ProductReview[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface ProductReviewStats {
  total_reviews: number;
  average_rating: number;
  total_comments: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface ProductReview {
  id: number;
  user: {
    id: number;
    name: string;
    country: string;
  };
  cleanliness: string;
  hospitality: string;
  value_for_money: string;
  communication: string;
  overall_rating: string;
  public_review: string;
  reply_to_public_review: string | null;
  reviewed_at: string;
}

interface Props {
  slug: string;
  perPage?: number;
  page?: number;
}

async function getProductReviews({ slug, page = 1, perPage = 5 }: Props) {
  try {
    const { data } = await server.post(
      `/product/detail/review/${slug}`,
      {},
      {
        params: {
          per_page: perPage,
          page,
        },
      }
    );
    return data.data as ProductReviewResponse;
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getProductReviews",
    });
    return null;
  }
}

export default getProductReviews;
