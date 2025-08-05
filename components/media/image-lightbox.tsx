import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DialogOrDrawer, DialogOrDrawerContent } from "@/components/ui/dialog-or-drawer";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
}

function ImageLightbox({ open, setOpen, images }: Props) {
  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerContent className="md:!rounded-xl overflow-hidden md:max-w-4xl max-h-[90vh] p-0">
        <Carousel
          className="p-4"
          opts={{
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="aspect-[4/3]">
                <Image
                  className="rounded-xl h-full border object-cover object-center"
                  src={image}
                  width={1000}
                  height={1000}
                  alt="Lightbox image"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="z-50 left-5" />
          <CarouselNext className="z-50 right-5" />
        </Carousel>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

export default ImageLightbox;
