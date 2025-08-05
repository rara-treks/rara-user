"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconLayoutGrid } from "@tabler/icons-react";
import ProductImageGrid from "@/components/product/product-image-grid";
import ProductGallery from "./product-gallery";

interface Props {
  gridImages: string[];
  galleryImages: string[];
}

function ProductImages({ gridImages, galleryImages }: Props) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section className="relative hidden md:block">
      <ProductImageGrid images={gridImages} />
      <ProductGallery open={isGalleryOpen} setOpen={setIsGalleryOpen} images={[...gridImages, ...galleryImages]} />
      {!!galleryImages.length && (
        <Button size="sm" className="gap-1 absolute bottom-3 right-3" onClick={() => setIsGalleryOpen(true)}>
          <IconLayoutGrid size={16} /> View More
        </Button>
      )}
    </section>
  );
}

export default ProductImages;
