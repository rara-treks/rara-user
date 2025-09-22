"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryDialogProps {
  images: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const GalleryDialog = ({
  images,
  isOpen,
  onOpenChange,
  currentImageIndex,
  setCurrentImageIndex,
}: GalleryDialogProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImageIndex(index);
  };

  const renderImageGrid = () => {
    const gridItems = [];
    let imageIndex = 0;

    while (imageIndex < images.length) {
      if (imageIndex % 3 === 0) {
        // Full width image (1st, 4th, 7th, etc.)
        gridItems.push(
          <div key={`full-${imageIndex}`} className="w-full">
            <div
              className={`relative w-full my-6 h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedImageIndex === imageIndex ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleImageClick(imageIndex)}
            >
              <Image
                src={images[imageIndex]}
                alt={`Gallery image ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                {imageIndex + 1}
              </div>
            </div>
          </div>
        );
        imageIndex++;
      } else {
        // Grid of 2 images
        const gridImages = [];
        for (let i = 0; i < 2 && imageIndex < images.length; i++) {
          gridImages.push(
            <div
              key={imageIndex}
              className={`relative h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedImageIndex === imageIndex ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleImageClick(imageIndex)}
            >
              <Image
                src={images[imageIndex]}
                alt={`Gallery image ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 45vw, 40vw"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                {imageIndex + 1}
              </div>
            </div>
          );
          imageIndex++;
        }

        gridItems.push(
          <div
            key={`grid-${imageIndex}`}
            className="w-full grid grid-cols-2 gap-3 sm:gap-4"
          >
            {gridImages}
          </div>
        );
      }
    }

    return gridItems;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full h-[85vh] p-0 border-none overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 bg-white border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Gallery ({images.length} image{images.length !== 1 ? "s" : ""})
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable image grid */}
        <div className="overflow-y-auto scrollbar-none rounded-xl h-full p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">{renderImageGrid()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
