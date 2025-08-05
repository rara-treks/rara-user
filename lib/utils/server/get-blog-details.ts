import server from "@/lib/server";
import { ProductPrice, ProductTag } from "@/types/product.types";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface Blog {
  id: number;
  title: string;
  short_description: string;
  description: string;
  mediaName: null | string;
  type: string;
  publish_date: string;
  read_time: string;
  slug: string;
  slug_history: string[];
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
  featured_image: string | null;
  related_products: {
    id: number;
    name: string;
    type: string;
    slug: string;
    tagline: string;
    location: string;
    total_rating: string | null;
    average_rating: string | null;
    featuredImage: string;
    tags: ProductTag[];
    prices: ProductPrice[];
  }[];
  meta: {
    metaTitle: string;
    keywords: string[];
    metaDescription: string;
  };
}

async function getBlogDetails(slug: string) {
  try {
    const { data } = await server.get(`/blog/detail/${slug}`);
    return data.data as Blog;
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getBlogDetails",
    });
    return null;
  }
}

export default getBlogDetails;
