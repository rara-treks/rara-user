"use client";
import {
  FileArrowDownIcon,
  MapPinAreaIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Star } from "lucide-react";

interface HeaderProps {
  data: {
    type?: string;
    title?: string;
    location?: string;
    rating?: number;
    total_rating?: number;
    tagline?: string;
  };
}

const Header = ({ data }: HeaderProps) => {
  // Handle missing data gracefully
  if (!data) return null;

  const { title, location, rating, total_rating, tagline } = data;

  // Format rating display
  const formatRating = (score: number, totalReviews: number): string => {
    if (!score || !totalReviews) return "";
    return `${score.toFixed(1)} (${totalReviews} reviews)`;
  };

  // Static handlers for share and download (as requested)
  const handleShare = () => {
    console.log("Share clicked");
    // Add share functionality here
  };

  const handleDownload = () => {
    console.log("Download clicked");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        {/* Tagline */}
        {tagline && (
          <p className="text-sm text-gray-600 font-medium">{tagline}</p>
        )}

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>

        <div className="flex items-center justify-between w-full">
          <span className="w-full md:w-auto flex items-center justify-between md:gap-4">
            {/* Location Section */}
            {location && (
              <span className="flex items-center gap-1">
                <MapPinAreaIcon className="w-4 h-4 md:w-5 md:h-5" />
                <p className="text-xs md:text-lg">{location}</p>
              </span>
            )}

            {/* Rating Section */}
            {rating && total_rating && (
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-green-500 fill-current" />
                <p className="text-xs md:text-base">
                  {formatRating(rating, total_rating)}
                </p>
              </span>
            )}
          </span>

          {/* Actions Section - Static as requested */}
          <span className="hidden md:flex items-center gap-4">
            <span
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleShare}
            >
              <ShareNetworkIcon className="w-5 h-5" />
              <p className="text-sm">Share</p>
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleDownload}
            >
              <FileArrowDownIcon className="w-5 h-5" />
              <p className="text-sm">Download</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
