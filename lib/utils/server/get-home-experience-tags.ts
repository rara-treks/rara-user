import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface Experience {
  id: number;
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
}

async function getHomeExperiencesTags() {
  try {
    const { data } = await server.get("/homepage/experience-tag");
    return data.data as Experience[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeExperiencesTags",
    });
    return null;
  }
}

export default getHomeExperiencesTags;
