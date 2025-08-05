"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconHeart, IconHeartFilled, IconShare } from "@tabler/icons-react";
import useProduct from "@/lib/hooks/use-product";
import useShare from "@/lib/hooks/use-share";
import { cn } from "@/lib/utils";

interface Props {
  id: number;
  title: string;
  tagline: string;
  image: string;
  className?: string;
}

function ProductActionsButtons({ id, title, tagline, image, className }: Props) {
  const { inWishlist, toggleWishlist, addingToWishlist } = useProduct(id);
  const { isSharing, share } = useShare();

  return (
    <div className={cn("hidden md:flex gap-3 [&>button]:gap-2", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={toggleWishlist}
        loading={addingToWishlist}
        disabled={addingToWishlist}
      >
        {inWishlist ? <IconHeartFilled className="text-primary" size={20} /> : <IconHeart size={20} />}{" "}
        {inWishlist ? "Saved" : "Save"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          share({
            title: title,
            text: tagline,
            url: window.location.href,
            fileUrl: image,
          })
        }
        loading={isSharing}
        disabled={isSharing}
      >
        <IconShare size={20} /> Share
      </Button>
    </div>
  );
}

export default ProductActionsButtons;

function ShareIcon({ id, title, tagline, image, className }: Props) {
  const { isSharing, share } = useShare();
  return (
    <button
      className={cn("bg-white rounded-full p-1", className)}
      onClick={() =>
        share({
          title: title,
          text: tagline,
          url: window.location.href,
          fileUrl: image,
        })
      }
    >
      <IconShare stroke={1.5} />
    </button>
  );
}

export { ShareIcon };
