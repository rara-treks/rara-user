import server from "@/lib/server";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

export interface WhyUs {
  title: string;
  description: string;
  link: string;
  whyUsImage: string;
}

async function getHomeWhyUs() {
  try {
    const { data } = await server.get("/homepage/why-us");
    return data.data as WhyUs[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeWhyUs",
    });
    return null;
  }
}

export default getHomeWhyUs;
