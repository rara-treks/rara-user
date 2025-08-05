import React from "react";
import Image from "next/image";
import {
  DialogOrDrawer,
  DialogOrDrawerClose,
  DialogOrDrawerContent,
  DialogOrDrawerTitle,
} from "@/components/ui/dialog-or-drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
}

function ProductGallery({ open, setOpen, images }: Props) {
  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerContent className="md:!rounded-xl overflow-hidden md:max-w-7xl max-h-[90vh]">
        <DialogOrDrawerTitle className="mb-4">Gallery</DialogOrDrawerTitle>
        <ScrollArea className="max-md:h-[75vh] max-h-[75vh]">
          <div className="grid md:grid-cols-2 justify-center items-center gap-4 md:px-24 lg:px-32">
            {images.map((image, index) => (
              <Image
                key={index}
                className={cn(
                  "w-full border odd:aspect-[4/2] even:aspect-[4/3] object-cover h-full bg-gray-100",
                  index % 3 === 0 ? "md:col-span-2" : "col-span-1"
                )}
                src={image}
                width={1000}
                height={1000}
                alt="Gallery image"
              />
            ))}
          </div>
        </ScrollArea>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

export default ProductGallery;
