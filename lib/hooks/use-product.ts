"use client";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useWishlist from "./use-wishlist";
import { useUser } from "../context/user-context";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useProduct(productId: number) {
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const router = useRouter();
  const { wishlist } = useWishlist();
  const inWishlist = useMemo(() => wishlist?.find((p) => p.id === productId), [productId, wishlist]);
  const { user } = useUser();
  const queryClient = useQueryClient();

  async function toggleWishlist() {
    try {
      if (user) {
        setAddingToWishlist(true);
        await axios.get(`/api/product/wishlist/${productId}`);
        await queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      } else {
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist");
    } finally {
      setAddingToWishlist(false);
    }
  }

  return { toggleWishlist, inWishlist, addingToWishlist };
}

export default useProduct;
