"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DesktopGalleryProps {
  images: string[];
  onImageClick: (index: number) => void;
  onShowMoreClick: () => void;
}

const DesktopGallery = ({
  images,
  onImageClick,
  onShowMoreClick,
}: DesktopGalleryProps) => {
  // Don't render if no images
  if (!images || images.length === 0) {
    return (
      <div className="hidden md:flex w-full h-[480px] bg-gray-200 items-center justify-center rounded-2xl">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // Handle cases with fewer than 4 images
  const mainImage = images[0];
  const tallImage = images[1];
  const smallImage = images[2];
  const overlayImage = images[3];

  const remainingImagesCount = Math.max(0, images.length - 4);
  const showRemainingCount = remainingImagesCount > 0;

  return (
    <div className="hidden md:flex w-full h-[480px] gap-4">
      {/* Left side - single large image */}
      {mainImage && (
        <div className="relative w-1/2 h-full overflow-hidden rounded-2xl">
          <Image
            src={mainImage}
            alt="Main gallery image"
            fill
            className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(0)}
            sizes="50vw"
          />
        </div>
      )}

      {/* Right side - grid of smaller images */}
      <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-4">
        {/* Top left image - spans 1 col, 2 rows (tall image) */}
        {tallImage && (
          <div className="relative w-full h-full overflow-hidden rounded-2xl row-span-2">
            <Image
              src={tallImage}
              alt="Gallery image 2"
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onImageClick(1)}
              sizes="25vw"
            />
          </div>
        )}

        {/* Top right image */}
        {smallImage && (
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <Image
              src={smallImage}
              alt="Gallery image 3"
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onImageClick(2)}
              sizes="25vw"
            />
          </div>
        )}

        {/* Bottom right image with overlay */}
        {overlayImage ? (
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <Image
              src={overlayImage}
              alt="Gallery image 4"
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onImageClick(3)}
              sizes="25vw"
            />
            {showRemainingCount && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  variant="outline"
                  className="text-white bg-transparent border-white hover:bg-white hover:text-black transition-colors"
                  onClick={onShowMoreClick}
                >
                  +{remainingImagesCount} Photos
                </Button>
              </div>
            )}
          </div>
        ) : (
          // If there's no 4th image but we have more than 2 images, show "View All" button
          images.length > 2 && (
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
              <Button
                variant="outline"
                className="text-gray-700 hover:bg-gray-200"
                onClick={onShowMoreClick}
              >
                View All ({images.length})
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DesktopGallery;
