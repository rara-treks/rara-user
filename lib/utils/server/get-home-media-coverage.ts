import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface MediaCoverage {
  title: string;
  short_description: string;
  link: string;
  media_name: string;
  media_image: string;
  featured_image: string;
}

async function getHomeMediaCoverage() {
  try {
    const { data } = await server.get("/homepage/media-coverage");
    return data.data as MediaCoverage[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeMediaCoverage",
    });
    return null;
  }
}

export default getHomeMediaCoverage;
