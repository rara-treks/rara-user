import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface Promotion {
  title: string;
  description: string;
  link: string;
  desktop_image: string;
  mobile_image: string;
}

async function getHomePromotions() {
  try {
    const { data } = await server.get("/homepage/promotion", {
      fetchOptions: {
        cache: "force-cache",
        next: {
          tags: ["promotions"],
        },
      },
    });
    return data.data as Promotion[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomePromotions",
    });
    return null;
  }
}

export default getHomePromotions;
