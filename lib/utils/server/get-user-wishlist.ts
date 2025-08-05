import server from "@/lib/server";
import { Wishlist } from "@/types/wishlist.types";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import uploadError from "./upload-error";

async function getUserWishlist(): Promise<Wishlist[] | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const { data } = await server.get(`/product/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    await uploadError({
      name: axiosError.name,
      stack: axiosError.stack ?? "",
      message: axiosError.response?.data ? JSON.stringify(axiosError.response?.data) ?? "" : axiosError.message,
      source: "getUserWishlist",
    });
    return null;
  }
}

export default getUserWishlist;
