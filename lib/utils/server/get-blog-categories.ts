import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

async function getBlogCategories() {
  try {
    const { data } = await server.get("/blog/list-category");
    return data.data as BlogCategory[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getBlogCategories",
    });
    return null;
  }
}

export default getBlogCategories;
