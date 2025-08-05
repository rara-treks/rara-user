import server from "@/lib/server";
import { PaginatedResponse } from "@/types/index.types";
import uploadError from "./upload-error";
import { AxiosError } from "axios";

export interface Blog {
  id: number;
  title: string;
  short_description: string;
  slug: string;
  publish_date: string;
  author: string;
  category: string;
  featured_image: string;
  mediaName: string | null;
}

interface Props {
  filters: {
    type: "blog" | "mediaCoverage" | "report";
    search?: string | null | undefined;
    categoryId?: string | null | undefined;
  };
  page?: number;
  perPage?: number;
}

async function getBlogs({ filters, page = 1, perPage }: Props) {
  try {
    const { data } = await server.post<PaginatedResponse<Blog>>(
      `/blog/paginate`,
      {
        filters,
      },
      {
        params: {
          page,
          per_page: perPage,
        },
      }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getBlogs",
    });
    return null;
  }
}

export default getBlogs;
