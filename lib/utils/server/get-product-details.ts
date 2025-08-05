import { ProductDetail } from "@/types/product.types";
import server from "../../server";
import * as Icons from "@tabler/icons-react";
import uploadError from "./upload-error";
import { AxiosError } from "axios";

async function getProductDetails(slug: string) {
  try {
    const { data } = await server.get(`/product/detail/${slug}`);
    const product = data.data as ProductDetail;

    product.amenities = product.amenities.map((amenity) => ({
      ...amenity,
      // @ts-ignore
      icon: Icons?.[amenity.icon],
    }));

    product.included = product.included.map((included) => ({
      ...included,
      // @ts-ignore
      icon: Icons?.[included.icon],
    }));

    product.what_to_bring = product?.what_to_bring?.map((whatToBring) => ({
      ...whatToBring,
      // @ts-ignore
      icon: Icons?.[whatToBring.icon],
    }));

    return product;
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getProductDetails",
    });
    return null;
  }
}

export default getProductDetails;
