import server from "@/lib/server";
import { Product } from "@/types/product.types";
import { AxiosError } from "axios";
import uploadError from "./upload-error";

async function getHomeProducts(type: "homestay" | "circuit" | "package" |"experience") {
  try {
    const { data } = await server.get(`/homepage/product/${type}`);
    return data.data as Product[];
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getHomeProducts",
    });
    return null;
  }
}

export default getHomeProducts;
