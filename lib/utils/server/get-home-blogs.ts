import server from "@/lib/server";
import uploadError from "./upload-error";
import { AxiosError } from "axios";

export interface Blog {
  title: string;
  slug: string;
  publish_date: string;
  featured_image: string;
}

async function getHomeBlogs() {
  try {
    const { data } = await server.get("/homepage/blog");
    return data.data as Blog[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeBlogs",
    });
    return null;
  }
}

export default getHomeBlogs;
