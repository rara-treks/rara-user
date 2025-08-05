"use client";
import React, { useState } from "react";
import { IconLayoutGrid, IconMaximize } from "@tabler/icons-react";
import Image from "next/image";
import ProductGallery from "./product-gallery";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface Props {
  gridImages: string[];
  galleryImages: string[];
}

function ProductImagesMobile({ gridImages, galleryImages }: Props) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section className="relative block md:hidden">
      <Carousel>
        <CarouselContent>
          {gridImages.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={"Product image"}
                width={800}
                height={300}
                className="h-full max-h-80 object-cover bg-white"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
        <CarouselPrevious className="left-2 md:opacity-0 disabled:!opacity-0 transition-opacity" />
      </Carousel>
      <ProductGallery open={isGalleryOpen} setOpen={setIsGalleryOpen} images={[...gridImages, ...galleryImages]} />
      {galleryImages.length > 0 && (
        <Button size="sm" className="gap-1 absolute bottom-3 right-3" onClick={() => setIsGalleryOpen(true)}>
          <IconLayoutGrid size={16} /> View More
        </Button>
      )}
    </section>
  );
}

export default ProductImagesMobile;
