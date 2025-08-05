"use client";
import React, { useState } from "react";
import useProduct from "@/lib/hooks/use-product";
import { IconHeart, IconHeartFilled, IconLoader2, IconProps } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Props extends IconProps {
  productId: number;
}

function WishlistIcon({ productId, className, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toggleWishlist, inWishlist } = useProduct(productId);
  const WishlistIcon = inWishlist ? IconHeartFilled : IconHeart;

  async function handleWishlist() {
    setIsLoading(true);
    await toggleWishlist();
    setIsLoading(false);
  }

  if (isLoading) {
    return <IconLoader2 className={cn(className, "animate-spin")} {...rest} />;
  }

  return <WishlistIcon className={cn(className, inWishlist && "text-primary")} {...rest} onClick={handleWishlist} />;
}

export default WishlistIcon;
