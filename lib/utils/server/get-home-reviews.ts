import server from "@/lib/server";
import { ProductReview } from "@/types/product.types";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

async function getHomeReviews() {
  try {
    const { data } = await server.get(`/homepage/review`);
    return data.data as ProductReview[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeReviews",
    });
    return null;
  }
}

export default getHomeReviews;
