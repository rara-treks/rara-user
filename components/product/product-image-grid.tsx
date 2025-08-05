"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ImageLightbox from "../media/image-lightbox";

interface Props {
  images: string[];
}

function ProductImageGrid({ images }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div>
      <div
        className="grid grid-cols-5 gap-2"
        onClick={() => {
          setIsLightboxOpen(true);
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            className={cn(
              "rounded-xl border object-cover cursor-zoom-in bg-white",
              index === 0 ? "row-span-2 col-span-3 aspect-video h-full" : "aspect-square"
            )}
            width={1000}
            height={1000}
            src={image}
            alt="Product image"
          />
        ))}
      </div>
      <ImageLightbox open={isLightboxOpen} setOpen={setIsLightboxOpen} images={images} />
    </div>
  );
}

export default ProductImageGrid;
