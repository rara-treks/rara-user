import React from "react";
import GoogleRating from "./GoogleRating/GoogleRating";
import FooterSocialLinks from "./FooterSocialLinks";
import { Rating, SocialLink } from "@/types/footer";

interface FooterRatingSocialSectionProps {
  rating: Rating;
  socialLinks: SocialLink[];
}

function FooterRatingSocialSection({
  rating,
  socialLinks,
}: FooterRatingSocialSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end md:items-end md:justify-end">
      {/* <GoogleRating
        initialRating={rating.value}
        initialTotalReviews={rating.totalReviews}
      /> */}
      <FooterSocialLinks socialLinks={socialLinks} />
    </div>
  );
}

export default FooterRatingSocialSection;
