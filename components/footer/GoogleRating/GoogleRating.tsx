import React from "react";
import { GoogleLogo } from "./GoogleLogo";
import { Stars } from "./Stars";
import { GoogleRatingProps } from "@/types/google.types";
import { getRatingText } from "@/lib/utils/googleApi";
import Link from "next/link";

export const GoogleRating: React.FC<GoogleRatingProps> = ({
  initialRating = 0,
  initialTotalReviews = 0,
  businessName,
  showReviewCount = true,
  size = "medium",
  className = "",
  onClick,
}) => {
  // Size configurations
  const sizeConfig = {
    small: { logo: 18, star: 16, padding: "px-4 py-2", text: "text-sm" },
    medium: { logo: 24, star: 20, padding: "px-6 py-3", text: "text-base" },
    large: { logo: 28, star: 24, padding: "px-8 py-4", text: "text-lg" },
  };

  const config = sizeConfig[size];

  // Don't render if no rating data
  if (!initialRating) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`flex items-center bg-white rounded-full pl-6 pr-12 py-2 border border-gray-200 transition-all duration-300 ${
        config.padding
      } ${className} fade-in ${onClick ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      role={onClick ? "button" : "img"}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Google rating: ${getRatingText(initialRating)}${
        showReviewCount && initialTotalReviews
          ? ` based on ${initialTotalReviews} reviews`
          : ""
      }`}
    >
      <Link href="https://share.google/xfq0p8VZPM1neTFUr" target="_blank">
        <div className="flex items-center gap-2">
          <GoogleLogo size={config.logo} />
          <div className="flex flex-col gap-1">
            <Stars rating={initialRating} size={config.star} />
            <div className="flex items-center gap-2">
              <span className={`text-gray-700 font-medium ${config.text}`}>
                {getRatingText(initialRating)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GoogleRating;
