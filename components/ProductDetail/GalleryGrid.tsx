"use client";

import { useState } from "react";
import DesktopGallery from "./Gallery/DesktopGallery";
import GalleryDialog from "./Gallery/GalleryDialog";
import MobileGallery from "./Gallery/MobileGallery";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isFeatured?: boolean;
}

interface GalleryData {
  images: GalleryImage[];
}

interface UpdatedGalleryComponentProps {
  data: GalleryData;
}

const GalleryGrid = ({ data }: UpdatedGalleryComponentProps) => {
  const { images } = data;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  const handleShowMoreClick = () => {
    setCurrentImageIndex(Math.min(4, images.length - 1));
    setIsDialogOpen(true);
  };

  // If no images available, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // Extract just the src URLs for child components that expect string arrays
  const imageUrls = images.map((img) => img.src);

  return (
    <div className="w-full">
      {/* Mobile View */}
      <MobileGallery images={imageUrls} onImageClick={handleImageClick} />

      {/* Desktop View */}
      <DesktopGallery
        images={imageUrls}
        onImageClick={handleImageClick}
        onShowMoreClick={handleShowMoreClick}
      />

      {/* Image Gallery Dialog */}
      <GalleryDialog
        images={imageUrls}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </div>
  );
};

export default GalleryGrid;
